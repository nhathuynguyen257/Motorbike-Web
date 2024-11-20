import { Component } from '@angular/core';
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
import { StatisticService } from '../services/statistic.service';

interface IData {
  day: string;
  count_rental: number;
  amount: number;
}

@Component({
  selector: 'app-statistic-revenue',
  templateUrl: './statistic-revenue.component.html',
})
export class StatisticRevenueComponent {
  public from: Date;
  public to: Date;
  public chartOptions: AgChartOptions = {};

  constructor(private statisticService: StatisticService){
    this.from = new Date('2024-06-10');
    this.to = new Date('2024-06-20');
    var fromReq: string = this.from.toUTCString();
    var toReq: string = this.to.toUTCString();

    this.getChart(fromReq, toReq);
  }


  getChart(begin: string, end: string) {
    this.statisticService.getRevenueAnd(begin, end).subscribe({
      next: (res: any) => {
        for (let i = 0; i < res.result.length; i++) {
          console.log(res.result[i]);
        }

        this.chartOptions = {
          title: {
            text: 'Ice Cream Sales vs. Avg Temperature',
          } as AgChartCaptionOptions,
          subtitle: {
            text: `Time from ${this.statisticService.formatDate(
              this.from
            )} to ${this.statisticService.formatDate(this.to)}`,
          } as AgChartCaptionOptions,
          legend: {
            position: 'right',
          } as AgChartLegendOptions,
          height: 500 as PixelSize,
          data: res.result as IData[],
          series: [
            {
              type: 'bar',
              xKey: 'day',
              yKey: 'count_rental',
              yName: 'Count Rental',
            } as AgBarSeriesOptions,
            {
              type: 'line',
              xKey: 'day',
              yKey: 'amount',
              yName: 'Amount',
            } as AgLineSeriesOptions,
          ],
          axes: [
            {
              position: 'bottom',
              type: 'category',
            } as AgCategoryAxisOptions,
            {
              position: 'left',
              type: 'number',
              keys: ['count_rental'],
              label: {
                formatter: (params: AgAxisLabelFormatterParams) => {
                  return params.value.toLocaleString();
                },
              },
            } as AgNumberAxisOptions,
            {
              position: 'right',
              type: 'number',
              keys: ['amount'],
              label: {
                formatter: (params: AgAxisLabelFormatterParams) => {
                  return params.value.toLocaleString();
                },
              },
            } as AgNumberAxisOptions,
          ],
        };
      },
    })
  }

  toggle() {
    this.getChart(
      this.from.toString(),
      this.to.toString()
    );
  }
}
