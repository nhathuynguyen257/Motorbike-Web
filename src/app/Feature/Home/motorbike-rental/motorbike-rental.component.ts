import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Motorbike } from '../models/motorbike.model';
import { MotorbikeService } from '../services/motorbike.service';
import { MotorBikeRental } from '../models/motorbikerental.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-motorbike-rental',
  templateUrl: './motorbike-rental.component.html',
  styleUrls: ['./motorbike-rental.component.css']
})
export class MotorbikeRentalComponent {
  motorbike: Motorbike |null= null;
  rentalBegin: Date | null = null;
  rentalEnd: Date | null = null;
  locationReceive: string = '';
  ownerID: string | null = null;
  totalRentalPrice: number = 0;

  constructor(
    private route: ActivatedRoute,
    private motorbikeService: MotorbikeService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const motorbikeId = params['id'];
      this.getMotorbike(motorbikeId);
    });
  }

  getMotorbike(id: string): void {
    this.motorbikeService.getDetailMotorbikeHttp(id).subscribe(
      (response: any) => {
        if (response.isSuccess) {
          console.log(response);
          this.motorbike = response.result;
          this.ownerID = response.result.user.id;
        } else {
          console.error('Failed to fetch motorbike details');
        }
      },
      error => console.error(error)
    );
  }

  getMotorbikeType(type: number) {
    if (type === 1) return 'Xe số';
    else if (type === 2) return 'Xe tay ga';
    return 'Xe tay côn';
  }

  getMotorbikeStatus(status: number) {
    if (status === 1) return 'Enable';
    else if (status === 2) return 'Busy';
    return 'Maintain';
  }

  calculateRentalPrice(): number {
    if (!this.motorbike || !this.rentalBegin || !this.rentalEnd) {
      return 0;
    }
    const beginDate = new Date(this.rentalBegin);
    const endDate = new Date(this.rentalEnd);
    const diffTime = endDate.getTime() - beginDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    const dayPrice = this.motorbike.priceDay;
    const weekPrice = this.motorbike.priceWeek;
    const monthPrice = this.motorbike.priceMonth;

    if (diffDays < 7) {
      return diffDays * dayPrice;
    } else if (diffDays >= 7 && diffDays < 30) {
      return diffDays * weekPrice;
    }
     else {
      return diffDays * monthPrice;
    }
  }
  
  updateTotalRentalPrice(): void {
    this.totalRentalPrice = this.calculateRentalPrice();
  }

  onSubmit(): void {
    if (!this.motorbike || !this.rentalBegin || !this.rentalEnd || !this.locationReceive || !this.ownerID) {
      this.toastr.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    const today = new Date();
    const beginDate = new Date(this.rentalBegin);
    const endDate = new Date(this.rentalEnd);

    if (beginDate < today || endDate < beginDate) {
      this.toastr.error('Ngày thuê xe không hợp lệ', 'Lỗi');
      return;
    }
    
    const rental: MotorBikeRental = {
      MortobikeId: this.motorbike.id,
      OwnerID: this.ownerID,
      RentalBegin: this.rentalBegin,
      RentalEnd: this.rentalEnd,
      LocationRenceive: this.locationReceive,
      RentalPrice: this.totalRentalPrice
    };
  
    this.motorbikeService.rentMotorbike(rental).subscribe(
      response => {
        this.toastr.success('Thuê xe thành công!', 'Thành công');
      },
      error => {
        if (error.status === 401) {
          this.toastr.error('Vui lòng đăng nhập để thực hiện thuê xe!', 'Lỗi');
          this.router.navigate(['login']);
        } else {
          this.toastr.error('Thuê xe thất bại', 'Lỗi');
        }
      }
    );
  }
}