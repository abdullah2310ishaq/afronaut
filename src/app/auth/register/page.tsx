"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { AuthLayout } from "@/components/auth/auth-layout"
import { AuthCard } from "@/components/auth/auth-card"
import { TextInput, PasswordInput } from "@/components/auth/inputs"
import { AuthButton } from "@/components/auth/auth-button"
import { isValidEmail, isValidPhone } from "@/lib/utils"

export default function AuthRegisterPage() {
  const router = useRouter()
  const [tab, setTab] = useState<"user" | "agency">("user")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // User form state
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [userConfirm, setUserConfirm] = useState("")

  // Agency form state
  const [companyName, setCompanyName] = useState("")
  const [ownerName, setOwnerName] = useState("")
  const [agencyEmail, setAgencyEmail] = useState("")
  const [agencyPassword, setAgencyPassword] = useState("")
  const [agencyConfirm, setAgencyConfirm] = useState("")
  const [phone, setPhone] = useState("")
  const [businessInfo, setBusinessInfo] = useState("")

  async function handleSubmit() {
    setError("")
    setSuccess("")

    if (tab === "user") {
      if (!userName || !userEmail || !userPassword || !userConfirm) return setError("Please fill in all required fields")
      if (!isValidEmail(userEmail)) return setError("Enter a valid email address")
      if (userPassword !== userConfirm) return setError("Passwords do not match")
    } else {
      if (!companyName || !ownerName || !agencyEmail || !agencyPassword || !agencyConfirm) return setError("Please fill in all required fields")
      if (!isValidEmail(agencyEmail)) return setError("Enter a valid email address")
      if (agencyPassword !== agencyConfirm) return setError("Passwords do not match")
      if (phone && !isValidPhone(phone)) return setError("Enter a valid phone number")
    }

    setLoading(true)
    // UI-only: simulate success; backend wiring later
    await new Promise(r => setTimeout(r, 600))
    setLoading(false)
    setSuccess("Verify your email")
    // Navigate to verify email
    const token = "demo-token"
    router.push(`/auth/verify-email?token=${encodeURIComponent(token)}`)
  }

  return (
    <AuthLayout>
      <AuthCard
        title="Create your account"
        subtitle="Register as a User or an Agency"
        footer={
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-400">Already have an account?</span>
            <Link href="/auth/login" className="text-primary hover:underline">Login</Link>
          </div>
        }
      >
        <div className="flex gap-2">
          <button className={`px-3 py-2 rounded-md text-sm border ${tab === "user" ? "bg-primary text-primary-foreground border-primary" : "border-white/20"}`} onClick={()=>setTab("user")}>Register as User</button>
          <button className={`px-3 py-2 rounded-md text-sm border ${tab === "agency" ? "bg-primary text-primary-foreground border-primary" : "border-white/20"}`} onClick={()=>setTab("agency")}>Register as Agency</button>
        </div>

        {tab === "user" && (
          <div className="grid gap-3">
            <TextInput label="Name" placeholder="Jane Doe" value={userName} onChange={e=>setUserName(e.currentTarget.value)} />
            <TextInput label="Email" placeholder="you@example.com" type="email" value={userEmail} onChange={e=>setUserEmail(e.currentTarget.value)} />
            <PasswordInput placeholder="Password" value={userPassword} onChange={e=>setUserPassword(e.currentTarget.value)} />
            <PasswordInput placeholder="Confirm Password" value={userConfirm} onChange={e=>setUserConfirm(e.currentTarget.value)} />
          </div>
        )}

        {tab === "agency" && (
          <div className="grid gap-3">
            <TextInput label="Company Name" placeholder="Acme Events Ltd." value={companyName} onChange={e=>setCompanyName(e.currentTarget.value)} />
            <TextInput label="Owner / Contact Name" placeholder="John Smith" value={ownerName} onChange={e=>setOwnerName(e.currentTarget.value)} />
            <TextInput label="Email" placeholder="contact@company.com" type="email" value={agencyEmail} onChange={e=>setAgencyEmail(e.currentTarget.value)} />
            <PasswordInput placeholder="Password" value={agencyPassword} onChange={e=>setAgencyPassword(e.currentTarget.value)} />
            <PasswordInput placeholder="Confirm Password" value={agencyConfirm} onChange={e=>setAgencyConfirm(e.currentTarget.value)} />
            <TextInput label="Phone Number" placeholder="+1 555 123 4567" value={phone} onChange={e=>setPhone(e.currentTarget.value)} />
            <div className="grid gap-1.5">
              <label className="text-sm text-zinc-300">Business Info (optional)</label>
              <input className="w-full rounded-md bg-background border border-white/20 px-3 py-2 text-sm" placeholder="Short description" value={businessInfo} onChange={e=>setBusinessInfo(e.currentTarget.value)} />
            </div>
          </div>
        )}

        {error && <p className="text-sm text-red-400">{error}</p>}
        {success && <p className="text-sm text-green-400">{success}</p>}
        <AuthButton loading={loading} onClick={handleSubmit}>{tab === "user" ? "Create Account" : "Register Agency"}</AuthButton>
      </AuthCard>
    </AuthLayout>
  )
}

