// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { RegisterComponent } from './register/register.component';
import { CheckoutComponent } from './checkout/checkout.component'; // Se já for criar
import { ContatoComponent } from './contato/contato.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Rota para a página inicial
  { path: 'produtos', component: ProductListComponent }, // Rota para a lista de produtos
  { path: 'produtos/:id', component: ProductDetailComponent }, // Rota para o detalhe do produto (com um parâmetro de ID)
  { path: 'carrinho', component: CartComponent }, // Rota para o carrinho
  { path: 'cadastro', component: RegisterComponent }, // Rota para o cadastro
  { path: 'finalizar-pedido', component: CheckoutComponent }, // Rota para o checkout
  { path: 'contato', component: ContatoComponent },
  { path: 'politica-privacidade', component: PrivacyPolicyComponent },
  { path: '**', redirectTo: '' } // Rota curinga para redirecionar para a home se a URL não for encontrada
];