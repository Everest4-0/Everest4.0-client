import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-diagnostic-view',
  templateUrl: './diagnostic-view.component.html',
  styleUrls: ['./diagnostic-view.component.css']
})
export class DiagnosticViewComponent implements AfterViewInit {
  @ViewChild('radarCanvas') radarCanvas;

  radarChart: any;


  ngAfterViewInit() {
    this.radarChartMethod();
  }

  radarChartMethod() {
    this.radarChart = new Chart(this.radarCanvas.nativeElement, {
      type: 'radar',
      data: {
        labels: ['Running', 'Swimming', 'Eating'],
        datasets: [{

          label: 'Diagnistico',
          borderColor: [
            'rgba(254,0,0,.8)'
          ],
          backgroundColor: [
            'rgba(254,0,0,.1)',
          ],
          data: [5, 1, 4]
        },
        {
          label: 'Esperado',
          borderColor: [
            'rgba(7, 143, 0,1)'
          ],
          backgroundColor: [
            'rgba(7, 143, 0,.1)',
          ],
          data: [5, 5, 5]
        }],
        borderWidth: 1
      },
      options: {
        scale: {
          angleLines: {
            display: true
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 5
          }
        }
      }
    });
  }


}