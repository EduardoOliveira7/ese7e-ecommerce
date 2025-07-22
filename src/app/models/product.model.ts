// src/app/models/product.model.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  specifications?: string[]; // Propriedade opcional
}

export interface CartItem extends Product {
  quantity: number;
}