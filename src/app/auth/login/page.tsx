"use client"

import Link from "next/link"
import { useState } from "react"
import { AuthLayout } from "@/components/auth/auth-layout"
import { AuthCard } from "@/components/auth/auth-card"
import { TextInput, PasswordInput } from "@/components/auth/inputs"
import { AuthButton } from "@/components/auth/auth-button"
import { isValidEmail } from "@/lib/utils"
import { useAuthStore } from "@/stores/auth-store"

export default function AuthLoginPage() {
  const login = useAuthStore(s => s.login)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleLogin() {
    setError("")
    if (!email || !password) return setError("Please fill in all fields")
    if (!isValidEmail(email)) return setError("Enter a valid email address")
    setLoading(true)
    // UI-only: simulate auth; keep API hookup for later
    const ok = await login(email, password)
    setLoading(false)
    if (!ok) return setError("Invalid credentials")
    // No routing here per module scope; show transient success instead
    setSuccess(true)
  }

  return (
    <AuthLayout>
      <AuthCard
        title="Sign in to your account"
        subtitle="Welcome back! Please enter your details."
        footer={
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-400">Don’t have an account?</span>
            <Link href="/auth/register" className="text-primary hover:underline">Register</Link>
          </div>
        }
        width="sm"
      >
        <div className="grid gap-3">
          <TextInput
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.currentTarget.value)}
            type="email"
          />
          <div className="flex items-center justify-between">
            <label className="text-sm text-zinc-300">Password</label>
            <Link href="/auth/forgot-password" className="text-xs text-primary hover:underline">Forgot Password?</Link>
          </div>
          <PasswordInput
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.currentTarget.value)}
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          {success && <p className="text-sm text-green-400">Signed in successfully.</p>}
          <AuthButton onClick={handleLogin} loading={loading}>Login</AuthButton>
        </div>
        <p className="text-xs text-zinc-500">Demo: user@afronaut.com, agency@afronaut.com, employee@afronaut.com, admin@afronaut.com (password: password123)</p>
      </AuthCard>
    </AuthLayout>
  )
}

