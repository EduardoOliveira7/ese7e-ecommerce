import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
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
      
      lgpdConsent: [false, Validators.requiredTrue] 
    }, { validator: this.passwordMatchValidator }); 
  }

  
  passwordMatchValidator(form: FormGroup): { [s: string]: boolean } | null {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Dados do cadastro:', this.registerForm.value);
      

      alert('Cadastro realizado com sucesso! Você será redirecionado para finalizar seu pedido.');
      this.router.navigate(['/finalizar-pedido']); 
    } else {
      alert('Por favor, preencha todos os campos corretamente e aceite os termos da LGPD.');
      
      this.registerForm.markAllAsTouched();
    }
  }
}