import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppointmentsService } from '../services/appointments.service';
import { Appointment } from '../models/Appointment.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.css'],
})
export class AppointmentsListComponent implements OnInit, AfterViewInit {
  appointments: Appointment[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 0;

  constructor(private appointmentService: AppointmentsService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getAllAppointment();
  }

  ngAfterViewInit(): void {}

  getAllAppointment() {

    this.appointmentService.getAppointmentsHttp().subscribe((res: any) => {
      if (res.isSuccess) {
        const result = res.result;
        for (let i = 0; i < result.length; i++) {
          const temp = new Appointment();
          temp.Id = result[i].id;
          temp.Customer.id = result[i].customer.id;
          temp.Customer.name = result[i].customer.name;
          temp.Customer.phoneNumber = result[i].customer.phoneNumber;
          temp.Motorbike.id = result[i].motorbike.id;
          temp.Motorbike.name = result[i].motorbike.name;
          temp.Motorbike.licensePlate = result[i].motorbike.licensePlate;
          temp.RentalBegin = result[i].rentalBegin;
          temp.RentalEnd = result[i].rentalEnd;
          temp.RentalReturn = result[i].rentalReturn;
          temp.LocationReceive = result[i].locationReceive;
          temp.StatusAppointment = result[i].statusAppointment;
          temp.StatusPayment = result[i].statusPayment;
          temp.RentalPrice = result[i].rentalPrice;

          for (let j = 0; j < result[i].surcharges.length; j++) {
            temp.Surcharge.push(result[i].surcharges[j]);
          }
          temp.Total =
            temp.RentalPrice +
            temp.Surcharge.reduce((acc, curr) => acc + curr.amount, 0);

          this.appointments.push(temp);
        }
      }
    });
  }

  getAppointmentStatus(status: number) {
    if (status === 0) return 'Process';
    else if (status === 1) return 'Accepted';
    else if (status === 2) return 'Cancel';
    return 'Done';
  }

  getPaymentStatus(status: number) {
    if (status === 0) return 'Unpaid';
    return 'Paid';
  }

  acceptAppointment(id: string): void {
    this.appointmentService.acceptAppointmentHttp(id).subscribe({
      next: () => {
        this.appointments = []
        this.toastr.success('Accept successfully!');
        this.getAllAppointment()
      },
      error: () => {
        this.toastr.error('Accept failed!');
      },
    });
  }

  rejectAppointment(id: string): void {
    this.appointmentService.rejectAppointmentHttp(id).subscribe({
      next: () => {
        this.appointments = []
        this.toastr.success('Reject successfully!');
        this.getAllAppointment()
      },
      error: () => {
        this.toastr.success('Reject failed!');
      },
    });
  }

  returnWithoutPaymentAppointment(id: string): void {
    const amount = 0; 
    const reason = 'string'; 
    this.appointmentService.returnWithoutPaymentHttp(id, amount, reason).subscribe({
      next: () => {
        this.toastr.success('Return successfully!');
      },
      error: (err) => {
        this.toastr.error('Return failed!');
        console.log(err);
      },
    });
  }
  

  finishPaymentAppointment(id: string): void {
    this.appointmentService.finishPaymentHttp(id).subscribe({
      next: () => {
        this.toastr.success('Payment successfully!');
      },
      error: (err) => {
        this.toastr.error('Payment failed!');
        console.log(err)
      },
    });
  }
  

  getCurrentDate(): string {
    const now = new Date();
    return `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  }
}
