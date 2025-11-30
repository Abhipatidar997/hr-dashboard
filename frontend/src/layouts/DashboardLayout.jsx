import React from 'react'
import { Link } from 'react-router-dom'

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm">
        <div className="container flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-primary" />
            <Link to="/" className="text-lg font-semibold tracking-wide">
              FactWise
            </Link>
          </div>

          {/* Meta Info */}
          <span className="text-sm text-gray-600">
            Frontend Assessment
          </span>
        </div>
      </header>

      {/* Main UI */}
      <main className="container py-6 flex-1">
        {children}
      </main>
    </div>
  )
}
