export enum PackageType {
  DOCUMENT = 'DOCUMENT',
  PARCEL = 'PARCEL',
  FRAGILE = 'FRAGILE',
  LIQUID = 'LIQUID',
}

export enum ServiceType {
  STANDARD = 'STANDARD',
  EXPRESS = 'EXPRESS',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
}

export enum PaymentMethod {
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
  PREPAID = 'PREPAID',
}

export enum ShipmentStatus {
  ORDERED = 'ORDERED', 
  PICKED_UP = 'PICKED_UP',
  IN_TRANSIT = 'IN_TRANSIT',
  SORTING = 'SORTING',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}