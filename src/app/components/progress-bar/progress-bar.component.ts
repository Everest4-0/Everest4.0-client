import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
  @Input() done;
  @Input() showLabel:boolean =false;
  get pbColor(){
    let pbColor;
    if (this.done < 50) {
     pbColor = 'danger';
    }
    else if (this.done < 60) {
     pbColor = 'warning';
    }
    else if (this.done < 70) {
     pbColor = '';
    }
    else if (this.done < 80) {
     pbColor = 'info';
    }
    else {
     pbColor = 'success';
    }
    return pbColor;
  } 
  get label(){
    return this.showLabel ? this.done +'%' : ''
  }
  constructor() { }

  ngOnInit(): void {
    

  }
  
}
