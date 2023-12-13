import { Component, OnInit } from '@angular/core';
import { ServicesApiService } from '../services/services-api.service';

import { UserParams } from '../models/userParams.model';
import { completeRef } from '../interfaces/completeRef';
import { Ref } from '../interfaces/ref';
import { AuthService } from '../services/auth.service';
import { delay } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  constructor(private servicesApiService:ServicesApiService, private authService:AuthService, private router:Router){}

  userName!:string
  userEmail:string = ''
  userParams!:UserParams



  public userParamsBDiet(){
    this.userParams.setTmb()
    this.userParams.setCalTotal(this.diet)
    this.userParams.setCalMaxRef()
    this.userParams.showParameters()
    this.servicesApiService.patchDiet({email:this.userEmail,dieta:this.diet}).subscribe({
      next: () => {},
      error: ()=>{}
    })
    this.servicesApiService.patchCal({email:this.userEmail,calcm:this.userParams.GetCalCm(),calal:this.userParams.GetCalAl(),callt:this.userParams.GetCalLt(),calja:this.userParams.GetCalJa()}).subscribe({
      next: (res)=>{},
      error: (error) => {}
    })
  }

  private questions:number = 0
  private diet:string =''
  public refValidated:any = 3
  private calPass:boolean = false

  public carb:any = 0
  public prot:any = 0
  public frut:any = 0
  public liquid:any = 0
  public legums:any = 0

  public allCarbFoods : Array<any> = []
  public allProtFoods : Array<any> = []
  public allFrutFoods : Array<any> = []
  public allLiquidFoods : Array<any> = []
  public allLegumsFoods: Array<any> = []

  public refCm : Array<completeRef> = []
  public refAl :  Array<completeRef> = []
  public refLt :  Array<completeRef> = []
  public refJa :  Array<completeRef> = []

  ngOnInit(): void {
    this.userEmail = this.authService.decodeToken(this.authService.getToken())
    this.servicesApiService.getInfoUser({email: this.userEmail}).subscribe({
      next: (res)=> {
        this.userParams = new UserParams(res[0].peso,res[0].altura,res[0].idade,res[0].sexo)
        this.userName = res[0].nome
      },
      error: (error) => error
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

  public calcDivCal(isCafe:boolean,sobraCal:number,legum:any,carb:any,prot:any){
    let legumPart
    let carbPart
    let protPart
    !isCafe?
    (legumPart = sobraCal*0.10, carbPart = sobraCal*0.35 , protPart = sobraCal*0.55) :
    (carbPart = sobraCal*0.50 , protPart = sobraCal*0.50 )
    legum = JSON.parse((legum).toString())
    legum = typeof(legum) == 'number' ? 0 : legum = legum.cal
    let legumMass = Math.floor(Number(legumPart)*100/legum)
    carb = JSON.parse((carb).toString())
    carb = typeof(carb) == 'number' ? 0 : carb = carb.cal
    let carbMass = Math.floor(carbPart*100/carb)
    prot = JSON.parse((prot).toString())
    prot = typeof(prot) == 'number' ? 0 : prot = prot.cal
    let protMass = Math.floor(protPart*100/prot)
    isCafe? legumMass = 0 : legumMass = legumMass
    return [legumMass,carbMass,protMass]
  }

  public sumTest(cal:number,value:any){
    value = JSON.parse((value).toString())
    value = typeof(value) == 'number' ? 0 : value = value.cal
    return cal-=value
  }

  public getIdOnRef(item:any){
    item = JSON.parse((item).toString())
    item = typeof(item) == 'number' ? 0 : item = item.id
    return item
  }

  public calcCalTotal(isCafe:boolean,ref:string){
    let cal:number = this.userParams.getCalOnRef(ref);
    let cRef:any
    let resultArray:Array<any>
    switch (ref){
      case 'Cm':
        cRef = this.refCm
        break;
      case 'Al':
        cRef = this.refAl
        break;
      case 'Lt':
        cRef = this.refLt
        break;
      case 'Ja':
        cRef = this.refJa
        break;
    }
    for(let i=0;i<cRef.length;i++){
      cal = this.sumTest(cal,cRef[i].fruit)
      if(cal<=0){return this.calPass = true}
      cal = this.sumTest(cal,cRef[i].liquid)
      if(cal<=0){return this.calPass = true}
      resultArray = this.calcDivCal(isCafe,cal,cRef[i].legum,cRef[i].carb,cRef[i].prot)
      //console.log(cal)
      this.servicesApiService.setRef(ref.toLowerCase(),this.userEmail,this.getIdOnRef(cRef[i].carb),resultArray[1],this.getIdOnRef(cRef[i].prot),resultArray[2],this.getIdOnRef(cRef[i].legum),resultArray[0],this.getIdOnRef(cRef[i].liquid),200,this.getIdOnRef(cRef[i].fruit),1).subscribe({
        next: (res)=> console.log(res),
        error: (error) => error
      })
      }
      return
    }

  public sumQuestions (){
    if(this.refValidated == 1 && !this.calPass){
    this.questions++;
    this.resetAllNutrients()
    }
    if(this.questions > 4){
      let time:number = (Math.random()*(17-11)+11)*1000
      setTimeout(()=>this.router.navigateByUrl('/home'),time)
    }

  }

  public getQuestions(){
    return this.questions
  }

  public getDiet(){
    return this.diet
  }

  public setDiet(value:string){
    if(this.diet == value){

    }
    else{
    this.diet = value
    this.userParamsBDiet()
    this.questions = 1;
    }
  }

  public test(value:any){
    return console.log(value)
  }

  public setRef(value:any, array:Array<completeRef>){
    array.splice(0,1)
    array.push(JSON.parse(value))
    //return console.log (array)
  }

  public setCompleteRef(carb:Ref, prot:Ref, frut:Ref, liquid:Ref, legums:Ref, array:Array<completeRef>){
    array.push({
      "carb":carb,
      "prot":prot,
      "fruit":frut,
      "liquid":liquid,
      "legum": legums
    })
  }

  public jsonStringfy(json:any){
    return JSON.stringify(json)
  }

  public JsonToArray(json:any, array:Array<any>){
    for (let i=0 ;i<json.length;i++) {
      array.push(json[i])
    }
    //return console.log(array)
  }

  public getAllProts(){
    this.servicesApiService.getAllFood('Proteinas').subscribe({
      next: (res) => {
        res
      },
      error: (error) => error
    })
  }

  public getAllFruts(){
    this.servicesApiService.getAllFood('Frutas').subscribe({
      next: (res) => {
        res
      },
      error: (error) => error
    })
  }

  public getAllLegums(){
    this.servicesApiService.getAllFood('Legums').subscribe({
      next: (res) => {
        res
      },
      error: (error) => error
    })
  }

  public getAllLiqs(){
    this.servicesApiService.getAllFood('Liquidos').subscribe({
      next: (res) => {
        res
      },
      error: (error) => error
    })
  }

  public resetAllNutrients(){
    this.carb = 0
    this.prot = 0
    this.frut = 0
    this.liquid = 0
    this.legums = 0
  }

  public validateCompleteRef(fruit:boolean, legum: boolean, carb:any, prot:any, frut:any, liquid:any, legums:any){
    if (fruit){
      if(frut==0){
        return this.refValidated = 0
      }
  }
    if (legum){
        if(legums==0){
          return this.refValidated = 0
      }
  }
      if(carb == 0 || prot == 0 || liquid == 0){
        return this.refValidated = 0
    }
    return this.refValidated = 1
  }
}
