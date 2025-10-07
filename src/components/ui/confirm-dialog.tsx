"use client"

import { ReactNode } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function ConfirmDialog({
  open,
  onOpenChange,
  title = "Are you sure?",
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  loading = false,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  title?: string
  description?: ReactNode
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  loading?: boolean
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {description ? <div className="text-sm text-zinc-400">{description}</div> : null}
        <DialogFooter>
          <Button variant="outline" className="border-white/20" onClick={()=>onOpenChange(false)} disabled={loading}>{cancelText}</Button>
          <Button onClick={onConfirm} disabled={loading}>{loading ? "Processing..." : confirmText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


