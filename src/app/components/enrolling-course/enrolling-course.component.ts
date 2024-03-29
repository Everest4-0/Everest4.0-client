
import { Activity } from 'app/models/course/activity';
import { ToastService } from 'ng-uikit-pro-standard';
import { EvaluationService } from 'app/services/evaluation.service';
import { EnrollmentService } from 'app/services/courses/enrollment.service';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'app/services/courses/course.service';
import { AuthService } from 'app/services/auth.service';
import { Enrollment } from 'app/models/course/enrollment';
import { Course } from 'app/models/course/course';
import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

import Swal from 'sweetalert2'
const BreakException = {};
@Component({
  selector: 'app-enrolling-course-component',
  templateUrl: './enrolling-course.component.html',
  styleUrls: ['./enrolling-course.component.scss']
})
export class EnrollingCourseComponent implements OnInit {

  public i = 0;
  public countDown: number;
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
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.enrollmentService.one(id).subscribe(enrollment => {
      this.enrollment = enrollment;
      if(this.enrollment.lastActivity===null){
        this.enrollment.lastActivity=new Activity()
      }
      this.loadCourse(enrollment.courseId)
    })

  }
  selectActivity(item) {
    if (item.status === 0) {
      return this.forbiden();
    }
    this.canActivate = false
    this.enrollment.lastActivity = item;
    
    if (this.enrollment.lastActivity.status === 2) {
      this.canActivate = true
    } else if (this.enrollment.lastActivity.attType === 3) {
      this.canActivate = false
    } else {
      const numbers = timer(this.enrollment.lastActivity.duration * 60 * 1000);
      numbers.subscribe(x => this.canActivate = true);
    }

  }

  forbiden() {
    Swal.fire(
      'Atenção!',
      'Para ter acesso a esse conteudo deve concluir a actividade anterior',
      'error'
    )
  }
  nextActivity(e = null) {
    if (e !== null) {
      this.canActivate = true
    }
    
    try {
      this.course.modules.forEach(m => {
        if (m.activities.filter(x => x.i === this.enrollment.lastActivity.i)[0]) {
          m.activities.filter(x => x.i === this.enrollment.lastActivity.i)[0].status = 2
        }

        if (m.activities.filter(x => x.i === this.enrollment.lastActivity.i + 1)[0]) {
          m.activities.filter(x => x.i === this.enrollment.lastActivity.i + 1)[0].status = 1
        }
        //m.activities.filter(x => x.i === this.enrollment.lastActivity.i + 1)[0].status = 1
        m.activities.forEach(a => {
          if (a.i === this.enrollment.lastActivity.i + 1) {
            this.selectActivity(a)
            throw BreakException;
          }
        })

      })
    } catch (e) {
      if (e !== BreakException) throw e;
    }

    if (this.enrollment.lastActivity.status === 2) {
      return;
    }
    this.enrollmentService.update(this.enrollment).subscribe(enrollment => {
      
      this.toast.success('Actividade ' + (this.enrollment.lastActivity.i + 1) + ' -  ' + this.enrollment.lastActivity.title, 'Sucesso', {
        timeOut: 5000,
        progressBar: true,
      })
    })
  }
  prevActivity() {

  }
  loadCourse(id: string): void {

    this.courseService.one(id).subscribe(course => {
    
      course.modules.sort((x,z)=>x.orderNo>z.orderNo ? 1 : -1).forEach(m => {
        m.activities = m.activities.sort((x, y) => x.orderNo > y.orderNo ? 1 : -1)
        m.activities.forEach(a => {
          a.i = this.i++;
          if (this.enrollment.lastActivity.id === undefined) {
            this.selectActivity(a)
          }
          if (a.id === this.enrollment.lastActivity.id) {
            a.status = 1;
            this.enrollment.lastActivity.status = 1;

            this.selectActivity(a)
          } else if (this.enrollment.lastActivity.status !== 1) {
            a.status = 2;
          } else {
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

  get courseEvolution() {
    let i;
    let n = 0;
    
    this.course.modules.sort((x, y) => x.orderNo > y.orderNo ? 0 : -1).forEach(m => {
      m.activities.sort((x, y) => x.orderNo > y.orderNo ? 0 : -1).forEach(a => {
        n++;
        if (this.enrollment.activityId === a.id) {
          i = n
        }
      })
    })

    let f = (i ?? 1) * 100 / n;
    return f === Infinity ? 0 : f;
  }
}
