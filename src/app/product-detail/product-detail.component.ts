import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ActivatedRoute, Router } from '@angular/router'; 
import { CartService } from '../cart.service'; 
import { Product } from '../models/product.model'; 

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss' 
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined; 

  private allProducts: Product[] = [
    {
      id: 1,
      name: 'Processador Intel Core i7',
      description: 'Processador de alta performance para jogos e edição. 8 Cores, 16 Threads, 3.8 GHz.',
      price: 1899.99,
      imageUrl: '/assets/Imagens/Produtos/processador-core-i7.jpg', 
      specifications: ['8 Cores', '16 Threads', '3.8 GHz Base', 'LGA1700']
    },
    {
      id: 2,
      name: 'Placa de Vídeo NVIDIA RTX 4070',
      description: 'Placa gráfica potente para experiências de jogo imersivas. 12GB GDDR6X, Ray Tracing.',
      price: 3500.00,
      imageUrl: '/assets/Imagens/Produtos/placa-de-video.jpg', 
      specifications: ['12GB GDDR6X', 'Ray Tracing', 'DLSS 3']
    },
    {
      id: 3,
      name: 'Memória RAM DDR4 16GB (2x8GB)',
      description: 'Conjunto de memória de alta velocidade para multitarefas. 3200MHz, CL16.',
      price: 450.50,
      imageUrl: '/assets/Imagens/Produtos/memoria-ram.jpg', 
      specifications: ['DDR4', '3200MHz', 'CL16', 'Dual Channel']
    },
    {
      id: 4,
      name: 'SSD NVMe 1TB Kingston',
      description: 'Armazenamento ultra-rápido para seu sistema e jogos. Leitura 3500MB/s.',
      price: 600.00,
      imageUrl: '/assets/Imagens/Produtos/ssd.jpg', 
      specifications: ['NVMe PCIe Gen3', '1TB', '3500MB/s Leitura', '2100MB/s Escrita']
    }
   
  ];


  constructor(private route: ActivatedRoute, private cartService: CartService, private router: Router) { }

  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = Number(params.get('id')); 
      this.product = this.allProducts.find(p => p.id === productId); 
      
      if (!this.product) {
        alert('Produto não encontrado!');
        this.router.navigate(['/produtos']);
      }
    });
  }

  
  goBack(): void {
    this.router.navigate(['/produtos']);

  }

  
  addToCart(product: Product): void {
    this.cartService.addToCart(product); 
    alert(`${product.name} adicionado ao carrinho!`); 
  }
}