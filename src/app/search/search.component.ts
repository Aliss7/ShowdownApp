import { Component, OnInit } from '@angular/core';

import { HttpService } from '../http.service';
import  *  as  data  from  '../../afl_config.json';

const teamNames = data.team_list;
const teamIDs : { [key: string]: number }  = data.team_ids;
const rivals: { [key: string] : any } = data.rivals;
const leaderboardCount : number = data.leaderboard;
const playerTopN: number = data.player_top_n;
const teamLogos: { [key: string]: string }  = data.team_logos;
const tips: number = data.tips;
let teamID: number = 0;
let rivalID: number = 0;
let teamName: string = '';
let rivalName: string = '';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor( private http: HttpService ) {
  }

  topTeamResults: any;
  leaderboard: any;
  teamPrediction = {
    confidence: "",
    opponent_confidence: ""
  };
  gamesPlayed: any;
  nextGameID: any;
  nextGame: { [key: string]: number|string } = {
    abehinds: 0,
    agoals: 0,
    ascore: 0,
    ateam: "",
    ateamid: 0,
    complete: 0,
    date: "",
    hbehinds: 0,
    hgoals: 0,
    hscore: 0,
    hteam: "",
    hteamid: 0,
    id: 0,
    is_final: 0,
    is_grand_final: 0,
    localtime: "",
    query: "",
    query_goals: 0,
    query_ha: "",
    query_opponent: "",
    query_opponent_goals: 0,
    round: 0,
    roundname: "",
    tz: "",
    updated: "",
    venue: "",
    winner: 0,
    winnerteamid: 0,
    year: 0
  };
  winningVenues: any;
  nextFour: any;
  teamList: any = teamNames;
  teamStats: { [key: string]: number|string } = {
    draws:"",
    goals_for:"",
    for:"",
    behinds_against:"",
    name:"",
    wins:"",
    played:"",
    pts:"",
    against:"",
    losses:"",
    behinds_for:"",
    percentage: "",
    goals_against:"",
    id:"",
    rank:""
  };
  rivalStats:{ [key: string]: number|string } = {
    draws:"",
    goals_for:"",
    for:"",
    behinds_against:"",
    name:"",
    wins:"",
    played:"",
    pts:"",
    against:"",
    losses:"",
    behinds_for:"",
    percentage: "",
    goals_against:"",
    id:"",
    rank:""
  };
  rivalMatches: any;
  teamids: any = teamIDs;
  logos: any = teamLogos;
  tid: any;
  teamName: any;
  players: any;

  ngOnInit(): void {
    teamID = 1;
    teamName = teamNames[teamID-1];
    rivalName = rivals[teamName];
    rivalID = teamIDs[rivalName];

    this.getStats(1);
  }
  
  


  filterGames(game:any, index:any, array:any){
    if((game.agoals && game.hgoals) && (game.ateamid == teamID || game.hteamid == teamID)){
      if(game.ateamid == teamID){
        game["query"] = game.ateam ;
        game["query_opponent"] = game.hteam ;
        game["query_ha"] = "A";
        game["query_opponent_goals"] = game.hgoals;
        game["query_goals"] = game.agoals
      }
      else if(game.hteamid == teamID){
        game["query"] = game.hteam ;
        game["query_opponent"] = game.ateam ;
        game["query_ha"] = "H";
        game["query_opponent_goals"] = game.agoals;
        game["query_goals"] = game.hgoals
      }
      return game;
    }
    
  }

  formatTips(tips:any, index:any, array:any){
    if(tips.ateamid == teamID || tips.hteamid == teamID){
      if(tips.ateamid == teamID){
        tips["query_opponent"] = tips.hteam ;
        tips["query_ha"] = "A";
        tips["query_opponent_cf"] = parseFloat(tips.hconfidence);
        tips["query_cf"] = parseFloat(tips.confidence)
        tips["query_margin"] = parseFloat(tips.margin)
        tips["query_opponent_margin"] = parseFloat(tips.hmargin)
      }
      else if(tips.hteamid == teamID){
        tips["query_opponent"] = tips.ateam ;
        tips["query_ha"] = "H";
        tips["query_opponent_cf"] = parseFloat(tips.confidence);
        tips["query_cf"] = parseFloat(tips.hconfidence)
        tips["query_margin"] = parseFloat(tips.hmargin)
        tips["query_opponent_margin"] = parseFloat(tips.margin)
      }
      return tips;
    }
  }

  getNextGame(game:any, index:any, array:any){
    if(game.ateamid == teamID || game.hteamid == teamID){
      if(game.ateamid == teamID){
        game["query"] = game.ateam ;
        game["query_opponent"] = game.hteam ;
        game["query_ha"] = "A";
        game["query_opponent_goals"] = game.hgoals;
        game["query_goals"] = game.agoals
      }
      else if(game.hteamid == teamID){
        game["query"] = game.hteam ;
        game["query_opponent"] = game.ateam ;
        game["query_ha"] = "H";
        game["query_opponent_goals"] = game.agoals;
        game["query_goals"] = game.hgoals
      }
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
        if(game.ateamid == teamID){
          game["query_team"] = game.ateam;
          game["query_opponent"] = game.hteam ;
          game["query_ha"] = "A";
        }
        else if(game.hteamid == teamID){
          game["query_team"] = game.hteam;
          game["query_opponent"] = game.ateam ;
          game["query_ha"] = "H";
        }
      return game;
    }
  }
    
  }

  filterRival(game:any, index:any, array:any){
    if((game.ateamid == teamID && game.hteamid == rivalID) || 
    (game.hteamid == teamID && game.ateamid == rivalID)){
        if(game.ateamid == teamID){
          game["query_team"] = game.ateam;
          game["query_opponent"] = game.hteam ;
          game["query_ha"] = "A";
        }
        else if(game.hteamid == teamID){
          game["query_team"] = game.hteam;
          game["query_opponent"] = game.ateam ;
          game["query_ha"] = "H";
        }
      return game;
  }
    
  }


  getStats(flag: number) {
    if(flag == 0){
      teamID = this.tid;
      teamName = teamNames[teamID-1];
      rivalName = rivals[teamName];
      rivalID = teamIDs[rivalName];
    }
    
    //console.log(teamID, teamName, rivalID, rivalName);

    this.http.fetchLeaderboard().subscribe((data: any) => {
      this.leaderboard = data["standings"]
      this.topTeamResults = this.leaderboard.slice(0,leaderboardCount);
      for(const team of this.leaderboard){
        if(team["id"]==teamID){
          this.teamStats = team;
        }
        else if(team["id"]==rivalID){
          this.rivalStats = team
        }
      }

      //console.log("All team results",this.topTeamResults);
      //console.log("Selected Team Results",this.teamStats);
      //console.log("Rival Statistics",this.rivalStats);


    });

    this.http.fetchSeasonDetails().subscribe((data:any)=> {
      var seasonDetails = data["games"];
      
      this.gamesPlayed = seasonDetails.filter(this.filterGames); 
      this.winningVenues = this.gamesPlayed.filter(this.filterVenues);
      this.rivalMatches = this.gamesPlayed.filter(this.filterRival);

      //console.log("games played",this.gamesPlayed);
      //console.log("winning venues",this.winningVenues);
      //console.log("rival matches",this.rivalMatches);

    });

    if(flag==0){
      this.http.fetchPlayers(this.tid).subscribe((data:any)=> {
      this.players = data["pav"].sort((a: any, b: any) => 
      (a.PAV_total > b.PAV_total ? -1 : 1)).slice(0,playerTopN);
      //console.log("players",this.players);
    });
    }
    else{
      this.http.fetchPlayers(teamID.toString()).subscribe((data:any)=> {
        this.players = data["pav"].sort((a: any, b: any) => 
        (a.PAV_total > b.PAV_total ? -1 : 1)).slice(0,playerTopN);
        //console.log("players",this.players);
      });
    }

    this.http.fetchNextGame().subscribe((data:any)=> {
      var gameDetails = data["games"];

      this.nextGame = gameDetails.filter(this.getNextGame)[0];

      //console.log("next game",this.nextGame);
      
      this.nextGameID = this.nextGame.id;

      var gameID: string = String(this.nextGameID);
      this.http.fetchPrediction(gameID).subscribe((data:any)=> {
        var predictions = data["tips"].filter(this.formatTips);
        var teamConfidence = predictions.reduce((sum: number, current: any) =>
         sum + current.query_cf, 0.0)/tips;

        this.teamPrediction["confidence"] = teamConfidence.toFixed(2).toString();
        let opponentConfidence = 100 - teamConfidence;
        this.teamPrediction["opponent_confidence"] = opponentConfidence.toFixed(2).toString();

        //console.log("predictions",predictions);
        //console.log("team confidence",teamConfidence);
        //console.log("opponent confidence",opponentConfidence);
  
      });

    this.http.fetchNextFour().subscribe((data:any)=>{
      var nextFour = data["games"];
      this.nextFour = nextFour.filter(this.filterNextFour);
      //console.log("next four games",this.nextFour)

    })

    });

  }

}
