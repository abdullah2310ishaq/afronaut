"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Ticket, Building2, User, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    companyName: "",
    businessLicense: "",
  })

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please ensure both passwords are identical",
        variant: "destructive",
      })
      return
    }

    if (formData.role === "agency" && (!formData.companyName || !formData.businessLicense)) {
      toast({
        title: "Company information required",
        description: "Please fill in company name and business license",
        variant: "destructive",
      })
      return
    }

    // Mock registration with email verification toast
    toast({
      title: "Registration Successful! ✓",
      description: "Verification email sent to your inbox. Please check your email to activate your account.",
    })

    // Simulate delay then redirect to login
    setTimeout(() => {
      router.push("/login")
    }, 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-green-600">
            <Ticket className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl text-white">Create Your Account</CardTitle>
            <CardDescription className="text-gray-400">Join Afronaut Ticketing and start your journey</CardDescription>
          </div>
        </CardHeader>

        <form onSubmit={handleRegister}>
          <CardContent className="space-y-4">
            {/* Account Type Selection */}
            <div className="space-y-3">
              <Label className="text-white">Account Type</Label>
              <RadioGroup value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <div className="flex items-center space-x-3 rounded-lg border border-zinc-700 p-4 hover:border-green-500 transition-colors bg-zinc-900/50">
                  <RadioGroupItem value="user" id="user" className="border-zinc-600" />
                  <User className="h-5 w-5 text-green-400" />
                  <Label htmlFor="user" className="flex-1 cursor-pointer">
                    <div className="font-medium text-white">Event Attendee</div>
                    <div className="text-sm text-gray-400">Browse and book tickets for events</div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 rounded-lg border border-zinc-700 p-4 hover:border-green-500 transition-colors bg-zinc-900/50">
                  <RadioGroupItem value="agency" id="agency" className="border-zinc-600" />
                  <Building2 className="h-5 w-5 text-green-400" />
                  <Label htmlFor="agency" className="flex-1 cursor-pointer">
                    <div className="font-medium text-white">Event Organizer</div>
                    <div className="text-sm text-gray-400">Create and manage events & employees</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Personal Information */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white"
                required
              />
            </div>

            {/* Company Information (only for agencies) */}
            {formData.role === "agency" && (
              <div className="space-y-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <h3 className="text-sm font-semibold text-green-400 flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Company Information
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-white">Company Name</Label>
                  <Input
                    id="companyName"
                    placeholder="Event Masters LLC"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="bg-zinc-800 border-zinc-700 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessLicense" className="text-white">Business License</Label>
                  <Input
                    id="businessLicense"
                    placeholder="BL-123456789"
                    value={formData.businessLicense}
                    onChange={(e) => setFormData({ ...formData, businessLicense: e.target.value })}
                    className="bg-zinc-800 border-zinc-700 text-white"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white"
                required
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              Create Account
            </Button>

            <p className="text-sm text-center text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-green-400 hover:text-green-300 font-medium">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
