import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private http: HttpClient) {}

  pingServer(): Observable<any> {
    return this.http.get(`http://localhost:5011/pingServer`);
  }

  checkPasswordStrenth(body): Observable<any> {
    return this.http.post(`http://localhost:5011/validatePass`, body)
  }
}
