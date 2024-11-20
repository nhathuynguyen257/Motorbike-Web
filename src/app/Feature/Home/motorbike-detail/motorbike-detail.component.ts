import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { Motorbike } from '../models/motorbike.model';
import { MotorbikeService } from '../services/motorbike.service';

@Component({
  selector: 'app-motorbike-detail',
  templateUrl: './motorbike-detail.component.html',
  styleUrls: ['./motorbike-detail.component.css'],
})
export class MotorbikeHomeDetailComponent implements OnInit {
  motorbike: Motorbike | null = null;

  constructor(
    private route: ActivatedRoute,
    private motorbikeService: MotorbikeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.getMotorbike(id);
      }
    });
  }
  goToHomePage() {
    this.router.navigate(['/']);
}
motorBikeRental(motorbikeId: string): void {
  this.router.navigate(['/motorbike-rental', motorbikeId]);
}

  getMotorbike(id: string): void {
    this.motorbikeService.getDetailMotorbikeHttp(id).subscribe(
      (response: any) => {
        if (response.isSuccess) {
          console.log(response)
          this.motorbike = response.result;
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
}
