import { Postagem } from "./Postagem"

export class Tema {
  public id: number
  public descricao: string
  public postagem: Postagem[] //Como são várias postagems em Usuario, devo por um arrays [] de postagens. Seguindo a regra do ManyToOne(muitas postagens para um tema) ou OneToMany(uma tema para muitas postagens)
}