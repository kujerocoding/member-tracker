"use client"

import { ReactNode, ComponentType } from "react"

import type { Member } from "@/types/member"

import { useFilterContext } from "./FilterContext"

type FilterComponentProps = {
  filteredData: Member[]
  setFilteredData: (data: Member[]) => void
  attr: string
  queryName: string
  placeholder: string
}

type FilterDefinition = {
  attr: string
  filter: ComponentType<FilterComponentProps>
  queryName: string
  placeholder: string
}

type FilterPageProps = {
  title: string
  subTitle?: string
  filters: FilterDefinition[]
  children?: ReactNode
}

const FilterPage = ({
  title,
  subTitle,
  filters,
  children,
}: FilterPageProps) => {
  const { filteredData, setFilteredData } = useFilterContext()

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-xs mb-6 text-[#A3A3A3]">{subTitle}</p>
      <div className="p-3 flex flex-row items-center gap-5 bg-[#0B1D26] rounded-t border border-[#2E2E2E]">
        <p className="text-lg pr-4 border-white border-r">Filters</p>
        {filters.map(({ attr, filter: Filter, queryName, placeholder }) => (
          <Filter
            key={attr}
            attr={attr}
            filteredData={filteredData}
            setFilteredData={setFilteredData}
            queryName={queryName}
            placeholder={placeholder}
          />
        ))}
      </div>
      {children}
    </main>
  )
}

export default FilterPage
