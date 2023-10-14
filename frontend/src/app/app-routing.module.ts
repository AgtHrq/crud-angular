import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ProductCrudComponent } from './views/product-crud/product-crud.component';
import { ProductCreatComponent } from './components/product/product-creat/product-creat.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';
import { UserCrudComponent } from './views/user-crud/user-crud.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';
import { UserDeleteComponent } from './components/user/user-delete/user-delete.component';
import { FinanceiroViewComponent } from './views/financeiro-view/financeiro-view.component';
import { ContaCreateComponent } from './components/financeiro/conta/conta-create/conta-create.component';
import { ContaDeleteComponent } from './components/financeiro/conta/conta-delete/conta-delete.component';
import { ContaUpdateComponent } from './components/financeiro/conta/conta-update/conta-update.component';

const routes: Routes = [{
  path: "",
  component: HomeComponent
},
{
  path: "products",
  component: ProductCrudComponent
},
{
  path: "products/create",
  component: ProductCreatComponent
},
{
  path: "products/update/:id",
  component: ProductUpdateComponent
},
{
  path: "products/delete/:id",
  component: ProductDeleteComponent
},
{
  path: "users",
  component: UserCrudComponent
},
{
  path: "users/create",
  component: UserCreateComponent
},
{
  path: "users/update/:id",
  component: UserUpdateComponent
},
{
  path: "users/delete/:id",
  component: UserDeleteComponent
},
{
  path: "financeiro",
  component: FinanceiroViewComponent
},
{
  path: "financeiro/conta/create",
  component: ContaCreateComponent
},
{
  path: "financeiro/conta/delete/:id",
  component: ContaDeleteComponent
},
{
  path: "financeiro/conta/update/:id",
  component: ContaUpdateComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
