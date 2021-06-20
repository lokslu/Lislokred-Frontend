import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/Api/AuthService';
import { ValidateService } from 'src/app/Service/ValidateService';
import {LoginModel } from "src/Models/LoginModel";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public FormLogin: FormGroup;
  
  public logined: Boolean;//индикатор ожидания ответа от сервера
  public error: Boolean;//индикатор ошибки от сертвера 

  constructor(private fb: FormBuilder,
    private AuthS:AuthService,
    private router:Router,
    private validate:ValidateService) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.FormLogin = this.fb.group({
      "Email": [null,[Validators.required,Validators.email]],
      "Password": [null,[Validators.required,
        this.validate.customPatternValid({pattern:'(?=.*[^!@#$%^&*\\\n])[0-9a-zA-Zа-яёА-ЯЁ]{6,}' ,msg:"Спец символи запрещены"}),
        this.validate.customPatternValid({pattern:'(?=.*[A-Z])[0-9a-zA-Zа-яёА-ЯЁ!@#$%^&*\s ]{6,}',msg:"Пароль должен иметь хотя бы одну букву в вышем регистре"}),
        this.validate.customPatternValid({pattern:'(?=.*[0-9])[0-9a-zA-Zа-яёА-ЯЁ!@#$%^&*\s ]{6,}',msg:"Пароль должен иметь хотя бы одну цыфру"}),
        this.validate.customPatternValid({pattern:'(?=.*[a-z])[0-9a-zA-Z!@#$%^&*\s ]{6,}',msg:"Обезательно нужны латинские символы"}),
      this.validate.customPatternValid({pattern:'[0-9a-zA-Zа-яёА-ЯЁ!@#$%^&\'\"*/;:\s ]{6,}',msg:"Пароль должен иметь хотя бы 6 символов"})
      //  Validators.pattern('[0-9a-zA-Zа-яёА-ЯЁ]{6,}'),
      //  Validators.pattern('(?=.*[A-Z])[0-9a-zA-Z]{6,}'),
      //  Validators.pattern('(?=.*[0-9])[0-9a-zA-Z]{6,}'),
      //  Validators.pattern('(?=.*[a-z])[0-9a-zA-Z]{6,}')
    ]]
    })
  }

  onSubmit(){
    this.logined = true;
    this.error = false;
    let loginModel=new LoginModel();
    loginModel.Email=this.FormLogin.value.Email;
    loginModel.Password=this.FormLogin.value.Password;
    this.AuthS.login(loginModel).subscribe((data: any) => {

      localStorage.setItem('token', data.token);
      this.logined = false;
      this.router.navigateByUrl("/catalog");
      // this.router.navigateByUrl('/user');
    }, (error) => {
      
      console.log(error);
      this.logined = false;
      this.error = true;
      
    });
  }

}
