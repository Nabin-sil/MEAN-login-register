import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { first } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AccountService, EmployeeService, ProductService, RandomService } from '@app/_services';
import { Employee, Product } from '@app/_models';
import { environment } from '@environments/environment';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    endpoint: string = `${environment.apiUrl}/products`;
    spinner = false;
    random:any=[];
    object:any=[];
    books:any=[];
    search: string = "";
    totalRecords: string;
     p: number = 1;
        
    constructor(private accountService: AccountService, public http: HttpClient,
        private randomService: RandomService) {}

    ngOnInit() {
        // this.productService.getProducts()
        //     .pipe(first())
        //     .subscribe(products => this.products = products);
        //     console.log(this.products);   
    this.getAllRandomUsers();  
     
}

 getAllRandomUsers() {
     this.spinner = true;
        this.randomService.getRandomUser().subscribe(random => {
            this.random = random.results;
            console.log(random);
            this.totalRecords = random.results.length
            this.spinner = false;
        });
    }


}