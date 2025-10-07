"use client"

import { useState } from "react"
import { SidebarLayout } from "@/components/common/sidebar-layout"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function AdminFinancialPage() {
  const [flatFee, setFlatFee] = useState("2.50")
  const [percentFee, setPercentFee] = useState("3.5")
  const [pk, setPk] = useState("pk_test_123")
  const [sk, setSk] = useState("sk_test_***")
  const [saved, setSaved] = useState(false)

  return (
    <SidebarLayout role="admin" title="Financial Settings">
      <div className="space-y-6 max-w-3xl">
        <Card className="border-white/10 bg-zinc-900/60 p-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm text-zinc-400">Flat Fee ($)</label>
              <Input value={flatFee} onChange={e => setFlatFee(e.target.value)} />
            </div>
            <div>
              <label className="text-sm text-zinc-400">Percentage Fee (%)</label>
              <Input value={percentFee} onChange={e => setPercentFee(e.target.value)} />
            </div>
          </div>

          <div className="grid gap-4">
            <div>
              <label className="text-sm text-zinc-400">Stripe Publishable Key</label>
              <Input value={pk} onChange={e => setPk(e.target.value)} />
            </div>
            <div>
              <label className="text-sm text-zinc-400">Stripe Secret Key</label>
              <Input type="password" value={sk} onChange={e => setSk(e.target.value)} />
            </div>
          </div>

          <div>
            <Button onClick={() => setSaved(true)}>Save Settings</Button>
            {saved && <p className="mt-2 text-green-400 text-sm">Settings saved.</p>}
          </div>
        </Card>
      </div>
    </SidebarLayout>
  )
}


