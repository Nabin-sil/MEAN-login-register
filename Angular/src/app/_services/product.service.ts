import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Product } from '@app/_models';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


const endpoint: string = `${environment.apiUrl}/products`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
  'Accept': 'image/jpeg',

})

};

// const httpsOptions = {
//   headers: new HttpHeaders({
//     'Accept': 'image/jpeg',
//   }),
//   responseType: 'blob' // This tells angular to parse it as a blob, default is json
// };

@Injectable({ providedIn: 'root' })
export class ProductService {

   // endpoint: string = `${environment.apiUrl}/products`;
   // headers = new HttpHeaders().set('Content-Type', 'application/json');
  
    constructor(private http: HttpClient) { }
  
    // Add product
    addProduct(data: Product): Observable<any> {
      let API_URL = `${endpoint}/add`;
      return this.http.post(API_URL, data, httpOptions)
        .pipe(
          catchError(this.errorMgmt)
        )
    }
    
  
     getProducts(): Observable<any> {
      return this.http.get(`${endpoint}`, httpOptions);
    }
  

    // Get all products
    // getProducts() : Observable<any> {
    //   return this.http.get(`${endpoint}`, httpOptions);
    // }
  
    // Get product
    getProductById(id): Observable<any> {
      let API_URL = `${endpoint}/read/${id}`;
      return this.http.get(API_URL, httpOptions)
        .pipe(
          map((res: Response) => {
            return res || {}
          }),
          catchError(this.errorMgmt)
        )
    }
  
    getById(id: string) {
      return this.http.get<Product>(`${endpoint}/read/${id}`);
  }


    // Update product
    updateProduct(_id, data): Observable<any> {
      let API_URL = `${endpoint}/update/${_id}`;
      return this.http.patch(API_URL, data, httpOptions)
        .pipe(
          catchError(this.errorMgmt)
        )
    }
  
    // Delete product
    deleteProduct(_id:string) {
      var API_URL = `${endpoint}/delete/${_id}`;
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