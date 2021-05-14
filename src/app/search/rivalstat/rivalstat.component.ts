import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rivalstat',
  templateUrl: './rivalstat.component.html',
  styleUrls: ['./rivalstat.component.css']
})
export class RivalstatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() rivalStats: any;
  @Input() rivalMatches: any;
  @Input() logos: any;

}
