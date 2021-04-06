import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-selector-item',
  templateUrl: './card-selector-item.component.html',
  styleUrls: ['./card-selector-item.component.scss']
})
export class CardSelectorItemComponent implements OnInit {

  @Input() title: string;
  @Input() img: string;  

  constructor() { }

  ngOnInit(): void {
  }

}
