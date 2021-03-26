import { TaskAnswer } from './../../../models/course/task_answer';
import { User } from 'app/models/main/user';
import { AuthService } from 'app/services/auth.service';

import { ActivityService } from './../../../services/courses/activity.service';
import { ActivityTask } from 'app/models/course/activity_task';
import { Activity } from './../../../models/course/activity';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-activity-task',
  templateUrl: './activity-task.component.html',
  styleUrls: ['./activity-task.component.scss']
})
export class ActivityTaskComponent implements OnInit {


  @Output() nextTask = new EventEmitter<string>()
  @Input() act: Activity;
  public activity: Activity = new Activity();
  taskIndex = 0;
  counter = 10;
  done: boolean = false;
  taskAnswers: Array<TaskAnswer> = []

  public user: User = this.auth.user;
  public task: ActivityTask = new ActivityTask();
  constructor(
    public auth: AuthService,
    private activityService: ActivityService
  ) { }

  ngOnInit(): void {
    this.activityService.one(this.act.id).subscribe(activity => {
      this.activity = activity;

      this.task = this.activity.tasks[this.taskIndex];
      this.activityService.getUserAnswer({ userId: this.auth.user.id, activityId: this.activity.id }).subscribe(d => {
        
        if (d.length >= this.activity.tasks.length) {
          this.taskAnswers = d
          this.done = true
        }
      })
    })
  }

  nextQuiz() {
    if (this.taskIndex < this.activity.tasks.length - 1) {
      this.task = this.activity.tasks[++this.taskIndex];
    }
    else {
      this.done = true
    }
    if (this.user.taskAnswers[0] === undefined) {
      this.user.taskAnswers[0] = this.task.answers.filter(x => !x.correct)[0]
      this.taskAnswers.push(this.task.answers.filter(x => !x.correct)[0])
    }
    this.activityService.addUserAnswer(this.user).subscribe(data => {
      
      let u = data;
      this.user.taskAnswers[0] = undefined
    })
  }

  addAnswer(answer, i) {
    this.user.taskAnswers[0] = answer
    this.taskAnswers.push(answer)
  }

  get corrects() {
    return [
      this.taskAnswers.filter(t => t.correct)
        .reduce((x, y) => x + parseFloat(this.activity.tasks.filter(x => x.id === y.taskId)[0].points + ''), 0),
      this.taskAnswers.filter(t => t.correct).length
    ]
  }
  get wrongs() {

    return [
      this.taskAnswers.filter(t => !t.correct)
        .reduce((x, y) => x + parseFloat(this.activity.tasks.filter(x => x.id === y.taskId)[0].points + ''), 0),
      this.taskAnswers.filter(t => !t.correct).length
    ]
  }
  submit() {
    this.nextQuiz()
  }
  finishQuiz() {
    this.nextTask.emit('ola mundo')
  }
  currency(n) {

    return n.toLocaleString(
      undefined, // leave undefined to use the browser's locale,
      // or use a string like 'en-US' to override it.
      { minimumFractionDigits: 2 }
    );
  }
}
