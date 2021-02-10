import { EvaluationService } from './../../../services/evaluation.service';
import { ToastService } from 'ng-uikit-pro-standard';
import { AuthService } from './../../../services/auth.service';
import { Enrollment } from './../../../models/course/enrollment';
import { EnrollmentService } from './../../../services/courses/enrollment.service';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from './../../../services/courses/course.service';
import { Course } from './../../../models/course/course';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-course',
  templateUrl: './details-course.component.html',
  styleUrls: ['./details-course.component.scss']
})
export class DetailsCourseComponent implements OnInit {

  public duration = 0;
  public course: Course = new Course();
  public relatedCourses: Array<Course> = [];
  public enrollment: Enrollment = new Enrollment();
  public serverAddress = this.courseService.serverAddress;
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

  loadCourse(id: string): void {
    this.relatedCourses = [];
    this.courseService.one(id).subscribe(course => {
      this.course = course;
      this.course.modules.sort((x,z)=>x.orderNo>z.orderNo ? 1 : -1).forEach(m => {
        m.activities = m.activities.sort((x, y) => x.orderNo > y.orderNo ? 1 : -1)
        m.activities.forEach(a => {
          this.duration += a.duration
        })
      })

      this.enrollment = course.enrollments.filter(enrollment => enrollment.userId === this.auth.user.id)[0]
      if (this.enrollment === undefined) {
        this.enrollment = new Enrollment();
      }
      this.enrollment.course = this.course;
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
    this.enrollment.course = this.course
    this.enrollmentService.create(this.enrollment).subscribe(enrollment => {
      this.enrollment = enrollment;
      this.toast.success('Parabens! Estás agora inscrito no curso ' + this.course.title, 'Sucesso', {
        timeOut: 5000,
        progressBar: true,
      })
    })

  }



  accordion(that) {
    that.classList.toggle("pe-7s-angle-up");
    that.classList.toggle("pe-7s-angle-down");

    var panel = document.getElementById(that.getAttribute('title'))
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }

  get courseDuration() {
    return this.course.modules.reduce((a, b) => a + b.activities.reduce((x, y) => x + y.duration, 0), 0);
  }


  get courseEvolution() {
    let i;
    let n = 0;
    
    this.course.modules.sort((x, y) => x.orderNo > y.orderNo ? 0 : -1).forEach(m => {
      m.activities.sort((x, y) => x.orderNo > y.orderNo ? 0 : -1).forEach(a => {
        n++;
        if (this.enrollment.activityId === a.id) {
          i = n -1
        }
      })
    })

    let f = (i ?? 1) * 100 / n;
    return f === Infinity ? 0 : f;
  }
}
