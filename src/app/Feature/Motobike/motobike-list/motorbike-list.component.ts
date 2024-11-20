import { Component, OnInit } from '@angular/core';
import { Motorbike } from '../models/motorbike.model';
import { ExportService } from '../../../shared/export.service';
import { MotorbikeService } from '../services/motorbike.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
@Component({
  selector: 'app-motorbike-list',
  templateUrl: './motorbike-list.component.html',
  styleUrls: ['./motorbike-list.component.css'],
})
export class MotorbikeListComponent implements OnInit {
  motorbikes: Motorbike[] = [];
  keyword: string = '';
  selectedStatus: string = '';
  selectedType: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 0;
  zoomedImageId: string | null = null;
  sortedColumn: string = 'name';
  sortDescending: boolean = false;

  constructor(
    private motorbikeService: MotorbikeService,
    private exportService: ExportService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllMotorbikes();
  }

  getAllMotorbikes(): void {
    this.motorbikeService.getAllMotorbikeHttp().subscribe((res: any) => {
      this.motorbikes = res.result;
    });
  }

  getAllMotorbikesForExport(): void {
    this.motorbikeService.getAllMotorbikeHttp().subscribe((res: any) => {
      const allMotorbikes = res.result;
      this.exportService.exportDataToExcel(allMotorbikes, 'MotorbikeData');
    });
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

  clearSearchAndFilter(): void {
    this.currentPage = 1
    this.keyword = '';
    this.selectedStatus = '';
    this.selectedType = '';
    this.getAllMotorbikes();
  }

  searchAndFilterMotorbikes(): void {
    this.currentPage = 1
    const status = this.selectedStatus ? Number(this.selectedStatus) : undefined;
    const type = this.selectedType ? Number(this.selectedType) : undefined;
    const keyword = this.keyword.trim() || undefined;

    this.motorbikeService
      .searchAndFilterHttp(keyword, status, type)
      .subscribe((res: any) => {
        this.motorbikes = res.result;
      });
  }

  onSearchInputChange(): void {
    this.searchAndFilterMotorbikes();
  }

  toggleImageModal(id: string): void {
    this.zoomedImageId = this.zoomedImageId === id ? null : id;
  }

  sortBy(column: string): void {
    if (column === 'name') {
      if (this.sortDescending) {
        this.motorbikes.sort((a, b) => b.name.localeCompare(a.name));
      } else {
        this.motorbikes.sort((a, b) => a.name.localeCompare(b.name));
      }
    } else if (column === 'priceDay') {
      if (this.sortDescending) {
        this.motorbikes.sort((a, b) => b.priceDay - a.priceDay);
      } else {
        this.motorbikes.sort((a, b) => a.priceDay - b.priceDay);
      }
    }
    this.sortDescending = !this.sortDescending;
    this.sortedColumn = column;
  }

  confirmDelete(motorbikeId: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {position: {}});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteMotorbike(motorbikeId);
      }
    });
  }

  deleteMotorbike(motorbikeId: string): void {
    this.motorbikeService.deleteMotorbikeHttp(motorbikeId).subscribe(() => {
      this.motorbikes = this.motorbikes.filter(m => m.id !== motorbikeId);
    });
  }
}
