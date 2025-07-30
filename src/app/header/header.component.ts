// src/app/header/header.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../cart.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // <<=== ADICIONE ESTA LINHA PARA O OPERATOR MAP
import { CommonModule } from '@angular/common'; // <<=== ADICIONE ESTA LINHA PARA CommonModule (async pipe, @if)

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule], // <<=== Adicione CommonModule aqui
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss' 
})
export class HeaderComponent implements OnInit {
  cartItemCount$: Observable<number>; // Não precisa de '!', será inicializada no construtor

  constructor(private cartService: CartService) {
    // Inicialize no construtor para resolver TS2564
    this.cartItemCount$ = this.cartService.getCartItems().pipe(
      map(items => items.reduce((total, item) => total + item.quantity, 0))
    );
  }

  ngOnInit(): void {
    // A lógica de assinatura já está no construtor, então ngOnInit pode ficar vazio ou para outra inicialização
  }
}