import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common'; 
import { Router } from '@angular/router';
import { CartService } from '../cart.service'; 
import { CartItem } from '../models/product.model'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, CurrencyPipe], 
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  cartItems$: Observable<CartItem[]>; 
  cartTotal$: Observable<number>;     
  constructor(private cartService: CartService, public router: Router) {
    this.cartItems$ = this.cartService.getCartItems();
    this.cartTotal$ = this.cartService.getCartTotal();
  }

  ngOnInit(): void {
   
    this.cartService.getCartItems().subscribe(items => {
      if (items.length === 0) {
        alert('Seu carrinho está vazio! Por favor, adicione produtos antes de finalizar o pedido.');
        this.router.navigate(['/produtos']);
      }
    });
  }

  confirmOrder(): void {
    
    alert('Seu pedido foi confirmado com sucesso! Obrigado pela compra.');
    this.cartService.clearCart(); 
    this.router.navigate(['/']); 
  }
}