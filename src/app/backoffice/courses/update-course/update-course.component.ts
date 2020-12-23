import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router, ActivatedRoute } from '@angular/router';
import { EvaluationService } from './../../../services/evaluation.service';
import { ToastService } from 'ng-uikit-pro-standard';
import { CourseService } from './../../../services/courses/course.service';
import { AuthService } from 'app/services/auth.service';
import { CourseForm } from './../../forms/course.form';
import { Evaluation } from './../../../models/diagnostic/evaluation';
import { Course } from 'app/models/course/course';
import { Component, OnInit } from '@angular/core';
import { Module } from 'app/models/course/module';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {

  public course: Course = new Course()
  public evaluations: Array<Evaluation> = []
  form = new CourseForm()
  private levels = [{ id: 0, text: 'Iniciante' }, { id: 1, text: 'Intermediário' }, { id: 2, text: 'Avançado' }]
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
      this.course = course
    })
    this.evaluationService.all().subscribe(evaluations => this.evaluations = evaluations)
  }


  saveForm() {
    this.courseService.update(this.course).subscribe(course => {
      this.toast.success('novo curso cadastrado com o codigo ' + course.code + ' foi feito com successo', 'Sucesso', {
        timeOut: 5000,
        progressBar: true,
      })

      this.router.navigate(['/backoffice/courses']);
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
    this.course.modules[event.previousIndex].order = event.currentIndex;
    moveItemInArray(
      this.course.modules,
      event.previousIndex,
      event.currentIndex
    )
    this.course.modules[event.previousIndex].order = event.currentIndex;
  }

  onFileSelect(input) {

    let reader = new FileReader();
    reader.onload = (e: any) => {
      let data = e.target.result;
      this.course.cover = e.target.result;
    }
    reader.readAsDataURL(input.files[0]);
  }
}
