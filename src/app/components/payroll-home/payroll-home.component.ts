import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { Response } from 'src/app/model/response';
import { DataService } from 'src/app/service/data.service';
import { PayrollService } from 'src/app/service/payroll.service';

@Component({
  selector: 'app-payroll-home',
  templateUrl: './payroll-home.component.html',
  styleUrls: ['./payroll-home.component.scss'],
})
export class PayrollHomeComponent implements OnInit {
  employeeCount: number = 0;
  employeeList: Employee[] = [];

  constructor(
    private payrollService: PayrollService,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.payrollService.getAllEmployee().subscribe((response:Response) => {
      console.log(response.data);
      this.employeeList = response.data;
    });
  }

  handleDelete = (id: number) => {
    let isDelete = window.confirm('Do you want to delete Employee?');

    if (isDelete) {
      this.payrollService.deleteEmployee(id).subscribe((response: Response) => {
        alert(response.message);
        window.location.reload();
      });
    } else {
      window.location.reload();
    }
  };

  handleUpdate = (employee: Employee) => {
    this.dataService.changeEmployee(employee);
    this.router.navigateByUrl(`/form/${employee.id}`);
  };
}
