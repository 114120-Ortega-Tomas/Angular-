import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pefil1, Perfil } from './Models/model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  urlAPI ='http://localhost:8080/Pefil/GetAll'
  urlId='http://localhost:8080/Pefil/GetbyId'
  urlUpdate ='http://localhost:8080/Pefil/UpdatePerfil'
  
  constructor(private http : HttpClient) { }
  url = "https://userprofile.nhorenstein.com/User/profile"
  urlput='https://userprofile.nhorenstein.com/User/profile'
  headers = {
  "Authorization": "Bearer " + localStorage.getItem("token")
  }
  

  getDatos(){
    return this.http.get(this.url, {headers: this.headers})
  }
  updateDatos(perfil:Perfil){
    const body={
      userName: perfil.userName,
      firstName: perfil.firstName,
      lastName: perfil.lastName,
      country: perfil.country,
      state: perfil.state,
      email: perfil.email,
      birthDate: perfil.birthDate,
      phoneNumber: perfil.phoneNumber,
    }
    console.log(body);
   return this.http.put(this.url, body, {headers: this.headers})
   
  }

  getPerfiles(){
    return this.http.get(this.urlAPI);
  }

  getPerfilId(id : string){
    const headers = new HttpParams().set('id', id);
    return this.http.get(this.urlId, {params: headers});
  }
  UpdatePerfil(id : number , perfil : Pefil1){
    const body={
      nombre : perfil.nombre,
      apellido : perfil.apellido,
      email : perfil.email,
      password : perfil.password,
      fechaNac : perfil.fechaNac,
      numTel : perfil.numTel,
      pais : perfil.pais,
      ciudad : perfil.ciudad
    }
    const params = new HttpParams().set('id', id);
    return this.http.put(this.urlUpdate, body, {params: params});
  }

  postPerfil(perfil:Pefil1)
  {
    const body ={
      nombre : perfil.nombre,
      apellido : perfil.apellido,
      email : perfil.email,
      password : perfil.password,
      fechaNac : perfil.fechaNac,
      numTel : perfil.numTel,
      pais : perfil.pais,
      ciudad : perfil.ciudad
    }
    return this.http.post(this.urlAPI, body);
  }
  
}
