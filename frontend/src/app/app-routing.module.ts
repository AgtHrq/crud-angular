import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ProductCrudComponent } from './views/product-crud/product-crud.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import {ProductUpdateComponent} from "./components/product/product-update/product-update.component";
import {ProductDeleteComponent} from "./components/product/product-delete/product-delete.component";
import {UserCrudComponent} from "./views/user-crud/user-crud.component";
import {UserCreateComponent} from "./components/user/user-create/user-create.component";
import {ContaCreateComponent} from "./components/financeiro/conta/conta-create/conta-create.component";
import {UserDeleteComponent} from "./components/user/user-delete/user-delete.component";
import {UserUpdateComponent} from "./components/user/user-update/user-update.component";
import {FinanceiroViewComponent} from "./views/financeiro-view/financeiro-view.component";

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "products", component: ProductCrudComponent},
  {path: "products/create", component: ProductCreateComponent},
  {path: "products/update/:id", component: ProductUpdateComponent},
  {path: "products/delete/:id", component: ProductDeleteComponent},
  {path: "users", component: UserCrudComponent},
  {path: "users/create", component: UserCreateComponent},
  {path: "users/update/:id", component: UserUpdateComponent},
  {path: "users/delete/:id", component: UserDeleteComponent},
  {path: "financeiro", component: FinanceiroViewComponent},
  {path: "financeiro/conta/create", component: ContaCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
