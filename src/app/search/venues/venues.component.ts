import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.css']
})
export class VenuesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() winningVenues: any;

}
