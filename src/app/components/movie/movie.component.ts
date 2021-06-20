import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MovieService } from 'src/Api/MovieService';
import { environment } from 'src/environments/environment'
import { FilmingUnitModel } from 'src/Models/FilmingUnitModel';
import { MovieFullInformationModel } from 'src/Models/MovieFullInformationModel';
import { MovieModel } from 'src/Models/MovieModel';
import { StateAndRateModel } from 'src/Models/StateAndRateModel';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {


  public id: string;

  public movie: MovieFullInformationModel;
  public filmingUnits: Array<FilmingUnitModel>;


  @Output() ChangedState = new EventEmitter<boolean>();
  

  constructor(private activateRoute: ActivatedRoute,
    private MovieS: MovieService,
    private snackBar: MatSnackBar) { }

  public chengeRate(NewRate: number) {
    this.movie.Rate = NewRate;
    this.MovieS.UpdateState(new StateAndRateModel(this.movie.Id, this.movie.State, this.movie.Rate)).subscribe(() => this.SnackBar("Rating changed to ", `${this.movie.Rate}`));
  }
  public chengeState(State: boolean) {

    switch (State) {
      case null:
        {
          this.MovieS.DeleteState(this.movie.Id).subscribe(() => {
              
            this.SnackBar("Movie deleted", "");
          });
          this.movie.State = State;
          this.ChangedState.emit(State);  

        }
        break;
      case true:
        {
          let NewState = new StateAndRateModel(this.movie.Id, State, this.movie.Rate);

          if (this.movie.State == null) {
            this.MovieS.AddState(NewState).subscribe(() => this.SnackBar("Add movie to seen", ""));
          }
          else {
            this.MovieS.UpdateState(NewState).subscribe(() => this.SnackBar("Update movie to Seen", ""));
          }
          this.movie.State = State;
          this.ChangedState.emit(State);  

        }
        break;

      case false:
        {
          let NewState = new StateAndRateModel(this.movie.Id, State, this.movie.Rate);

          if (this.movie.State == null) {
            this.MovieS.AddState(NewState).subscribe(() => this.SnackBar("Movie added to \"will watch\"", ""));
          }
          else {
            this.MovieS.UpdateState(NewState).subscribe(() => this.SnackBar("Movie updated in \"will watch\"", ""));
          }
          this.movie.State = State;
          this.ChangedState.emit(State);  

        }
        break;
    }
  }


  SnackBar(masenge: string, Action: string) {

    this.snackBar.open(masenge, Action, {
      duration: 6000,
    });
  }


  ngOnInit(): void {
    
    
    this.activateRoute.paramMap.pipe(
      switchMap(params => params.getAll('id'))
  )
  .subscribe(data=>{ this.id = data
    
    
    
    this.MovieS.GetMovieFullInformatin(this.id).subscribe((data: MovieFullInformationModel) => {
      this.movie = data;
      this.movie.UrlData = this.movie.UrlData;
      
      
    },
    (error) => {
      console.log(error);
      
    });
    this.MovieS.GetFilmingUnitsByMovieId(this.id).subscribe((data: Array<FilmingUnitModel>) => {
      data.map(x=>x.UrlData);
      this.filmingUnits = data;
    },
    (error) => {
      console.log(error)
    });
  });

  }
}