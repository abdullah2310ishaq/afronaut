"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AuthLayout } from "@/components/auth/auth-layout"
import { AuthCard } from "@/components/auth/auth-card"
import { AuthButton } from "@/components/auth/auth-button"

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
    <AuthLayout>
      <AuthCard title={status === "success" ? "Email verified" : status === "error" ? "Invalid or expired link" : "Verifying..."}>
        {status === "success" && (
          <div className="text-center space-y-3">
            <p className="text-zinc-400">Your account is now verified. You can log in.</p>
            <AuthButton onClick={() => router.push("/auth/login")}>Go to Login</AuthButton>
          </div>
        )}
        {status === "error" && (
          <div className="text-center space-y-3">
            <p className="text-zinc-400">Please request a new verification email.</p>
            <AuthButton variant="outline" onClick={() => router.push("/auth/login")}>
              Back to Login
            </AuthButton>
          </div>
        )}
      </AuthCard>
    </AuthLayout>
  )
}


