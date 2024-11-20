import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../models/Appointment.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private http: HttpClient) {}

  getAppointmentsHttp(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${environment.apiBaseUrl}/Appointment/GetAppointment?addAuth=true`);
  }

  acceptAppointmentHttp(id: string): Observable<any> {
    return this.http.patch(`${environment.apiBaseUrl}/Appointment/Aceept?id=${id}&addAuth=true`, {});
  }

  rejectAppointmentHttp(id: string): Observable<any> {
    return this.http.put(`${environment.apiBaseUrl}/Appointment/Reject?id=${id}&addAuth=true`, {});
  }

  returnWithoutPaymentHttp(id: string, amount: number, reason: string): Observable<any> {
    const body = [
      {
        amount: amount,
        reason: reason
      }
    ];
    return this.http.put(`${environment.apiBaseUrl}/Appointment/Return without payment?id=${id}&addAuth=true`, body);
  }
  
  
  finishPaymentHttp(id: string): Observable<any> {
    return this.http.put(`${environment.apiBaseUrl}/Appointment/FinishPayment?id=${id}&addAuth=true`, {});
  }
  
}
