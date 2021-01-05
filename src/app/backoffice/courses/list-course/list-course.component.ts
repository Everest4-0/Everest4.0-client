import { Course } from 'app/models/course/course';
import { CourseService } from './../../../services/courses/course.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.scss']
})
export class ListCourseComponent implements OnInit {

  public serverAddress = this.courseService.serverAddress;
  public courses: Array<Course> = []
  constructor(
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.courseService.all().subscribe(courses => this.courses = courses)
  }

}
