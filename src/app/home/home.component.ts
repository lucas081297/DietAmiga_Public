import { Component, OnInit } from '@angular/core';
import { ServicesApiService } from '../services/services-api.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  userEmail:string = ''

  cm:Array<any> = []
  al: Array<any> = []
  lt: Array<any> = []
  ja: Array<any> = []

  constructor(private servicesApiService:ServicesApiService, private authService:AuthService){}

  toint(value:number){
    return Math.round(value)
  }

  ngOnInit(): void {
    this.userEmail = this.authService.decodeToken(this.authService.getToken())
      this.servicesApiService.getRef('cm',this.userEmail).subscribe({
        next: (res) =>{
          this.cm = res
          console.log(this.cm)
        }
        ,
        error: (error) => error
      })
      this.servicesApiService.getRef('al',this.userEmail).subscribe({
        next: (res) => this.al = res,
        error: (error) => error
      })
      this.servicesApiService.getRef('lt',this.userEmail).subscribe({
        next: (res) => this.lt = res,
        error: (error) => error
      })
      this.servicesApiService.getRef('ja',this.userEmail).subscribe({
        next: (res) => this.ja = res,
        error: (error) => error
      })
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

}
