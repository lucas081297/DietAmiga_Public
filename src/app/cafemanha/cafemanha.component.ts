import { Component, OnInit } from '@angular/core';
import { ServicesApiService } from '../services/services-api.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserParams } from '../models/userParams.model';

@Component({
  selector: 'app-cafemanha',
  templateUrl: './cafemanha.component.html',
  styleUrls: ['./cafemanha.component.css']
})
export class CafemanhaComponent implements OnInit {

  calTotal!: number
  massArray: Array<number> = []
  calItens:Array<any> = []
  userParams!:UserParams
  emailUser:string = ''
  selection:string = ''
  typeref:string = 'cm'
  calref:any
  ref:any
  refId:Array<any> = []
  nameRefs: Array<string> = []
  refTypes:Array<string> = ['Carboidrato', 'Proteína','Líquido','Fruta']
  arrayObjectRef:Array<any> = []
  private calPass:boolean = false

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
    //console.log(this.ref[pos]['cal'])
    //this.ref[pos]['nome'] = nome
  }


  public calcGramsOnRef(){
    let carbMass:number
    let protMass:number
    let sobraCal:number = Number(this.calTotal) - (Number(this.ref[2].cal) + Number(this.ref[3].cal))
    console.log(sobraCal)
    carbMass = Math.ceil((sobraCal/2)*100/this.ref[0].cal)
    protMass = Math.ceil((sobraCal/2)*100/this.ref[1].cal)
    this.massArray[0] = carbMass
    this.massArray[1] = protMass
  }

  public saveRef(){
    this.calcGramsOnRef()
    //console.log(this.massArray)
    this.servicesApiService.getCalRef('cm',this.emailUser).subscribe({
      next: (res)=> {
        this.servicesApiService.patchRef('cm',this.emailUser,this.ref[0].id,this.massArray[0],this.ref[1].id,this.massArray[1],0,0,this.ref[2].id,200,this.ref[3].id,1).subscribe({
          next: (res)=> {
            console.log(res)
        },
          error: (error) => error
        })
        this.router.navigate(['home'])
      },
      error: ()=>{}
    })
  }

  public getNameofItens(){
      //console.log(this.ref[0])
      let keys = Object.keys(this.ref[0])
      keys.splice(1,1)
      keys.splice(3,1)
      keys.splice(5,1)
      keys.splice(7,1)
      //console.log(keys)
      keys.forEach((keys)=> {
        typeof(this.ref[0][keys]) != 'number'? this.nameRefs.push(this.ref[0][keys]) : this.refId.push(this.ref[0][keys])
        //console.log(keys)
        //console.log(typeof(this.ref[0][keys]))
      })
      //console.log(this.nameRefs)
      //console.log(this.refId)
      this.ref = this.createObjectofRef()
      //console.log(this.ref[0].nome)
  }

  public createObjectofRef(){
    for(let i=0;i<4;i++){
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
        this.calTotal = res[0].calcm
      },
      error: ()=>{}
    })
    this.servicesApiService.getCalRef('cm',this.emailUser).subscribe({
      next: (res)=> {
        this.calItens.push(res[0].carb_cal)
        this.calItens.push(res[0].prot_cal)
        this.calItens.push(res[0].liquid_cal)
        this.calItens.push(res[0].fruit_cal)
        this.servicesApiService.getRef('cm',this.emailUser).subscribe({
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
    this.servicesApiService.getInfoUser({email:this.emailUser}).subscribe({
      next: (res)=> this.calref = res[0].calcm
    })
  }


}
