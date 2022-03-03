import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { ToastrModule } from 'ngx-toastr';
import { ProductRoutingModule } from './product-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ProductRoutingModule,
        ToastrModule
    ],
    declarations: [
        LayoutComponent,
        ListComponent,
        AddEditComponent
    ]
})
export class ProductModule { }