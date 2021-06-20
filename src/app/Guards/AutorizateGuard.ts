import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "src/Api/AuthService";
 
@Injectable()
export class AutorizateGuard implements CanActivate{
    constructor(
        private router:Router,private AuthS:AuthService
    ){}

 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{
         let check=this.AuthS.UserIsAuthorized();
         if(!check){this.router.navigateByUrl('/login')}
        return check;
        
    }
}