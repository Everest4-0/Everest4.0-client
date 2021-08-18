import { Course } from 'app/models/course/course';
import { CourseService } from '../../../services/courses/course.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-course',
  templateUrl: './list-course-backoffice.component.html',
  styleUrls: ['./list-course-backoffice.component.scss']
})
export class ListCourseBackOfficeComponent implements OnInit {

  public serverAddress = this.courseService.serverAddress;
  public courses: Array<Course> = []
  constructor(
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.courseService.all().subscribe(courses => this.courses = courses)
  }

}
