// src/app/privacy-policy/privacy-policy.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importe o Router

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss' 
})
export class PrivacyPolicyComponent {
  constructor(private router: Router) {} // Injete o Router

  goBack(): void {
    this.router.navigate(['/cadastro']); // Volta para a página de cadastro
  }
}