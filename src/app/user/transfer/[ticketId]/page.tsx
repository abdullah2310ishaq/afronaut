"use client"

import { useParams, redirect } from "next/navigation"

export default function TransferRedirectPage() {
  const params = useParams<{ ticketId: string }>()
  redirect(`/tickets/${params.ticketId}/transfer`)
}


