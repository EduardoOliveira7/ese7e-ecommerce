// src/app/header/header.component.ts
import { Component } from '@angular/core'; // <<=== ADICIONE ESTA LINHA
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss' // Ou .css se você mudou
})
export class HeaderComponent {
  // ... (restante do seu código do componente) ...
}

