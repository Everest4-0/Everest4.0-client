import { Activity } from './../../../models/course/activity';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-activity-course',
  templateUrl: './activity-course.component.html',
  styleUrls: ['./activity-course.component.css']
})
export class ActivityCourseComponent implements OnInit {

  @Input() public  activity:Activity;

  constructor() { }

  ngOnInit(): void {
  }

}
