// src/app/register/register.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Importe estes
import { Router } from '@angular/router'; // Para navegação pós-cadastro

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Adicione ReactiveFormsModule aqui
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup; // ! indica que será inicializado no ngOnInit

  constructor(private fb: FormBuilder, private router: Router) { } // Injete FormBuilder e Router

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      // Campo para consentimento da LGPD
      lgpdConsent: [false, Validators.requiredTrue] // Deve ser true para ser válido
    }, { validator: this.passwordMatchValidator }); // Adiciona um validador para senhas
  }

  // Validador customizado para verificar se as senhas coincidem
  passwordMatchValidator(form: FormGroup): { [s: string]: boolean } | null {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Dados do cadastro:', this.registerForm.value);
      // Aqui simularia o envio dos dados para um backend
      // E, importante, você já garantiu o consentimento da LGPD

      alert('Cadastro realizado com sucesso! Você será redirecionado para finalizar seu pedido.');
      this.router.navigate(['/finalizar-pedido']); // Redireciona para a página de checkout
    } else {
      alert('Por favor, preencha todos os campos corretamente e aceite os termos da LGPD.');
      // Marcar todos os campos como "touched" para exibir mensagens de erro
      this.registerForm.markAllAsTouched();
    }
  }
}