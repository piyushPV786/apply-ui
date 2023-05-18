export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
}

export type RegisterParams = {
  email: string
  username: string
  password: string
}

export type UserDataType = {
  id: number
  role: string
  email: string
  fullName: string
  username: string
  password: string
  avatar?: string | null
}

export type AuthValuesType = {
  loading: boolean
  setLoading: (value: boolean) => void
  logout: () => void
  isInitialized: boolean
  user: UserDataType | null
  setUser: (value: UserDataType | null) => void
  setIsInitialized: (value: boolean) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void
}

export interface IAddNotes {
  projectId: number | undefined | string
  notes: string
  madeBy: string
}

export interface IPayment {
  applicationCode: string
  currencyCode: string
  discounAmount: string
  discountCode: string | null
  discountTypeCode: string | null
  documentCode: string
  enrolemntCode: string | null
  feeModeCode: string
  id: number
  isActive: boolean
  paymentDate: string
  paymentStatus: string
  paymentType: string | null
  referenceNumber: string
  studentCode: null
  totalAmount: string
  transactionId: string
  totalPaidAmount: string
}
export interface IAcademicApiType {
  id: number
  studentCode: string
  studentName: string
  contact: string
  programName: string
  studyType: string
  studentType: string
  status: string
}
