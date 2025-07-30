// src/app/register/register.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss' // ou .scss
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      // <<=== NOVOS CAMPOS AQUI ===>>
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]], // Formato: XXX.XXX.XXX-XX
      phone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\)\s\d{4,5}-\d{4}$/)]], // Formato: (XX) XXXX-XXXX ou (XX) XXXXX-XXXX
      birthDate: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]], // Formato AAAA-MM-DD
      gender: ['', Validators.required], // Campo select
      address: this.fb.group({ // Agrupando campos de endereço
        street: ['', Validators.required],
        number: ['', Validators.required],
        complement: [''], // Opcional
        neighborhood: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]] // Formato: XXXXX-XXX
      }),
      // <<=== FIM NOVOS CAMPOS ===>>
      lgpdConsent: [false, Validators.requiredTrue]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup): { [s: string]: boolean } | null {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Dados completos do cadastro:', this.registerForm.value);
      alert('Cadastro realizado com sucesso! Você será redirecionado para finalizar seu pedido.');
      this.router.navigate(['/finalizar-pedido']);
    } else {
      alert('Por favor, preencha todos os campos corretamente e aceite os termos da LGPD.');
      this.registerForm.markAllAsTouched();
    }
  }
}