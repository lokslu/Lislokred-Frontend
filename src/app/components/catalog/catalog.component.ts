import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MovieService } from 'src/Api/MovieService';
import { environment } from 'src/environments/environment'
import { MovieModel } from "src/Models/MovieModel";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService,private MovieS: MovieService) { }

  public Movie: Array<MovieModel>;
  public loading:boolean;
  public TabChange(indexTab: any)
  {
this.loading=true;
this.spinner.show();
    switch (indexTab.index) {
      case 0:
        {this.MovieS.GetToBeSeenMovie().subscribe((data: Array<MovieModel>) => {
          this.Movie = data;
this.loading=false;
this.spinner.hide();

          
        },
          (error) => { console.log(error) });}
        break;
        case 1:
        {
          this.MovieS.GetSeenMovie().subscribe((data: Array<MovieModel>) => {
            this.Movie = data;
this.loading=false;
this.spinner.hide();

          },
            (error) => { console.log(error) });
         
        }
          break;
          case 2:
        {
          this.MovieS.GetAllMovie().subscribe((data: Array<MovieModel>) => {
            this.Movie = data;
this.loading=false;
this.spinner.hide();


          },
            (error) => { console.log(error) });
        }
            break;

    }
  }
  
  ngOnInit(): void {
  
    this.loading=true;
    this.spinner.show(); 
     this.MovieS.GetToBeSeenMovie().subscribe((data: Array<MovieModel>) => {
      this.Movie = data;
this.loading=false;
this.spinner.hide(); },
(error) => { console.log(error) });
   


 


    
    // this.MovieS.GetMovieById("266079ca-e501-4b9d-91a5-cdcff8b6f2b9").subscribe((data: MovieModel) => {
    //   data.UrlData=environment.apiUrl+"/"+data.UrlData;
    //   this.testModel=data;
    //   console.log(data);
    //   // this.logined = false;
    //   // this.router.navigateByUrl('/user');
    // }, (error) => {

    //   console.log(error);
    //   // this.logined = false;
    //   // this.error = true;

    // });
    // this.testModel=new SimpleMovieModel();
    // this.testModel.UrlData=null;

  }


}
