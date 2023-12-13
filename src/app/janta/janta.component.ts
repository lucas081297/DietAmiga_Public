import { Component, OnInit } from '@angular/core';
import { ServicesApiService } from '../services/services-api.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-janta',
  templateUrl: './janta.component.html',
  styleUrls: ['./janta.component.css']
})
export class JantaComponent implements OnInit {

  calTotal!:number
  massArray!: Array<any>
  calItens:Array<any> = []
  emailUser:string = ''
  selection:string = ''
  typeref:string = 'ja'
  ref:any
  refId:Array<any> = []
  nameRefs: Array<string> = []
  refTypes:Array<string> = ['Carboidrato', 'Proteína','Legume', 'Líquido','Fruta']
  arrayObjectRef:Array<any> = []

  public allCarbFoods : Array<any> = []
  public allProtFoods : Array<any> = []
  public allFrutFoods : Array<any> = []
  public allLiquidFoods : Array<any> = []
  public allLegumsFoods: Array<any> = []

  public setNameOfFood(pos:number,id:number,nome:string,cal:number){
    this.ref[pos].nome = nome
    this.ref[pos].imgname = nome.toLowerCase().replaceAll(" ","-")
    this.ref[pos].id = id
    this.ref[pos].cal = cal
    //console.log(this.ref[pos]['imgname'])
    //this.ref[pos]['nome'] = nome
  }

  calcGramsOnRef(){
    let carbMass:number
    let protMass:number
    let legumMass:number
    let sobraCal:number = Number(this.calTotal) - (Number(this.ref[3].cal) + Number(this.ref[4].cal))
    carbMass = Math.ceil((sobraCal*0.35)*100/this.ref[0].cal)
    protMass = Math.ceil((sobraCal*0.55)*100/this.ref[1].cal)
    legumMass = Math.ceil((sobraCal*0.1)*100/this.ref[2].cal)
    this.massArray.push(carbMass)
    this.massArray.push(protMass)
    this.massArray.push(legumMass)
  }

  public saveRef(){
    this.calcGramsOnRef()
    this.servicesApiService.getCalRef('ja',this.emailUser).subscribe({
    next: (res)=> {
      this.servicesApiService.patchRef('ja',this.emailUser,this.ref[0].id,this.massArray[0],this.ref[1].id,this.massArray[1],this.ref[2].id,this.massArray[2],this.ref[3].id,200,this.ref[4].id,1).subscribe({
        next: (res)=> this.router.navigate(['home']),
        error: (error) => error
      })
    },
    error: ()=>{}
    })
  }

  public getNameofItens(){
      let keys = Object.keys(this.ref[0])
      keys.splice(1,1)
      keys.splice(3,1)
      keys.splice(5,1)
      keys.splice(7,1)
      keys.splice(9,1)
      console.log(keys)
      keys.forEach((keys)=> {
        typeof(this.ref[0][keys]) != 'number'? this.nameRefs.push(this.ref[0][keys]) : this.refId.push(this.ref[0][keys])
        //console.log(keys)
      })
      //console.log(this.nameRefs)
      //console.log(this.refId)
      this.ref = this.createObjectofRef()
      //console.log(this.ref[0].nome)
  }

  public createObjectofRef(){
    for(let i=0;i<5;i++){
      if(this.nameRefs[i]==''){
        continue
      }
      this.arrayObjectRef.push(JSON.parse(`{"nome": "${this.nameRefs[i]}","id": "${this.refId[i]}","tipo" : "${this.refTypes[i]}","imgname" : "${this.nameRefs[i].toLowerCase().replaceAll(" ","-")}","cal": "${this.calItens[i]}" }`))
      //i!=4? ref+=',' : console.log()
      //console.log(this.refId[i])
    }
    //console.log(this.arrayObjectRef)
    return this.arrayObjectRef

  }

  constructor(private servicesApiService:ServicesApiService, private authService:AuthService, private router:Router){}

  ngOnInit(): void {
    this.emailUser = this.authService.decodeToken(this.authService.getToken())
    this.servicesApiService.getInfoUser({email:this.emailUser}).subscribe({
      next: (res)=>{
        this.calTotal = res[0].calja
      },
      error: ()=>{}
    })
    this.servicesApiService.getCalRef('ja',this.emailUser).subscribe({
      next: (res)=> {
        this.calItens.push(res[0].carb_cal)
        this.calItens.push(res[0].prot_cal)
        this.calItens.push(res[0].legum_cal)
        this.calItens.push(res[0].liquid_cal)
        this.calItens.push(res[0].fruit_cal)
        this.servicesApiService.getRef('ja',this.emailUser).subscribe({
          next: (res) =>{
          this.ref = res
          this.getNameofItens()
          },
          error: (error) => error
        })
      },
      error: ()=>{}
    })
    if(this.allCarbFoods.length==0){
      this.servicesApiService.getAllFood('Carboidratos').subscribe({
        next: (res) => {
          //console.log(res)
          this.allCarbFoods = res
          //this.NameJsonToArray(res,this.allFoods)
          //console.log(this.allCarbFoods)
        },
        error: (error) => error
      })
    }

    if(this.allProtFoods.length==0){
      this.servicesApiService.getAllFood('Proteinas').subscribe({
        next: (res) => {
          //console.log(res)
          this.allProtFoods = res
          //this.NameJsonToArray(res,this.allFoods)
          //console.log(this.allCarbFoods)
        },
        error: (error) => error
      })
    }

    if(this.allFrutFoods.length==0){
      this.servicesApiService.getAllFood('Frutas').subscribe({
        next: (res) => {
          //console.log(res)
          this.allFrutFoods = res
          //this.NameJsonToArray(res,this.allFoods)
          //console.log(this.allCarbFoods)
        },
        error: (error) => error
      })
    }

      if(this.allLiquidFoods.length==0){
      this.servicesApiService.getAllFood('Liquidos').subscribe({
        next: (res) => {
          //console.log(res)
          this.allLiquidFoods = res
          //this.NameJsonToArray(res,this.allFoods)
          //console.log(this.allCarbFoods)
        },
        error: (error) => error
      })
    }

    if(this.allLegumsFoods.length==0){
      this.servicesApiService.getAllFood('Legumes').subscribe({
        next: (res) => {
          //console.log(res)
          this.allLegumsFoods = res
          //this.NameJsonToArray(res,this.allFoods)
          //console.log(this.allCarbFoods)
        },
        error: (error) => error
      })
    }
  }
}
