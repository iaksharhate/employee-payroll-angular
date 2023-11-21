import { Component } from '@angular/core';
import { Employee } from 'src/app/model/employee';

@Component({
  selector: 'app-payroll-home',
  templateUrl: './payroll-home.component.html',
  styleUrls: ['./payroll-home.component.scss'],
})
export class PayrollHomeComponent {

  employeeList: Employee[] = [];

  constructor() {
    const localStorageData = localStorage.getItem('Employees');
    if (localStorageData) {
      this.employeeList = JSON.parse(localStorageData);
    }
  }
}
