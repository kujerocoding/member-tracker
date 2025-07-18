"use client"

type Status = "ACTIVE" | "BLACKLISTED" | "DISABLED" | "SUSPENDED"

type Props = {
  value: Status
}

const COLOR_MAPPING: Record<
  Status,
  { border: string; text: string; dot: string }
> = {
  ACTIVE: {
    border: "#085D3A",
    text: "#75E0A7",
    dot: "#12B76A",
  },
  BLACKLISTED: {
    border: "#912018",
    text: "#FDA29B",
    dot: "#F63D68",
  },
  DISABLED: {
    border: "#800C05",
    text: "#C01048",
    dot: "#F63D68",
  },
  SUSPENDED: {
    border: "#800C05",
    text: "#C01048",
    dot: "#F63D68",
  },
}

export default function StatusFormatter({ value }: Props) {
  const formattedValue =
    value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()

  return (
    <div
      className="inline-flex items-center gap-2 font-sm border rounded-full px-3 py-1 text-sm"
      style={{
        borderColor: COLOR_MAPPING[value]?.border,
        color: COLOR_MAPPING[value]?.text,
      }}
    >
      <span
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: COLOR_MAPPING[value]?.dot }}
      ></span>
      {formattedValue}
    </div>
  )
}
