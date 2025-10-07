"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Header } from "@/components/common/header"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/stores/auth-store"

export default function AuthLoginPage() {
  const router = useRouter()
  const login = useAuthStore(s => s.login)
  const user = useAuthStore(s => s.user)
  const [email, setEmail] = useState("user@afronaut.com")
  const [password, setPassword] = useState("password123")
  const [error, setError] = useState("")

  async function handleLogin() {
    setError("")
    const ok = await login(email, password)
    if (!ok) return setError("Invalid credentials")
    const role = useAuthStore.getState().user?.role
    switch (role) {
      case "admin":
        router.push("/admin/dashboard")
        break
      case "agency":
        router.push("/agency/dashboard")
        break
      case "employee":
        router.push("/employee/my-events")
        break
      default:
        router.push("/user/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container px-4 py-10 flex justify-center">
        <Card className="border-white/10 bg-zinc-900/60 p-6 w-full max-w-md space-y-4">
          <h1 className="text-2xl font-bold text-white">Login</h1>
          <div className="grid gap-3">
            <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            {error && <p className="text-sm text-red-400">{error}</p>}
            <Button onClick={handleLogin}>Sign In</Button>
          </div>
          <p className="text-xs text-zinc-500">Demo accounts: user@afronaut.com, agency@afronaut.com, employee@afronaut.com, admin@afronaut.com (password: password123)</p>
        </Card>
      </main>
    </div>
  )
}


