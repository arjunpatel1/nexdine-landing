<?php

declare(strict_types=1);

namespace NexDineMarketing;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Validator;
use Throwable;

/** Isolated same-origin website endpoint. No tenant/session/recipient input is trusted. */
final class ContactEndpoint
{
    public const RECIPIENT = 'info@myteknoland.com';

    public function handle(Request $request): JsonResponse
    {
        if (! $request->isMethod('POST')) {
            return $this->response(false, 'Method not allowed.', 405)->header('Allow', 'POST');
        }
        if (! in_array($request->header('Origin'), ['https://myteknoland.in', 'https://www.myteknoland.in'], true)) {
            return $this->response(false, 'This form must be submitted from myteknoland.in.', 403);
        }
        if (! $request->isJson()) {
            return $this->response(false, 'Submit the form as JSON.', 415);
        }
        if (strlen($request->getContent()) > 16384) {
            return $this->response(false, 'The form is too large.', 413);
        }
        $ipKey = 'marketing:contact:ip:'.hash('sha256', (string) $request->server('REMOTE_ADDR'));
        if (RateLimiter::tooManyAttempts($ipKey, 5)) {
            return $this->response(false, 'Too many attempts. Please try again later or email us directly.', 429)
                ->header('Retry-After', (string) RateLimiter::availableIn($ipKey));
        }
        RateLimiter::hit($ipKey, 600);
        try {
            $data = json_decode($request->getContent(), true, 32, JSON_THROW_ON_ERROR);
        } catch (\JsonException) {
            return $this->response(false, 'Invalid JSON.', 400);
        }
        if (! is_array($data)) {
            return $this->response(false, 'Invalid form.', 422);
        }
        $validator = Validator::make($data, [
            'firstName' => ['required', 'string', 'max:80', 'regex:/\A[^\r\n]*\z/u'],
            'lastName' => ['required', 'string', 'max:80', 'regex:/\A[^\r\n]*\z/u'],
            'email' => ['required', 'string', 'max:254', 'email:rfc'],
            'restaurant' => ['required', 'string', 'max:160'],
            'locations' => ['required', 'in:1,2-5,6-20,20+'],
            'message' => ['nullable', 'string', 'max:3000'],
            'website' => ['nullable', 'string', 'max:0'],
            'to' => ['prohibited'], 'cc' => ['prohibited'], 'bcc' => ['prohibited'], 'subject' => ['prohibited'],
        ]);
        if ($validator->fails()) {
            return $this->response(false, 'Please check the form fields and try again.', 422);
        }
        $details = array_intersect_key($validator->validated(), array_flip(['firstName', 'lastName', 'email', 'restaurant', 'locations', 'message']));
        $key = 'marketing:contact:submission:'.hash_hmac('sha256', json_encode($details), (string) config('app.key'));
        $lock = Cache::lock($key.':lock', 30);
        if (! $lock->get()) {
            return $this->response(false, 'Your request is already being sent. Please wait.', 409);
        }
        try {
            if (Cache::get($key.':sent')) {
                return $this->response(true, 'Your enquiry has been sent.', 200);
            }
            $driver = (string) config('mail.default');
            // Never claim delivery through a development log/array/fallback mailer.
            $configured = match ($driver) {
                'mailgun' => filled(config('services.mailgun.domain')) && filled(config('services.mailgun.secret')),
                'smtp' => filled(config('mail.mailers.smtp.host')),
                'ses', 'postmark', 'resend', 'sendmail' => true,
                default => false,
            };
            if (! $configured || ! filled(config('mail.from.address'))) {
                return $this->response(false, 'Email is temporarily unavailable. Please email info@myteknoland.com directly.', 503);
            }
            $globalKey = 'marketing:contact:global';
            if (RateLimiter::tooManyAttempts($globalKey, 120)) {
                return $this->response(false, 'Please try again later or email us directly.', 429);
            }
            RateLimiter::hit($globalKey, 600);
            config(['mail.mailers.smtp.timeout' => 10,
                'mail.mailers.mailgun.client' => ['timeout' => 10, 'max_duration' => 12]]);
            Mail::to(self::RECIPIENT)->send(new WebsiteEnquiry($details));
            Cache::put($key.':sent', true, 600);

            return $this->response(true, 'Your enquiry has been sent.', 200);
        } catch (Throwable $exception) {
            Log::warning('Marketing contact email failed', ['exception_type' => $exception::class]);

            return $this->response(false, 'Your enquiry could not be sent. Please try again or email info@myteknoland.com directly.', 503);
        } finally {
            $lock->release();
        }
    }

    private function response(bool $ok, string $message, int $status): JsonResponse
    {
        return response()->json(['ok' => $ok, 'message' => $message], $status)
            ->header('Cache-Control', 'no-store')->header('X-Content-Type-Options', 'nosniff');
    }
}
