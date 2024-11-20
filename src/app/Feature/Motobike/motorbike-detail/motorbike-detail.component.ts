import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Motorbike } from '../models/motorbike.model';
import { MotorbikeService } from '../services/motorbike.service';

@Component({
  selector: 'app-motorbike-detail',
  templateUrl: './motorbike-detail.component.html',
  styleUrls: ['./motorbike-detail.component.css'],
})
export class MotorbikeDetailComponent implements OnInit {
  motorbike: Motorbike | null = null;

  constructor(
    private route: ActivatedRoute,
    private motorbikeService: MotorbikeService
  ) {}

  ngOnInit(): void {
    this.getDetailMotorbike();
  }

  getDetailMotorbike(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.motorbikeService.getDetailMotorbikeHttp(id).subscribe((res: any) => {
        this.motorbike = res.result;
      });
    }
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
