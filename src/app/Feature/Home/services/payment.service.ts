import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  payMentWithStripe(id: string) {
    let params = new HttpParams().set('typePayment', 'stripe');

    return this.http.put<any>(
      `${environment.apiBaseUrl}/Appointment/Payment by party?id=${id}&addAuth=true`,
      { params }
    );
  }

  finishPayment(id: string){
    let params = new HttpParams()

    return this.http.put<any>(
      `${environment.apiBaseUrl}/Appointment/FinishPayment?id=${id}&addAuth=true`,
      { params }
    );
  }
}
