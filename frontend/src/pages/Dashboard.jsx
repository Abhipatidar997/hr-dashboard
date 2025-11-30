import React from 'react'
import EmployeeGrid from '@/components/grid/EmployeeGrid'

export default function Dashboard() {
  return (
    <section className="space-y-6">
      {/* Page Heading */}
      <header>
        <h2 className="text-xl font-semibold text-gray-800">Employee Dashboard</h2>
        <p className="text-sm text-gray-500 mt-1">
          Overview of employee records with AG Grid
        </p>
      </header>

      {/* Employee Data Table */}
      <EmployeeGrid />
    </section>
  )
}
