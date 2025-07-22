import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, NgIf, NgFor, CurrencyPipe } from '@angular/common'; 
import { Router } from '@angular/router'; 
import { CartService } from '../cart.service';
import { CartItem } from '../models/product.model'; 
import { Observable, Subscription } from 'rxjs'; 

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CurrencyPipe], 
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems$: Observable<CartItem[]>; 
  cartTotal$: Observable<number>;     
  private cartSubscription: Subscription | undefined; 

  constructor(private cartService: CartService, public router: Router) {
    this.cartItems$ = this.cartService.getCartItems(); 
    this.cartTotal$ = this.cartService.getCartTotal(); 
  }

  ngOnInit(): void {
    
  }

  
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
    
    this.router.navigate(['/cadastro']); 
  }

  ngOnDestroy(): void {
    
    this.cartSubscription?.unsubscribe();
  }
}