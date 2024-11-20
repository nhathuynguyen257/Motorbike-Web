import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Motorbike } from "../models/motorbike.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.development";
import { AddMotorbike } from '../models/add-motorbike.model';
import { EditMotorbike } from "../models/edit-motorbike.model";

@Injectable({
  providedIn: 'root',
})
export class MotorbikeService {
  constructor(private http: HttpClient) {}

  getAllMotorbikeHttp(): Observable<Motorbike[]> {
    return this.http.get<Motorbike[]>(`${environment.apiBaseUrl}/Motorbikes/GetALlMotorbikesOfOwner?addAuth=true`);
  }

  getDetailMotorbikeHttp(id: String): Observable<Motorbike> {
    return this.http.get<Motorbike>(`${environment.apiBaseUrl}/Motorbikes/${id}`);
  }

  getAllCompanies(): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/Companies/GetALlCompanies`);
  }

  addMotorbikeHttp(motorbike: AddMotorbike): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('Name', motorbike.Name);
    formData.append('Type', motorbike.Type.toString());
    formData.append('Speed', motorbike.Speed ? motorbike.Speed.toString() : '');
    formData.append('Capacity', motorbike.Capacity ? motorbike.Capacity.toString() : '');
    formData.append('Color', motorbike.Color);
    formData.append('YearOfManufacture', motorbike.YearOfManufacture ? motorbike.YearOfManufacture.toString() : '');
    formData.append('MadeIn', motorbike.MadeIn);
    formData.append('status', motorbike.status.toString());
    formData.append('Description', motorbike.Description);
    formData.append('PriceDay', motorbike.PriceDay ? motorbike.PriceDay.toString() : '');
    formData.append('PriceWeek', motorbike.PriceWeek ? motorbike.PriceWeek.toString() : '');
    formData.append('PriceMonth', motorbike.PriceMonth ? motorbike.PriceMonth.toString() : '');
    formData.append('LicensePlate', motorbike.LicensePlate);
    formData.append('Image', motorbike.Image as Blob);
    formData.append('CompanyName', motorbike.CompanyName);

    return this.http.post<any>(`${environment.apiBaseUrl}/Motorbikes?addAuth=true`, formData);
  }

  editMotorbikeHttp(motorbike: EditMotorbike): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('Id', motorbike.Id);
    formData.append('Name', motorbike.Name);
    formData.append('Type', motorbike.Type.toString());
    formData.append('status', motorbike.status.toString());
    formData.append('Description', motorbike.Description);
    formData.append('PriceDay', motorbike.PriceDay ? motorbike.PriceDay.toString() : '');
    formData.append('PriceWeek', motorbike.PriceWeek ? motorbike.PriceWeek.toString() : '');
    formData.append('PriceMonth', motorbike.PriceMonth ? motorbike.PriceMonth.toString() : '');
    formData.append('LicensePlate', motorbike.LicensePlate);
    formData.append('Image', motorbike.Image);

    return this.http.put<any>(`${environment.apiBaseUrl}/Motorbikes/${motorbike.Id}?addAuth=true`, formData);
  }

  deleteMotorbikeHttp(motorbikeId: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/Motorbikes/${motorbikeId}?addAuth=true`);
  }

  searchAndFilterHttp(keyword?: string, status?: number, type?: number): Observable<any> {
    let params = new HttpParams();

    if (keyword) {
      params = params.set('Name', keyword);
    }
    if (status !== undefined) {
      params = params.set('FilterStatus', status.toString());
    }
    if (type !== undefined) {
      params = params.set('FilterType', type.toString());
    }

    return this.http.get<any>(`${environment.apiBaseUrl}/Motorbikes/GetALlMotorbikesOfOwner?addAuth=true`, { params });
  }
}
