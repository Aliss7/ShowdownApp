import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Input() queryTeamName : any;

}
