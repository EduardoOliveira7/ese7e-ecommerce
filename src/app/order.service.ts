// src/app/order.service.ts
import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, addDoc } from '@angular/fire/firestore'; // Importe addDoc
import { Order } from './models/order.model'; // Importe a interface Order

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private firestore: Firestore) { } // Injete o Firestore

  async saveOrder(orderData: Omit<Order, 'id'>): Promise<string> { // Omit<Order, 'id'> porque o Firestore gera o ID
    try {
      const ordersCollection = collection(this.firestore, 'orders'); // Referência à coleção 'orders'

      // addDoc adiciona um novo documento com um ID gerado automaticamente
      const docRef = await addDoc(ordersCollection, orderData);

      console.log('Pedido salvo com sucesso no Firestore com ID:', docRef.id);
      return docRef.id; // Retorna o ID do pedido gerado
    } catch (error) {
      console.error('Erro ao salvar pedido no Firestore:', error);
      throw new Error('Não foi possível salvar o pedido. Tente novamente.');
    }
  }

  // Você pode adicionar métodos para buscar pedidos de um usuário, etc. aqui.
}