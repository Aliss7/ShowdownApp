import { Component, OnInit } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { HttpService } from '../http.service';

const teamNames = [ 'Western Bulldogs', 'West Coast', 'Sydney', 'St Kilda', 'Richmond', 'Port Adelaide', 'North Melbourne', 'Melbourne', 'Hawthorn', 'Greater Western Sydney', 'Gold Coast', 'Geelong', 'Fremantle', 'Essendon', 'Collingwood', 'Carlton', 'Brisbane Lions', 'Adelaide' ];

const teamIDs : { [key: string]: number }  = {
  'Western Bulldogs' : 18, 
  'West Coast': 17,
  'Sydney': 16,
  'St Kilda': 15,
  'Richmond': 14,
  'Port Adelaide': 13,
  'North Melbourne': 12,
  'Melbourne': 11,
  'Hawthorn': 10,
  'Greater Western Sydney': 9,
  'Gold Coast': 8,
  'Geelong': 7,
  'Fremantle': 6,
  'Essendon': 5,
  'Collingwood': 4,
  'Carlton': 3,
  'Brisbane Lions': 2,
  'Adelaide' : 1
}

const rivalries: { [key: string] : any } = {
  'Western Bulldogs' : [
    'Greater Western Sydney'
  ], 
  'West Coast':[
    'Fremantle'
  ],
  'Sydney': [
    'Greater Western Sydney'
  ],
  'St Kilda': [
    'Hawthorn',
    'Geelong'
  ],
  'Richmond': [
    'Carlton',
    'Collingwood',
    'Essendon'
  ],
  'Port Adelaide': [
    'Adelaide'
  ],
  'North Melbourne': [
    'Essendon',
    'Hawthorn'
  ],
  'Melbourne': [
    'Collinwood',
    'Essendon'
  ],
  'Hawthorn': [
    'Essendon',
    'Geelong',
    'North Melbourne',
    'St Kilda'
  ],
  'Greater Western Sydney': [
    'Sydney',
    'Western Bulldogs'
  ],
  'Gold Coast': [
    'Brisbane Lions'
  ],
  'Geelong': [
    'Hawthorn',
    'St Kilda'
  ],
  'Fremantle': [
    'West Coast'
  ],
  'Essendon': [
    'Carlton',
    'Collindwood',
    'Hawthorn',
    'Richmond',
    'North Melbourne'
  ],
  'Collingwood': [
    'Carlton',
    'Essendon',
    'Melbourne',
    'Richmond'
  ],
  'Carlton': [
    'Essendon',
    'Collingwood',
    'Richmond'
  ],
  'Brisbane Lions': [
    'Gold Coast'
  ],
  'Adelaide' : [
    'Port Adelaide'
  ]

}

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
    });

    this.http.fetchSeasonDetails().subscribe((data:any)=> {
      var seasonDetails = data["games"];
      teamID = teamIDs[this.teamName];
      this.gamesPlayed = seasonDetails.filter(this.filterGames); 
      this.winingVenues = this.gamesPlayed.filter(this.filterVenues);
    });

    this.http.fetchNextGame().subscribe((data:any)=> {
      var gameDetails = data["games"];
      teamID = teamIDs[this.teamName];
      this.nextGame = gameDetails.filter(this.getNextGame)[0];
      this.nextGameID = this.nextGame.id;

      var gameID: string = String(this.nextGameID);
      this.http.fetchPrediction(gameID).subscribe((data:any)=> {
        var predictions = data["tips"];
  
      });

    this.http.fetchNextFour().subscribe((data:any)=>{
      var nextFour = data["games"];
      this.nextFour = nextFour.filter(this.filterNextFour);
      console.log(this.nextFour)

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
