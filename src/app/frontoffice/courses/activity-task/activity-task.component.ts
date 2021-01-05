import { TimerService } from './../../../services/system/timer.service';
import { ActivityService } from './../../../services/courses/activity.service';
import { ActivityTask } from 'app/models/course/activity_task';
import { Activity } from './../../../models/course/activity';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-activity-task',
  templateUrl: './activity-task.component.html',
  styleUrls: ['./activity-task.component.scss']
})
export class ActivityTaskComponent implements OnInit {



  @Input() act: Activity;
  public activity: Activity = new Activity();
  taskIndex = 0;
  counter = 10;
  public task: ActivityTask = new ActivityTask();
  constructor(
    private activityService: ActivityService,
    public timer: TimerService
  ) { }

  ngOnInit(): void {
    this.activityService.one(this.act.id).subscribe(activity => {
      this.activity = activity;
    })
  }

  nextQuiz() {
    if (this.taskIndex < this.activity.tasks.length) {
      this.task = this.activity.tasks[this.taskIndex];
      this.taskIndex++
      return  this.counter =0;
    }
    return this.counter = 1 + (this.activity.duration / this.activity.tasks.length) * 60
  }

}
