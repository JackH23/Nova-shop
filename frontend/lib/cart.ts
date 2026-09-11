export type CartProduct = {
  id: number;
  name: string;
  price: string;
  image: string;
  stock: number;
};

export type CartVariant = {
  id: number;
  color_name: string;
  color_hex: string;
  stock: number;
};

export type CartItem = {
  id: number;
  cart_id: number;
  product_id: number;
  variant_id: number | null;
  quantity: number;
  created_at: string;
  updated_at: string;
  product: CartProduct;
  variant: CartVariant | null;
};

export type AddedCartItem = {
  id: number;
  cart_id: number;
  product_id: number;
  variant_id: number | null;
  quantity: number;
  created_at: string;
  updated_at: string;
};

export type AddToCartData = {
  product_id: number;
  variant_id?: number;
  quantity: number;
};

export type AddToCartResponse = {
  message: string;
  cartItem: AddedCartItem;
};

// GET /cart
export type Cart = {
  id: number;
  user_id: number;
  items: CartItem[];
  totalQuantity: number;
};

export type CartPagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type CartResponse = {
  message: string;
  cart: Cart;
  pagination: CartPagination;
};