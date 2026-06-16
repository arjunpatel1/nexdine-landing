'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Error ({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-muted-foreground mb-6">
          An error occurred while loading this page.
        </p>
        <button
          onClick={() => reset()}
          className="rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:opacity-90"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
