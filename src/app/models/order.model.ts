// src/app/models/order.model.ts
import { Product } from './product.model'; // Importe Product para reutilizar tipos

// Interface para um item dentro do pedido
export interface OrderItem {
  productId: number;
  name: string;
  imageUrl: string; // Para exibir no histórico, se necessário
  price: number;
  quantity: number;
}

// Interface para um pedido completo
export interface Order {
  id?: string; // Opcional, o Firestore vai gerar o ID do documento
  userId: string; // ID do usuário que fez a compra (se você tiver um sistema de usuário/Auth)
  customerEmail: string; // E-mail do cliente (mais fácil para identificar sem Auth)
  items: OrderItem[]; // Lista de itens comprados
  total: number; // Valor total do pedido
  orderDate: Date; // Data e hora da compra
  status: 'pending' | 'completed' | 'cancelled'; // Status do pedido
  // Outras informações que possam ser relevantes:
  // paymentMethod: string;
  // shippingAddress: any;
}