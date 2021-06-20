import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MovieService } from 'src/Api/MovieService';
import { environment } from 'src/environments/environment';
import { MovieModel } from 'src/Models/MovieModel';
import { MovieComponent } from '../movie/movie.component';

export interface State {
  flag: string;
  name: string;
  population: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public SerchQvery:FormControl;
  constructor(private router:Router,private MovieS:MovieService) {

  }
  
  public SerchResult:Array<MovieModel>;
  public Result:Observable<Array<MovieModel>>;
  
  public redirect2(ref:any)
  {
    let id:string=ref.option.__ngContext__[29];
    this.router.navigateByUrl(`movie/${id}`);
  }
  // public redirect(ref:string)
  // {
  //   console.log(`/movie/${ref}`);

  //   this.router.navigateByUrl(`movie/${ref}`);
  // }

 private IsEmpty(value:string){
  for (let index = 0; index < value.length; index++) {
    if ( value[index]!=" ") {
      return false;
    }   
  }  
return true;
}


  ngOnInit(): void {
    this.SerchQvery = new FormControl('');

    this.Result=this.SerchQvery.valueChanges
    .pipe(
      map(str =>{ 
        if(!this.IsEmpty(str))
        { 
           this.MovieS.Serch(str).subscribe((data:Array<MovieModel>)=>{
             this.SerchResult=data;})
          return this.SerchResult;
           
        }
        else
        {
          return null;
        }
      })
    );
    
  }
 
  
  public logout()
  {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
