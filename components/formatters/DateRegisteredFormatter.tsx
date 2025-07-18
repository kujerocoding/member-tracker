const DateRegisteredFormatter = ({ value }: { value: string }) => {
  const date = new Date(value)
  const year = date.getFullYear()
  const monthShort = date.toLocaleString("en-US", { month: "short" })
  const day = String(date.getDate()).padStart(2, "0")
  return `${year} ${monthShort} ${day}`
}

export default DateRegisteredFormatter
