import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService, EmployeeService, ProductService } from '@app/_services';
import { ToastrService } from 'ngx-toastr';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private employeeService: EmployeeService,
        private alertService: AlertService,
        private toastr: ToastrService

    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        
        // password not required in edit mode
        // const passwordValidators = [Validators.minLength(6)];
        // if (this.isAddMode) {
        //     passwordValidators.push(Validators.required);
        // }

        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            phone: ['', Validators.required]
        });

        if (!this.isAddMode) {
            this.employeeService.getEmployeeById(this.id)
                .pipe(first())
                .subscribe(x => this.form.patchValue(x));
                console.log(this.form.value);
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createEmployee();
        } else {
            this.updateEmployee();
        }
    }

    private createEmployee() {
        this.employeeService.addEmployee(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                 this.toastr.success('Employee Added');

//                    this.alertService.success('Employee added successfully', { keepAfterRouteChange: true, displayDuration: 1000,
  //                      autoHide: true, });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updateEmployee() {
        this.employeeService.updateEmployee(this.id, this.form.value)
            .pipe(first())
            .subscribe({
                 next: () => {
                 this.toastr.success('Employee Updated');

                 //   this.alertService.success('Update successful', { keepAfterRouteChange: true });            
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    this.toastr.error('Error');
                 //   this.alertService.error(error);
                    this.loading = false;
                }
            });
    }





}