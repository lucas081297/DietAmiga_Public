import { Component, OnInit } from '@angular/core';
import { ServicesApiService } from '../services/services-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  userEmail:string = ''

  nome!:string
  idade!:Number
  peso!: Number
  altura!: Number
  sexo!:string


  constructor(private servicesApiService:ServicesApiService, private formBuilder: FormBuilder, private authService:AuthService, private router:Router){}

  public cadastroForm: FormGroup = this.formBuilder.group({
    nome: ['',[Validators.required,Validators.pattern("^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$")]],
    idade: ['',Validators.required],
    peso: ['',Validators.required]
  })

  ngOnInit(): void {
    this.userEmail = this.authService.decodeToken(this.authService.getToken())
    this.getInfoUser(this.userEmail)
  }

  public getInfoUser(email:string){
    this.servicesApiService.getInfoUser({email:email}).subscribe({
      next: (res) => {
        //console.log(res)
        this.nome = res[0].nome
        this.idade = res[0].idade
        this.peso = res[0].peso
        this.sexo = res[0].sexo
        this.altura = res[0].altura
      },
      error: (error)=> error
    })
  }

  public submitForms(){
    this.servicesApiService.patchUser(this.userEmail,{nome:this.nome,idade:this.idade,peso:this.peso,sexo:this.sexo,altura:this.altura}).subscribe({
      next: (res)=> this.router.navigate(['home']),
      error: (error) => error
    })
  }


}
