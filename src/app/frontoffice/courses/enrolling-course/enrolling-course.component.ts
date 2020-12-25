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

@Component({
  selector: 'app-enrolling-course',
  templateUrl: './enrolling-course.component.html',
  styleUrls: ['./enrolling-course.component.scss']
})
export class EnrollingCourseComponent implements OnInit {

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
    this.loadCourse(id)
  }
  selectActivity(item) {
    this.currentActivity = item;
  }

  nextActivity(){
    
  }
  prevActivity(){
    
  }
  loadCourse(id: string): void {
    this.relatedCourses = [];
    this.courseService.one(id).subscribe(course => {
      this.course = course;
      this.enrollment.course = this.course;
      this.enrollment.user = this.auth.user;
      this.course.evaluations.forEach(e => {
        this.evaluationService.one(e.id).subscribe(ev => {
          ev.courses.forEach(c => {
            if (this.relatedCourses.filter(r => r.id === c.id).length === 0 && c.id !== id) {
              this.relatedCourses.push(c);
            }
          })
        })
      })
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
