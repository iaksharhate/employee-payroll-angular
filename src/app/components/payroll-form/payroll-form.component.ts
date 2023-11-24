import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { Employee } from 'src/app/model/employee';
import { Response } from 'src/app/model/response';
import { DataService } from 'src/app/service/data.service';
import { PayrollService } from 'src/app/service/payroll.service';

@Component({
  selector: 'app-payroll-form',
  templateUrl: './payroll-form.component.html',
  styleUrls: ['./payroll-form.component.scss'],
})
export class PayrollFormComponent implements OnInit {
  departments: Array<any> = [
    {
      id: 1,
      name: 'HR',
      value: 'HR',
      checked: false,
    },
    {
      id: 2,
      name: 'Sales',
      value: 'Sales',
      checked: false,
    },
    {
      id: 3,
      name: 'Finance',
      value: 'Finance',
      checked: false,
    },
    {
      id: 4,
      name: 'Engineer',
      value: 'Engineer',
      checked: false,
    },
    {
      id: 5,
      name: 'Other',
      value: 'Other',
      checked: false,
    },
  ];

  public employee: Employee = new Employee();
  employeeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private activateRoute: ActivatedRoute,
    private payrollService: PayrollService,
    private dataService: DataService
  ) {
    this.employeeForm = this.formBuilder.group({
      name: new FormControl('', []),
      profilePic: new FormControl('', []),
      gender: new FormControl('', []),
      department: this.formBuilder.array([], [Validators.required]),
      salary: new FormControl(300000, []),
      startDate: new FormControl('', []),
      note: ['', []],
    });
  }

  

  ngOnInit(): void {

    
    console.log('ngOnInIt')
    if (this.activateRoute.snapshot.params['id'] != undefined) {
      this.dataService.currentEmployee.subscribe((employee) => {
        if (Object.keys(employee).length !== 0) {
          console.log(employee);
          this.employeeForm.get('name')?.setValue(employee.name);
          this.employeeForm.get('profilePic')?.setValue(employee.profilePic);
          this.employeeForm.get('gender')?.setValue(employee.gender);
          this.employeeForm.get('salary')?.setValue(+employee.salary);
          this.employeeForm.get('startDate')?.setValue(employee.startDate);
          this.employeeForm.get('note')?.setValue(employee.note);
          const department: FormArray = this.employeeForm.get(
            'department'
          ) as FormArray;
          employee.department.forEach((deptElement) => {
            for (let i = 0; i < this.departments.length; i++) {
              if (this.departments[i].name === deptElement) {
                this.departments[i].checked = true;
                department.push(new FormControl(this.departments[i].value));
              }
            }
          });
        }
      });
    }
  }

  onDepartmentChange(event: MatCheckboxChange) {
    const department: FormArray = this.employeeForm.get(
      'department'
    ) as FormArray;

    if (event.checked) {
      department.push(new FormControl(event.source.value));
    } else {
      const index = department.controls.findIndex(
        (x) => x.value === event.source.value
      );
      department.removeAt(index);
    }
  }

  salary: string = this.activateRoute.snapshot.params['id'] ? this.employee.salary : "400000";
  updateSalary(event: any) {
    this.salary = event.target.value;
    console.log(this.salary);
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      if (this.employeeForm.get('profilePic')?.untouched) {
        this.snackBar.open('Select the Profile Pic', '', {
          duration: 4000,
          verticalPosition: 'top',
        });
      }
      if (this.employeeForm.get('gender')?.untouched) {
        this.snackBar.open('Select the Gender', '', {
          duration: 4000,
          verticalPosition: 'top',
        });
      }
      if (this.employeeForm.get('department')?.value.lenght == 0) {
        this.snackBar.open('Deparment needs to be filled!', '', {
          duration: 4000,
          verticalPosition: 'top',
        });
      }
    } else {
      this.employee.name = this.employeeForm.get('name')?.value;
      this.employee.profilePic = this.employeeForm.get('profilePic')?.value;
      this.employee.gender = this.employeeForm.get('gender')?.value;
      this.employee.department = this.employeeForm.get('department')?.value;
      this.employee.salary = this.employeeForm.get('salary')?.value;
      this.employee.note = this.employeeForm.get('note')?.value;

      let date = this.employeeForm.get('startDate')?.value;
      console.log('date', date);
      if (date) {
        const formatedDate = new Date(date).toLocaleDateString('en-US', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
        this.employee.startDate = formatedDate;
        console.log(formatedDate);
      }
      console.log(this.employee);

      if (this.activateRoute.snapshot.params['id'] != undefined) {
        this.payrollService
          .updateEmployee(
            this.activateRoute.snapshot.params['id'],
            this.employee
          )
          .subscribe((response: Response) => {
            console.log(response.data);
            this.router.navigateByUrl('/home');
          });
      } else {
        this.payrollService.addEmployee(this.employee).subscribe((response: Response) => {
          this.router.navigateByUrl('/home');
        });
      }
    }
  }
}
