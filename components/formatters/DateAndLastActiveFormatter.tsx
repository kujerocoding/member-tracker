const DateAndLastActiveFormatter = ({ value }: { value: string }) => {
  const date = new Date(value)
  if (isNaN(date.getTime())) return <>Invalid Date</>

  const phTime = new Date(date.getTime() + 8 * 60 * 60 * 1000)

  const year = phTime.getFullYear()
  const month = phTime.toLocaleString("en-US", { month: "short" })
  const day = String(phTime.getDate()).padStart(2, "0")

  let hours = phTime.getHours()
  const minutes = String(phTime.getMinutes()).padStart(2, "0")
  const ampm = hours >= 12 ? "PM" : "AM"

  hours = hours % 12 || 12

  const formatted = `${year} ${month} ${day} ${hours}:${minutes} ${ampm}`

  return <span>{formatted}</span>
}

export default DateAndLastActiveFormatter
