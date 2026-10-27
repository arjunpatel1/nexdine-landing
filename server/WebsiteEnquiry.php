<?php

declare(strict_types=1);

namespace NexDineMarketing;

use Illuminate\Mail\Mailable;

final class WebsiteEnquiry extends Mailable
{
    public function __construct(public readonly array $details) {}

    public function build(): self
    {
        $name = trim($this->details['firstName'].' '.$this->details['lastName']);
        $body = "New enquiry from myteknoland.in\n\nName: {$name}\nEmail: {$this->details['email']}\nRestaurant: {$this->details['restaurant']}\nLocations: {$this->details['locations']}\n\nMessage:\n".($this->details['message'] ?? 'Not provided');

        return $this->subject('New NexDine website enquiry')
            ->replyTo($this->details['email'], $name)
            ->html('<pre style="font-family:Arial,sans-serif;white-space:pre-wrap">'.e($body).'</pre>');
    }
}
