"use client"

import Link from "next/link"
import { useState } from "react"
import { AuthLayout } from "@/components/auth/auth-layout"
import { AuthCard } from "@/components/auth/auth-card"
import { TextInput } from "@/components/auth/inputs"
import { AuthButton } from "@/components/auth/auth-button"
import { isValidEmail } from "@/lib/utils"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSend() {
    setError("")
    if (!email) return setError("Please enter your email")
    if (!isValidEmail(email)) return setError("Enter a valid email address")
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    setLoading(false)
    setSent(true)
  }

  return (
    <AuthLayout>
      <AuthCard
        title="Forgot your password?"
        subtitle="We’ll email you a reset link"
        footer={
          <div className="text-sm">
            <Link href="/auth/login" className="text-primary hover:underline">Back to Login</Link>
          </div>
        }
        width="sm"
      >
        {!sent ? (
          <div className="grid gap-3">
            <TextInput label="Email" placeholder="you@example.com" type="email" value={email} onChange={e=>setEmail(e.currentTarget.value)} />
            {error && <p className="text-sm text-red-400">{error}</p>}
            <AuthButton loading={loading} onClick={handleSend}>Send Reset Link</AuthButton>
          </div>
        ) : (
          <p className="text-green-400">Password reset link sent to {email}.</p>
        )}
      </AuthCard>
    </AuthLayout>
  )
}


