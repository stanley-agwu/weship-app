export type Delivery = {
  user_id?: string,
  customerName: string,
  warehouseAddress: string,
  deliveryDate: string,
  deliveryAddress: string,
}

export type UIUser = {
  _id: string,
  username: string,
  email: string,
  createdAt: string,
  updatedAt: string,
  token: string,
}

export type User = UIUser & {
  password: string,
}

export interface IUserPayload {
  _id: string;
}
