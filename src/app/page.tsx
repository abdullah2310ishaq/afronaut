"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/common/header"
import { EventCard } from "@/components/events/event-card"
import { GlobalSearch } from "@/components/ui/global-search"
import { mockEvents } from "@/lib/mock-data"
import { Calendar, Shield, Zap, ArrowRight, Sparkles } from "lucide-react"

export default function HomePage() {
  const featuredEvents = mockEvents.filter((e) => e.status === "active").slice(0, 3)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.05),transparent_50%)]" />

        <div className="container relative px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-4xl space-y-8 text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4" />
              <span>Discover amazing events happening near you</span>
            </motion.div>

            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Your Gateway to{" "}
              <span className="bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
                Unforgettable
              </span>{" "}
              Experiences
            </h1>

            <p className="text-balance text-xl text-zinc-400 md:text-2xl">
              Book tickets for concerts, conferences, festivals, and more. Secure, fast, and hassle-free.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mx-auto flex max-w-2xl flex-col gap-3"
            >
              <GlobalSearch 
                placeholder="Search events, artists, venues..."
                onSearch={(query) => {
                  // Redirect to events page with search query
                  window.location.href = `/events?search=${encodeURIComponent(query)}`
                }}
                className="w-full"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-3 text-sm text-zinc-500"
            >
              <span>Popular:</span>
              {["Music", "Tech", "Food & Drink", "Sports"].map((category, i) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/10 bg-zinc-900/50 hover:border-primary/50 hover:bg-primary/10"
                    asChild
                  >
                    <Link href={`/events?category=${category.toLowerCase()}`}>{category}</Link>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-white/10 py-20">
        <div className="container px-4">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Zap,
                title: "Instant Booking",
                description: "Book your tickets in seconds with our streamlined checkout process",
                delay: 0,
              },
              {
                icon: Shield,
                title: "Secure Payments",
                description: "Your transactions are protected with bank-level security",
                delay: 0.1,
              },
              {
                icon: Calendar,
                title: "Easy Management",
                description: "Access all your tickets in one place with QR codes",
                delay: 0.2,
              },
            ].map((feature) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: feature.delay, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 to-black p-8 text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative space-y-4">
                  <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 transition-transform duration-300 group-hover:scale-110">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-20">
        <div className="container space-y-12 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between"
          >
            <div>
              <h2 className="text-4xl font-bold text-white">Featured Events</h2>
              <p className="mt-3 text-lg text-zinc-400">Don't miss out on these popular events</p>
            </div>
            <Button variant="ghost" asChild className="group gap-2 text-primary hover:text-primary">
              <Link href="/events">
                View All
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.15),transparent_70%)]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container relative px-4"
        >
          <div className="mx-auto max-w-3xl space-y-8 text-center">
            <h2 className="text-balance text-4xl font-bold md:text-5xl">Ready to Experience Something Amazing?</h2>
            <p className="text-balance text-lg text-zinc-400 md:text-xl">
              Join thousands of event-goers and start booking your next adventure today
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild className="h-14 px-8 text-base">
                <Link href="/events">Browse Events</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-14 border-white/20 bg-zinc-900/50 px-8 text-base backdrop-blur-sm hover:bg-zinc-800"
              >
                <Link href="/register">Create Account</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-border py-8">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2025 Afronaut Ticketing. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
