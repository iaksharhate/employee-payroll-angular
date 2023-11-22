import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../model/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayrollService {

  private BASE_URL = "http://localhost:8080/payroll"

  constructor(private httpClient: HttpClient) { }

  getAllEmployee(): Observable<any>{
    return this.httpClient.get(`${this.BASE_URL}/get`)
  }
}
