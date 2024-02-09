import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerfilService } from '../perfil.service';
import { Serializer } from '@angular/compiler';
import { Pefil1, Perfil } from '../Models/model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit , OnDestroy {
  subscription : Subscription | undefined;
  perfil :Pefil1 = new Pefil1();
  submitted = false;
  perfiles:Pefil1[]=[];
  constructor(private fb : FormBuilder , private service : PerfilService , private router: Router) {
    this.form = this.fb.group({
      username : ['',[Validators.required,Validators.minLength(8),Validators.maxLength(50)]],
      firstName : ['',[Validators.required,Validators.maxLength(20)]],
      lastName : ['',[Validators.required,Validators.maxLength(20)]],
      country : ['',[Validators.required]],
      email: ['',[Validators.required,Validators.email,Validators.maxLength(100)]],
      birthDate: ['',[Validators.required,Validators.min(1950),Validators.max(2005)]],
      phoneNumber: ['',[Validators.required]],
      state: ['',[Validators.required]]
    })
   }
  paises = ['Argentina','EE.UU.','Uruguay']
  form!:FormGroup;
  provincias :any[]=[];

  eeuu = ["Miami", "Nueva York", "Texas", "Ohio", "California"];
  Argentina =["Buenos Aires", "CABA", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes",
  "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones",
  "Neuquen", "Río Negro", "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fé",
  "Santiago del Estero", "Tierra del fuego", "Tucumán"];
  Uruguay=["Artigas", "Canelones", "Cerro Largo", "Colonia", "Durazno", "Flores", "Florida",
  "Lavalleja", "Maldonado", "Montevideo", "Paysandu", "Río Negro", "Rivera", "Rocha", "Salto",
  "San José", "Soriano", "Tacuarembo", "Treinta y Tres"]


  ngOnInit(): void {
    this.subscription = new Subscription();
    this.provincia();
    //this.CargarDatos();
    //this.GetPerfiles();
    this.GetPerfilbyID();
  }

  // GetPerfiles(){
  //   this.service.getPerfiles().subscribe(data=>{
  //     this.perfiles = data as Pefil1[];
  //     console.log(this.perfiles[0]);
  //   });

  // }

  GetPerfilbyID(){
    if(localStorage.getItem('token') != null){
      this.service.getPerfilId(localStorage.getItem('token')??'').subscribe(data=>{
        this.perfil = data as Pefil1;
        this.CargarDatos();
      })
    }
    else 
    {
      this.router.navigate(['login']);
    }
   
  }

  provincia(){
    this.form.get('country')?.valueChanges.subscribe(()=>{
      if(this.form.get('country')?.value == 'Argentina'){
        this.provincias = this.Argentina;
      }else if(this.form.get('country')?.value == 'EE.UU.'){
        this.provincias = this.eeuu;
      }
      else if(this.form.get('country')?.value == 'Uruguay'){
        this.provincias = this.Uruguay;
      }
      
    })
    
  }

  CargarDatos(){
      this.form.get('username')?.setValue(this.perfil.nombre);
      this.form.get('firstName')?.setValue(this.perfil.nombre);
      this.form.get('lastName')?.setValue(this.perfil.apellido);
      this.form.get('country')?.setValue(this.perfil.pais);
      this.form.get('email')?.setValue(this.perfil.email);
      const fecha : string = this.perfil.fechaNac.toString();
      const fechauso : number =(parseInt(fecha,10))
      const fechaBien : Date = new Date(fechauso);
      const foramateada : string = formatDate(fechaBien,'yyyy-MM-dd','en-US');
      this.form.get('birthDate')?.setValue(foramateada);
      this.form.get('phoneNumber')?.setValue(this.perfil.numTel);
      this.form.get('state')?.setValue(this.perfil.ciudad);
  }

  // UpdatearDatos(){
  //   if(this.form.valid){
  //     this.submitted = true;
  //     const perfil = new Perfil();
  //     perfil.userName = this.form.get('username')?.value;
  //     perfil.firstName = this.form.get('firstName')?.value;
  //     perfil.lastName = this.form.get('lastName')?.value;
  //     perfil.country = this.form.get('country')?.value;
  //     perfil.email = this.form.get('email')?.value;
  //     perfil.birthDate = this.form.get('birthDate')?.value;
  //     perfil.phoneNumber = this.form.get('phoneNumber')?.value;
  //     perfil.state = this.form.get('state')?.value;
  //     this.subscription?.add(this.service.updateDatos(perfil).subscribe(data=>{
  //       alert('Se actualizo correctamente');
  //       console.log("todo bien ")
  //     }));
  //   }
  // }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  LogOut(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  ActualizarDatos(){
    this.submitted = true;
    if(this.form.valid)
    {
      const perfil = new Pefil1();
      perfil.nombre = this.form.get('firstName')?.value;
      perfil.apellido = this.form.get('lastName')?.value;
      perfil.pais = this.form.get('country')?.value;
      perfil.email = this.form.get('email')?.value;
      perfil.fechaNac = this.form.get('birthDate')?.value;
      perfil.numTel = this.form.get('phoneNumber')?.value;
      perfil.ciudad = this.form.get('state')?.value;
      perfil.password = this.perfil.password;
      this.subscription?.add( this.service.UpdatePerfil(this.perfil.id,perfil).subscribe(data=>{
        alert('Se actualizo correctamente');
        console.log("todo bien ")
      }))
    }
  }
}
