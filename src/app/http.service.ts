import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiUrl = "https://api.squiggle.com.au/?q=standings";
  constructor(private httpClient: HttpClient) { }

  public sendPostRequest(data: Object): Observable<Object> {
    return this.httpClient.post(this.apiUrl, data);
  }

  public sendGetRequest(){
    var data = new FormData();
    data.append('q', 'standings');
    return this.httpClient.post(this.apiUrl, data);
  }
}