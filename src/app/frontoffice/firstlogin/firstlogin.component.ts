import { Component, OnInit, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-firstlogin',
  templateUrl: './firstlogin.component.html',
  styleUrls: ['./firstlogin.component.css']
})
export class FirstloginComponent implements OnInit {

  @Output() dismiss = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  close(){
    this.dismiss.emit('');
  }
}
