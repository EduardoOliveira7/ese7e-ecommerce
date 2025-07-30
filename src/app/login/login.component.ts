// src/app/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Importe estes
import { Router, RouterLink } from '@angular/router'; // Importe RouterLink para o link de cadastro

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink], // Adicione ReactiveFormsModule e RouterLink
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss' // ou .scss
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; // ! indica que será inicializado no ngOnInit

  constructor(private fb: FormBuilder, private router: Router) { } // Injete FormBuilder e Router

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Dados de login:', this.loginForm.value);
      // Simulação de login:
      const { email, password } = this.loginForm.value;

      // Exemplo de usuário "mock" para teste:
      if (email === 'teste@email.com' && password === '123456') {
        alert('Login realizado com sucesso! Bem-vindo(a)!');
        // Redirecionar para a página inicial ou um painel do usuário
        this.router.navigate(['/']);
      } else {
        alert('E-mail ou senha incorretos. Tente novamente.');
      }
    } else {
      alert('Por favor, preencha o e-mail e a senha.');
      // Marcar todos os campos como "touched" para exibir mensagens de erro
      this.loginForm.markAllAsTouched();
    }
  }
}