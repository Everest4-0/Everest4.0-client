import { Activity } from './../../../models/course/activity';
import { ToastService } from 'ng-uikit-pro-standard';
import { EvaluationService } from './../../../services/evaluation.service';
import { EnrollmentService } from './../../../services/courses/enrollment.service';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from './../../../services/courses/course.service';
import { AuthService } from 'app/services/auth.service';
import { Enrollment } from './../../../models/course/enrollment';
import { Course } from './../../../models/course/course';
import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-enrolling-course',
  templateUrl: './enrolling-course.component.html',
  styleUrls: ['./enrolling-course.component.scss']
})
export class EnrollingCourseComponent implements OnInit {

  public canActivate: boolean = false;
  public course: Course = new Course();
  public relatedCourses: Array<Course> = [];
  public enrollment: Enrollment = new Enrollment();
  public serverAddress = this.courseService.serverAddress;
  public currentActivity: Activity = new Activity();
  constructor(
    private auth: AuthService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private enrollmentService: EnrollmentService,
    private evaluationService: EvaluationService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {


    const id = this.route.snapshot.params['id'];
    debugger
    this.enrollmentService.one(id).subscribe(enrollment => this.loadCourse(enrollment.courseId))
  }
  selectActivity(item) {
    if(item.status===0) {
      return;
    }
    this.enrollment.lastActivity = item;
    const numbers = timer(this.enrollment.lastActivity.duration * 1000);
    numbers.subscribe(x => this.canActivate = true);
  }

  nextActivity() {
  }
  prevActivity() {

  }
  loadCourse(id: string): void {

    this.courseService.one(id).subscribe(course => {
      course.modules.forEach(m => {
        m.activities = m.activities.sort((x, y) => x.orderNo > y.orderNo ? 1 : -1)
        m.activities.forEach(a => {
          if (this.enrollment.lastActivity.id === undefined) {
            this.enrollment.lastActivity = a;
          }
          if (a.id === this.enrollment.lastActivity.id) {
            a.status = 1;
            this.enrollment.lastActivity.status = 1;
          } else if (this.enrollment.lastActivity.status !== 1) {
            a.status = 2;
          }else{
            a.status = 0;
          }
        })
      })
      this.course = course;
      this.enrollment.course = this.course;
      this.enrollment.user = this.auth.user;
    })
  }
  get enrolled() {
    return this.course.enrollments.filter(enrollment => enrollment.userId === this.auth.user.id).length > 0
  }
  enroll() {
    this.enrollmentService.create(this.enrollment).subscribe(enrollment => {
      this.enrollment = enrollment;
      this.toast.success('Parabens! Estás agora inscrito no curso ' + this.course.title, 'Sucesso', {
        timeOut: 5000,
        progressBar: true,
      })
    })

  }
}
