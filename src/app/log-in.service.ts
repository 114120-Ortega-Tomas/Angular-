import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  constructor(private http: HttpClient) { }
  urlLogin='http://localhost:8080/Pefil/AccessPerfil';
  url = 'https://userprofile.nhorenstein.com/Auth/login';
  token = '';
  postLogin(username: string, password: string) {
    const body = new HttpParams().set('email', username).set('password', password) 
    return this.http.post(this.urlLogin , body);
  }

  guardarToken(token : any){
    this.token = token;
  }
  devolverToken(){
    return this.token;
  }
}
