import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService, NotificationService } from '@app/_services';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })

export class LoginComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    public showPassword: boolean;
    public showPasswordOnPress: boolean;
  
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
       private toastr: ToastrService


    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
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
        this.accountService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe({
                next: () => {

                    this.alertService.success( "You are login");

                    // get return url from query parameters or default to home page
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigateByUrl(returnUrl);
                },
                error: error => {
              //   this.showToasterError();
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    
// showToasterSuccess() {
//     this.notifyService.showSuccess("You are login", "Login Successful")
//   }
  
//   showToasterError(){
//     this.notifyService.showError("Error", "No Login")
//   }
  
 

showSuccess() {
    this.toastr.success('You are login', 'Success!');
  }


  showError() {
    this.toastr.error('You are not login', 'Error!');
  }

}