"use client"

import { ReactNode, useState } from "react"

import { Member } from "@/types/member"

import { FilterContext } from "./FilterContext"

type FilterProviderProps = {
  children: ReactNode
}

const FilterProvider = ({ children }: FilterProviderProps) => {
  const [filteredData, setFilteredData] = useState<Member[]>([])
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const value = {
    filteredData,
    selectedIds,
    setFilteredData,
    setSelectedIds,
  }

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  )
}

export default FilterProvider
