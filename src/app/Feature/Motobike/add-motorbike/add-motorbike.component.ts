import { Component, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import 'select2';
import * as $ from 'jquery';
import { AddMotorbike } from '../models/add-motorbike.model';
import { MotorbikeService } from '../services/motorbike.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-motorbike',
  templateUrl: './add-motorbike.component.html',
  styleUrls: ['./add-motorbike.component.css']
})
export class AddMotorbikeComponent implements AfterViewInit, OnInit {

  motorbike: AddMotorbike = {
    Name: '',
    Type: 1,
    Speed: null,
    Capacity: null,
    Color: '',
    YearOfManufacture: null,
    MadeIn: '',
    status: 1,
    Description: '',
    PriceDay: null,
    PriceWeek: null,
    PriceMonth: null,
    LicensePlate: '',
    Image: null,
    CompanyName: ""
  };

  imageUrl: string = "";
  companies: any[] = [];

  constructor(private motorbikeService: MotorbikeService, private cd: ChangeDetectorRef, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  ngAfterViewInit(): void {
    this.initializeSelect2();
  }

  initializeSelect2() {
    const selectElement = $(".js-example-tags");
    selectElement.select2({
      tags: true
    }).on('select2:select select2:unselect', () => {
      this.motorbike.CompanyName = selectElement.val() as string;
      this.cd.detectChanges();
    });
  }

  loadCompanies() {
    this.motorbikeService.getAllCompanies().subscribe({
      next: res => {
        if (res.isSuccess) {
          this.companies = res.result;
          setTimeout(() => this.initializeSelect2());
        }
      },
      error: error => {
        console.error('Error fetching companies:', error);
      }
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/webp'];
      if (!validImageTypes.includes(file.type)) {
        this.toastr.error('Invalid file type. Please upload an image.');
        return;
      }
  
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
  
      this.motorbike.Image = file;
    }
  }
  
  addMotorbike() {
    this.motorbikeService.addMotorbikeHttp(this.motorbike).subscribe({
      next: res => {
        if (res.isSuccess) {
          this.toastr.success('Add successfully');
        } else {
          this.toastr.error('Add failed');
        }
      },
      error: error => {
        this.toastr.error('Add failed');
        console.log(error)
      }
    });
  }
}
