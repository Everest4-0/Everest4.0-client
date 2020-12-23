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

  public course: Course = new Course();
  public serverAddress=this.courseService.serverAddress;
  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
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
}
