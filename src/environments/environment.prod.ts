export const environment = { // Temos um objeto export, uma constante(const) e um objeto environment que vai exportar o production: true, porém podemos colocar masi coisas dentro desse objeto.
  production: true,
  token: '', //string apenas colocamos as '' aspas simples.
  nome: '',
  id: 0, //id é um número e colocamos o zero no lugar de aspas simples.
  foto: '',

};

//Devemos pegar sempre o enviromnment.prod.ts por que sempre que estivermos trabalhando cem produção no heroko, o angular irá pegar esse arquivo e ignorar o arquivo environment.ts
//Environment são objetos que nos ajuda a trabalhar com variaveis global além de outra funções.
//Environments são variáveis globais, acessívels a todos os componentes.

//Toda vez que logamos os valores de token, nome, id e foto são passadas para o nosso environment dentro de suas variáveis.