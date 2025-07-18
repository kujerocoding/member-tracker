export type Member = {
  id: string
  name: string
  verificationStatus: "VERIFIED" | "UNVERIFIED" | "PENDING"
  emailAddress: string
  mobileNumber: string
  domain: string | null
  dateTimeCreated: string
  dateTimeLastActive: string
  status: "ACTIVE" | "INACTIVE"
  [key: string]: any
}
