"use client"

import { useState } from "react"
import { SidebarLayout } from "@/components/common/sidebar-layout"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function UserSupportPage() {
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const tickets = [
    { id: "sup-001", date: "2025-09-01", status: "Resolved" },
    { id: "sup-002", date: "2025-10-03", status: "Open" },
  ]

  return (
    <SidebarLayout role="user" title="Support">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-white/10 bg-zinc-900/60 p-6 space-y-3">
          <h2 className="text-white font-semibold">Contact Support</h2>
          <div>
            <label className="text-sm text-zinc-400">Subject</label>
            <Input value={subject} onChange={e=>setSubject(e.target.value)} />
          </div>
          <div>
            <label className="text-sm text-zinc-400">Message</label>
            <Textarea value={message} onChange={e=>setMessage(e.target.value)} rows={6} />
          </div>
          <div>
            <label className="text-sm text-zinc-400">Attachment (optional)</label>
            <Input type="file" onChange={e=>setFile(e.target.files?.[0] || null)} />
          </div>
          <div>
            <Button onClick={()=> setSubmitted(true)} disabled={!subject || !message}>Submit Ticket</Button>
            {submitted && <p className="text-green-400 text-sm mt-2">Submitted (demo).</p>}
          </div>
        </Card>

        <Card className="border-white/10 bg-zinc-900/60 p-6">
          <h2 className="text-white font-semibold mb-3">Previous Requests</h2>
          <table className="w-full text-sm">
            <thead className="bg-black/40 text-zinc-400">
              <tr>
                <th className="px-3 py-2 text-left">Ticket ID</th>
                <th className="px-3 py-2 text-left">Date</th>
                <th className="px-3 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(t => (
                <tr key={t.id} className="border-t border-white/5">
                  <td className="px-3 py-2 text-white">{t.id}</td>
                  <td className="px-3 py-2 text-zinc-400">{t.date}</td>
                  <td className="px-3 py-2 text-zinc-400">{t.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </SidebarLayout>
  )
}


