export class UsuarioLogin{ //Como criar uma class no TS
  public id: number//Como criar um atributo em TS. O tipo number enbloba tudo que vai número(int,double etc). Nome dos atributos devem ser iguais ao do Spring(backend).
  public nome: string //No angular o tipo string deve ter o "s minúsculo".
  public usuario: string
  public senha: string
  public foto: string
  public token: string
  public tipo: string
}