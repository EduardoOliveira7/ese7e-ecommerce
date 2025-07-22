// src/app/cart/cart.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, NgIf, NgFor, CurrencyPipe } from '@angular/common'; // Importe NgIf, NgFor, CurrencyPipe
import { Router } from '@angular/router'; // Importe o Router
import { CartService } from '../cart.service';
import { CartItem } from '../models/product.model'; // Importe CartItem
import { Observable, Subscription } from 'rxjs'; // Importe Observable e Subscription

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CurrencyPipe], // Adicione NgIf, NgFor e CurrencyPipe
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems$: Observable<CartItem[]>; // Usaremos um Observable para o carrinho
  cartTotal$: Observable<number>;      // Observable para o total do carrinho
  private cartSubscription: Subscription | undefined; // Para gerenciar a inscrição

  constructor(private cartService: CartService, public router: Router) {
    this.cartItems$ = this.cartService.getCartItems(); // Pega o Observable dos itens
    this.cartTotal$ = this.cartService.getCartTotal(); // Pega o Observable do total
  }

  ngOnInit(): void {
    
  }

  // Métodos para gerenciar o carrinho
  updateQuantity(item: CartItem, event: Event): void {
    const target = event.target as HTMLInputElement;
    const newQuantity = Number(target.value);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      this.cartService.updateQuantity(item.id, newQuantity);
    }
  }

  removeItem(productId: number): void {
    this.cartService.removeItem(productId);
  }

  clearCart(): void {
    if (confirm('Tem certeza que deseja limpar o carrinho?')) {
      this.cartService.clearCart();
    }
  }

  checkout(): void {
    // Navegar para a página de cadastro/checkout
    this.router.navigate(['/cadastro']); // Ou '/finalizar-pedido' se você tiver uma página de login
  }

  ngOnDestroy(): void {
    // Garante que a inscrição seja desfeita para evitar memory leaks
    this.cartSubscription?.unsubscribe();
  }
}