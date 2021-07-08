import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-live-faq',
  templateUrl: './live-faq.component.html',
  styleUrls: ['./live-faq.component.css']
})
export class LiveFaqComponent implements OnInit {

  @Input() question: string;
  @Input() answer: string;

  constructor() { }

  ngOnInit(): void {
  }

}
