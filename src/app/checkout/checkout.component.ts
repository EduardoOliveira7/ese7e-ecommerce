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
  this.cartService.getCartTotal().subscribe(total => { // <<=== VERIFIQUE ESTA LÓGICA
    if (total === 0) {
      alert('Seu carrinho está vazio! Por favor, adicione produtos antes de finalizar o pedido.');
      this.router.navigate(['/produtos']); // Redireciona para a lista de produtos
    }
    });
  }

  confirmOrder(): void {
    console.log('Botão "Confirmar Pedido" clicado. Redirecionando para pagamento...'); // Log para debug
    this.router.navigate(['/pagamento']); 
  }
}