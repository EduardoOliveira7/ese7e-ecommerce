import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { RegisterComponent } from './register/register.component';
import { CheckoutComponent } from './checkout/checkout.component'; 
import { ContatoComponent } from './contato/contato.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LoginComponent } from './login/login.component';
import { PaymentComponent } from './payment/payment.component'; 

export const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'produtos', component: ProductListComponent }, 
  { path: 'produtos/:id', component: ProductDetailComponent }, 
  { path: 'carrinho', component: CartComponent }, 
  { path: 'cadastro', component: RegisterComponent }, 
  { path: 'finalizar-pedido', component: CheckoutComponent }, 
  { path: 'contato', component: ContatoComponent },
  { path: 'politica-privacidade', component: PrivacyPolicyComponent },
   { path: 'login', component: LoginComponent },
   { path: 'pagamento', component: PaymentComponent },
  { path: '**', redirectTo: '' } 
];