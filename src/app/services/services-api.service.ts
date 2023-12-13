import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesApiService {

  public emitEvent = new EventEmitter();

  url:string = 'https://apidietamiga.onrender.com'

  constructor(private http: HttpClient,
    private router: Router) { }

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  public getInfoUser(payload:{email:string}){
    return this.http.post<any>(`${this.url}/usuarios/usuario`,payload,{headers: this.httpOptions.headers})
    .pipe(
      res => res,
      error => error
    )
  }

  public patchDiet(payload:{email:string,dieta:string}){
    return this.http.patch<any>(`${this.url}/usuarios/diet`,payload,{headers: this.httpOptions.headers})
  }

  public patchCal(payload:{email:string,calcm:number,calal:number,callt:number,calja:number}){
    return this.http.patch<any>(`${this.url}/usuarios/cal`,payload,{headers: this.httpOptions.headers})
  }

  public patchUser(email:string,payload:{nome:string,idade:Number,peso:Number,sexo:string,altura:Number}){
    return this.http.patch<any>(`${this.url}/usuarios/alter/${email}`,payload,{headers: this.httpOptions.headers})
  }

  public postUser(payload: {email:string,pass: string,nome:string,peso:number,altura:number,idade:number,sexo:string},){
    return this.http.post<any>(`${this.url}/login/cadastro`,payload,{headers: this.httpOptions.headers})
    .pipe(
      res => res,
      error => error
    )
  }

  public sign(payload: { email: string; pass: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.url}/login/sign`, payload).pipe(
      map((res) => {
        localStorage.removeItem('access_token');
        localStorage.setItem('access_token', res.token);
        this.getRef('ja',payload.email).subscribe({
          next: (res)=>{
            if(res.length>0){
              this.router.navigate(['home'])
            }
            else{
              this.router.navigate(['questions'])
            }
          },
          error: ()=> this.router.navigate(['questions'])
        })
      }),
      catchError((e) => {
        if (e.error.message) return throwError(() => e.error.message);

        return throwError(
          () =>
            'No momento não estamos conseguindo validar este dados, tente novamente mais tarde!'
        );
      })
    );
  }

  public getEmail(email:string){
    return this.http.get<any>(`${this.url}/login/check/${email}`,{headers: this.httpOptions.headers})
    .pipe(
      res => res,
      error => error
    )
  }

  public getAllFood(table:string): Observable<any>{
    return this.http.get<any>(`${this.url}/alimentos/${table}`,{headers: this.httpOptions.headers})
    .pipe(
      res => res,
      error => error
    )
  }
  public setRef(ref:string,email:string,carb:number,carb_qtd:number,prot:number,prot_qtd:number,legum:number,legum_qtd:number,liquid:number,liquid_qtd:number,fruit:number,fruit_qtd:number): Observable<any>{
    return this.http.post<any>(`${this.url}/refeicoes/${ref}/${email}/${carb}/${carb_qtd}/${prot}/${prot_qtd}/${legum}/${legum_qtd}/${liquid}/${liquid_qtd}/${fruit}/${fruit_qtd}`,{headers: this.httpOptions.headers})
    .pipe(
      res => res,
      error => error
    )
  }
  public patchRef(ref:string,email:string,carb:number,carb_qtd:number,prot:number,prot_qtd:number,legum:number,legum_qtd:number,liquid:number,liquid_qtd:number,fruit:number,fruit_qtd:number): Observable<any>{
    return this.http.patch<any>(`${this.url}/refeicoes/${ref}/${email}/${carb}/${carb_qtd}/${prot}/${prot_qtd}/${legum}/${legum_qtd}/${liquid}/${liquid_qtd}/${fruit}/${fruit_qtd}`,{headers: this.httpOptions.headers})
    .pipe(
      res => res,
      error => error
    )
  }

  public getRef(ref:string,email:string): Observable<any>{
    return this.http.get<any>(`${this.url}/refeicoes/${ref}/${email}`,{headers: this.httpOptions.headers})
    .pipe(
      res => res,
      error => error
    )
  }

  public getCalRef(ref:string,email:string): Observable<any>{
    return this.http.get<any>(`${this.url}/refeicoes/cal/${ref}/${email}`,{headers: this.httpOptions.headers})
    .pipe(
      res => res,
      error => error
    )
  }
}
