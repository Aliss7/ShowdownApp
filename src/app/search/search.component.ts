import { Component, OnInit } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { HttpService } from '../http.service';
import  *  as  data  from  '../../afl_config.json';

const teamNames = data.team_list;

const teamIDs : { [key: string]: number }  = data.team_ids;

const rivalries: { [key: string] : any } = data.rivals;

let teamID : number = 0;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor( private http: HttpService ) {
  }

  teamResults: any;
  teamPrediction: any;
  gamesPlayed: any;
  nextGameID: any;
  nextGame: any;
  winingVenues: any;
  nextFour: any;

  ngOnInit(): void {
  }

  teamName = "";
  

  filterGames(game:any, index:any, array:any){
    if(game.ateamid == teamID || game.hteamid == teamID && game.round<20){
      return game;
    }
    
  }
  getNextGame(game:any, index:any, array:any){
    if(game.ateamid == teamID || game.hteamid == teamID){
      return game;
    }
    
  }

  filterVenues(game:any, index:any, array:any){
    if(game.winnerteamid == teamID){
      return game;
    }
  }

  filterNextFour(game:any, index:any, array:any){
    if(game.ateamid == teamID || game.hteamid == teamID){
      if(game.round>=20){
      return game;
    }
  }
    
  }

  getStats() {
    this.http.fetchLeaderboard().subscribe((data: any) => {
      this.teamResults = data["standings"];
      console.log("team results",this.teamResults);
    });

    this.http.fetchSeasonDetails().subscribe((data:any)=> {
      var seasonDetails = data["games"];
      teamID = teamIDs[this.teamName];
      this.gamesPlayed = seasonDetails.filter(this.filterGames); 
      this.winingVenues = this.gamesPlayed.filter(this.filterVenues);
      console.log("games played",this.gamesPlayed);
      console.log("winning venues",this.winingVenues);
    });

    this.http.fetchNextGame().subscribe((data:any)=> {
      var gameDetails = data["games"];
      teamID = teamIDs[this.teamName];
      this.nextGame = gameDetails.filter(this.getNextGame)[0];
      console.log("next game",this.nextGame);
      this.nextGameID = this.nextGame.id;

      var gameID: string = String(this.nextGameID);
      this.http.fetchPrediction(gameID).subscribe((data:any)=> {
        var predictions = data["tips"];
        console.log("predictions",predictions);
  
      });

    this.http.fetchNextFour().subscribe((data:any)=>{
      var nextFour = data["games"];
      this.nextFour = nextFour.filter(this.filterNextFour);
      console.log("next four games",this.nextFour)

    })

    });

  }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : teamNames.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )


}
