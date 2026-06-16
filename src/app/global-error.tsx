'use client'

export default function GlobalError ({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
            <p className="text-muted-foreground mb-6">
              A critical error occurred.
            </p>
            <button
              onClick={() => reset()}
              className="rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:opacity-90"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
