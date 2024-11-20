import { Component, OnInit } from '@angular/core';
import { MotorbikeService } from '../services/motorbike.service';
import { Motorbike } from '../models/motorbike.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page-list',
  templateUrl: './home-page-list.component.html',
  styleUrls: ['./home-page-list.component.css']
})
export class HomePageListComponent implements OnInit {
  motorbikes: Motorbike[] = [];
  filteredMotorbikes: Motorbike[] = [];
  keyword: string = '';
  selectedType: string = '';
  selectedStatus: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 0;

  constructor(private motorbikeService: MotorbikeService, private router: Router) {}

  ngOnInit(): void {
    this.getAllMotorbikes();
  }

  getAllMotorbikes(): void {
    this.currentPage = 1;
    this.motorbikeService.getAllMotorbikeHttp().subscribe((res: any) => {
      this.motorbikes = res.result;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredMotorbikes = this.motorbikes.filter(motorbike => {
      const matchesType = !this.selectedType || motorbike.type.toString() === this.selectedType;
      const matchesStatus = !this.selectedStatus || motorbike.status.toString() === this.selectedStatus;
      return matchesType && matchesStatus;
    });
  }

  searchAndFilterMotorbikes(): void {
    this.currentPage = 1;
    const keyword = this.keyword.trim() || undefined;

    this.motorbikeService.search(keyword).subscribe((res: any) => {
      this.motorbikes = res.result;
      this.applyFilters();
    });
  }

  onSearchInputChange(): void {
      this.searchAndFilterMotorbikes();

  }

  viewDetail(motorbikeId: string): void {
    this.router.navigate(['/motorbike', motorbikeId]);
  }

  motorBikeRental(motorbikeId: string): void {
    this.router.navigate(['/motorbike-rental', motorbikeId]);
  }

  getFormattedType(type: number): string {
    switch (type) {
      case 1:
        return 'Xe số';
      case 2:
        return 'Xe tay ga';
      case 3:
        return 'Xe tay côn';
      default:
        return 'Không xác định';
    }
  }
}
