"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/common/header"
import { EventCard } from "@/components/events/event-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { mockEvents } from "@/lib/mock-data"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [locationFilter, setLocationFilter] = useState<string>("all")
  const [priceFilter, setPriceFilter] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)

  const activeEvents = mockEvents.filter((e) => e.status === "active")

  const locations = useMemo(() => {
    const locs = new Set(activeEvents.map((e) => e.location))
    return Array.from(locs)
  }, [activeEvents])

  const filteredAndSortedEvents = useMemo(() => {
    const filtered = activeEvents.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesLocation = locationFilter === "all" || event.location === locationFilter

      const minPrice = Math.min(...event.categories.map((c) => c.price))
      const matchesPrice =
        priceFilter === "all" ||
        (priceFilter === "free" && minPrice === 0) ||
        (priceFilter === "under50" && minPrice < 50) ||
        (priceFilter === "under100" && minPrice < 100) ||
        (priceFilter === "over100" && minPrice >= 100)

      return matchesSearch && matchesLocation && matchesPrice
    })

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      } else if (sortBy === "price") {
        const aMin = Math.min(...a.categories.map((c) => c.price))
        const bMin = Math.min(...b.categories.map((c) => c.price))
        return aMin - bMin
      } else if (sortBy === "popularity") {
        const aSold = a.categories.reduce((sum, cat) => sum + cat.soldTickets, 0)
        const bSold = b.categories.reduce((sum, cat) => sum + cat.soldTickets, 0)
        return bSold - aSold
      }
      return 0
    })

    return filtered
  }, [activeEvents, searchQuery, sortBy, locationFilter, priceFilter])

  const activeFiltersCount = [locationFilter !== "all", priceFilter !== "all"].filter(Boolean).length

  const clearFilters = () => {
    setLocationFilter("all")
    setPriceFilter("all")
    setSearchQuery("")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="container px-4 py-8 space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <h1 className="text-4xl font-bold">Discover Events</h1>
          <p className="text-muted-foreground">Find your next amazing experience</p>
        </motion.div>

        {/* Search and Sort */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events, artists, venues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="price">Price: Low to High</SelectItem>
              <SelectItem value="popularity">Most Popular</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            className="gap-2 bg-transparent relative"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="rounded-lg border border-border bg-card p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Filters</h3>
                  {activeFiltersCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Clear all
                    </Button>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <Select value={locationFilter} onValueChange={setLocationFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        {locations.map((loc) => (
                          <SelectItem key={loc} value={loc}>
                            {loc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Price Range</label>
                    <Select value={priceFilter} onValueChange={setPriceFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Prices</SelectItem>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="under50">Under $50</SelectItem>
                        <SelectItem value="under100">Under $100</SelectItem>
                        <SelectItem value="over100">$100+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              {filteredAndSortedEvents.length} event{filteredAndSortedEvents.length !== 1 ? "s" : ""} found
            </p>
            {activeFiltersCount > 0 && (
              <div className="flex gap-2">
                {locationFilter !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    {locationFilter}
                    <button onClick={() => setLocationFilter("all")}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {priceFilter !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    {priceFilter === "free"
                      ? "Free"
                      : priceFilter === "under50"
                        ? "< $50"
                        : priceFilter === "under100"
                          ? "< $100"
                          : "$100+"}
                    <button onClick={() => setPriceFilter("all")}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
              </div>
            )}
          </div>

          {filteredAndSortedEvents.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <p className="text-muted-foreground mb-4">No events found matching your criteria</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
