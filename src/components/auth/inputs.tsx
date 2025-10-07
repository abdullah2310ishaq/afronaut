"use client"

import { useState, InputHTMLAttributes, forwardRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const TextInput = forwardRef<HTMLInputElement, BaseInputProps>(function TextInput(
  { label, error, className, ...props },
  ref
) {
  return (
    <div className="grid gap-1.5">
      {label && <label className="text-sm text-zinc-300">{label}</label>}
      <Input ref={ref} className={className} {...props} />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
})

export const PasswordInput = forwardRef<HTMLInputElement, BaseInputProps>(function PasswordInput(
  { label, error, className, ...props },
  ref
) {
  const [visible, setVisible] = useState(false)
  return (
    <div className="grid gap-1.5">
      {label && <label className="text-sm text-zinc-300">{label}</label>}
      <div className="relative">
        <Input ref={ref} type={visible ? "text" : "password"} className={className} {...props} />
        <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2" onClick={()=>setVisible(v=>!v)} aria-label={visible ? "Hide password" : "Show password"}>
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
})


