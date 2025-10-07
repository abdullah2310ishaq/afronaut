import { ReactNode } from "react"
import { Card } from "@/components/ui/card"

interface AuthCardProps {
  title: string
  subtitle?: string
  children: ReactNode
  footer?: ReactNode
  width?: "sm" | "md" | "lg"
}

export function AuthCard({ title, subtitle, children, footer, width = "md" }: AuthCardProps) {
  const maxWidth = width === "sm" ? "max-w-md" : width === "lg" ? "max-w-2xl" : "max-w-xl"
  return (
    <Card className={`border-white/10 bg-zinc-900/60 p-6 w-full ${maxWidth} space-y-5`}> 
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <svg className="h-5 w-5 text-primary-foreground" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2Z" /><path d="m9 12 2 2 4-4" /></svg>
          </div>
          <span className="text-lg font-semibold">Afronaut Ticketing</span>
        </div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {subtitle && <p className="text-sm text-zinc-400 mt-1">{subtitle}</p>}
      </div>
      <div className="space-y-4">
        {children}
      </div>
      {footer && (
        <div className="pt-2 border-t border-white/10">
          {footer}
        </div>
      )}
    </Card>
  )
}


