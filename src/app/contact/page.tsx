'use client'

import { CheckCircle, Clock, Loader2, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import { useState } from 'react'
import PageWrapper from '@/components/PageWrapper'

const CONTACT = {
  email: 'info@myteknoland.net',
  phone: '91-72888 76715',
  phoneRaw: '917288876715',
  address: '1/1, Bangalore Main Road, Rayachoty',
}

export default function ContactPage () {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    restaurant: '',
    locations: '1',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    const fullName = `${form.firstName} ${form.lastName}`.trim()
    const msgBody = `New Demo Request from NexDine Website\n\nName: ${fullName}\nEmail: ${form.email}\nRestaurant: ${form.restaurant}\nLocations: ${form.locations}\n\nMessage:\n${form.message || 'N/A'}`

    const authKey = process.env.NEXT_PUBLIC_MSG91_AUTHKEY
    const templateId = process.env.NEXT_PUBLIC_MSG91_TEMPLATE_ID

    if (authKey && templateId) {
      try {
        const res = await fetch('https://api.msg91.com/api/v5/whatsapp/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authkey': authKey,
          },
          body: JSON.stringify({
            to: CONTACT.phoneRaw,
            template_id: templateId,
            components: [
              {
                type: 'body',
                parameters: [
                  { type: 'text', text: fullName },
                  { type: 'text', text: form.email },
                  { type: 'text', text: form.restaurant },
                  { type: 'text', text: form.locations },
                  { type: 'text', text: form.message || 'N/A' },
                ],
              },
            ],
          }),
        })
        if (res.ok) {
          setStatus('sent')
          setForm({ firstName: '', lastName: '', email: '', restaurant: '', locations: '1', message: '' })
          return
        }
      } catch {
        // fall through to WhatsApp deep link
      }
    }

    // Fallback: WhatsApp deep link
    const waUrl = `https://wa.me/${CONTACT.phoneRaw}?text=${encodeURIComponent(msgBody)}`
    window.open(waUrl, '_blank')
    setStatus('sent')
    setForm({ firstName: '', lastName: '', email: '', restaurant: '', locations: '1', message: '' })
  }

  const contactCards = [
    {
      icon: Mail,
      title: 'Email Us',
      desc: CONTACT.email,
      sub: 'We reply within 2 hours',
      href: `mailto:${CONTACT.email}`,
    },
    {
      icon: Phone,
      title: 'Call Us',
      desc: CONTACT.phone,
      sub: 'Mon-Sat, 9am-7pm IST',
      href: `tel:${CONTACT.phone}`,
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      desc: CONTACT.address,
      sub: 'Andhra Pradesh, India',
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`,
    },
    {
      icon: Clock,
      title: 'Support Hours',
      desc: '24/7 for Enterprise',
      sub: 'Standard: Mon-Sat 9am-7pm',
      href: undefined,
    },
  ]

  return (
    <PageWrapper>
      <div className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              Book a Demo
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See NexDine in action. Our team will walk you through a personalized demo tailored to your restaurant.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="text-2xl font-bold mb-6">Request a Demo</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                      type="text"
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      required
                      type="text"
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    type="email"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="john@restaurant.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Restaurant Name</label>
                  <input
                    name="restaurant"
                    value={form.restaurant}
                    onChange={handleChange}
                    required
                    type="text"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your Restaurant"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Number of Locations</label>
                  <select
                    name="locations"
                    value={form.locations}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option>1</option>
                    <option>2-5</option>
                    <option>6-20</option>
                    <option>20+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Tell us about your needs..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {status === 'sending'
                    ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      )
                    : (status === 'sent'
                        ? (
                            <>
                              <CheckCircle className="h-4 w-4" />
                              Sent!
                            </>
                          )
                        : (
                            <>
                              <Send className="h-4 w-4" />
                              Schedule Demo
                            </>
                          ))}
                </button>
                {status === 'sent' && (
                  <p className="text-center text-sm text-green-500">
                    Your request has been sent. We will reach out shortly.
                  </p>
                )}
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {contactCards.map(item => {
                const Card = (
                  <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-foreground">{item.desc}</p>
                      <p className="text-sm text-muted-foreground">{item.sub}</p>
                    </div>
                  </div>
                )
                return item.href
                  ? (
                      <a key={item.title} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                        {Card}
                      </a>
                    )
                  : (
                      <div key={item.title}>{Card}</div>
                    )
              })}

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/${CONTACT.phoneRaw}?text=${encodeURIComponent('Hi, I would like to know more about NexDine.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl border border-green-500/30 bg-green-500/5 p-6 hover:bg-green-500/10 transition-colors"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 text-green-500 flex-shrink-0">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-600">Chat on WhatsApp</h3>
                  <p className="text-foreground">Quick response on business hours</p>
                  <p className="text-sm text-muted-foreground">{CONTACT.phone}</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
