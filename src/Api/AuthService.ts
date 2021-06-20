import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService} from "@auth0/angular-jwt";
import {environment}from 'src/environments/environment'
import { RegisterModel } from 'src/Models/RegisterModel';
import { Observable } from 'rxjs';
import { LoginModel } from 'src/Models/LoginModel';
@Injectable()
export class AuthService {
  private jwtH:JwtHelperService= new JwtHelperService();
  public readonly apiString = environment.apiUrl;
  constructor(private router: Router,
              private httpClient: HttpClient
              ) {}
  
              
  //проверка оригинальности никнейма
  public CheckOriginNickname(newNick: string) {
    const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(newNick);
    return this.httpClient.post(this.apiString + '/api/User/cheknickname', `\"${newNick}\"`,{ headers:myHeaders});
  }
  //логин
  public login(loginModel: LoginModel) {
    return this.httpClient.post(this.apiString + '/api/User/login', loginModel);
  }
//регистрацыя
  public register(registerModel: RegisterModel) {

    
    const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(this.apiString + '/api/User/register', registerModel);
  }
  //выход
  public logout() {
    localStorage.removeItem("token");
    this.router.navigateByUrl('/');
  }
  //получение данных про пользователя
  public getUserInfo(name: string) {
    return this.httpClient.get(this.apiString + '/api/User/' + name);
  }

   public UserIsAuthorized(): boolean {
    if (null != localStorage.getItem("token")) {
        if(!this.jwtH.isTokenExpired(localStorage?.getItem("token"))) {
         return true;
      }
    }else
    {
      return false;
    }
  }
}
