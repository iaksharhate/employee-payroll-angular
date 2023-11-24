import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../model/employee';
import { Observable } from 'rxjs';
import { Response } from '../model/response';

@Injectable({
  providedIn: 'root'
})
export class PayrollService {

  private BASE_URL = "http://localhost:8080/payroll"

  constructor(private httpClient: HttpClient) { }

  getAllEmployee(){
    return this.httpClient.get(`${this.BASE_URL}/get`);
  }

  addEmployee(data:Employee){
    return this.httpClient.post(`${this.BASE_URL}/create`, data);
  }

  updateEmployee(id:number, data: Employee){
    return this.httpClient.put(`${this.BASE_URL}/update/${id}`, data);
  }

  deleteEmployee(id: number){
    return this.httpClient.delete(`${this.BASE_URL}/delete/${id}`);
  }
}
