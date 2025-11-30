import React, { useMemo, useRef, useState, useCallback } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

import { fullName, currencyINR } from '@/utils/formatters'
import GridToolbar from '@/components/grid/GridToolbar'
import Modal from '@/components/common/Modal'
import EmployeeDetailCard from '@/components/details/EmployeeDetailCard'
import useEmployees from '@/hooks/useEmployees'
import Badge from '@/components/common/Badge'

export default function EmployeeGrid() {
  const { employees } = useEmployees()
  const gridRef = useRef(null)

  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  // Unique departments for filter dropdown
  const departments = useMemo(
    () => [...new Set(employees.map(e => e.department))],
    [employees]
  )

  // AG Grid Column Definitions
  const columnDefs = useMemo(() => [
    {
      headerName: 'ID',
      field: 'id',
      width: 80,
      filter: 'agNumberColumnFilter'
    },
    {
      headerName: 'Name',
      valueGetter: params => fullName(params.data),
      sortable: true,
      filter: 'agTextColumnFilter',
      flex: 1
    },
    {
      headerName: 'Email',
      field: 'email',
      flex: 1
    },
    {
      headerName: 'Department',
      field: 'department',
      filter: 'agSetColumnFilter',
      width: 130
    },
    {
      headerName: 'Position',
      field: 'position',
      flex: 1
    },
    {
      headerName: 'Salary',
      field: 'salary',
      valueFormatter: params => currencyINR(params.value),
      width: 120
    },
    {
      headerName: 'Location',
      field: 'location',
      width: 140
    },
    {
      headerName: 'Hire Date',
      field: 'hireDate',
      filter: 'agDateColumnFilter',
      width: 130
    },
    {
      headerName: 'Rating',
      field: 'performanceRating',
      width: 100
    },

    // ⭐ FIXED SKILLS COLUMN (React JSX, NOT HTML STRING)
    {
      headerName: 'Skills',
      field: 'skills',
      flex: 1,
      cellRenderer: params => {
        const skills = params.data.skills || []
        return (
          <div className="flex gap-1 flex-wrap">
            {skills.map((skill, idx) => (
              <Badge key={idx} variant="neutral" size="sm">
                {skill}
              </Badge>
            ))}
          </div>
        )
      }
    }
  ], [])

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true
  }), [])

  // Row click → open modal
  const handleRowClick = useCallback(event => {
    setSelectedEmployee(event.data)
    setModalOpen(true)
  }, [])

  // Export CSV
  const handleExportCsv = useCallback(() => {
    gridRef.current?.api.exportDataAsCsv({
      fileName: 'employees.csv'
    })
  }, [])

  // Department Filter
  const handleDepartmentFilter = useCallback(value => {
    if (!gridRef.current) return

    if (!value) {
      gridRef.current.api.setFilterModel(null)
    } else {
      gridRef.current.api.setFilterModel({
        department: { values: [value] }
      })
    }
  }, [])

  // Search
  const handleSearch = useCallback(value => {
    setSearchValue(value)
    gridRef.current?.api.setQuickFilter(value)
  }, [])

  return (
    <section className="p-6 space-y-6">
      <GridToolbar
        onExportCsv={handleExportCsv}
        departments={departments}
        onDeptChange={handleDepartmentFilter}
        value={searchValue}
        onSearch={handleSearch}
      />

      {/* AG GRID TABLE */}
      <div className="ag-theme-alpine full-grid rounded shadow-soft">
        <AgGridReact
          ref={gridRef}
          rowData={employees}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination
          paginationPageSize={10}
          animateRows
          rowSelection="single"
          onRowClicked={handleRowClick}
          domLayout="autoHeight"
          autoSizeStrategy={{
            type: 'fitGridWidth'
          }}
        />
      </div>

      {/* DETAILS MODAL */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <EmployeeDetailCard employee={selectedEmployee} />
      </Modal>
    </section>
  )
}
