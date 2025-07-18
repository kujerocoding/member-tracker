import FilterPage from "./Filter/FilterPage"
import MembersTable from "./MembersTable"
import FilterSearch from "./FilterSearch"
import FilterProvider from "./Filter/FilterProvider"

const FILTERS = [
  {
    attr: "name",
    filter: FilterSearch,
    queryName: "membersByName",
    placeholder: "Search Username",
  },
  {
    attr: "emailAddress",
    filter: FilterSearch,
    queryName: "membersByEmailAddress",
    placeholder: "Search Email Address",
  },
  {
    attr: "mobileNumber",
    filter: FilterSearch,
    queryName: "membersByMobileNumber",
    placeholder: "Search Mobile Number",
  },
  {
    attr: "domain",
    filter: FilterSearch,
    queryName: "membersByDomain",
    placeholder: "Search Domain",
  },
]

const MembersList = () => {
  return (
    <FilterProvider>
      <FilterPage
        title="Members"
        subTitle="View your members here"
        filters={FILTERS}
      >
        <MembersTable />
      </FilterPage>
    </FilterProvider>
  )
}

export default MembersList
