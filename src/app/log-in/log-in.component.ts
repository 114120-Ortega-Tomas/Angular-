import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogInService } from '../log-in.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Pefil1, token } from '../Models/model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit , OnDestroy {
  form!:FormGroup;
  hide = true;
  error : HttpErrorResponse | undefined;
  submitted = false;
  subcription : Subscription | undefined;
  id : number = 0;
  ver:boolean=false;
  constructor(private service : LogInService , private fb : FormBuilder , private router: Router) {
    this.form = this.fb.group({
      username : ['',[Validators.required]],
      password : ['',[Validators.required]]
    })
   }
   token : token = new token();
  ngOnInit(): void {
    this.subcription = new Subscription();
    console.log(localStorage.getItem('token'));
  }

  IniciarSesion() {  
    this.submitted = true;
    if (this.form.valid) {
      this.subcription?.add(
        this.service.postLogin(this.form.get('username')?.value.toString(), this.form.get('password')?.value.toString()).subscribe(
          (data) => {
            if (data) {
              this.router.navigate(['perfil']);
              this.id = data as number;
              localStorage.setItem('token', this.id.toString());
              console.log(localStorage.getItem('token'));
            } 
          },
          (error) => {
            if (error.status === 500) {
              alert('Contraseña o Usuario Incorrectos');
            } else {
              console.error('Otro tipo de error:', error);
            }
          }
        )
      );
    }
  }
  

  ngOnDestroy(): void {
    this.subcription?.unsubscribe();
  }

  CrearCuenta(){
    this.router.navigate(['register']);
  }
  
  cambiar(){
    this.ver = !this.ver;
  }
}
