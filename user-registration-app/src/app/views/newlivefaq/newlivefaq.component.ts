import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-newlivefaq',
  templateUrl: './newlivefaq.component.html',
  styleUrls: ['./newlivefaq.component.css']
})
export class NewlivefaqComponent implements OnInit {

  constructor() { }

  @Input() question: string;
  @Input() answer: string;

  ngOnInit(): void {
  }

 
}
