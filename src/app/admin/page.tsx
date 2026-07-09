import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NexDine Awards Admin Portal',
  description: 'Sign in to manage the NexDine Restaurant Excellence Awards portal.',
}

export default function AdminRootPage() {
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-24">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-700 bg-slate-900/90 p-10 shadow-[0_30px_100px_rgba(15,23,42,0.45)]">
        <p className="text-sm uppercase tracking-[0.4em] text-orange-300">Admin Portal</p>
        <h1 className="mt-6 text-4xl font-semibold text-white sm:text-5xl">NexDine Restaurant Excellence Awards</h1>
        <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
          Manage categories, approve restaurants, review votes, and publish winners from the awards administration portal.
        </p>

        <div className="mt-10">
          <Link
            href="/admin/login"
            className="inline-flex w-full items-center justify-center rounded-3xl bg-orange-500 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-orange-400"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}
