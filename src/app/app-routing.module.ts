import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  {
    path:"products/:p1/:p2",component:ProductComponent
  },
  {
    path : "",redirectTo:"products/1/0",pathMatch : 'full'
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes), 
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
