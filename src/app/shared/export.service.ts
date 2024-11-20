import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
    providedIn: 'root'
  })
  export class ExportService {
  
    constructor() { }
  
    exportTableToExcel(tableId: string, fileName: string) {
      const element = document.getElementById(tableId);
      const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
      const workbook: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      XLSX.writeFile(workbook, `${fileName}.xlsx`);
    }
  
    exportDataToExcel(data: any[], fileName: string) {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
      const workbook: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      XLSX.writeFile(workbook, `${fileName}.xlsx`);
    }
  }
  
