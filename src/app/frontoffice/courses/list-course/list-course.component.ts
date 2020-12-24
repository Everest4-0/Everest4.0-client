import { Enrollment } from './../../../models/course/enrollment';
import { EnrollmentService } from './../../../services/courses/enrollment.service';
import { Course } from './../../../models/course/course';
import { CourseService } from './../../../services/courses/course.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.scss']
})
export class ListCourseComponent implements OnInit {


  public searchFor = '';
  public courses: Array<Course> = []
  public enrollments: Array<Enrollment> = []
  public searchResult: Array<Course> = []
  constructor(
    private auth: AuthService,
    public courseService: CourseService,
    private enrollmentService: EnrollmentService
  ) { }

  ngOnInit(): void {
    this.courseService.all({}).subscribe(courses => {
      this.courses = courses
    })
    debugger
    this.enrollmentService.all({ userId: this.auth.user.id }).subscribe(enrollments => { 
      debugger
      this.enrollments = enrollments
     })
  }
  search(value) {
    this.searchFor = value
    if (this.searchFor.length > 3) {
      this.courseService.all({$filter:this.searchFor}).subscribe(courses => {
        this.searchResult = courses
      })
    }
  }
}