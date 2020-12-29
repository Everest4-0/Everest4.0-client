import { AppService } from './../../../services/app.service';
import { Activity } from './../../../models/course/activity';
import { Component, OnInit, Input, ElementRef } from '@angular/core';
//import * as NGYTPackage from './../../../../package.json';

@Component({
  selector: 'app-activity-course',
  templateUrl: './activity-course.component.html',
  styleUrls: ['./activity-course.component.css']
})
export class ActivityCourseComponent implements OnInit {

  @Input() public activity: Activity;

  playerVars = {
    cc_lang_pref: 'pt',
    controls: 0,
    AutoPlay: 0,
    RelatedVideos: 0,
    ShowInfo: 0
  };
  serverAddress = AppService.serverAddress;
  version = '...';
  private player;
  private ytEvent;
  page: number = 1;
  totalPages: number;
  isLoaded: boolean = false;

  constructor() {
    ///this.version = NGYTPackage['dependencies']['ngx-youtube-player'].replace('^', '');
  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }
  get attachmentType() {
    if (!this.activity.attachment) {
      return ''
    } else if (this.activity.attachment.split('youtube').length > 1) {
      return 'youtube'
    } else if (this.activity.attachment.split('.pdf').length > 1) {
      return 'pdf'
    } else if (this.activity.attachment.split('.mp4').length > 1) {
      return 'video'
    }
    return '';
  }
  get videoId() { return this.activity.attachment.split('/').slice(-1)[0] }
  savePlayer(player) {
    this.player = player;
  }

  onStateChange(event) {
    this.ytEvent = event.data;
  }

  playVideo() {
    this.player.playVideo();
  }

  pauseVideo() {
    this.player.pauseVideo();
  }



  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
  }

  nextPage() {
    this.page++;
  }

  prevPage() {
    this.page--;
  }
}
