'use client'

import { useState, createContext, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Maximize2, X } from 'lucide-react'
import type { ReactNode } from 'react'

const FullscreenContext = createContext<boolean>(false)

export const useFullscreen = () => useContext(FullscreenContext)

interface DashboardCardProps {
  title: string
  children: ReactNode
  colSpan?: number
  subtitle?: string
}

export default function DashboardCard({ title, children, colSpan = 1, subtitle }: DashboardCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      {/* Grid View */}
      <motion.div
        layoutId={`card-${title}`}
        className={`glass-panel rounded-2xl overflow-hidden ${
          colSpan === 2 ? 'lg:col-span-2' : colSpan === 3 ? 'lg:col-span-3' : colSpan === 4 ? 'lg:col-span-4' : ''
        }`}
        style={{ cursor: 'default' }}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              {subtitle && (
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{subtitle}</p>
              )}
              <h3 className="text-xl font-semibold text-foreground font-mono">{title}</h3>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(true)
              }}
              className="p-1.5 rounded border border-border hover:border-primary hover:bg-card/80 transition-colors"
              aria-label="Maximize"
            >
              <Maximize2 className="h-3.5 w-3.5 text-muted-foreground hover:text-primary" strokeWidth={1.5} />
            </button>
          </div>
          <FullscreenContext.Provider value={false}>
            <div>{children}</div>
          </FullscreenContext.Provider>
        </div>
      </motion.div>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50"
              onClick={() => setIsExpanded(false)}
            />

            {/* Expanded Card */}
            <motion.div
              layoutId={`card-${title}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              className="fixed inset-4 md:inset-8 lg:inset-16 z-50 glass-panel rounded-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div>
                  {subtitle && (
                    <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{subtitle}</p>
                  )}
                  <h2 className="text-2xl font-semibold text-foreground font-mono">{title}</h2>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-2 rounded border border-border hover:border-primary hover:bg-card/80 transition-colors"
                  aria-label="Minimize"
                >
                  <X className="h-4 w-4 text-muted-foreground hover:text-primary" strokeWidth={1.5} />
                </button>
              </div>
              <FullscreenContext.Provider value={true}>
                <div className="flex-1 overflow-auto p-6">{children}</div>
              </FullscreenContext.Provider>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

