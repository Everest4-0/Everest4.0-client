import { ActivityService } from './../../../services/courses/activity.service';
import { ActivityForm } from './../../forms/workSituation.form copy';
import { Activity } from './../../../models/course/activity';
import { Module } from 'app/models/course/module';
import { ModalService } from './../../../components/modal/modal.service';
import { Course } from 'app/models/course/course';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from './../../../services/courses/course.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-course',
  templateUrl: './details-course.component.html',
  styleUrls: ['./details-course.component.scss']
})
export class DetailsCourseComponent implements OnInit {

  public activity: Activity = new Activity()
  public course: Course = new Course();
  public serverAddress = this.courseService.serverAddress;
  activityForm = new ActivityForm()
  constructor(
    private activityService: ActivityService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.courseService.one(id).subscribe(course => {
      this.course = course;
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


  saveActivity() {
    this.activityService.create(this.activity).subscribe(activity => {
      this.course.modules.forEach(module => {
        if (module.id === this.activity.module.id) {
          module.activities.push(activity)
        }
      }

      )
      this.modalService.close('form-activity-modal');
    })
  }

  addActivity(module: Module) {
    this.activity.module = module;
    this.modalService.open('form-activity-modal');
  }
}
