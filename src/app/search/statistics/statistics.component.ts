import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() teamStats : { [key: string]: number|string|null } = {
    draws:null,
    goals_for:null,
    for:null,
    behinds_against:null,
    name:null,
    wins:null,
    played:null,
    pts:null,
    against:null,
    losses:null,
    behinds_for:null,
    percentage: null,
    goals_against:null,
    id:null,
    rank:null
  };

}
