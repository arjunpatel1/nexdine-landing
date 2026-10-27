<?php

namespace Tests\Feature\Marketing;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use NexDineMarketing\ContactEndpoint;
use NexDineMarketing\WebsiteEnquiry;
use Tests\TestCase;

require_once __DIR__.'/../WebsiteEnquiry.php';
require_once __DIR__.'/../ContactEndpoint.php';

final class ContactEndpointTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        config(['mail.default' => 'smtp', 'mail.mailers.smtp.host' => 'smtp.example.test',
            'mail.from.address' => 'website@example.test', 'cache.default' => 'array']);
        Mail::fake();
        Cache::flush();
    }

    private function submit(array $extra = [], string $origin = 'https://myteknoland.in'): \Illuminate\Http\JsonResponse
    {
        $data = array_merge(['firstName' => 'QA', 'lastName' => 'Visitor', 'email' => 'qa@example.test',
            'restaurant' => 'Test restaurant', 'locations' => '1', 'message' => 'Synthetic enquiry', 'website' => ''], $extra);
        return (new ContactEndpoint)->handle(Request::create('/api/contact', 'POST', [], [], [], [
            'CONTENT_TYPE' => 'application/json', 'HTTP_ORIGIN' => $origin, 'REMOTE_ADDR' => '192.0.2.20',
        ], json_encode($data)));
    }

    public function test_fixed_recipient_and_duplicate_retry(): void
    {
        $this->assertSame(200, $this->submit()->getStatusCode());
        $this->assertSame(200, $this->submit()->getStatusCode());
        Mail::assertSent(WebsiteEnquiry::class, fn ($mail) => $mail->hasTo('info@myteknoland.com'));
        Mail::assertSentCount(1);
    }

    public function test_origin_honeypot_and_header_injection_are_rejected(): void
    {
        $this->assertSame(403, $this->submit([], 'https://attacker.example')->getStatusCode());
        $this->assertSame(422, $this->submit(['to' => 'attacker@example.test'])->getStatusCode());
        $this->assertSame(422, $this->submit(['website' => 'spam'])->getStatusCode());
        $this->assertSame(422, $this->submit(['firstName' => "QA\r\nBcc: attacker@example.test"])->getStatusCode());
        Mail::assertNothingSent();
    }

    public function test_validation_and_rate_limit(): void
    {
        $this->assertSame(422, $this->submit(['message' => str_repeat('x', 3001)])->getStatusCode());
        for ($i = 0; $i < 4; $i++) {
            $this->assertSame(422, $this->submit(['email' => 'invalid'])->getStatusCode());
        }
        $this->assertSame(429, $this->submit()->getStatusCode());
        Mail::assertNothingSent();
    }

    public function test_log_mailer_and_transport_failure_never_return_success(): void
    {
        config(['mail.default' => 'log']);
        $this->assertSame(503, $this->submit()->getStatusCode());
        Mail::assertNothingSent();
        config(['mail.default' => 'smtp']);
        Mail::shouldReceive('to')->once()->with('info@myteknoland.com')->andThrow(new \RuntimeException('Simulated failure'));
        $response = $this->submit();
        $this->assertSame(503, $response->getStatusCode());
        $this->assertFalse($response->getData(true)['ok']);
    }

    public function test_body_is_escaped_and_reply_to_is_customer_email(): void
    {
        $mail = new WebsiteEnquiry(['firstName' => 'QA', 'lastName' => 'Visitor', 'email' => 'qa@example.test',
            'restaurant' => '<script>alert(1)</script>', 'locations' => '1', 'message' => '<img src=x>']);
        $mail->build();
        $this->assertTrue($mail->hasReplyTo('qa@example.test', 'QA Visitor'));
        $rendered = $mail->render();
        $this->assertStringNotContainsString('<script>', $rendered);
        $this->assertStringContainsString('&lt;script&gt;', $rendered);
    }
}
