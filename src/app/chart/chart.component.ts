import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions={}

  constructor() {
    this.chartOptions= {
      chart: {
        type: 'pie'
    },
    title: {
        text: 'Project completion report 2024'
    },
    tooltip: {
        valueSuffix: '%'
    },
    plotOptions: {
        series: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: [{
                enabled: true,
                distance: 20
            }, {
                enabled: true,
                distance: -40,
                format: '{point.percentage:.1f}%',
                style: {
                    fontSize: '1.2em',
                    textOutline: 'none',
                    opacity: 0.7
                },
                filter: {
                    operator: '>',
                    property: 'percentage',
                    value: 10
                }
            }]
        }
    },
    credits: {
      enabled: false
    },
    series: [
        {
            name: 'Percentage',
            colorByPoint: true,
            data: [
                {
                    name: 'Chrome',
                    y: 55.02
                },
                {
                    name: 'Firefox',
                    sliced: true,
                    selected: true,
                    y: 26.71
                },
                {
                    name: 'Edge',
                    y: 1.09
                },
                {
                    name: 'Opera',
                    y: 15.5
                },
                {
                    name: 'Brave',
                    y: 1.68
                }
            ]
        }
    ]
}

HC_exporting(Highcharts);
    }
  }

