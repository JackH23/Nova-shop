export type UserAddress = {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  address_line2: string | null;
  city: string;
  state_province: string | null;
  postal_code: string | null;
  country: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
};

export type AddressResponse = {
  message: string;
  addresses: UserAddress[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type CreateAddressData = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  address_line2?: string;
  city: string;
  state_province?: string;
  postal_code?: string;
  country: string;
  is_default?: boolean;
};

export type CreateAddressResponse = {
  message: string;
  address: UserAddress;
};

export type UpdateAddressData = {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  address_line2?: string | null;
  city?: string;
  state_province?: string | null;
  postal_code?: string | null;
  country?: string;
};

export type UpdateAddressResponse = {
  message: string;
  address: UserAddress;
};

export type RemoveAddressResponse = {
  message: string;
};

export type SetDefaultAddressResponse = {
  message: string;
  address: UserAddress;
};