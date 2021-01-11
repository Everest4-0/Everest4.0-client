import { Course } from 'app/models/course/course';
import { ModuleService } from './../../../services/courses/module.service';
import { AuthService } from 'app/services/auth.service';
import { Activity } from './../../../models/course/activity';
import { Component, OnInit, Input } from '@angular/core';

import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';


@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent implements OnInit {

  @Input() public activity: Activity;
  public course:Course=new Course();
  constructor(
    public auth: AuthService,
    private moduleService: ModuleService
  ) { }

  ngOnInit(): void {
    let node = document.getElementById('main');


    this.moduleService.one(this.activity.moduleId).subscribe(module=>this.course=module.course)
    setTimeout(() => {
      htmlToImage.toPng(node)
        .then(function (dataUrl) {
          var img = document.getElementById('main-test');
          img.src = dataUrl;
          document.getElementById('main').remove()
        })
        .catch(function (error) {
          console.error('oops, something went wrong!', error);
        });
    }, 2000);
  }

}
