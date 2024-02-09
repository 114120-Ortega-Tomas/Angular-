import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerfilService } from '../perfil.service';
import { Pefil1, Perfil } from '../Models/model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  form!:FormGroup;
  submitted = false;
  perfil : Pefil1 = new Pefil1();
  provincias :any[]=[];
  eeuu = ["Miami", "Nueva York", "Texas", "Ohio", "California"];
  Argentina =["Buenos Aires", "CABA", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes",
  "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones",
  "Neuquen", "Río Negro", "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fé",
  "Santiago del Estero", "Tierra del fuego", "Tucumán"];
  Uruguay=["Artigas", "Canelones", "Cerro Largo", "Colonia", "Durazno", "Flores", "Florida",
  "Lavalleja", "Maldonado", "Montevideo", "Paysandu", "Río Negro", "Rivera", "Rocha", "Salto",
  "San José", "Soriano", "Tacuarembo", "Treinta y Tres"]
  constructor( private fb : FormBuilder , private service : PerfilService , private router : Router) {
    this.form = fb.group({
      nombre : ['',[Validators.required,Validators.maxLength(20)]],
      apellido : ['',[Validators.required,Validators.maxLength(20)]],
      contraseña : ['',[Validators.required,Validators.minLength(6)]],
      pais : ['',[Validators.required]],
      email: ['',[Validators.required,Validators.email,Validators.maxLength(100)]],
      nac: ['',[Validators.required,Validators.min(1950),Validators.max(2005)]],
      tel: ['',[Validators.required]],
      ciudad: ['',[Validators.required]]
    })
   }

  ngOnInit(): void {
    this.provincia();
  }
  provincia(){
    this.form.get('pais')?.valueChanges.subscribe(()=>{
      if(this.form.get('pais')?.value == 'Argentina'){
        this.provincias = this.Argentina;
      }else if(this.form.get('pais')?.value == 'EE.UU.'){
        this.provincias = this.eeuu;
      }
      else if(this.form.get('pais')?.value == 'Uruguay'){
        this.provincias = this.Uruguay;
      }
      
    })
    
  }
  OnSubmit(){
    this.submitted = true;
    this.perfil = this.form.value as Pefil1;
    this.perfil.fechaNac = this.form.get('nac')?.value;
    this.perfil.password = this.form.get('contraseña')?.value;
    this.perfil.numTel = this.form.get('tel')?.value;

    if(this.form.valid){
      
      this.service.postPerfil(this.perfil).subscribe(data=>{
        console.log(data);
        if(data != null){
          alert("Registrado con exito");
          this.form.reset();
          this.submitted = false;
          this.router.navigate(['login']);
        }
      });
    }
  }

}
