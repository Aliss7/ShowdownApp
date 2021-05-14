import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pastmatches',
  templateUrl: './pastmatches.component.html',
  styleUrls: ['./pastmatches.component.css']
})
export class PastmatchesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() matches : any;

}
