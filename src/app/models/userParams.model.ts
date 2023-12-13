export class UserParams {

  private dieta:string = '';
  private calTotal:number = 0;
  private tmb:number = 0;
  private sexo: string =''
  private peso: number = 0
  private altura: number = 0
  private idade:number = 0
  private calCm:number = 0
  private calAl:number = 0
  private calLt:number = 0
  private calJa:number = 0

  constructor(peso: number,altura:number,idade:number,sexo:string){
    this.altura = altura
    this.peso = peso
    this.idade = idade
    this.sexo = sexo
  }

  public GetCalCm(){
    return this.calCm
  }
  public GetCalAl(){
    return this.calAl
  }
  public GetCalLt(){
    return this.calLt
  }
  public GetCalJa(){
    return this.calJa
  }

  public showParameters(){
    console.log(`${this.idade} || ${this.peso} || ${this.altura} || ${this.sexo} || ${this.dieta} || ${this.tmb} || ${this.calTotal} || ${this.calCm} || ${this.calAl} || ${this.calLt} || ${this.calJa}`)
  }

  public setTmb(){
    if(this.sexo=='Feminino'){
      this.tmb = 655 + (9.6*this.peso) + (1.8*this.altura) - (4.7*this.idade)
      this.tmb = Math.ceil(this.tmb)
      return this.tmb
    }
    if (this.sexo=='Masculino'){
      this.tmb = 66 + (13.7*this.peso) + (5*this.altura) - (6.8*this.idade)
      this.tmb = Math.ceil(this.tmb)
      return this.tmb
    }
    return this.tmb = 0
  }

  public setCalTotal(dieta:string){
    switch (dieta){
      case 'Perda de Peso':
        this.calTotal = Math.ceil(this.tmb*0.9)
        this.dieta = dieta
        break;
      case 'Melhorar Alimentacao':
        this.calTotal = Math.ceil(this.tmb)
        this.dieta = dieta
        break;
      case 'Ganho de Massa':
        this.calTotal = Math.ceil(this.tmb*1.1)
        this.dieta = dieta
        break;
    }
  }

  public setCalMaxRef(){
    this.calCm = Math.ceil(this.calTotal*0.15)
    this.calLt = Math.ceil(this.calCm)
    this.calAl = Math.ceil(this.calTotal*0.35)
    this.calJa = Math.ceil(this.calAl)
  }

  public getCalOnRef(ref:string){
    switch (ref){
      case 'Cm':
        return this.calCm

      case 'Al':
        return this.calAl

      case 'Lt':
        return this.calLt

      case 'Ja':
        return this.calJa
    }
    return -1
  }


}


