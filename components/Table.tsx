"use client"

import type { Column } from "@/types/table"

type Props = {
  columns: Column[]
  data: Record<string, any>[]
  onFetchPage: (cursor: string | null, direction: "next" | "prev") => void
  currentCursor: string | null
  hasPrev: boolean
  hasNext: boolean
  cursorStack: (string | null)[]
}

const Table = ({
  columns = [],
  data = [],
  onFetchPage,
  currentCursor,
  hasPrev,
  hasNext,
  cursorStack,
}: Props) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full text-sm text-left text-[#667085]">
        <thead className="bg-[#0B1D26] text-xs uppercase font-semibold">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-6 py-3 text-[#667085]">
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="bg-[#0A1117] border-b-1 border-[#2E2E2E]"
            >
              {columns.map((col) => {
                const attrKey = col.attr
                const value = row[attrKey]
                const Formatter = col.formatter

                return (
                  <td key={col.key} className="px-6 py-4">
                    {Formatter ? <Formatter value={value} /> : value}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={() => onFetchPage(currentCursor, "prev")}
          disabled={cursorStack.length <= 1}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-colors
               border border-gray-300 text-gray-700 bg-white 
               hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>

        <button
          onClick={() => onFetchPage(currentCursor, "next")}
          disabled={!hasNext}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-colors
               border border-blue-500 text-white bg-blue-500 
               hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>
    </div>
  )
}

export default Table
