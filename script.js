const casonas = document.querySelectorAll("[data-casa]");
const velha = document.querySelector("[data-jogo]");
const QuemGanhou = document.querySelector("[data-resultado-vencedor]");
const fimjogo = document.querySelector("[data-vencedor]");

let TurnoX;
TurnoX = false;

combinacoes = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]



//codigo vencedor
const VerificaVencedor = (jogadoratual) =>{
  return combinacoes.some((comb) => {
    return comb.every((index) => {
      return casonas[index].classList.contains(jogadoratual)
    });
  });
}

//codigo empate

const VerificaEmpate = () =>{
  return [... casonas].every(casa => {
    return casa.classList.contains('x') || casa.classList.contains('circulo')
  });
}

//codigo fim de jogo
const fimgame = (empatou) =>{
  if(empatou){
    QuemGanhou.innerText = 'Empate!'
  }else{
    QuemGanhou.innerText = TurnoX ? 'Circulo Venceu' : 'X Venceu';
  }
  fimjogo.classList.add("show-vencedor");
};

//codigo que adiciona x ou bolinha
const marca = (casa, adicionar) => {
  casa.classList.add(adicionar);

 
}
//troca turno codigo
const TrocaTurno = () =>{
  TurnoX = !TurnoX
  velha.classList.remove('circulo');
  velha.classList.remove('x');

  if(TurnoX){
    velha.classList.add('circulo');
  }else{
    velha.classList.add('x');
  };
}
//quando clicar
const handleClick = (e) => {
  //adiconar X ou bolinha
  const casa = e.target;
  const adicionar = TurnoX ? 'circulo' : 'x'; 

  marca (casa,adicionar);

  
  //vitoria que aparece na tela
  const Win = VerificaVencedor(adicionar);
  

  //empate aparece
  const empatou = VerificaEmpate ();
  if(Win){
    fimgame(false);
  }else if (empatou){
    fimgame(true);
  }else{
    TrocaTurno();
  }
};
for (const casa of casonas){
  casa.addEventListener("click", handleClick, {once: true});
}