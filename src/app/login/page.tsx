"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Ticket, Sparkles, ArrowRight } from "lucide-react"
import { useAuthStore } from "@/stores/auth-store"
import { MOCK_PASSWORD } from "@/lib/mock-data"

export default function LoginPage() {
  const router = useRouter()
  const login = useAuthStore((state) => state.login)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const success = await login(email, password)

    if (success) {
      const user = useAuthStore.getState().user
      router.push(`/dashboard/${user?.role}`)
    } else {
      setError("Invalid credentials. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.1),transparent_50%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <Card className="border-white/10 bg-gradient-to-br from-zinc-900 to-black shadow-2xl shadow-primary/10">
          <CardHeader className="space-y-6 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-green-400 shadow-lg shadow-primary/50"
            >
              <Ticket className="h-8 w-8 text-black" />
            </motion.div>
            <div>
              <CardTitle className="text-3xl font-bold text-white">Welcome back</CardTitle>
              <CardDescription className="mt-2 text-base text-zinc-400">
                Sign in to your TicketPro account
              </CardDescription>
            </div>
          </CardHeader>

          <form onSubmit={handleLogin}>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 border-white/10 bg-zinc-900/50 text-white placeholder:text-zinc-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-zinc-300">
                    Password
                  </Label>
                  <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 border-white/10 bg-zinc-900/50 text-white placeholder:text-zinc-500"
                  required
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400"
                >
                  {error}
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-3 rounded-xl border border-primary/20 bg-primary/5 p-4 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <Sparkles className="h-4 w-4" />
                  <span>Demo Accounts</span>
                </div>
                <div className="space-y-1.5 text-xs text-zinc-400">
                  <p>
                    <span className="font-medium text-zinc-300">Admin:</span> admin@ticketpro.com
                  </p>
                  <p>
                    <span className="font-medium text-zinc-300">Agency:</span> agency@ticketpro.com
                  </p>
                  <p>
                    <span className="font-medium text-zinc-300">Employee:</span> employee@ticketpro.com
                  </p>
                  <p>
                    <span className="font-medium text-zinc-300">User:</span> user@ticketpro.com
                  </p>
                  <p className="mt-2 border-t border-white/10 pt-2 font-medium text-primary">
                    Password: {MOCK_PASSWORD}
                  </p>
                </div>
              </motion.div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="h-12 w-full text-base" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="inline-block"
                    >
                      ⚡
                    </motion.span>
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign In
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>

              <p className="text-center text-sm text-zinc-400">
                Don't have an account?{" "}
                <Link href="/register" className="font-medium text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}
