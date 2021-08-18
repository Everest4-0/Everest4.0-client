import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router, ActivatedRoute } from '@angular/router';
import { EvaluationService } from '../../../services/evaluation.service';
import { ToastService } from 'ng-uikit-pro-standard';
import { CourseService } from '../../../services/courses/course.service';
import { AuthService } from 'app/services/auth.service';
import { CourseForm } from '../../forms/course.form';
import { Evaluation } from '../../../models/diagnostic/evaluation';
import { Course } from 'app/models/course/course';
import { Component, OnInit } from '@angular/core';
import { Module } from 'app/models/course/module';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.scss']
})
export class UpdateCourseComponent implements OnInit {

  public course: Course = new Course()
  public nCourse: Course = new Course()
  public evaluations: Array<Evaluation> = []
  form = new CourseForm()
  public levels = [{ id: 0, text: 'Iniciante' }, { id: 1, text: 'Intermediário' }, { id: 2, text: 'Avançado' }]
  constructor(
    public auth: AuthService,
    private courseService: CourseService,
    private toast: ToastService,
    private evaluationService: EvaluationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.params['id'];
    this.courseService.one(id).subscribe(course => {
      course.modules = course.modules.filter(x => x.orderNo > -1 && x.orderNo < 100)
      this.course = course
      this.nCourse = course
    })
    this.evaluationService.all().subscribe(evaluations => this.evaluations = evaluations)
  }


  saveForm() {
    this.courseService.update(this.nCourse).subscribe(course => {
      this.toast.success('novo curso cadastrado com o codigo ' + course.code + ' foi feito com successo', 'Sucesso', {
        timeOut: 5000,
        progressBar: true,
      })

      this.router.navigate(['/backoffice/courses/details/' +course.id]);
    })
  }

  addModule() {
    this.nCourse.modules.push(new Module())
  }

  removeModule(index) {
    if (this.nCourse.modules.length === 1) {
      return;
    }
    this.nCourse.modules.splice(index, 1);
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.nCourse.modules,
      event.previousIndex,
      event.currentIndex
    )
    this.nCourse.modules.forEach((m, i) => m.orderNo = i)
  }

  onFileSelect(input) {

    let reader = new FileReader();
    reader.onload = (e: any) => {
      let data = e.target.result;
      this.nCourse.cover = e.target.result;
    }
    reader.readAsDataURL(input.files[0]);
  }
}
