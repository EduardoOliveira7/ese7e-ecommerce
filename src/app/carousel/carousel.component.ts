import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { interval, Subscription } from 'rxjs'; 

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements OnInit, OnDestroy {
  images: string[] = [
    '/assets/Imagens/Produtos/teclado.jpg', 
    '/assets/Imagens/Produtos/processador-core-i7.jpg',
    '/assets/Imagens/Produtos/placa-de-video.jpg'
    
  ];

  currentIndex: number = 0; 
  private autoPlaySubscription: Subscription | undefined; 

  constructor() { }

  ngOnInit(): void {
    this.startAutoPlay();   }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  
  nextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.resetAutoPlay(); 
  }

 
  prevImage(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.resetAutoPlay(); 
  }

  
  goToImage(index: number): void {
    this.currentIndex = index;
    this.resetAutoPlay(); 
  }

  
  private startAutoPlay(): void {
    this.autoPlaySubscription = interval(5000).subscribe(() => { 
      this.nextImage();
    });
  }

  private stopAutoPlay(): void {
    if (this.autoPlaySubscription) {
      this.autoPlaySubscription.unsubscribe();
    }
  }

  
  private resetAutoPlay(): void {
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}