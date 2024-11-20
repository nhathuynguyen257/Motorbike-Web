export class Appointment {
    Id: string = '';
    Owner : OwnerAppointment = new OwnerAppointment();
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
  
  class OwnerAppointment {
    id: string = '';
    name: string = '';
    phoneNumber: string = '';
  }
  class MotorbikeAppointment {
    id: string = '';
    name: string = '';
    licensePlate: string = '';
  }
  
  export class Surcharge{
    amount: number = 0;
    reason: string = "";
  }
  