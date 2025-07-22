// src/app/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Garanta que 'map' está importado!
import { Product, CartItem } from './models/product.model'; // Importe DO ARQUIVO product.model.ts



@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>(this.cartItems);

  constructor() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
      this.cartSubject.next(this.cartItems);
    }
  }

  addToCart(product: Product): void {
    const existingItem = this.cartItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    this.updateCart();
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  removeItem(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.updateCart();
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.cartItems.find(item => item.id === productId);
    if (item && quantity > 0) {
      item.quantity = quantity;
    } else if (item && quantity === 0) {
      this.removeItem(productId);
    }
    this.updateCart();
  }

  getCartTotal(): Observable<number> {
    return this.cartSubject.asObservable().pipe(
      map(items => items.reduce((total, item) => total + (item.price * item.quantity), 0))
    );
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCart();
  }

  private updateCart(): void {
    this.cartSubject.next(this.cartItems);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
}