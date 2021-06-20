import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment'
import { StateAndRateModel } from 'src/Models/StateAndRateModel';

@Injectable()
export class MovieService {

  public readonly apiString = environment.apiUrl;
  constructor(private router: Router,
    private httpClient: HttpClient
  ) { }

  public GetMovieById(IdMovie: string) {
    let url: string = this.apiString + '/api/Movies/' + IdMovie;
    return this.httpClient.get(url);
  }
  public GetMovieFullInformatin(IdMovie: string) {
    let url: string = this.apiString + '/api/Movies/FullInformation/' + IdMovie;
    return this.httpClient.get(url);
  }

  public GetFilmingUnitsByMovieId(IdMovie: string) {
    let url: string = this.apiString + '/api/FilmingUnit/' + IdMovie;
    return this.httpClient.get(url);

  }

  public GetToBeSeenMovie() {
    let url: string = this.apiString + '/api/Movies/ToBeSeenMovie';
    return this.httpClient.get(url);
  
  }

  public GetSeenMovie() {
    let url: string = this.apiString + '/api/Movies/SeenMovie';
    return this.httpClient.get(url);
  }
  public GetAllMovie() {
    let url: string = this.apiString + '/api/Movies/All';
    return this.httpClient.get(url);
  }

  public ChangeRate(reletion: StateAndRateModel) {
    let url: string = this.apiString + '/api/StateAndRate/ChangeRate';
    return this.httpClient.put(url, reletion);
  }

  public DeleteState(MovieId: string) {
    const params = new HttpParams()
      .set("MovieId", MovieId);
    let url: string = this.apiString + '/api/StateAndRate/RemoveReletion';
    return this.httpClient.delete(url, { params });
  }
  public UpdateState(reletion: StateAndRateModel) {
    let url: string = this.apiString + '/api/StateAndRate/UpdateReletion';
    return this.httpClient.put(url, reletion);
  }
  public AddState(reletion: StateAndRateModel) {
    let url: string = this.apiString + '/api/StateAndRate/AddReletion';
    return this.httpClient.post(url, reletion);
  }


  public Serch(MovieName: string) {
    let url: string = this.apiString + '/api/Movies/serch/' + MovieName;
    return this.httpClient.get(url);
  }
  public SerchImages(MovieIdtt: string) {
    const myHeaders = new HttpHeaders()
      .set('x-rapidapi-key', '18ac0e848bmshdcdd1986cfada8bp1b31a9jsn42348ff61ca1')
      .set('x-rapidapi-host', 'imdb8.p.rapidapi.com');
    return this.httpClient.get("https://imdb8.p.rapidapi.com/title/get-images?tconst=" + MovieIdtt + "&limit=25", { headers: myHeaders });
  }
}
