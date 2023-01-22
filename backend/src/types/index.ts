export type Delivery = {
  user_id?: string,
  customerName: string,
  deliveryDate: string,
  warehouseAddress: string,
  warehouseAddressLat: string,
  warehouseAddressLng: string,
  deliveryAddress: string,
  deliveryAddressLat: string,
  deliveryAddressLng: string,
}

export type UIUser = {
  _id: string,
  username: string,
  email: string,
  createdAt: string,
  updatedAt: string,
  token?: string,
}

export type User = UIUser & {
  password: string,
}

export interface IUserPayload {
  _id: string;
}
