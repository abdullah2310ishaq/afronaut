"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/common/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function VerifyEmailPage() {
  const params = useSearchParams()
  const router = useRouter()
  const token = params.get("token")
  const [status, setStatus] = useState<"pending" | "success" | "error">("pending")

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStatus(token ? "success" : "error")
    }, 800)
    return () => clearTimeout(timeout)
  }, [token])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container px-4 py-10 max-w-xl">
        <Card className="border-white/10 bg-zinc-900/60 p-8 text-center space-y-4">
          {status === "pending" && <h1 className="text-2xl font-bold text-white">Verifying...</h1>}
          {status === "success" && (
            <>
              <h1 className="text-2xl font-bold text-white">Email verified</h1>
              <p className="text-zinc-400">Your account is now verified. You can log in.</p>
              <Button onClick={() => router.push("/auth/login")} className="mt-2">Go to Login</Button>
            </>
          )}
          {status === "error" && (
            <>
              <h1 className="text-2xl font-bold text-white">Invalid or expired link</h1>
              <p className="text-zinc-400">Please request a new verification email.</p>
              <Button onClick={() => router.push("/auth/login")} variant="outline" className="border-white/20 mt-2">Back to Login</Button>
            </>
          )}
        </Card>
      </main>
    </div>
  )
}


