import React from 'react'
import Badge from '@/components/common/Badge'
import { currencyINR } from '@/utils/formatters'

function InfoRow({ label, value }) {
  return (
    <p className="text-sm">
      <span className="font-medium text-gray-700">{label}:</span>{' '}
      <span className="text-gray-800">{value || '—'}</span>
    </p>
  )
}

export default function EmployeeDetailCard({ employee }) {
  if (!employee) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900">
          {employee.firstName} {employee.lastName}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Detailed employee information
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Column 1 */}
        <div className="space-y-2">
          <InfoRow label="Position" value={employee.position} />
          <InfoRow label="Department" value={employee.department} />
          <InfoRow label="Manager" value={employee.manager} />
          <InfoRow label="Location" value={employee.location} />
          <InfoRow label="Hire Date" value={employee.hireDate} />
        </div>

        {/* Column 2 */}
        <div className="space-y-2">
          <InfoRow label="Salary" value={currencyINR(employee.salary)} />
          <InfoRow label="Performance Rating" value={employee.performanceRating} />
          <InfoRow label="Projects Completed" value={employee.projectsCompleted} />
          <InfoRow label="Active" value={employee.isActive ? 'Yes' : 'No'} />
        </div>
      </div>

      {/* Skills */}
      <div>
        <h4 className="text-md font-semibold text-gray-800">Skills</h4>
        <div className="flex flex-wrap gap-2 mt-2">
          {employee.skills?.length ? (
            employee.skills.map((s, i) => <Badge key={i}>{s}</Badge>)
          ) : (
            <span className="text-sm text-gray-500">No skills listed</span>
          )}
        </div>
      </div>
    </div>
  )
}
