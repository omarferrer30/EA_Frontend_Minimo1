import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Report } from '../models/report';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private http: HttpClient,
    private router: Router) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private reportURL = 'http://localhost:9090/reports';

  getReports(page: number): Observable<Report[]> {
    const params = {
      page: page.toString(),
     };
    return this.http.get<Report[]>(this.reportURL + '/readall/', {params});
  }

  getReport(id: string): Observable<Report> {
    const url = `${this.reportURL}/readreport/${id}`;
    return this.http.get<Report>(url);
  }

  updateReport(id: string, report: Report): Observable<Report> {
    const url = `${this.reportURL}/updatereport/${id}`;
    return this.http.put<Report>(url, report);
  }

  addReport(report: any): Observable<Report> {
    return this.http.post<Report>(this.reportURL + '/createreport', report);
  }
  
  deleteReport(_id: string): Observable<Report> {
    const url = `${this.reportURL}/deletereport/${_id}`;
    return this.http.delete<Report>(url);
  }

  searchReports(term: string): Observable<Report[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Report[]>(`${this.reportURL}/?name=${term}`);
  }
}
