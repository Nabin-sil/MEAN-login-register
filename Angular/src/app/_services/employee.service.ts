import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Employee, Product } from '@app/_models';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


const endpoint: string = `${environment.apiUrl}/employee`;

const randomendpoint: string = `https://randomuser.me/api/?results=100`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({ providedIn: 'root' })
export class EmployeeService {
    selectedEmployee: Employee;

   // endpoint: string = `${environment.apiUrl}/products`;
   // headers = new HttpHeaders().set('Content-Type', 'application/json');
  
    constructor(private http: HttpClient) { }
  
    // Add employee
    addEmployee(data: Employee): Observable<any> {
      let API_URL = `${endpoint}/addEmployee`;
      return this.http.post(API_URL, data, httpOptions)
        .pipe(
          catchError(this.errorMgmt)
        )
    }
    
  
    // Get all employee
    getEmployees():Observable<any> {
      return this.http.get(`${endpoint}`, httpOptions);
    }
  
    // Get Employee by id
    getEmployeeById(id): Observable<any> {
      let API_URL = `${endpoint}/editEmployee/${id}`;
      return this.http.get(API_URL, httpOptions)
        .pipe(
          map((res: Response) => {
            return res || {}
          }),
          catchError(this.errorMgmt)
        )
    }
  
//     getById(id: string) {
//       return this.http.get<Product>(`${endpoint}/read/${id}`);
//   }


    // Update Employee
    updateEmployee(id, data): Observable<any> {
      let API_URL = `${endpoint}/updateEmployee/${id}`;
      return this.http.patch(API_URL, data, httpOptions)
        .pipe(
          catchError(this.errorMgmt)
        )
    }
  
    // Delete employee
    deleteEmployee(_id: string) {
      var API_URL = `${endpoint}/deleteEmployee/${_id}`;
      return this.http.delete(API_URL)
        .pipe(
          catchError(this.errorMgmt)
        )
    }


    // Error handling 
    errorMgmt(error: HttpErrorResponse) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    }
  
  }


@Injectable({ providedIn: 'root' })
  export class RandomService {
    selectedEmployee: Employee;

   // endpoint: string = `${environment.apiUrl}/products`;
   // headers = new HttpHeaders().set('Content-Type', 'application/json');
  
    constructor(private http: HttpClient) { }
  
    // Add employee
    // addEmployee(data: Employee): Observable<any> {
    //   let API_URL = `${endpoint}/addEmployee`;
    //   return this.http.post(API_URL, data, httpOptions)
    //     .pipe(
    //       catchError(this.errorMgmt)
    //     )
    // }
    
  
    // Get all random user
    getRandomUser(): Observable<any> {
      return this.http.get(`${randomendpoint}`, httpOptions);
    }
  
    // Get Employee by id
    // getEmployeeById(id): Observable<any> {
    //   let API_URL = `${endpoint}/editEmployee/${id}`;
    //   return this.http.get(API_URL, httpOptions)
    //     .pipe(
    //       map((res: Response) => {
    //         return res || {}
    //       }),
    //       catchError(this.errorMgmt)
    //     )
    // }
  
//     getById(id: string) {
//       return this.http.get<Product>(`${endpoint}/read/${id}`);
//   }


    // Update Employee
    // updateEmployee(id, data): Observable<any> {
    //   let API_URL = `${endpoint}/updateEmployee/${id}`;
    //   return this.http.patch(API_URL, data, httpOptions)
    //     .pipe(
    //       catchError(this.errorMgmt)
    //     )
    // }
  
    // Delete employee
    // deleteEmployee(id): Observable<any> {
    //   var API_URL = `${endpoint}/deleteEmployee/${id}`;
    //   return this.http.delete(API_URL)
    //     .pipe(
    //       catchError(this.errorMgmt)
    //     )
    // }
  
    // Error handling 
    errorMgmt(error: HttpErrorResponse) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    }
  
  }