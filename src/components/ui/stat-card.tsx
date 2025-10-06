"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  delay?: number
}

export function StatCard({ title, value, icon: Icon, trend, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/90 via-zinc-800/50 to-zinc-900/90 p-6 backdrop-blur-sm hover:border-primary/30 transition-all duration-300"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated background orb */}
      <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-primary/20 blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />

      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.1 }}
            className="text-sm font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors"
          >
            {title}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.3 }}
            className="mt-3 text-3xl font-bold text-white group-hover:text-primary/90 transition-colors duration-300"
          >
            {value}
          </motion.p>
          {trend && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: delay + 0.4 }}
              className={`mt-3 flex items-center gap-1.5 text-sm font-medium ${
                trend.isPositive 
                  ? "text-emerald-400 group-hover:text-emerald-300" 
                  : "text-red-400 group-hover:text-red-300"
              } transition-colors`}
            >
              <span className="flex items-center">
                {trend.isPositive ? "↗" : "↘"}
              </span>
              <span>{Math.abs(trend.value)}%</span>
              <span className="text-zinc-500 text-xs">vs last month</span>
            </motion.div>
          )}
        </div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: delay + 0.2 }}
          className="flex-shrink-0 rounded-xl bg-primary/20 p-3 ring-1 ring-primary/30 group-hover:bg-primary/30 group-hover:ring-primary/50 transition-all duration-300"
        >
          <Icon className="h-6 w-6 text-primary group-hover:text-white transition-colors duration-300" />
        </motion.div>
      </div>

      {/* Bottom shine effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  )
}
