import { Component } from '@angular/core';
import { MotorBikeRental } from '../models/motorbikerental.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MotorbikeService } from '../services/motorbike.service';
import { Appointment } from '../models/appointment.model';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-appointment-history',
  templateUrl: './appointment-history.component.html',
  styleUrls: ['./appointment-history.component.css'],
})
export class AppointmentHistoryComponent {
  appointments: Appointment[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 0;

  constructor(
    private motorbikeService: MotorbikeService,
    private paymentService: PaymentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllAppointment();
  }

  getAllAppointment() {
    this.motorbikeService.getAppointmentsHttp().subscribe((res: any) => {
      if (res.isSuccess) {
        const result = res.result;
        for (let i = 0; i < result.length; i++) {
          const temp = new Appointment();
          temp.Id = result[i].id;
          temp.Owner.id = result[i].owner.id;
          temp.Owner.name = result[i].owner.name;
          temp.Owner.phoneNumber = result[i].owner.phoneNumber;
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

          if (Array.isArray(result[i].surcharges)) {
            for (let j = 0; j < result[i].surcharges.length; j++) {
              temp.Surcharge.push(result[i].surcharges[j]);
            }
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
  makePayment(appoint: Appointment) {
    // Logic to handle payment
    this.paymentService.payMentWithStripe(appoint.Id).subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          console.log(res);
          window.location.href = res.result;
        }
      },
    });
  }
}
