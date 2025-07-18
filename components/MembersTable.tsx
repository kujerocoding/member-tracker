"use client"

import { useState, useEffect, useMemo } from "react"

import type { Member } from "@/types/member"
import type { Column } from "@/types/table"

import useMembers from "../api/useMembers"
import NameFormatter from "./formatters/NameFormatter"
import VerificationStatusFormatter from "./formatters/VerificationStatusFormatter"
import MobileNumberFormatter from "./formatters/MobileNumberFormatter"
import DateRegisteredFormatter from "./formatters/DateRegisteredFormatter"
import DateAndLastActiveFormatter from "./formatters/DateAndLastActiveFormatter"
import Table from "./Table"
import { useFilterContext } from "./Filter/FilterContext"
import StatusFormatter from "./formatters/StatusFormatter"

const MemberModel = {
  ID: "id",
  NAME: "name",
  VERIFICATION_STATUS: "verificationStatus",
  EMAIL: "emailAddress",
  MOBILE: "mobileNumber",
  DOMAIN: "domain",
  DATE_CREATED: "dateTimeCreated",
  LAST_ACTIVE: "dateTimeLastActive",
  STATUS: "status",
} as const

const COLUMNS: Column[] = [
  {
    key: "name",
    title: "Name",
    attr: MemberModel.NAME,
    formatter: NameFormatter,
  },
  {
    key: "verificationStatus",
    title: "Verification Status",
    attr: MemberModel.VERIFICATION_STATUS,
    formatter: VerificationStatusFormatter,
  },
  { key: "email", title: "Email", attr: MemberModel.EMAIL },
  {
    key: "mobile",
    title: "Mobile Number",
    attr: MemberModel.MOBILE,
    formatter: MobileNumberFormatter,
  },
  { key: "domain", title: "Domain", attr: MemberModel.DOMAIN },
  {
    key: "dateRegistered",
    title: "Date Registered",
    attr: MemberModel.DATE_CREATED,
    formatter: DateRegisteredFormatter,
  },
  {
    key: "dateTimeLastActive",
    title: "Date and Time Last Active",
    attr: MemberModel.LAST_ACTIVE,
    formatter: DateAndLastActiveFormatter,
  },
  {
    key: "status",
    title: "Status",
    attr: MemberModel.STATUS,
    formatter: StatusFormatter,
  },
]

const MembersTable = () => {
  const { filteredData, selectedIds } = useFilterContext()

  const selectedItems = useMemo(() => {
    return filteredData.filter((item) => selectedIds.includes(item.id))
  }, [filteredData, selectedIds])

  const [data, setData] = useState<Member[]>([])
  const [cursorStack, setCursorStack] = useState<(string | null)[]>([])
  const [currentCursor, setCurrentCursor] = useState<string | null>(null)
  const [hasNext, setHasNext] = useState(false)
  const [hasPrev, setHasPrev] = useState(false)

  const { useLoad } = useMembers()

  const fetchPage = async (
    cursor: string | null = null,
    direction = "next"
  ) => {
    let variables: {
      first?: number
      after?: string
      last?: number
      before?: string
    } = {}
    let updatedCursorStack = [...cursorStack]
    let requestCursor = cursor

    if (direction === "next") {
      variables = {
        first: 10,
        after: cursor ?? undefined,
      }
    } else if (direction === "prev") {
      updatedCursorStack.pop()
      requestCursor = updatedCursorStack[updatedCursorStack.length - 1] || null

      variables = {
        last: 10,
        before: cursor ?? undefined,
      }
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const result = await useLoad(variables)
    const nodes: Member[] = result?.edges?.map((e: any) => e.node)

    setData(nodes)
    setHasNext(result?.pageInfo?.hasNextPage || false)
    setHasPrev(result?.pageInfo?.hasPreviousPage || false)

    if (direction === "next") {
      setCursorStack([...cursorStack, result?.pageInfo?.endCursor])
      setCurrentCursor(result?.pageInfo?.endCursor)
    } else if (direction === "prev") {
      setCursorStack(updatedCursorStack)
      setCurrentCursor(requestCursor)
    }
  }

  useEffect(() => {
    if (Object.keys(selectedItems).length === 0) {
      fetchPage()
    }
    setData(selectedItems)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItems])

  return (
    <Table
      columns={COLUMNS}
      data={data}
      onFetchPage={fetchPage}
      hasPrev={hasPrev}
      hasNext={hasNext}
      currentCursor={currentCursor}
      cursorStack={cursorStack}
    />
  )
}

export default MembersTable
