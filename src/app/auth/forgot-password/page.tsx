"use client"

import { useState } from "react"
import { Header } from "@/components/common/header"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container px-4 py-10 flex justify-center">
        <Card className="border-white/10 bg-zinc-900/60 p-6 w-full max-w-md space-y-4">
          <h1 className="text-2xl font-bold text-white">Forgot Password</h1>
          {!sent ? (
            <div className="grid gap-3">
              <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
              <Button onClick={()=>setSent(true)}>Send Reset Link</Button>
            </div>
          ) : (
            <p className="text-green-400">Reset link sent to {email} (demo).</p>
          )}
        </Card>
      </main>
    </div>
  )
}


