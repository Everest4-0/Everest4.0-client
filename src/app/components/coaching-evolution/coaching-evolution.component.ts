import { Component, ViewChild, AfterViewInit, Input } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-coaching-evolution',
  templateUrl: './coaching-evolution.component.html',
  styleUrls: ['./coaching-evolution.component.css']
})
export class CoachingEvolutionComponent implements AfterViewInit {
  @ViewChild('lineCanvas') lineCanvas;

  @Input() public data = [];
  lineChart: any;


  ngAfterViewInit() {
    this.lineChartMethod();
  }
  labels = () => this.data[0].data.map((x, y) => 'Feedback ' + (y + 1));
  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.labels(),
        datasets: this.data
      },
      options: {
        legend: {
          position: 'bottom'
        },
        scales: {
          yAxes: [{
            ticks: {
              max: 5,
              min: 0,
              stepSize: 1
            }
          }]
        }
      }
    });
  }


}