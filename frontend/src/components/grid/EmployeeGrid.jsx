import React, { useMemo, useRef, useState, useCallback } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

import { fullName, currencyINR, skillsToString } from '@/utils/formatters'
import GridToolbar from '@/components/grid/GridToolbar'
import Modal from '@/components/common/Modal'
import EmployeeDetailCard from '@/components/details/EmployeeDetailCard'
import useEmployees from '@/hooks/useEmployees'

export default function EmployeeGrid() {
  const { employees } = useEmployees()
  const gridRef = useRef(null)

  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const departments = useMemo(
    () => [...new Set(employees.map(e => e.department))],
    [employees]
  )


  const columnDefs = useMemo(() => [
    {
      headerName: 'ID',
      field: 'id',
      width: 90,
      filter: 'agNumberColumnFilter'
    },
    {
      headerName: 'Name',
      valueGetter: params => fullName(params.data),
      sortable: true,
      filter: 'agTextColumnFilter',
      resizable: true
    },
    {
      headerName: 'Email',
      field: 'email',
      flex: 1
    },
    {
      headerName: 'Department',
      field: 'department',
      filter: 'agSetColumnFilter'
    },
    {
      headerName: 'Position',
      field: 'position'
    },
    {
      headerName: 'Salary',
      field: 'salary',
      valueFormatter: params => currencyINR(params.value)
    },
    {
      headerName: 'Location',
      field: 'location'
    },
    {
      headerName: 'Hire Date',
      field: 'hireDate',
      filter: 'agDateColumnFilter'
    },
    {
      headerName: 'Rating',
      field: 'performanceRating'
    },
    {
      headerName: 'Skills',
      valueGetter: params => skillsToString(params.data.skills),
      cellRenderer: params => {
        const skills = params.value ? params.value.split(',') : []
        return skills
          .map(s => `<span class="badge">${s.trim()}</span>`)
          .join(' ')
      },
      flex: 1
    }
  ], [])

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true
    }),
    []
  )

  

  const handleRowClick = useCallback((event) => {
    setSelectedEmployee(event.data)
    setModalOpen(true)
  }, [])

  const handleExportCsv = useCallback(() => {
    gridRef.current?.api.exportDataAsCsv({
      fileName: 'employees.csv'
    })
  }, [])

  const handleDepartmentFilter = useCallback((value) => {
    if (!gridRef.current) return

    if (!value) {
      gridRef.current.api.setFilterModel(null)
    } else {
      gridRef.current.api.setFilterModel({
        department: { values: [value] }
      })
    }
  }, [])

  const handleSearch = useCallback((value) => {
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

      <div className="ag-theme-alpine full-grid rounded">
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
        />
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <EmployeeDetailCard employee={selectedEmployee} />
      </Modal>
    </section>
  )
}
