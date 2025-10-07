import { Button } from "@/components/ui/button"
import type { ComponentProps, ReactNode } from "react"
import { Loader2 } from "lucide-react"

type BaseButtonProps = ComponentProps<typeof Button>

interface AuthButtonProps extends BaseButtonProps {
  loading?: boolean
  children: ReactNode
}

export function AuthButton({ loading, children, disabled, ...props }: AuthButtonProps) {
  return (
    <Button className="w-full" disabled={disabled || loading} {...props}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  )
}


