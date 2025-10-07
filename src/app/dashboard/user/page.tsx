"use client"

import { redirect } from "next/navigation"

export default function UserDashboardLegacyRedirect() {
  redirect("/user/dashboard")
}
