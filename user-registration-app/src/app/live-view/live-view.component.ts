import { Component, OnInit} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

import { HttpService } from '../HttpService';

declare var $: any;

@Component({
  selector: 'app-live-view',
  templateUrl: './live-view.component.html',
  styleUrls: ['./live-view.component.css'],
  providers: [HttpService],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ transform: 'scale(0)', opacity: 0 }),
          animate('500ms', style({ transform: 'scale(1)', opacity: 1 })),
        ]),
        transition(':leave', [
          style({ transform: 'scale(1)', opacity: 1 }),
          animate('500ms', style({ transform: 'scale(0)', opacity: 0 })),
        ]),
      ],
    ),
  ],
})
export class LiveViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      $('.materialboxed').materialbox();
    });
  }

}

//const second = 1000,
      //minute = second * 60,
      //hour = minute * 60,

//let countDown = new Date('Apr 08, 2018 12:00:00').getTime(),
    //x = setInterval(function() {

      //let now = new Date().getTime(),
          //distance = countDown - now;

        //document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour)),
        //document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute)),
        //document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);

    //}, second)
