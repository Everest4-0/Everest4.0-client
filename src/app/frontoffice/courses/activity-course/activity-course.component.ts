import { Activity } from './../../../models/course/activity';
import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-activity-course',
  templateUrl: './activity-course.component.html',
  styleUrls: ['./activity-course.component.css']
})
export class ActivityCourseComponent implements OnInit {

  @Input() public activity: Activity;

  public youtube;
  constructor(
    private hostElement: ElementRef) { }

  ngOnInit(): void {
    debugger
    if (this.activity.attachment && this.activity.attachment.split('you').length > 1) {
      this.youtube=true;
      const iframe = this.hostElement.nativeElement.querySelector('iframe');
      iframe.src = this.activity.attachment + '?controls=0';
      
    }
  }

}
