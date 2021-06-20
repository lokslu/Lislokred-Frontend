import { GanreModel } from "./GanreModel";

export class MovieFullInformationModel {
  Id:string;
  Name:string;
  Description:string;
  UrlData:string;
  State?:boolean;
  Rate?:number;
  Genres: GanreModel[];

}