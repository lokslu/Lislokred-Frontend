import { EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {  MovieModel} from "src/Models/MovieModel";
import {  MovieService} from "src/Api/MovieService";
import { StateAndRateModel } from 'src/Models/StateAndRateModel';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-movie-tile',
  templateUrl: './movie-tile.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./movie-tile.component.css']
})
export class MovieTileComponent implements OnInit {

  constructor(private MovieS:MovieService,private snackBar: MatSnackBar) { } 
  @Input() movie:MovieModel;
  @Output() ChangedState = new EventEmitter<boolean>();


public chengeRate(NewRate:number)
{
  this.MovieS.ChangeRate(new StateAndRateModel(this.movie.Id,this.movie.State,NewRate)).subscribe(()=>
  {
   this.movie.Rate=NewRate;
   this.SnackBar("Rating changed to ",`${this.movie.Rate}`);
},(error)=>{
  this.SnackBar("Something went wrong", "");
});
}
public chengeState(State: boolean)
  {
   
    switch (State) {
      case null:
        {
          this.MovieS.DeleteState(this.movie.Id).subscribe(()=>this.SnackBar("Movie deleted",""));
          
          this.movie.State=State;
          this.ChangedState.emit(State);  

        }
        break;
        case true:
          {
            let NewState=new StateAndRateModel(this.movie.Id,State,this.movie.Rate);

          if (this.movie.State==null) {
            this.MovieS.AddState(NewState).subscribe(()=>this.SnackBar("Add movie to seen",""));
          }
          else
          {
            this.MovieS.UpdateState(NewState).subscribe(()=>this.SnackBar("Update movie to Seen",""));
          }
          this.ChangedState.emit(State);  

          this.movie.State=State;


          }
          break; 
          
          case false:
            {
              let NewState=new StateAndRateModel(this.movie.Id,State,this.movie.Rate);
  
            if (this.movie.State==null) {
              this.MovieS.AddState(NewState).subscribe(()=>this.SnackBar("Movie added to \"will watch\"",""));
            }
            else
            {
              this.MovieS.UpdateState(NewState).subscribe(()=>this.SnackBar("Movie updated in \"will watch\"",""));
            }
            this.movie.State=State;
            this.ChangedState.emit(State);  

            }
          break;
    }
  }
  
  
  SnackBar(masenge:string,Action:string)
  {
    
    this.snackBar.open(masenge,Action,{
      duration: 6000,
    });
  }
  
  ngOnInit(): void {
    // this.movie.UrlData=null;
  } 
}

