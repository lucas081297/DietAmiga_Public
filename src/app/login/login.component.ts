import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesApiService } from '../services/services-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public valid:boolean = false;
  public authError: boolean = false;
  public msgError!: string;

  constructor(private formBuilder: FormBuilder, private servicesApiService:ServicesApiService, private router:Router, private route: ActivatedRoute) { }


  public cadastroForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.email],
    password: ['', [Validators.required,Validators.minLength(6)]]
  }
  )

  public isValid(): any{
    if(this.cadastroForm.status== "VALID"){
    this.valid = true;
    }
    else{
      this.valid = false;
    }

  }

  // submitForms(){
  //   console.log(this.cadastroForm.controls['email'].value, this.cadastroForm.controls['password'].value)
  // }

  public submitLogin() {
    if (this.valid) {
      this.servicesApiService
        .sign({
          email: this.cadastroForm.value.email,
          pass: this.cadastroForm.value.password,
        })
        .subscribe({
          next: () => {
        },
        error: ()=> this.authError= true
        });
    }
  }


}
