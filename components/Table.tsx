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
    <div className="overflow-x-auto rounded-b border border-[#2E2E2E]">
      <table className="min-w-full text-sm text-left text-[#667085]">
        <thead className="bg-[#0B1D26] text-xs uppercase font-semibold">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-3 text-[#667085] normal-case"
              >
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

      <div className="flex justify-end gap-6 p-6">
        <button
          onClick={() => onFetchPage(currentCursor, "prev")}
          disabled={cursorStack.length <= 1}
          className="text-sm"
        >
          ← Previous
        </button>

        <button
          onClick={() => onFetchPage(currentCursor, "next")}
          disabled={!hasNext}
          className="text-sm"
        >
          Next →
        </button>
      </div>
    </div>
  )
}

export default Table
