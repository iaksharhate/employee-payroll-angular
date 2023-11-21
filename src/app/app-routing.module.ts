import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayrollFormComponent } from './components/payroll-form/payroll-form.component';
import { PayrollHomeComponent } from './components/payroll-home/payroll-home.component';

const routes: Routes = [
  { path: '', redirectTo:'home', pathMatch:'full' },
  { path: 'home', component: PayrollHomeComponent },
  { path: 'form', component: PayrollFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
