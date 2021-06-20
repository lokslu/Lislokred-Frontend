export class StateAndRateModel
{
    
    constructor(Id:string,State:boolean=null,Rate:number=null) {
        this.MovieId=Id;
        this.Rate=Rate;
        this.State=State;
    }
    MovieId:string;
    State:boolean
    Rate:number
}