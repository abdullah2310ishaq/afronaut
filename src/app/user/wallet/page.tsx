"use client"

import { useState } from "react"
import { SidebarLayout } from "@/components/common/sidebar-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function UserWalletPage() {
  const [balance, setBalance] = useState(125.50)
  const [amount, setAmount] = useState("")
  const [history] = useState([
    { id: "tx-001", date: "2025-09-10", type: "Topup", amount: 100, status: "Succeeded" },
    { id: "tx-002", date: "2025-09-20", type: "Purchase", amount: -49.99, status: "Succeeded" },
  ])

  return (
    <SidebarLayout role="user" title="Wallet">
      <div className="space-y-6">
        <Card className="border-white/10 bg-zinc-900/60 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400">Current Balance</p>
              <p className="text-3xl font-bold text-white">${balance.toFixed(2)}</p>
            </div>
            <div className="flex items-end gap-2">
              <div>
                <label className="text-xs text-zinc-400">Add Funds</label>
                <Input placeholder="Amount" value={amount} onChange={e=>setAmount(e.target.value)} />
              </div>
              <Button onClick={()=>{ const a = parseFloat(amount||"0"); if(!isNaN(a)) { setBalance(b=>b+a); setAmount("") } }}>Top Up</Button>
            </div>
          </div>
        </Card>

        <Card className="border-white/10 bg-zinc-900/60 p-6">
          <h2 className="text-white font-semibold mb-3">Transaction History</h2>
          <table className="w-full text-sm">
            <thead className="bg-black/40 text-zinc-400">
              <tr>
                <th className="px-3 py-2 text-left">Date</th>
                <th className="px-3 py-2 text-left">Type</th>
                <th className="px-3 py-2 text-left">Amount</th>
                <th className="px-3 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map(h => (
                <tr key={h.id} className="border-t border-white/5">
                  <td className="px-3 py-2 text-white">{h.date}</td>
                  <td className="px-3 py-2 text-zinc-400">{h.type}</td>
                  <td className="px-3 py-2 text-zinc-400">{h.amount > 0 ? `+$${h.amount.toFixed(2)}` : `-$${Math.abs(h.amount).toFixed(2)}`}</td>
                  <td className="px-3 py-2 text-zinc-400">{h.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </SidebarLayout>
  )
}


