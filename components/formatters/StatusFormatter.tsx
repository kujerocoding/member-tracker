"use client"

import Image from "next/image"

type Status = "ACTIVE" | "BLACKLISTED" | "DISABLED" | "SUSPENDED"

type Props = {
  value: Status
}

const COLOR_MAPPING: Record<
  Status,
  { border: string; text: string; icon: string; bgcolor: string }
> = {
  ACTIVE: {
    border: "#085D3A",
    text: "#75E0A7",
    icon: "check",
    bgcolor: "#053321",
  },
  BLACKLISTED: {
    border: "#912018",
    text: "#FDA29B",
    icon: "alert",
    bgcolor: "#55160C",
  },
  DISABLED: {
    border: "#800C05",
    text: "#C01048",
    icon: "alert",
    bgcolor: "#55160C",
  },
  SUSPENDED: {
    border: "#800C05",
    text: "#C01048",
    icon: "alert",
    bgcolor: "#55160C",
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
        backgroundColor: COLOR_MAPPING[value]?.bgcolor,
      }}
    >
      <Image
        src={`/${COLOR_MAPPING[value]?.icon}.svg`}
        alt={COLOR_MAPPING[value]?.icon}
        height={15}
        width={15}
      />

      {formattedValue}
    </div>
  )
}
