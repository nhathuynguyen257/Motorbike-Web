import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Motorbike } from "../models/motorbike.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.development";
import { MotorBikeRental } from "../models/motorbikerental.model";
import { Appointment } from "../models/appointment.model";

@Injectable({
  providedIn: 'root',
})
export class MotorbikeService {
  constructor(private http: HttpClient) {}

  getAllMotorbikeHttp(): Observable<Motorbike[]> {
    return this.http.get<Motorbike[]>(`${environment.apiBaseUrl}/Motorbikes/GetALlMotorbikes`);
  }

  getDetailMotorbikeHttp(id: string): Observable<Motorbike> {
    return this.http.get<Motorbike>(`${environment.apiBaseUrl}/Motorbikes/${id}`);
  }

  getFilteredMotorbikesHttp(type: number): Observable<Motorbike[]> {
    let params = new HttpParams().set('type', type.toString());
    return this.http.get<Motorbike[]>(`${environment.apiBaseUrl}/Motorbikes/GetAllMotorbikes`, { params });
  }

  search(keyword?: string): Observable<any> {
    let params = new HttpParams();
    if (keyword) {
      params = params.set('name', keyword);
    }

    return this.http.get<any>(`${environment.apiBaseUrl}/Motorbikes/GetAllMotorbikes`, { params });
  }
  rentMotorbike(rental: MotorBikeRental): Observable<MotorBikeRental> {
    const formData = new FormData();
    formData.append('MotorbikeId', rental.MortobikeId);
    formData.append('OwnerId', rental.OwnerID);
    formData.append('RentalBegin', rental.RentalBegin.toString());
    formData.append('RentalEnd', rental.RentalEnd.toString());
    formData.append('LocationReceive', rental.LocationRenceive);
    formData.append('RentalPrice', rental.RentalPrice.toString());

    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });

    return this.http.post<MotorBikeRental>(`${environment.apiBaseUrl}/Appointment?addAuth=true`, formData, { headers: headers });
  }
  getAppointmentsHttp(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${environment.apiBaseUrl}/Appointment/GetAppointment?addAuth=true`);
  }
}
