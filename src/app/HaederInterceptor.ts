import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
 import { AuthService } from '../Api/AuthService';

//import 'rxjs/add/operator/do';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
constructor(private auth:AuthService,private route:Router) {
    
}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.auth.UserIsAuthorized()) 
        {
            
            const dummyrequest = req.clone({
                setHeaders: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
                
            });
            console.log("Worck Interceptor");
            return next.handle(dummyrequest);
          }
          else
          {console.log("dont Worck Interceptor");
             return next.handle(req);
          }
    }  
}
