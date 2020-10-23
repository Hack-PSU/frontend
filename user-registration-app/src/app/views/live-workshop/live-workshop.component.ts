import { Component, OnInit,Input } from '@angular/core';


declare var $: any;

@Component({
  selector: 'app-live-workshop',
  templateUrl: './live-workshop.component.html',
  // providers: [LiveUpdatesService],
  styleUrls: ['./live-workshop.component.css']
})

export class LiveWorkshopComponent implements OnInit {
    @Input() title: String;
    @Input() descrip: String;
    @Input() date: String;
    @Input() time: String;
    @Input() link: String;
    @Input() presenter1img: String;
    @Input() presenter1Name: String;
    @Input() presenter2img: String;
    @Input() presenter2Name: String;
    @Input() presenter3img: String;
    @Input() presenter3Name: String;
    @Input() collapseID: String;




    constructor() {}

    ngOnInit() {

      if( !this.presenter3Name || !this.presenter3img){
        var elem = document.getElementById("presenter3");
        elem.parentNode.removeChild(elem);
      }

      if( !this.presenter2Name || !this.presenter2img){
        var elem = document.getElementById("presenter2");
        elem.parentNode.removeChild(elem);
      }

      if( !this.presenter1Name || !this.presenter1img){
        var elem = document.getElementById("presenter1");
        elem.parentNode.removeChild(elem);
      }

      var elementHeader = "#module #" + this.collapseID +".collapse:not(.show) {";
 
      // Create our stylesheet
      var style = document.createElement('style');
      style.innerHTML =
        elementHeader +
          'display: block;' +
          'height: 4.6rem;' +
          'overflow: hidden;' +
        '}';

      // Get the first script tag
      var ref = document.querySelector('script');

      // Insert our new styles before the first script tag
      ref.parentNode.insertBefore(style, ref);


      elementHeader = "#module #" + this.collapseID +".collapsing {";

      // Create our stylesheet
      var style = document.createElement('style');
      style.innerHTML =
        elementHeader +
          'height: 4.6rem;' +
        '}';

      // Get the first script tag
      var ref = document.querySelector('script');

      // Insert our new styles before the first script tag
      ref.parentNode.insertBefore(style, ref);
    }
}