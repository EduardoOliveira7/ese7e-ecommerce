// src/app/payment/payment.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common'; // Importe CurrencyPipe
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../cart.service'; // Para pegar o total do carrinho
import { OrderService } from '../order.service'; // <<=== IMPORTE O OrderService
import { Observable } from 'rxjs';
import { CartItem } from '../models/product.model'; // <<=== IMPORTE CartItem
import { Order, OrderItem } from '../models/order.model'; // <<=== IMPORTE Order e OrderItem

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CurrencyPipe],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss' // ou .scss
})
export class PaymentComponent implements OnInit {
  paymentMethod: string = 'credit-card'; // Método de pagamento padrão
  creditCardForm!: FormGroup;
  pixForm!: FormGroup;
  cartTotal$: Observable<number>; // Total do carrinho
  private cartItems: CartItem[] = []; // Para ter acesso aos itens do carrinho no TS

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cartService: CartService,
    private orderService: OrderService // <<=== INJETE O OrderService AQUI
  ) {
    this.cartTotal$ = this.cartService.getCartTotal(); // Pega o total do carrinho
    // Se inscreva para ter acesso aos itens do carrinho no TS
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  ngOnInit(): void {
    this.creditCardForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      cardHolderName: ['', Validators.required],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]], // MM/AA
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]]
    });

    this.pixForm = this.fb.group({}); // Pix sem campos

    // Opcional: Redirecionar se o carrinho estiver vazio
    this.cartService.getCartTotal().subscribe(total => {
      if (total === 0) {
        alert('Seu carrinho está vazio! Por favor, adicione produtos antes de pagar.');
        this.router.navigate(['/produtos']);
      }
    });
  }

  selectPaymentMethod(method: string): void {
    this.paymentMethod = method;
    // Resetar e limpar validações dos outros formulários ao mudar de método
    this.creditCardForm.reset();
    this.pixForm.reset(); // Pode ser removido se pixForm for sempre vazio
  }

  async processPayment(): Promise<void> { // <<=== MÉTODO AGORA É ASSÍNCRONO
    let paymentData: any;
    let isValid: boolean = false;

    if (this.paymentMethod === 'credit-card') {
      isValid = this.creditCardForm.valid;
      paymentData = this.creditCardForm.value;
    } else if (this.paymentMethod === 'pix') {
      isValid = true; // Sempre válido, já que não há campos para preencher
      paymentData = { method: 'pix', qrCodeScanned: true };
    } else if (this.paymentMethod === 'boleto') {
      isValid = true;
      paymentData = { method: 'boleto' };
    }

    if (isValid) {
      // Construir o objeto Order antes de salvar
      const orderItems: OrderItem[] = this.cartItems.map(item => ({
        productId: item.id,
        name: item.name,
        imageUrl: item.imageUrl,
        price: item.price,
        quantity: item.quantity
      }));

      // ATENÇÃO: customerEmail e userId devem vir do usuário LOGADO
      // Por enquanto, usamos mocks.
      const customerEmail = 'cliente@exemplo.com';
      const userId = 'mock_user_id';

      const newOrder: Omit<Order, 'id'> = {
        userId: userId,
        customerEmail: customerEmail,
        items: orderItems,
        total: this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        orderDate: new Date(),
        status: 'completed',
        // paymentMethod: this.paymentMethod, // Opcional: Salvar método de pagamento
      };

      try {
        const orderId = await this.orderService.saveOrder(newOrder); // <<=== CHAMA O SERVIÇO PARA SALVAR NO FIRESTORE
        alert(`Pagamento processado com sucesso! Seu pedido (ID: ${orderId}) foi confirmado.`);
        this.cartService.clearCart(); // Limpa o carrinho APÓS o sucesso do pagamento e salvamento
        this.router.navigate(['/']); // Redireciona para a home
      } catch (error: any) {
        alert('Erro ao processar o pagamento e salvar o pedido. Tente novamente.');
        console.error(error);
      }
    } else {
      alert('Por favor, preencha todos os dados de pagamento corretamente.');
      if (this.paymentMethod === 'credit-card') {
        this.creditCardForm.markAllAsTouched();
      }
      // Se pixForm não tem campos, não precisa marcar touched.
    }
  }
}