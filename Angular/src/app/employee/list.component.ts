import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AccountService, EmployeeService, ProductService } from '@app/_services';
import { Employee, Product } from '@app/_models';
import { environment } from '@environments/environment';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    endpoint: string = `${environment.apiUrl}/products`;
    employees:any=[];
    object:any=[];
    books:any=[];
    search: string = "";
    searchKey: any;
    spinner = false;
    totalRecords: string;
    p: number = 1;
    config: any;
       
    constructor(private accountService: AccountService, public http: HttpClient,
        private employeeService: EmployeeService) {}

    ngOnInit() {
        // this.productService.getProducts()
        //     .pipe(first())
        //     .subscribe(products => this.products = products);
        //     console.log(this.products);
    this.getAllEmployees();  
     
}



 getAllEmployees() {
    this.spinner = true;
        this.employeeService.getEmployees().subscribe(employees => {
            this.employees = employees;
            console.log(employees);
            this.totalRecords = employees.length
           this.spinner = false;
        });

        this.config = {
            itemsPerPage: 6,
            currentPage: 1,
            totalItems: this.employees.length
          };
    }


      deleteEmployee(_id: string) {
        const employee = this.employees.find(x => x._id === _id);
      //  employee.isDeleting = true;
        if (confirm('Are you sure to delete this record ?') == true) { 
            employee.isDeleting = true;
            this.employeeService.deleteEmployee(_id)
                    .pipe(first())
            .subscribe(() =>
            this.employees = this.employees.filter(x => x._id !== _id));
    }
}


pageChanged(event){
    this.config.currentPage = event;
  }




}