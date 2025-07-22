// src/app/checkout/checkout.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common'; // Inclua CurrencyPipe
import { Router } from '@angular/router';
import { CartService } from '../cart.service'; // Importe o serviço de carrinho
import { CartItem } from '../models/product.model'; // Importe CartItem
import { Observable } from 'rxjs';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, CurrencyPipe], // Adicione CurrencyPipe
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  cartItems$: Observable<CartItem[]>; // Observable para os itens do carrinho
  cartTotal$: Observable<number>;      // Observable para o total do carrinho

  constructor(private cartService: CartService, public router: Router) {
    this.cartItems$ = this.cartService.getCartItems();
    this.cartTotal$ = this.cartService.getCartTotal();
  }

  ngOnInit(): void {
    // Opcional: Verifique se o carrinho está vazio, se sim, redirecione
    this.cartService.getCartItems().subscribe(items => {
      if (items.length === 0) {
        alert('Seu carrinho está vazio! Por favor, adicione produtos antes de finalizar o pedido.');
        this.router.navigate(['/produtos']); // Redireciona para a lista de produtos
      }
    });
  }

  confirmOrder(): void {
    // Aqui você simularia o processamento do pedido (ex: envio para um backend)
    // Por enquanto, vamos simular sucesso e limpar o carrinho
    alert('Seu pedido foi confirmado com sucesso! Obrigado pela compra.');
    this.cartService.clearCart(); // Limpa o carrinho após a finalização
    this.router.navigate(['/']); // Redireciona para a página inicial
  }
}