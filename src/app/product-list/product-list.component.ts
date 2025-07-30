// src/app/product-list/product-list.component.ts
import { Component, OnInit } from '@angular/core'; // Certifique-se de que OnInit está aqui
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../models/product.model'; // Certifique-se de que Product está importado
import { CartService } from '../cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss' // ou .css
})
export class ProductListComponent implements OnInit { // Implementa OnInit corretamente
  // <<=== Propriedades da Classe ===>>
  allProducts: Product[] = [
    {
      id: 1,
      name: 'Processador Intel Core i7',
      description: 'Processador de alta performance para jogos e edição.',
      price: 2499.99,
      imageUrl: 'assets/Imagens/Produtos/processador-core-i7.jpg',
      type: 'processador',
      brand: 'Intel'
    },
    {
      id: 2,
      name: 'Placa de Vídeo NVIDIA RTX 4070',
      description: 'Placa gráfica potente para experiências de jogo imersivas.',
      price: 6127.00,
      imageUrl: 'assets/Imagens/Produtos/placa-de-video.jpg',
      type: 'placa-de-video',
      brand: 'NVIDIA'
    },
    {
      id: 3,
      name: 'Memória RAM Gamer DDR4 16GB (2x8GB)',
      description: 'MEMÓRIA DDR4 KINGSTON FURY BEAST RGB, 16GB (2X8GB), 3200MHZ, PRETO.',
      price: 413.25,
      imageUrl: '/assets/Imagens/Produtos/memoria-ram-gamer.jpg', 
      specifications: ['DDR4', '3200MHz', 'Dual Channel'],
      type: 'memoria',
      brand: 'Kingston'
    },
    {
      id: 4,
      name: 'SSD NVMe 1TB Kingston',
      description: 'Armazenamento ultra-rápido para seu sistema e jogos.',
      price: 597.00,
      imageUrl: 'assets/Imagens/Produtos/ssd.jpg',
      type: 'ssd',
      brand: 'Kingston'
    },
     {
      id: 5,
      name: 'Processador Intel Core i3',
      description: 'Processador de alta performance para jogos e edição.',
      price: 404.00,
      imageUrl: 'assets/Imagens/Produtos/Processador-Core-i3.jpg',
      type: 'processador',
      brand: 'Intel' 
    },
    {
      id: 6,
      name: 'Processador Intel Core i5',
      description: 'Processador de alta performance para jogos e edição.',
      price: 309.00,
      imageUrl: 'assets/Imagens/Produtos/Processador-Core-i5.jpg',
      type: 'processador',
      brand: 'Intel' 
    },
    {
      id: 7,
      name: 'Teclado Mecânico Gamer',
      description: 'Teclado mecanico 75% pcyes kirin black vulcan - switch red - led rainbow - ptkr75rd.',
      price: 209.90,
      imageUrl: '/assets/Imagens/Produtos/Teclado-gamer.jpg', 
      specifications: ['75% pcyes kirin black vulcan', 'switch red', 'led rainbow', 'ptkr75rd'],
      type: 'teclado',
      brand: 'Logitech'
    },
    {
      id: 8,
      name: 'Fone De Ouvido Headset Gamer Rgb Led',
      description: 'O fone ideal para quem busca estilo, conforto e som de alta qualidade!',
      price: 70.50,
      imageUrl: '/assets/Imagens/Produtos/fone-gamer.jpg', 
      specifications: ['Projetado para Gamers', 'Subwoofer estéreo envolvente de alta qualidade e com isolamento de ruído', 'Microfone omnidirecional com recurso de cancelamento de ruído','permite conversas em tempo real e sem atraso', 'LED brilhante RGB projetado no fone de ouvido destacando a atmosfera do jogo', 'Almofadas em couro super macias e confortáveis'],
      type: 'fone',
      brand: 'Kapbom'
    },

     {
      id: 9,
      name: 'Combo Gamer 4x1 Teclado Mouse Headset Mousepad Strong Tech',
      description: 'Com este kit de teclado e mouse da Strong Tech você poderá levar seus jogos para outro nível. Destinado a um público gamer, aumente seu desempenho em diferentes jogos. Com este combo, você poderá usar esses dispositivos intensamente e desfrutar de infinitas horas de diversão.!',
      price: 139.99,
      imageUrl: '/assets/Imagens/Produtos/kit-gamer.jpg', 
      specifications: ['Kit composto por teclado ABNT2 RGB e mouse Óptico 1600DPI', 'Inclui fones de ouvido e mouse pad', 'Adequados para windows', 'Teclado com switch gamer'],
      type: 'kit',
      brand: 'Strong Tech'
    },

    {
      id: 10,
      name: 'PC Gamer Neologic Ryzen 5 5600GT',
      description: '16GB RAM, Radeon Vega 7 Integrado, SSD 480GB M.2 500W, 3 Fans RGB!',
      price: 2399.99,
      imageUrl: '/assets/Imagens/Produtos/cpu-gamer.jpg', 
      specifications: ['Processador - Amd Ryzen 5 5600gt, 4.6ghz, 6 Nucleos, 12 Threads', 'Placa De Vídeo - (Radeon Vega 7)', 'Saída Hdmi', 'Placa Mãe - Am4 A520m Ddr4', 'Memória - 16gb Ddr4 (2x8gb)', 'SSD- 480gb M.2 Nvme', 'Gabinete - Full Glass White', 'Fonte - Neologic 500w 80 Plus Bronze, Bivolt 110v - 220v', 'Sistema Operacional - Windows 11 64 Bits - 30 Dias'],
      type: 'cpu',
      brand: 'Neologic'
    },

    {
      id: 11,
      name: 'Computador PC Gamer Completo TOB',
      description: '16GB RAM, Radeon Vega 7 Integrado, SSD 480GB M.2 500W, 3 Fans RGB!',
      price: 1879.78,
      imageUrl: '/assets/Imagens/Produtos/kit-pc.jpg', 
      specifications: ['Intel Core i5', 'SSD 480GB', 'Memoria RAM de 16GB', 'Teclado', 'Mouse', 'Mouse Pad', 'Headset Gamer', 'Monitor 19 polegadas', 'Windows 10 Pro Trial'],
      type: 'kit',
      brand: 'TOB Computers'
    },

    {
      id: 12,
      name: 'Monitor Gamer Curvo Samsung Odyssey Ark 2ª Geração 55"',
      description: 'Monitor Gamer Curvo Samsung Odyssey Ark 2ª Geração 55", com Mini-LED, UHD, 165 Hz, 1ms(GtG), Preto!',
      price: 18499.00,
      imageUrl: '/assets/Imagens/Produtos/monitor-gamer.jpg', 
      specifications: ['Múltiplas entradas em uma única tela', 'Flex Move Screen', 'Tela sem reflexos', 'Incríveis taxas de atualização em 4k','Gaming Hub - O seu videogame direto do seu monitor'],
      type: 'monitor',
      brand: 'Samsung'
    },

    {
      id: 13,
      name: 'Mouse Gamer GW-X7',
      description: 'Mouse Gamer de 7 botões sem fio com luz RGB recarregável de 3200 dpi!',
      price: 58.50,
      imageUrl: '/assets/Imagens/Produtos/mouse-gamer.jpg', 
      specifications: ['Orientação da mão - Destro', 'Sistemas operacionais compatíveis - Linus, Mac, Windows', 'Sem fio', 'Velocidade máxima - 3.200 ips','7 botões'],
      type: 'mouse',
      brand: 'iMice'
    }
  ];

  displayProducts: Product[] = []; // Lista de produtos a serem exibidos
  isMenuOpen: boolean = false; // Estado do menu lateral

    selectedType: string = 'all'; // Para controlar o filtro de tipo ativo
  selectedBrand: string = 'all'; // Para controlar o filtro de marca ativo
  minPrice: number | null = null;
  maxPrice: number | null = null;
  // <<=== Construtor da Classe ===>>
  constructor(private router: Router, private cartService: CartService) { }

  // <<=== Método OnInit (implementação da interface) ===>>
  ngOnInit(): void {
    // Ao iniciar, exiba todos os produtos
    this.displayProducts = [...this.allProducts]; // Copia todos os produtos para exibição
  }

  // <<=== Métodos da Classe ===>>
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  filterByType(type: string): void {
    this.isMenuOpen = false; // Fecha o menu após a seleção

    if (type === 'all') {
      this.displayProducts = [...this.allProducts]; // Exibe todos os produtos
    } else {
      this.displayProducts = this.allProducts.filter(product =>
        product.type === type // Filtra pela propriedade 'type'
      );
    }
  }

  viewProductDetail(id: number): void {
    this.router.navigate(['/produtos', id]);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    alert(`${product.name} adicionado ao carrinho!`);
  }
}