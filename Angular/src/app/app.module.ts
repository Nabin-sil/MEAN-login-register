import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import { ToastrModule } from 'ngx-toastr';;
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
;
import { CardComponent } from './card/card.component'
;
import { RouterModule } from '@angular/router';

import { GalleryComponent } from './gallery/gallery.component'
import { ProfileComponent } from './Profile';
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        RouterModule,
        ToastrModule.forRoot(),
        NgbModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent
,
        CardComponent
,
        GalleryComponent,
    ProfileComponent    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
     //   fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };