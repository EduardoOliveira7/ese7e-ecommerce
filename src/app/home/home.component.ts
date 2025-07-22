import { Component } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { RouterLink } from '@angular/router'; 
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss' 
})
export class HomeComponent {
 
}