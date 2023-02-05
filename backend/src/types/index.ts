export type Delivery = {
  _id?: string;
  user_id?: string;
  customerName: string;
  deliveryDate: string;
  warehouseAddress: string;
  warehouseAddressLat: string;
  warehouseAddressLng: string;
  deliveryAddress: string;
  deliveryAddressLat: string;
  deliveryAddressLng: string;
  createdAt?: string;
  updatedAt?: string;
};

export type UIUser = {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  token?: string;
};

export type User = UIUser & {
  password: string;
};

export interface IUserPayload {
  _id: string;
}

export interface IRegisterData {
  username: string;
  email: string;
  password: string;
}

export interface ILoginData {
  username: string;
  email: string;
  password: string;
}
