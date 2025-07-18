"use client"

import { useState, useEffect } from "react"

import Image from "next/image"

import { Member } from "@/types/member"

import { useFilterContext } from "./Filter/FilterContext"

type FilterSearchProps = {
  attr: string
  queryName: string
  placeholder: string
}

const FilterSearch = ({ attr, queryName, placeholder }: FilterSearchProps) => {
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [results, setResults] = useState<Member[]>([])
  const [loading, setLoading] = useState(false)
  const [showResults, setShowResults] = useState<boolean>(true)

  const { selectedIds, setFilteredData, setSelectedIds } = useFilterContext()

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [search])

  useEffect(() => {
    const fetchMembers = async (queryName: string) => {
      if (!debouncedSearch) {
        setResults([])
        return
      }

      setLoading(true)
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHQL_TOKEN!}`,
          },
          body: JSON.stringify({
            query: `
              query ($search: String!) {
                ${queryName}(search: $search, first: 20) {
                  id
                  ... on Member {
                    name
                    verificationStatus
                    emailAddress
                    mobileNumber
                    domain
                    dateTimeCreated
                    dateTimeLastActive
                    status
                  }
                }
              }
            `,
            variables: { search: debouncedSearch },
          }),
        })

        const { data } = await res.json()
        setResults(data?.[queryName] || [])
      } catch (err) {
        console.error("GraphQL error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchMembers(queryName)
  }, [queryName, debouncedSearch])

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      if (checked) {
        return prev.includes(id) ? prev : [...prev, id]
      }
      return prev.filter((item) => item !== id)
    })
  }

  useEffect(() => {
    if (results.length > 0) {
      setFilteredData((prev: Member[]) => {
        const existingIds = new Set(prev.map((item) => item.id))
        const newResults = results.filter((item) => !existingIds.has(item.id))
        return [...prev, ...newResults]
      })
    }
  }, [results, setFilteredData])

  return (
    <div className="max-w-md relative">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 w-full bg-[#0A1117] border-[#2E2E2E] rounded-xl text-sm"
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500"
          onClick={() => setShowResults((prev) => !prev)}
        >
          <Image src="/chevron.svg" alt="Search" width={20} height={20} />
        </button>
      </div>

      <p
        className={`absolute left-0 right-0 text-sm text-gray-500 transition-opacity duration-200 ${
          loading ? "opacity-100" : "opacity-0"
        }`}
      >
        Searching...
      </p>

      {results.length > 0 && showResults && (
        <div className="absolute left-0 right-0 bg-[#0A1117] border shadow-md z-10 rounded mt-1 max-h-60 overflow-auto">
          {results.map((member) => (
            <label
              key={member.id}
              className="flex items-center space-x-2 px-4 py-2 text-[#FBBD2C] hover:bg-gray-100"
            >
              <input
                type="checkbox"
                value={member.id}
                checked={selectedIds.includes(member.id)}
                onChange={(e) =>
                  handleCheckboxChange(member.id, e.target.checked)
                }
                className="accent-blue-600"
              />
              <span>{member[attr]}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

export default FilterSearch
