import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  constructor(private http: HttpClient) {}

  getRevenueAnd(begin: string, end: string): Observable<any[]> {
    let params = new HttpParams();

    params = params.set('begin', begin);
    params = params.set('end', end);

    return this.http.get<any[]>(
      `${environment.apiBaseUrl}/Statistical/StatisticAmountAndCount?addAuth=true`,
      {
        params: params,
      }
    );
  }

  getReportMotorbike(begin: string, end: string) {
    let params = new HttpParams();

    params = params.set('begin', begin);
    params = params.set('end', end);

    return this.http.get<any[]>(
      `${environment.apiBaseUrl}/Statistical/CalculateRentalsAndTotalAmount?addAuth=true`,
      {
        params: params,
      }
    );
  }

  formatDate(date: Date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
}
