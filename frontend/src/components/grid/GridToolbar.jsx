import React from 'react'
import clsx from 'clsx'

export default function GridToolbar({
  onExportCsv,
  departments = [],
  onDeptChange,
  value,
  onSearch
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      
      {/* Left Controls */}
      <div className="flex flex-wrap items-center gap-3">
        
        {/* Search */}
        <input
          type="text"
          placeholder="Search employees..."
          value={value}
          onChange={(e) => onSearch(e.target.value)}
          className={clsx(
            'border rounded-md px-3 py-2 w-60 text-sm',
            'focus:outline-none focus:ring-2 focus:ring-secondary/40'
          )}
          aria-label="Search employees"
        />

        {/* Department Filter */}
        <select
          onChange={(e) => onDeptChange(e.target.value)}
          className={clsx(
            'border rounded-md px-3 py-2 text-sm bg-white',
            'focus:outline-none focus:ring-2 focus:ring-secondary/40'
          )}
          aria-label="Filter by department"
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        {/* Export Button */}
        <button
          onClick={onExportCsv}
          className={clsx(
            'border rounded-md px-4 py-2 text-sm bg-white',
            'hover:bg-gray-100 transition',
            'focus:outline-none focus:ring-2 focus:ring-secondary/40'
          )}
        >
          Export CSV
        </button>
      </div>

      {/* Info */}
      <div className="text-sm text-gray-500">
        Client-side AG Grid — {departments.length} departments
      </div>
    </div>
  )
}
