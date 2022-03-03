import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { ProfileComponent } from './Profile';

import { AuthGuard } from './_helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const productModule = () => import('./product/product.module').then(x => x.ProductModule);
const employeeModule = () => import('./employee/employee.module').then(x => x.EmployeeModule);
const randomModule = () => import('./RandomUsers/random.module').then(x => x.RandomModule);
 

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },

    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },

    { path: 'products', loadChildren: productModule, canActivate: [AuthGuard] },
    { path: 'employees', loadChildren: employeeModule, canActivate: [AuthGuard] },
    { path: 'random', loadChildren: randomModule, canActivate: [AuthGuard] },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }