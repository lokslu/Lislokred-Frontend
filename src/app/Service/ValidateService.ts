import { Injectable } from "@angular/core";
import { AbstractControl, FormControl, ValidatorFn } from "@angular/forms";
import { AuthService } from "src/Api/AuthService";
import {map}from "rxjs/operators";
@Injectable()
export class ValidateService {
    
    constructor(private AuthS:AuthService) {
      
    }
    public customPatternValid(config: any): ValidatorFn {
        return (control: FormControl) => {
          let urlRegEx: RegExp = config.pattern;
         if (control.value) {
           
           let f=control.value.match(urlRegEx);
           
           if (!control.value.match(urlRegEx)) {
            return {
              invalidMsg: config.msg
             }; 
            } 
            if (f[0]!==control.value) {
               return {
                 invalidMsg: config.msg
                };
              }
          }
          return null;
        };
    }
    public C_O_Nickname(control: AbstractControl){
      return this.AuthS.CheckOriginNickname(control.value).pipe(map((data: any)=>{
          return data.original ? null : { invalidMsg: "Такой Nickname уже существует" };
        }))
      
    }
  }
 