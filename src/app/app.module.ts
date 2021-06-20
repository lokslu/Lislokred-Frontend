import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';//pfkgf
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MovieComponent } from './components/movie/movie.component';
import { SerchComponent } from './components/serch/serch.component';
import { AdminpageComponent } from './components/adminpage/adminpage.component';



import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from './HaederInterceptor';
import { AuthService } from 'src/Api/AuthService';
import { GanreService } from 'src/Api/GanreService';
import { ValidateService } from './Service/ValidateService';
import { MovieTileComponent } from './components/movie-tile/movie-tile.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { MovieService } from 'src/Api/MovieService';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

 import {MatRippleModule } from '@angular/material/core';
 import {MatCheckboxModule } from '@angular/material/checkbox';
 import {MatInputModule } from '@angular/material/input';
 import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
 import {MatSnackBarModule} from '@angular/material/snack-bar';
 import {MatAutocompleteModule} from '@angular/material/autocomplete';
 import {MatTabsModule} from '@angular/material/tabs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxSpinnerModule } from "ngx-spinner";
import { AutorizateGuard } from './Guards/AutorizateGuard';
@NgModule({
  declarations: [
    
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HeaderComponent,
    FooterComponent,
    MovieTileComponent,
    CatalogComponent,
    SerchComponent,
    MovieComponent,
    AdminpageComponent
  
  ],
  imports: [ 
    NgxSpinnerModule,
    MatRippleModule, MatCheckboxModule, MatTabsModule,MatInputModule,MatProgressSpinnerModule,MatSnackBarModule,MatAutocompleteModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [
AutorizateGuard,
    MovieService,
    ValidateService,
    GanreService,
     AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
