const NameFormatter = ({ value }: { value: string }) => {
  const formattedValue =
    value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()

  return <div className="font-medium text-[#FBBD2C]">{formattedValue}</div>
}

export default NameFormatter
