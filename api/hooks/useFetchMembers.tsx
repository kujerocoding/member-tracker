export type Variables = {
  first?: number
  after?: string
  filter?: {
    status?: {
      equal?: string
    }
    [key: string]: any
  }
}

export default function useFetchMembers() {
  const useLoad = async (variables: Variables) => {
    const query = `
  query ($first: Int, $after: Cursor, $filter: MemberFilterInput) {
    members(first: $first, after: $after, filter: $filter) {
      edges {
        node {
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
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

    const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHQL_TOKEN!}`,
      },
      body: JSON.stringify({ query, variables }),
    })

    if (!res.ok) {
      console.error("Fetch failed with status:", res.status)
      throw new Error(`Failed to fetch members. Status: ${res.status}`)
    }

    const json = await res.json()

    if (json.errors) {
      console.error("GraphQL errors:", json.errors)
      throw new Error("GraphQL returned errors.")
    }

    return json?.data?.members
  }

  return { useLoad }
}
