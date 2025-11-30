import { useState, useEffect, useMemo } from 'react'
import employeesData from '@/data/employees.json'

export default function useEmployees() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      // Static import (future fetch-ready structure)
      const list = employeesData?.employees || []
      setEmployees(list)
    } catch (err) {
      console.error('Failed to load employees:', err)
      setError('Unable to load employee data')
    } finally {
      setLoading(false)
    }
  }, [])

  // Memoized for performance
  const total = useMemo(() => employees.length, [employees])

  return {
    employees,
    loading,
    error,
    total
  }
}
