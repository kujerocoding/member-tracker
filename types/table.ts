import type { Member } from "@/types/member"

export type Column = {
  key: string
  title: string
  attr: keyof Member
  formatter?: React.FC<{ value: any }>
}
