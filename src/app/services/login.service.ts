import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = 'http://localhost:9090/api/users';
  constructor(private http: HttpClient) {}

  loginUser = ({ userId, password }: any): Observable<any> => {
    return this.http.post(`${this.url}/login`, { userId, password });
  };

  signUpUser = (data: any): Observable<any> => {
    return this.http.post(`${this.url}/signUp`, {
      ...data,
      userType: 'general',
    });
  };

  getUsers = (): Observable<any> => {
    return this.http.get(`${this.url}/getUsers`);
  };
}
