import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nextfour',
  templateUrl: './nextfour.component.html',
  styleUrls: ['./nextfour.component.css']
})
export class NextfourComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() nextFour: any;

}
