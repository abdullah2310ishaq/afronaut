import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center px-4">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-white">404</h1>
        <p className="text-zinc-400">The page you’re looking for could not be found.</p>
        <Link href="/" className="inline-block rounded-md border border-white/20 px-4 py-2 text-sm text-white hover:border-primary">Go Home</Link>
      </div>
    </div>
  )
}


