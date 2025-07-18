const MobileNumberFormatter = ({ value }: { value: string }) => {
  if (!value?.startsWith("+63")) return <>{value}</>

  const raw = value.slice(3)

  if (/^9\d{9}$/.test(raw)) {
    const match = raw.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      const [, part1, part2, part3] = match
      return (
        <>
          +63 ({part1}) {part2} {part3}
        </>
      )
    }
  }

  if (/^\d+$/.test(raw)) {
    const areaCode = raw.slice(0, raw.length - 5)
    const local = raw.slice(-5)
    return (
      <>
        +63 ({areaCode}) {local}
      </>
    )
  }

  return value
}

export default MobileNumberFormatter
