import { Component, OnInit } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { HttpService } from '../http.service';

const teamNames = [ 'Western Bulldogs', 'West Coast', 'Sydney', 'St Kilda', 'Richmond', 'Port Adelaide', 'North Melbourne', 'Melbourne', 'Hawthorn', 'Greater Western Sydney', 'Gold Coast', 'Geelong', 'Fremantle', 'Essendon', 'Collingwood', 'Carlton', 'Brisbane Lions', 'Adelaide' ];

const teamID = {
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

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private http: HttpService) {
  }

  teamResults: any;

  ngOnInit(): void {
  }

  teamName = "";


  getStats() {
    this.http.sendGetRequest().subscribe((data: any) => {
      console.log(data);
      this.teamResults = data["standings"];
    })
  }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : teamNames.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )


}
