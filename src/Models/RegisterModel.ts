import { GanreModel } from "./GanreModel";

export class RegisterModel
{
    Nickname:string;
    Email:string;
    Password:string;
    Gender?:boolean;
    FavoriteGenres: GanreModel[];
 
}