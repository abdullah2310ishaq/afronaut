"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/common/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function OrderSuccessPage() {
  const params = useSearchParams()
  const orderId = params.get("orderId")
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container px-4 py-10 max-w-xl">
        <Card className="border-white/10 bg-zinc-900/60 p-8 text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">Payment Successful</h1>
          <p className="text-zinc-400">Thank you for your purchase! Your order ID is <span className="text-white font-mono">{orderId}</span>.</p>
          <div className="flex justify-center gap-3">
            <Button asChild>
              <Link href="/user/my-tickets">Go to My Tickets</Link>
            </Button>
            <Button asChild variant="outline" className="border-white/20">
              <Link href="/events">Continue Browsing</Link>
            </Button>
          </div>
        </Card>
      </main>
    </div>
  )
}


