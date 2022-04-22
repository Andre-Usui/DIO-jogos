let order=[];
let clickedOrder=[];
let score=0; 

/* 0 - verde
 * 1 - vermelho
 * 2 - amarelo
 * 3 - azul
*/

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');


//determina as combinações aleatoriamente
let shuffleOrder =() => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for (let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

//acende a próxima cor
let lightColor = (element, number) => {
    number = number * 300;          // porque?
    setTimeout(() => {
        element.classList.add('selected');    
    }, number);               //tempo de aceso | atenção à vírgula
    setTimeout(() => {
        element.classList.remove('selected');
        
    });
}

//checa o jogador acertou a ordem
let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            lose();
            break; 
        }
    }
    if(clickedOrder.length == order.length) {
        alert (`Pontuação: ${score}\nVocê acertou!\nIniciando próximo nível.` 
        + setTimeout(100) `.` + setTimeout(100) `.`);
        nextlevel();
    }
}

//função clique do usuário
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');
    
    setTimeout(() => {
        createColorElement(color).classList.remove('selected'); //seria possível fazer verificação ponto a ponto?
        checkOrder();
    },250);
}   

//função que retorna a cor
let createColorElement = (color) => {
    if(color == 0){
        return green;
    }else if(color == 1) {
        return red;
    }else if(color == 2) {
        return yellow;
    }else if(color == 3) {
        return blue;
    }
}

//função para próximo nível
let nextlevel = () => {
    score++;
    shuffleOrder();
}   

//função para gameover
let lose = () => {
    alert(`Pontuação:${score}\nVocê errou, parceirx\nTente novamente clicando no botão OK :)`); 
    order = [];
    clickedOrder = [];

playGame();
}

//função para início do jogo
let playGame =() => {
    alert ('Bem vindo novamente!\nVai tentar de novo?');
    score = 0; 

    nextlevel();

}

/*green.addEventListener('click', click(0));
red.addEventListener('click', click(1));
yellow.addEventListener('click', click(2));
blue.addEventListener('click', click(3));
*/

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

playGame();