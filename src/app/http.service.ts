import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiUrl = "https://api.squiggle.com.au/";
  constructor(private httpClient: HttpClient) { }

  public sendPostRequest(data: Object): Observable<Object> {
    return this.httpClient.post(this.apiUrl, data);
  }

  public fetchNextGame(): Observable<Object> {
    var data = new FormData();
    data.append('q', 'games');
    data.append('year', '2021');
    data.append('round','20');
    return this.httpClient.post(this.apiUrl, data);
  }

  public fetchNextFour(): Observable<Object> {
    var data = new FormData();
    data.append('q', 'games');
    data.append('year', '2021');
    return this.httpClient.post(this.apiUrl, data);
  }

  public fetchPrediction(id: string): Observable<Object> {
    var data = new FormData();
    data.append('q', 'tips');
    data.append('game', id);
    return this.httpClient.post(this.apiUrl, data);
  }

  public fetchSeasonDetails(): Observable<Object> {
    var data = new FormData();
    data.append('q', 'games');
    data.append('year', '2021');
    return this.httpClient.post(this.apiUrl, data);
  }

  public fetchLeaderboard(): Observable<Object> {
    var data = new FormData();
    data.append('q', 'standings');
    return this.httpClient.post(this.apiUrl, data);
  }
}