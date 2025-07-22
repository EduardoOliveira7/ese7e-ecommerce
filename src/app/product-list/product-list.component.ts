import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { CartService } from '../cart.service'; 

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [
    {
      id: 1,
      name: 'Processador Intel Core i7',
      description: 'Processador de alta performance para jogos e edição.',
      price: 1899.99,
      imageUrl: 'assets/Imagens/Produtos/processador-core-i7.jpg' 
    },
    {
      id: 2,
      name: 'Placa de Vídeo NVIDIA RTX 4070',
      description: 'Placa gráfica potente para experiências de jogo imersivas.',
      price: 3500.00,
      imageUrl: 'assets/Imagens/Produtos/placa-de-video.jpg'
    },
    {
      id: 3,
      name: 'Memória RAM DDR4 16GB (2x8GB)',
      description: 'Conjunto de memória de alta velocidade para multitarefas.',
      price: 450.50,
      imageUrl: 'assets/Imagens/Produtos/memoria-ram.jpg'
    },
    {
      id: 4,
      name: 'SSD NVMe 1TB Kingston',
      description: 'Armazenamento ultra-rápido para seu sistema e jogos.',
      price: 600.00,
      imageUrl: 'assets/Imagens/Produtos/ssd.jpg'
    }
  ];

  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    
  }

  viewProductDetail(id: number): void {
    this.router.navigate(['/produtos', id]);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    alert(`${product.name} adicionado ao carrinho!`);
  }
}