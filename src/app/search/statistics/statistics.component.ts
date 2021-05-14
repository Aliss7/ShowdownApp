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

  @Input() teamStats : any;
  
  @Input() logos : any;

  defaultImage : string = "./../assets/images/logos/default.png";

}
