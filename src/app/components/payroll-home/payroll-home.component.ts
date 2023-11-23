import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { PayrollService } from 'src/app/service/payroll.service';

@Component({
  selector: 'app-payroll-home',
  templateUrl: './payroll-home.component.html',
  styleUrls: ['./payroll-home.component.scss'],
})
export class PayrollHomeComponent implements OnInit {
  employeeCount: number = 0;
  employeeList: Employee[] = [];

  constructor(private payrollService: PayrollService) {
    // const localStorageData = localStorage.getItem('Employees');
    // if (localStorageData) {
    //   this.employeeList = JSON.parse(localStorageData);
    // }
  }

  ngOnInit(): void {
    this.payrollService.getAllEmployee().subscribe((response) => {
      console.log(response.data);
      this.employeeList = response.data;
    });
  }

  handleDelete = (id: number) => {
    let isDelete = window.confirm('Do you want to delete Employee?');

    if (isDelete) {
      this.payrollService.deleteEmployee(id).subscribe((response) => {
        alert(response.message);
        window.location.reload();
      });
    } else {
      window.location.reload();
    }
    // let tempEmpList = this.employeeList.filter(
    //   (employee) => employee.name !== name
    // );
    // localStorage.setItem('Employees', JSON.stringify(tempEmpList));
    // window.location.reload();
  };
}
