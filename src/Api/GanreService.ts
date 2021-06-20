import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {environment}from 'src/environments/environment'
@Injectable()
export class GanreService {
 
  public readonly apiString:String = environment.apiUrl;
  constructor(private router: Router,
              private httpClient: HttpClient
              ) {}

  //получение данных про пользователя
   GetAllGanres() {
    // return this.httpClient.get(this.apiString +"/Genre");
    return this.httpClient.get("https://localhost:5001/api/Genre");
  }


}
