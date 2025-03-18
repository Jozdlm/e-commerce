export interface IShoppingCart {
  id?: string;
  items: ICartItem[];
  units_count: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface ICartItem {
  id: string;
  product_id: number,
  name: string,
  img_url: string,
  unit_price: number;
  quantity: number;
  ammount: number;
}

export interface IAddItemCart {
  product_id: number;
  name: string;
  img_url: string;
  unit_price: number;
}

export type ItemCartDto = Omit<ICartItem, 'id'>;
