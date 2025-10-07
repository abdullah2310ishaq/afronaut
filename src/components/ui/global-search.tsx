"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockEvents } from "@/lib/mock-data"
import { Search, Clock, TrendingUp, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchResult {
  id: string
  title: string
  type: "event" | "venue" | "location" | "category"
  category?: string
  location?: string
  date?: string
}

interface GlobalSearchProps {
  onSearch?: (query: string) => void
  placeholder?: string
  className?: string
  showRecentSearches?: boolean
}

export function GlobalSearch({ 
  onSearch, 
  placeholder = "Search events, venues, locations...",
  className,
  showRecentSearches = true
}: GlobalSearchProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [popularSearches] = useState([
    "Music concerts",
    "Tech conferences", 
    "Food festivals",
    "Art exhibitions",
    "Workshops"
  ])
  
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load recent searches from localStorage
  useEffect(() => {
    if (showRecentSearches && typeof window !== "undefined") {
      const saved = localStorage.getItem("recentSearches")
      if (saved) {
        setRecentSearches(JSON.parse(saved))
      }
    }
  }, [showRecentSearches])

  // Generate search results
  useEffect(() => {
    if (query.length > 0) {
      const searchResults: SearchResult[] = []
      
      // Search events
      mockEvents.forEach(event => {
        if (event.title.toLowerCase().includes(query.toLowerCase()) ||
            event.description.toLowerCase().includes(query.toLowerCase())) {
          searchResults.push({
            id: event.id,
            title: event.title,
            type: "event",
            location: event.location,
            date: event.startDate
          })
        }
      })

      // Search venues
      const venues = new Set(mockEvents.map(e => e.venue))
      venues.forEach(venue => {
        if (venue.toLowerCase().includes(query.toLowerCase())) {
          searchResults.push({
            id: `venue-${venue}`,
            title: venue,
            type: "venue"
          })
        }
      })

      // Search locations
      const locations = new Set(mockEvents.map(e => e.location))
      locations.forEach(location => {
        if (location.toLowerCase().includes(query.toLowerCase())) {
          searchResults.push({
            id: `location-${location}`,
            title: location,
            type: "location"
          })
        }
      })

      setResults(searchResults.slice(0, 8))
    } else {
      setResults([])
    }
  }, [query])

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return

    // Add to recent searches
    if (showRecentSearches) {
      const newRecent = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5)
      setRecentSearches(newRecent)
      localStorage.setItem("recentSearches", JSON.stringify(newRecent))
    }

    setQuery(searchQuery)
    setIsOpen(false)
    onSearch?.(searchQuery)
  }

  const clearSearch = () => {
    setQuery("")
    setResults([])
    inputRef.current?.focus()
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem("recentSearches")
  }

  const getResultIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "event":
        return "🎟️"
      case "venue": 
        return "🏢"
      case "location":
        return "📍"
      case "category":
        return "🏷️"
      default:
        return "🔍"
    }
  }

  return (
    <div ref={searchRef} className={cn("relative w-full max-w-2xl", className)}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="h-12 pl-12 pr-12 text-base"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-full bg-background border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-hidden"
          >
            {query ? (
              <div className="p-2">
                {results.length > 0 ? (
                  <>
                    <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Search Results
                    </div>
                    {results.map((result) => (
                      <motion.button
                        key={result.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => handleSearch(result.title)}
                        className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-accent rounded-md transition-colors"
                      >
                        <span className="text-lg">{getResultIcon(result.type)}</span>
                        <div className="flex-1">
                          <div className="font-medium">{result.title}</div>
                          {result.location && (
                            <div className="text-xs text-muted-foreground">{result.location}</div>
                          )}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {result.type}
                        </Badge>
                      </motion.button>
                    ))}
                  </>
                ) : (
                  <div className="px-3 py-8 text-center text-muted-foreground">
                    No results found for &quot;{query}&quot;
                  </div>
                )}
              </div>
            ) : (
              <div className="p-2">
                {showRecentSearches && recentSearches.length > 0 && (
                  <>
                    <div className="flex items-center justify-between px-3 py-2">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Recent Searches
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearRecentSearches}
                        className="text-xs"
                      >
                        Clear
                      </Button>
                    </div>
                    {recentSearches.map((search, index) => (
                      <motion.button
                        key={search}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSearch(search)}
                        className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-accent rounded-md transition-colors"
                      >
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{search}</span>
                      </motion.button>
                    ))}
                  </>
                )}

                <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Popular Searches
                </div>
                {popularSearches.map((search, index) => (
                  <motion.button
                    key={search}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSearch(search)}
                    className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-accent rounded-md transition-colors"
                  >
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span>{search}</span>
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}