import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { PayrollService } from 'src/app/service/payroll.service';


@Component({
  selector: 'app-payroll-home',
  templateUrl: './payroll-home.component.html',
  styleUrls: ['./payroll-home.component.scss'],
})
export class PayrollHomeComponent implements OnInit{
  employeeCount: number = 0;
  employeeList: Employee[] = [];

  constructor(private payrollService: PayrollService) {
    // const localStorageData = localStorage.getItem('Employees');
    // if (localStorageData) {
    //   this.employeeList = JSON.parse(localStorageData);
    // }
  }

  ngOnInit(): void {
    this.payrollService.getAllEmployee().subscribe(response => {
      console.log(response.data);
      this.employeeList = response.data;
    })
  }

  handleDelete = (name: string) => {
    let tempEmpList = this.employeeList.filter(
      (employee) => employee.name !== name
    );
    localStorage.setItem('Employees', JSON.stringify(tempEmpList));
    window.location.reload();
  };
}
