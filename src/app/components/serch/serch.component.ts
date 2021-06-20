import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import {  MovieService} from 'src/Api/MovieService';
import {State} from 'src/app/Service/myEnums';

@Component({
  selector: 'app-serch',
  templateUrl: './serch.component.html',
  styleUrls: ['./serch.component.css']
})
export class SerchComponent implements OnInit {
 
  public get State(): typeof State {
    return State; 
  }
  constructor(private MovieS:MovieService) { }
  public DataDelivered:State;
  name:string;
  results:Array<any>;
  ngOnInit(): void {
  }
  qvery()
  {
    this.MovieS.Serch(this.name).subscribe((data:any)=>
    {
      if (data.results===undefined) 
      {
        this.DataDelivered=State.notresult;
      }
      else
      {
        this.results=data.results;
      this.serchImages()
          
        this.DataDelivered=State.ok;

      }
   

    },
    (error:any)=>{console.log(error)});
this.DataDelivered=State.loding;
  }
 
  serchImages()
  {
    for (let index = 0; index < this.results.length; index++) {
      delay(2000);
      this.MovieS.SerchImages(this.results[index].id.match("(?<=\/title\/)tt.+(?=\/)")).subscribe((data:any)=>{
        this.results[index].images=data.images;
      })
    }
  }
}
