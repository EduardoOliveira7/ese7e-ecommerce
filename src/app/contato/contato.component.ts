// src/app/contato/contato.component.ts
import { Component } from '@angular/core'; // Importe Component
import { CommonModule } from '@angular/common'; // Importe CommonModule para directivas como NgIf/NgFor (mesmo se não usar, é boa prática para Standalone)
// Se você for usar RouterLink em algum ponto, importe-o também:
// import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [CommonModule], // Adicione CommonModule aqui
  // Se usar RouterLink, ficaria: imports: [CommonModule, RouterLink]
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.scss' // Ou .css
})
export class ContatoComponent {
  // Por enquanto, não há lógica específica para um formulário de contato aqui.
  // Apenas exibição de informações estáticas.
}