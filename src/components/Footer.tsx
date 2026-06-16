'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Youtube } from 'lucide-react'
import Link from 'next/link'
import Logo from '@/components/Logo'

const footerGroups = [
  {
    title: 'Product',
    links: [
      { label: 'POS System', href: '/pos-demo' },
      { label: 'QR Ordering', href: '/qr-ordering' },
      { label: 'Table Mapping', href: '/table-mapping' },
      { label: 'Analytics', href: '/analytics' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/contact' },
      { label: 'Careers', href: '/contact' },
      { label: 'Blog', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/contact' },
      { label: 'Help Center', href: '/contact' },
      { label: 'Contact Support', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/contact' },
      { label: 'Terms of Service', href: '/contact' },
      { label: 'Cookie Policy', href: '/contact' },
    ],
  },
]

export default function Footer () {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4" aria-label="NexDine Home">
              <Logo size={36} />
              <span className="text-xl font-bold">NexDine</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs mb-6">
              The enterprise restaurant management platform trusted by thousands of restaurants worldwide.
            </p>
            <div className="flex items-center gap-3">
              {[Twitter, Linkedin, Github, Youtube].map((Icon, i) => {
                const socialNames = ['Twitter', 'LinkedIn', 'GitHub', 'YouTube']
                return (
                  <a
                    key={i}
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={`Follow NexDine on ${socialNames[i]}`}
                    rel="noopener noreferrer"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links */}
          {footerGroups.map(group => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold mb-3">{group.title}</h3>
              <nav aria-label={`${group.title} links`}>
                <ul className="space-y-2" role="list">
                  {group.links.map(link => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 NexDine. All rights reserved. A
            {' '}
            <a
              href="https://myteknoland.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors underline underline-offset-2"
            >
              Myteknoland
            </a>
            {' '}
            Product.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
