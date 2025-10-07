"use client"

import Link from "next/link"
import { useState } from "react"
import { SidebarLayout } from "@/components/common/sidebar-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { mockEvents, type Event } from "@/lib/mock-data"

type TicketRow = { id: string; name: string; price: string; qty: string; salesStart: string; salesEnd: string }

export default function AgencyEventsPage() {
  const [events, setEvents] = useState<Event[]>(mockEvents)

  // Create Event form state
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [venue, setVenue] = useState("")
  const [location, setLocation] = useState("")
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState("")
  const [publish, setPublish] = useState(false)
  const [tickets, setTickets] = useState<TicketRow[]>([
    { id: "t-1", name: "General", price: "0", qty: "0", salesStart: "", salesEnd: "" },
  ])
  const [message, setMessage] = useState("")

  function addTicketRow() {
    setTickets(prev => [...prev, { id: `t-${prev.length+1}`, name: "", price: "", qty: "", salesStart: "", salesEnd: "" }])
  }
  function removeTicketRow(id: string) { setTickets(prev => prev.filter(t => t.id !== id)) }
  function updateTicket(id: string, field: keyof TicketRow, value: string) {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, [field]: value } as TicketRow : t))
  }
  function onImportCsv(file: File) {
    const reader = new FileReader()
    reader.onload = () => {
      const text = String(reader.result || "")
      const rows = text.split(/\r?\n/).filter(Boolean)
      const parsed = rows.slice(1).map((r, i) => {
        const [name, price, qty, salesStart, salesEnd] = r.split(",")
        return { id: `t-${tickets.length + i + 1}`, name: name || "", price: price || "", qty: qty || "", salesStart: salesStart || "", salesEnd: salesEnd || "" }
      })
      if (parsed.length) setTickets(prev => [...prev, ...parsed])
    }
    reader.readAsText(file)
  }

  function handleCreate() {
    setMessage("")
    if (!title || !start || !end) { setMessage("Please fill required fields: Title, Start, End"); return }
    const nowId = `evt-local-${Date.now()}`
    const cat = tickets.filter(t => t.name && Number(t.price) >= 0 && Number(t.qty) >= 0).map((t, idx) => ({
      id: `cat-local-${idx+1}`,
      name: t.name,
      price: Number(t.price) || 0,
      currency: "USD",
      totalTickets: Number(t.qty) || 0,
      soldTickets: 0,
      availableTickets: Number(t.qty) || 0,
      description: "",
      benefits: [],
    }))
    const newEvent: Event = {
      id: nowId,
      title,
      description,
      image: image || "/placeholder.jpg",
      venue,
      location,
      startDate: new Date(start).toISOString(),
      endDate: new Date(end).toISOString(),
      status: publish ? "active" as const : "draft" as const,
      agencyId: "agency-001",
      agencyName: "Event Masters",
      artist: "",
      genre: category || "",
      categories: cat,
      tags: [],
      ageRestriction: null,
      totalRevenue: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setEvents(prev => [newEvent, ...prev])
    setTitle(""); setDescription(""); setVenue(""); setLocation(""); setStart(""); setEnd(""); setCategory(""); setImage(""); setPublish(false); setTickets([{ id: "t-1", name: "General", price: "0", qty: "0", salesStart: "", salesEnd: "" }])
    setMessage("Event saved" + (publish ? " and published." : " as draft."))
  }

  function duplicateEvent(id: string) {
    const ev = events.find(e => e.id === id)
    if (!ev) return
    const copy: Event = { ...ev, id: `evt-copy-${Date.now()}`, title: ev.title + " (Copy)", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), status: "draft" }
    setEvents(prev => [copy, ...prev])
  }

  const now = Date.now()
  function statusChip(ev: Event) {
    const startTs = new Date(ev.startDate).getTime()
    const endTs = new Date(ev.endDate).getTime()
    let phase: "upcoming" | "ongoing" | "ended" | "active" = "active"
    if (startTs > now) phase = "upcoming"
    else if (startTs <= now && endTs >= now) phase = "ongoing"
    else if (endTs < now) phase = "ended"
    const cls = phase === "upcoming" ? "border-blue-500/30 bg-blue-500/10 text-blue-400" : phase === "ongoing" ? "border-green-500/30 bg-green-500/10 text-green-400" : phase === "ended" ? "border-zinc-500/30 bg-zinc-500/10 text-zinc-300" : "border-white/20 bg-white/5 text-zinc-300"
    return <span className={`inline-flex items-center rounded-md border px-2 py-1 text-xs capitalize ${cls}`}>{phase}</span>
  }

  return (
    <SidebarLayout role="agency" title="My Events">
      <div className="space-y-6">
        <Card className="border-white/10 bg-zinc-900/60 p-6">
          <h2 className="text-white font-semibold mb-4">Create Event</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm text-zinc-400">Event Name</label>
              <Input value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. Summer Festival" />
            </div>
            <div>
              <label className="text-sm text-zinc-400">Category</label>
              <Input value={category} onChange={e=>setCategory(e.target.value)} placeholder="Music, Sports..." />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm text-zinc-400">Description</label>
              <Textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Event description" />
            </div>
            <div>
              <label className="text-sm text-zinc-400">Venue</label>
              <Input value={venue} onChange={e=>setVenue(e.target.value)} placeholder="Venue" />
            </div>
            <div>
              <label className="text-sm text-zinc-400">Location</label>
              <Input value={location} onChange={e=>setLocation(e.target.value)} placeholder="City, Country" />
            </div>
            <div>
              <label className="text-sm text-zinc-400">Start Date</label>
              <Input type="datetime-local" value={start} onChange={e=>setStart(e.target.value)} />
            </div>
            <div>
              <label className="text-sm text-zinc-400">End Date</label>
              <Input type="datetime-local" value={end} onChange={e=>setEnd(e.target.value)} />
            </div>
            <div>
              <label className="text-sm text-zinc-400">Banner Image URL</label>
              <Input value={image} onChange={e=>setImage(e.target.value)} placeholder="/image.png or https://..." />
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={publish} onCheckedChange={setPublish} id="publish" />
              <label htmlFor="publish" className="text-sm text-zinc-300">Publish immediately</label>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white font-semibold">Ticket Categories</h3>
              <div className="flex items-center gap-2">
                <input type="file" accept=".csv" onChange={e=>{ const f=e.target.files?.[0]; if (f) onImportCsv(f) }} className="text-sm" />
                <Button size="sm" variant="outline" className="border-white/20" onClick={addTicketRow}>Add Ticket</Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-black/40 text-zinc-400">
                  <tr>
                    <th className="px-3 py-2 text-left">Name</th>
                    <th className="px-3 py-2 text-left">Price</th>
                    <th className="px-3 py-2 text-left">Quantity</th>
                    <th className="px-3 py-2 text-left">Sales Start</th>
                    <th className="px-3 py-2 text-left">Sales End</th>
                    <th className="px-3 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map(t => (
                    <tr key={t.id} className="border-t border-white/5">
                      <td className="px-3 py-2"><Input value={t.name} onChange={e=>updateTicket(t.id,'name',e.target.value)} placeholder="VIP / General" /></td>
                      <td className="px-3 py-2"><Input type="number" value={t.price} onChange={e=>updateTicket(t.id,'price',e.target.value)} placeholder="0" /></td>
                      <td className="px-3 py-2"><Input type="number" value={t.qty} onChange={e=>updateTicket(t.id,'qty',e.target.value)} placeholder="0" /></td>
                      <td className="px-3 py-2"><Input type="datetime-local" value={t.salesStart} onChange={e=>updateTicket(t.id,'salesStart',e.target.value)} /></td>
                      <td className="px-3 py-2"><Input type="datetime-local" value={t.salesEnd} onChange={e=>updateTicket(t.id,'salesEnd',e.target.value)} /></td>
                      <td className="px-3 py-2 text-right"><Button size="sm" variant="outline" className="border-white/20" onClick={()=>removeTicketRow(t.id)}>Remove</Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {message && <p className="mt-3 text-sm text-green-400">{message}</p>}

          <div className="mt-4 flex gap-3">
            <Button onClick={handleCreate}>Save Event</Button>
            <Button variant="outline" className="border-white/20" onClick={()=>{ setPublish(false); handleCreate() }}>Save as Draft</Button>
          </div>
          <p className="mt-2 text-xs text-zinc-500">Approval: {publish ? "Pending" : "Draft"}</p>
        </Card>

        <Card className="border-white/10 bg-zinc-900/60 p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-black/40 text-zinc-400">
              <tr>
                <th className="px-4 py-3 text-left">Event</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Date Range</th>
                <th className="px-4 py-3 text-left">Sold</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {events.map(e => (
                <tr key={e.id} className="border-t border-white/5">
                  <td className="px-4 py-3 text-white">{e.title}</td>
                  <td className="px-4 py-3">{statusChip(e)}</td>
                  <td className="px-4 py-3 text-zinc-400">{new Date(e.startDate).toLocaleDateString()} – {new Date(e.endDate).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-zinc-400">{e.categories.reduce((a,c)=>a+c.soldTickets,0)}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button asChild size="sm" variant="outline" className="border-white/20">
                        <Link href={`/agency/events/${e.id}`}>Manage</Link>
                      </Button>
                      <Button size="sm" variant="outline" className="border-white/20" onClick={()=>duplicateEvent(e.id)}>Duplicate</Button>
                      <Button size="sm" variant="destructive">Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </SidebarLayout>
  )
}


