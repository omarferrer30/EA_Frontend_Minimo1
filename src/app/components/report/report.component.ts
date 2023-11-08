import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/models/report';
import { ReportService } from 'src/app/services/report.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-report',
  templateUrl: 'report.component.html',
  styleUrls: ['report.component.css']
})
export class ReportComponent implements OnInit{
  reports: Report[] = [];

  report: any = {
   issuer: '',
   description: '',
   criticity: ''
 } 
 currentPage: number = 1;
  totalPages: number = 1;
  showAddForm: boolean = false;
  showDeleteForm: any;

 constructor(
   private reportService: ReportService,
   private router: Router,
   private dialog: MatDialog
   ) { }
 
 ngOnInit(): void {
   this.getReports(this.currentPage);
 }

 getReports(page: number): void {
   this.reportService.getReports(page)
   .subscribe((response: any) => {
    this.reports = response.docs;
    this.currentPage = response.page;
    this.totalPages = response.totalPages;
  });
 }
 
 add() {
   this.reportService.addReport(this.report).subscribe((response) => {
     console.log('report added:', response);
     this.report = {
      username: '',
      name: '',
      quantity: ''
    };
   },
   (error) => {
    console.error('Report failed:', error);
      this.report = {
        username: '',
        name: '',
        quantity: ''
      };
  });
 }

delete(id:string) {
  this.reportService.deleteReport(id);
}
 

 showForm() {
  this.showAddForm = true;
}

toggleFormVisibility() {
  this.showAddForm = !this.showAddForm;
}

toggleFormVisibility2() {
  this.showDeleteForm = !this.showDeleteForm;
}
previousPage() {
  if (this.currentPage > 1) {
    this.getReports(this.currentPage - 1);
  }
}

nextPage() {
  if (this.currentPage < this.totalPages) {
    this.getReports(this.currentPage + 1);
  }
}

}
