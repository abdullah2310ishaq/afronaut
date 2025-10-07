"use client"

import Link from "next/link"
import { useState } from "react"
import { AuthLayout } from "@/components/auth/auth-layout"
import { AuthCard } from "@/components/auth/auth-card"
import { PasswordInput } from "@/components/auth/inputs"
import { AuthButton } from "@/components/auth/auth-button"

export default function ResetPasswordPage() {
  const [done, setDone] = useState(false)
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSet() {
    setError("")
    if (!password || !confirm) return setError("Please fill in all fields")
    if (password !== confirm) return setError("Passwords do not match")
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    setLoading(false)
    setDone(true)
  }

  return (
    <AuthLayout>
      <AuthCard
        title="Reset your password"
        subtitle="Enter a new password for your account"
        footer={
          done ? (
            <div className="text-sm">
              <Link href="/auth/login" className="text-primary hover:underline">Go to Login</Link>
            </div>
          ) : null
        }
        width="sm"
      >
        {!done ? (
          <div className="grid gap-3">
            <PasswordInput placeholder="New password" value={password} onChange={e=>setPassword(e.currentTarget.value)} />
            <PasswordInput placeholder="Confirm password" value={confirm} onChange={e=>setConfirm(e.currentTarget.value)} />
            {error && <p className="text-sm text-red-400">{error}</p>}
            <AuthButton loading={loading} onClick={handleSet}>Reset Password</AuthButton>
          </div>
        ) : (
          <p className="text-green-400">Password updated successfully.</p>
        )}
      </AuthCard>
    </AuthLayout>
  )
}


