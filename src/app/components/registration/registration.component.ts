import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GanreService } from 'src/Api/GanreService';
import { AuthService } from "src/Api/AuthService";
import { GanreModel } from 'src/Models/GanreModel';
import { RegisterModel } from 'src/Models/RegisterModel';
import { ValidateService } from 'src/app/Service/ValidateService';
import { Observable } from 'rxjs';
@Component(
  {
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
  })
export class RegistrationComponent implements OnInit {
  public FormRegistration: FormGroup;
  public registered: Boolean;//индикатор ожидания ответа от сервера
  public error: Boolean;//индикатор ошибки от сертвера 
  public FavoriteGanres: Array<CheckBoxT<GanreModel>>//Список жанров
  constructor(private fb: FormBuilder,
    private AuthS: AuthService,
    private GanreS: GanreService,
    private router: Router,
    private validate: ValidateService) { }

  ngOnInit(): void {
    this.initForm();
    this.GanreS.GetAllGanres().subscribe((data: GanreModel[]) => {
      this.FavoriteGanres = data.map(x => new CheckBoxT<GanreModel>(x));
    }, (error) => {
      this.FavoriteGanres = null;
      console.log(error);
    });

    // this.FavoriteGanres.unshift(new GanreModel(1,"Драма"));
  }
  //1. без пробелов 
  //2. в количестви 8 символов и более
  //3. без спец символов 
  // Обезательно один и более капсом
  // Обезательно один и более цыфра


  initForm() {
    this.FormRegistration = this.fb.group({
      "Nickname": [null, [Validators.required,
                          this.validate.customPatternValid({ pattern: '(?=.*[^!@#$%^&*\\\n])[0-9a-zA-Zа-яёА-ЯЁ]{1,}', msg: "Спец символи запрещены" })],
                        [this.validate.C_O_Nickname.bind(this)]],
      "Email": [null, [Validators.required, Validators.email]],
      "Password": [null, [Validators.required,
      this.validate.customPatternValid({ pattern: '(?=.*[^!@#$%^&*\\\n])[0-9a-zA-Zа-яёА-ЯЁ]{6,}', msg: "Спец символи запрещены" }),
      this.validate.customPatternValid({ pattern: '(?=.*[A-Z])[0-9a-zA-Zа-яёА-ЯЁ!@#$%^&*\s ]{6,}', msg: "Пароль должен иметь хотя бы одну букву в вышем регистре" }),
      this.validate.customPatternValid({ pattern: '(?=.*[0-9])[0-9a-zA-Zа-яёА-ЯЁ!@#$%^&*\s ]{6,}', msg: "Пароль должен иметь хотя бы одну цыфру" }),
        this.validate.customPatternValid({ pattern: '(?=.*[a-z])[0-9a-zA-Z!@#$%^&*\s ]{6,}', msg: "Обезательно нужны латинские символы" }),
        this.validate.customPatternValid({ pattern: '[0-9a-zA-Zа-яёА-ЯЁ!@#$%^&\'\"*/;:\s ]{6,}', msg: "Пароль должен иметь хотя бы 6 символов" })
        //  Validators.pattern('[0-9a-zA-Zа-яёА-ЯЁ]{6,}'),
        //  Validators.pattern('(?=.*[A-Z])[0-9a-zA-Z]{6,}'),
        //  Validators.pattern('(?=.*[0-9])[0-9a-zA-Z]{6,}'),
        //  Validators.pattern('(?=.*[a-z])[0-9a-zA-Z]{6,}')
      ]], 
      "Gender": [false, Validators.required]
    })
  } 
  onSubmit() {

    this.registered = true;
    this.error = false;
    let registerModel = new RegisterModel();
    registerModel.Nickname = this.FormRegistration.value.Nickname;
    registerModel.Email = this.FormRegistration.value.Email;
    registerModel.Password = this.FormRegistration.value.Password;
    registerModel.Gender = this.FormRegistration.value.Gender;

    registerModel.FavoriteGenres = this.FavoriteGanres.map(x => new GanreModel(x.data.Id, x.data.Data))

    this.AuthS.register(registerModel).subscribe((data: any) => {

      localStorage.setItem('token', data.token);
      this.router.navigateByUrl("/");
      this.registered = false;
      // this.router.navigateByUrl('/user');
    }, (error) => {
      
      console.log(error);
      this.registered = false;
      this.error = true;
      
    });
  }
  

}

class CheckBoxT<T> {
  constructor(i: T, cheked: boolean = false) {
    this.data = i;
    this.checked = cheked;
  }
  public data: T;
  public checked: boolean;
}


