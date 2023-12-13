import { Injectable } from '@angular/core';
import {jwtDecode} from "jwt-decode"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getToken(){
    let token = localStorage.getItem('access_token')
    //console.log(token)
    return token
  }

  decodeToken(token:any){
    token = jwtDecode(token)
    return token = token.email
    //token = token.toString()
    //token = JSON.parse(token)
    //return console.log(token)

  }

}
