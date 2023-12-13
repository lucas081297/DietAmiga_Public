import { Component } from '@angular/core';
import { ServicesApiService } from '../services/services-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  validEmail: number = 3
  actualEmail:string = ''

  constructor(private servicesApiService:ServicesApiService, private formBuilder:FormBuilder){}

  public cadastroForm: FormGroup = this.formBuilder.group({
    email: ['',[Validators.required,Validators.email]],
    password: ['',[Validators.required,Validators.minLength(6)]],
    nome: ['',[Validators.required,Validators.pattern("^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$")]],
    idade: ['',Validators.required],
    peso: ['',Validators.required],
    altura: ['',Validators.required],
    sexo: ['',Validators.required]
  })

  public submitForm(){
    this.servicesApiService.postUser({email:this.cadastroForm.controls['email'].value, pass: this.cadastroForm.controls['password'].value,nome: this.cadastroForm.controls['nome'].value,peso: this.cadastroForm.controls['peso'].value, altura: this.cadastroForm.controls['altura'].value,idade: this.cadastroForm.controls['idade'].value,sexo: this.cadastroForm.controls['sexo'].value}).subscribe({
      next: (res) => {
        console.log(res)
        this.servicesApiService.sign({email:this.cadastroForm.controls['email'].value, pass: this.cadastroForm.controls['password'].value}).subscribe({
          next: (res) => res,
          error: (error) => console.log(error)
        })
      },
      error: (error) => error
    })
  }

  teste(test:any){
    console.log(test)
  }

  public verifyEmail(email:string){
    this.servicesApiService.getEmail(email).subscribe({
      next: (res) => {
        this.actualEmail = email
        this.validEmail = res.value
        console.log(this.cadastroForm.controls['password'].value)
        //console.log(this.validEmail)
      },
      error: (error)=> error
    })
  }

}
