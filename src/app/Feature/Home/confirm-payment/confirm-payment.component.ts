import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-confirm-payment',
  templateUrl: './confirm-payment.component.html',
})
export class ConfirmPaymentComponent {
  status: string = 'Fail Transaction'

  constructor(private route: ActivatedRoute, private paymentService: PaymentService){

  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      const appointmentId = params['id'];
      console.log(appointmentId)

      // call api finish payment
      this.paymentService.finishPayment(appointmentId).subscribe({
        next: (res:any) => {
          if(res.isSuccess){
            this.status = 'Success Transaction'
          }
        }
      })
    });
  }
}
