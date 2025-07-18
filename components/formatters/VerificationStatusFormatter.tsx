"use client"

type VerificationStatus = "VERIFIED" | "UNVERIFIED" | "PENDING"

type Props = {
  value: VerificationStatus
}

const COLOR_MAPPING: Record<
  VerificationStatus,
  { border: string; text: string; dot: string }
> = {
  VERIFIED: {
    border: "#008005",
    text: "#027A48",
    dot: "#12B76A",
  },
  UNVERIFIED: {
    border: "#800C05",
    text: "#C01048",
    dot: "#F63D68",
  },
  PENDING: {
    border: "#800C05",
    text: "#C01048",
    dot: "#F63D68",
  },
}

export default function VerificationStatusFormatter({ value }: Props) {
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
