export class Appointment {
  Id: string = '';
  Customer: CustomerAppointment = new CustomerAppointment();
  Motorbike: MotorbikeAppointment = new MotorbikeAppointment();
  RentalBegin: string = '';
  RentalEnd: string = '';
  RentalReturn: string = '';
  LocationReceive: string = '';
  StatusAppointment: number = 0;
  StatusPayment: number = 0;
  RentalPrice: number = 0;
  Surcharge: Surcharge[] = [];
  Total: number = 0;
}

class CustomerAppointment {
  id: string = '';
  name: string = '';
  phoneNumber: string = '';
}

class MotorbikeAppointment {
  id: string = '';
  name: string = '';
  licensePlate: string = '';
}

class Surcharge{
  amount: number = 0;
  reason: string = "";
}
