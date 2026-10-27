<?php

declare(strict_types=1);

// Private PHP script reached only by the exact nginx /api/contact location.
// Static exports never include this directory or any mail credentials.
try {
    $backend = $_SERVER['NEXDINE_BACKEND_ROOT'] ?? '/var/www/nexdine-api';
    require $backend.'/vendor/autoload.php';
    $app = require $backend.'/bootstrap/app.php';
    $app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
    require __DIR__.'/WebsiteEnquiry.php';
    require __DIR__.'/ContactEndpoint.php';
    (new NexDineMarketing\ContactEndpoint)->handle(Illuminate\Http\Request::capture())->send();
} catch (Throwable $exception) {
    error_log('Marketing endpoint unavailable: '.$exception::class);
    http_response_code(503);
    header('Content-Type: application/json');
    header('Cache-Control: no-store');
    echo json_encode(['ok' => false, 'message' => 'Email is temporarily unavailable. Please email info@myteknoland.com directly.']);
}
