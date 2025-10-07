import { Button, ButtonProps } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface AuthButtonProps extends ButtonProps {
  loading?: boolean
  children: React.ReactNode
}

export function AuthButton({ loading, children, disabled, ...props }: AuthButtonProps) {
  return (
    <Button className="w-full" disabled={disabled || loading} {...props}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  )
}


