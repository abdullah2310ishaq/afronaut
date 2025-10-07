"use client"

import { useMemo, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/common/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getEventById } from "@/lib/mock-data"

export default function CheckoutPage() {
  const params = useSearchParams()
  const router = useRouter()
  const eventId = params.get("eventId") || ""
  const items = params.get("items") || ""
  const event = useMemo(() => getEventById(eventId), [eventId])
  const parsed = useMemo(() => items.split(",").filter(Boolean).map(pair => {
    const [catId, qtyStr] = pair.split(":")
    const qty = parseInt(qtyStr || "0", 10) || 0
    const cat = event?.categories.find(c => c.id === catId)
    return { id: catId, name: cat?.name || catId, price: cat?.price || 0, qty }
  }), [items, event])

  const total = parsed.reduce((s, i) => s + i.price * i.qty, 0)
  const [processing, setProcessing] = useState(false)

  function handlePay() {
    setProcessing(true)
    setTimeout(() => {
      router.push(`/order-success?orderId=demo-${Date.now()}`)
    }, 1200)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container px-4 py-10 space-y-6 max-w-3xl">
        <h1 className="text-3xl font-bold text-white">Checkout</h1>
        <Card className="border-white/10 bg-zinc-900/60 p-6 space-y-4">
          <div className="text-zinc-400 text-sm">Event: <span className="text-white font-medium">{event?.title}</span></div>
          <table className="w-full text-sm">
            <thead className="bg-black/40 text-zinc-400">
              <tr>
                <th className="text-left px-3 py-2">Item</th>
                <th className="text-right px-3 py-2">Qty</th>
                <th className="text-right px-3 py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {parsed.map(i => (
                <tr key={i.id} className="border-t border-white/5">
                  <td className="px-3 py-2 text-white">{i.name}</td>
                  <td className="px-3 py-2 text-right text-zinc-400">{i.qty}</td>
                  <td className="px-3 py-2 text-right text-zinc-400">${(i.price * i.qty).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between pt-4 border-t border-white/10 text-white">
            <span>Total</span>
            <span className="font-bold">${total.toFixed(2)}</span>
          </div>
          <div className="pt-2">
            <Button className="w-full" size="lg" onClick={handlePay} disabled={processing || total === 0}>
              {processing ? "Processing..." : "Pay Now"}
            </Button>
          </div>
        </Card>
      </main>
    </div>
  )
}


