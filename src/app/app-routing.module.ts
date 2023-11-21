import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayrollFormComponent } from './components/payroll-form/payroll-form.component';

const routes: Routes = [
  { path: 'form', component: PayrollFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
