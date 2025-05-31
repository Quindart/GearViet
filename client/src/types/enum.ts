export enum NavbarDropDownType {
  NOTHING = '',
  PROFILE = 'profile',
  NOTIFICATION = 'notification',
  MESSAGE = 'message',
}

export enum Role {
  OWNER = 'owner',
  ADMIN = 'admin',
  MOD = 'mod',
  USER = 'user',
  WAREHOUSE = 'warehouse',
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
  ASSIGNED = 'assigned',
  PICKING = 'picking',
  SHIPPING = 'shipping',
  RETURNING = 'returing',
  RETURNED = 'returned',
  FINISHED = 'finished',
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
