"use client"

import { useState } from "react"
import { SidebarLayout } from "@/components/common/sidebar-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type Step = 1 | 2 | 3 | 4 | 5

export default function EventBuilderPage() {
  const [step, setStep] = useState<Step>(1)

  return (
    <SidebarLayout role="agency" title="Event Builder">
      <div className="space-y-6">

        <Card className="border-white/10 bg-zinc-900/60 p-6 space-y-6">
          <div className="flex gap-2">
            {[1,2,3,4,5].map(n => (
              <Button key={n} variant={step === n ? "default" : "outline"} className={step === n ? "" : "border-white/20"} onClick={() => setStep(n as Step)}>Step {n}</Button>
            ))}
          </div>

          {step === 1 && (
            <div className="grid gap-4">
              <Input placeholder="Title" />
              <Textarea placeholder="Description" />
              <Input placeholder="Category (e.g., Concert)" />
            </div>
          )}
          {step === 2 && (
            <div className="grid gap-4">
              <Input placeholder="Venue" />
              <Input placeholder="Address" />
              <Input placeholder="Start Date & Time" />
              <Input placeholder="End Date & Time" />
            </div>
          )}
          {step === 3 && (
            <div className="grid gap-4">
              <Input placeholder="Ticket Category Name" />
              <Input placeholder="Price" />
              <Input placeholder="Capacity" />
            </div>
          )}
          {step === 4 && (
            <div className="grid gap-4">
              <Input placeholder="Banner Image URL" />
            </div>
          )}
          {step === 5 && (
            <div className="space-y-4">
              <p className="text-zinc-400">Preview your event and choose an action.</p>
              <div className="flex gap-3">
                <Button>Publish</Button>
                <Button variant="outline" className="border-white/20">Save Draft</Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </SidebarLayout>
  )
}


