import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.scss']
})
export class BusinessCardComponent implements OnInit {

  @Input() title:string;
  @Input() img:string;  

  constructor() { }

  ngOnInit(): void {
  }

}
