export type Delivery = {
  user?: string,
  customerName: string,
  wareHouseaddress: string,
  deliveryDate: string,
  deliveryAddress: string,
  longitude: number,
  latitude: number,
}

export type User = {
  username: string,
  email: string,
  password: string,
}