export const UserRole = {
  CLIENT: 'CLIENT',
  ADMIN: 'ADMIN',
  CASHIER: 'CASHIER',
  MANAGER: 'MANAGER',
  KITCHEN: 'KITCHEN'
} as const

export type UserRole = typeof UserRole[keyof typeof UserRole]

export const OrderStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  PREPARING: 'PREPARING',
  READY: 'READY',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED'
} as const

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus]

export const PaymentMethod = {
  CASH: 'CASH',
  CREDIT_CARD: 'CREDIT_CARD',
  DEBIT_CARD: 'DEBIT_CARD',
  PIX: 'PIX',
  IFOOD: 'IFOOD'
} as const

export type PaymentMethod = typeof PaymentMethod[keyof typeof PaymentMethod]

export const DeliveryType = {
  PICKUP: 'PICKUP',
  DELIVERY: 'DELIVERY'
} as const

export type DeliveryType = typeof DeliveryType[keyof typeof DeliveryType]



