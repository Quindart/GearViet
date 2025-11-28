export enum NavbarDropDownType {
  NOTHING = '',
  PROFILE = 'profile',
  LANGUAGE = 'language',
}

export enum Role {
  OWNER = 'owner',
  ADMIN = 'admin',
  MOD = 'mod',
  USER = 'user',
  ALL = 'all',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ALL = 'all',
}

export enum KeywordSearchEnum {
  CODE = 'CODE',
  NAME = 'NAME',
  ALL = 'ALL',
  PHONE = 'PHONE',
  USERNAME = 'USERNAME',
  EMAIL = 'EMAIL',
}

export enum OrderStatusEnum {
  ALL = 'all',
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPING = 'shipping',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

export enum PaymentStatusEnum {
  ALL = 'all',
  ONLINE = 'online',
  OFFLINE = 'offline',
}

export enum PaymentTypeEnum {
  ALL = 'all',
  PAID = 'paid',
  UNPAID = 'unpaid',
}
