import { Component, OnInit } from '@angular/core';
import { StatisticService } from '../services/statistic.service';
import { HttpClient } from '@angular/common/http';
import {
  AgChartOptions,
  PixelSize,
  AgBarSeriesOptions,
  AgLineSeriesOptions,
  AgCategoryAxisOptions,
  AgNumberAxisOptions,
  AgChartCaptionOptions,
  AgChartLegendOptions,
  AgAxisLabelFormatterParams,
} from 'ag-charts-community';

@Component({
  selector: 'app-statistic-motorbike',
  templateUrl: './statistic-motorbike.component.html',
})
export class StatisticMotorbikeComponent {
  public from: Date;
  public to: Date;
  public chartOptions: AgChartOptions = {};
  constructor(private statisticService: StatisticService) {
    this.from = new Date('2024-06-10');
    this.to = new Date('2024-06-20');
    var fromReq: string = this.from.toUTCString();
    var toReq: string = this.to.toUTCString();
    this.getChart(fromReq, toReq);
  }

  getChart(begin: string, end: string) {

    this.statisticService.getReportMotorbike(begin, end)
      .subscribe({
        next: (res: any) => {
          this.chartOptions = {
            title: {
              text: "Apple's Revenue by Product Category",
            },
            subtitle: {
              text: `Time from ${this.statisticService.formatDate(
                this.from
              )} to ${this.statisticService.formatDate(this.to)}`,
            } as AgChartCaptionOptions,
            legend: {
              position: 'right',
            } as AgChartLegendOptions,
            height: 500 as PixelSize,
            data: res.result,
            series: [
              {
                type: 'bar',
                direction: 'horizontal',
                xKey: 'name',
                yKey: 'count',
                yName: 'count',
              },
              {
                type: 'bar',
                direction: 'horizontal',
                xKey: 'name',
                yKey: 'amount',
                yName: 'amount',
              },
            ],
          };
        },
      });
  }

  toggle() {
    this.getChart(
      this.from.toString(),
      this.to.toString()
    );
  }
}
