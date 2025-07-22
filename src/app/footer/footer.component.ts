// src/app/footer/footer.component.ts
import { Component } from '@angular/core'; // Importe Component
import { RouterLink } from '@angular/router'; // Importe RouterLink

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink], // Adicione RouterLink aqui
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss' // Ou .css se for o seu caso
})
export class FooterComponent {
  // Nenhum método complexo é necessário aqui por enquanto
}