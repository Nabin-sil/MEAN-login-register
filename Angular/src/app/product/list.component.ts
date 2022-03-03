import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AccountService, ProductService } from '@app/_services';
import { Product } from '@app/_models';
import { environment } from '@environments/environment';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    endpoint: string = `${environment.apiUrl}/products`;
    products:any=[];
    object:any=[];
    books:any=[];

    constructor(private accountService: AccountService, public http: HttpClient,
        private productService: ProductService) {}

    ngOnInit() {
    this.getAllProducts();  
     
}


 getAllProducts() {
        this.productService.getProducts().subscribe(products => {
            this.products = products.products;
            console.log(products);
        });
    }

    deleteProduct(_id: string) {
        const product = this.products.find(x => x._id === _id);
        if (confirm('Are you sure to delete this record ?') == true) { 
            product.isDeleting = true;
            this.productService.deleteProduct(_id)
                    .pipe(first())
            .subscribe(() =>
            this.products = this.products.filter(x => x._id !== _id));
    }
}

}