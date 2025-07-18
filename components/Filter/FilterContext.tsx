"use client"

import { createContext, useContext } from "react"

import type { Member } from "@/types/member"

type FilterContextType = {
  filteredData: Member[]
  setFilteredData: React.Dispatch<React.SetStateAction<Member[]>>
  selectedIds: string[]
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>
}

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined
)

export const useFilterContext = (): FilterContextType => {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error("useFilterContext must be used within a FilterProvider")
  }
  return context
}
