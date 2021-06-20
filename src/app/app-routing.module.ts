import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {  RegistrationComponent   } from "./components/registration/registration.component";
import {  LoginComponent   } from "./components/login/login.component";
import {  CatalogComponent   } from "./components/catalog/catalog.component";
import { SerchComponent } from './components/serch/serch.component';
import { MovieComponent } from './components/movie/movie.component';
import { AutorizateGuard } from './Guards/AutorizateGuard';
import { AdminpageComponent } from './components/adminpage/adminpage.component';


const routes: Routes = [
 {path:"login",component:LoginComponent},
 {path:"movie/:id",component:MovieComponent},
 {path:"catalog",component:CatalogComponent,canActivate:[AutorizateGuard]},
 {path:"serchApi",component:SerchComponent},
 {path:"adminpage",component:AdminpageComponent},
 {path:"registration",component:RegistrationComponent},
 {path:"**",redirectTo:'catalog'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
