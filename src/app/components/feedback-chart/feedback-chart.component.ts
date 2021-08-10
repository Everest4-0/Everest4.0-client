

import { Component, ViewChild, AfterViewInit, Input } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-cmp-feedback-chart',
  templateUrl: './feedback-chart.component.html',
  styleUrls: ['./feedback-chart.component.css']
})
export class FeedbackChartComponent implements AfterViewInit {
  @ViewChild('barCanvas') barCanvas;

  @Input() public data;

  barChart: any;

  ngAfterViewInit() {
    this.barChartMethod();
  }

  barChartMethod() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'horizontalBar',
      data: this.data ,
      options: {
        indexAxis: 'y',
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
          bar: {
            borderWidth: 2,
          }
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
            display: true,
            labels: {
              color: 'rgb(255, 99, 132)'
            }
          },
          title: {
            display: true,
            text: 'Chart.js Horizontal Bar Chart'
          }
        }
      }
    });
  }


}

