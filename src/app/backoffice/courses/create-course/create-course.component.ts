import { AuthService } from 'app/services/auth.service';
import { Evaluation } from './../../../models/diagnostic/evaluation';
import { EvaluationService } from './../../../services/evaluation.service';
import { Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';
import { CourseService } from './../../../services/courses/course.service';
import { CourseForm } from './../../forms/course.form';
import { Course } from 'app/models/course/course';
import { Component, OnInit } from '@angular/core';
import { Module } from 'app/models/course/module';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  public course: Course = new Course()
  public evaluations: Array<Evaluation> = []
  form = new CourseForm()
  private levels = [{ id: 0, text: 'Iniciante' }, { id: 1, text: 'Intermediário' }, { id: 2, text: 'Avançado' }]
  constructor(
    private auth: AuthService,
    private courseService: CourseService,
    private toast: ToastService,
    private evaluationService: EvaluationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.course.user = this.auth.user;
    this.evaluationService.all().subscribe(evaluations => this.evaluations = evaluations)
    this.course.modules.push(new Module())
  }


  onSubmit(f=null) {
    this.courseService.create(this.course).subscribe(course => {
      this.toast.success('novo curso cadastrado com o codigo ' + course.code + ' foi feito com successo', 'Sucesso', {
        timeOut: 5000,
        progressBar: true,
      })

      this.router.navigate(['/backoffice/courses/details/'+course.id]);
    })
  }

  addModule() {
    this.course.modules.push(new Module())
  }

  removeModule(index) {
    if (this.course.modules.length === 1) {
      return;
    }
    this.course.modules.splice(index, 1);
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.course.modules,
      event.previousIndex,
      event.currentIndex
    )
    this.course.modules.forEach((m, i) => m.orderNo = i)
  }

  onFileSelect(input) {
    debugger
    let reader = new FileReader();
    reader.onload = (e: any) => {
      let data = e.target.result;
      this.course.cover = e.target.result;
    }
    reader.readAsDataURL(input.files[0]);
  }

}
