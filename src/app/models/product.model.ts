export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  specifications?: string[];
  type?: string;
  brand?: string;
}

export interface CartItem extends Product {
  quantity: number;
}