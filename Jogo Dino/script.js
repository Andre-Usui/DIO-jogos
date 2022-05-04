let dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const rollando = document.querySelector('.rollando');


let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyDown(event) {
  if (event.keyCode === 90) {
    if (!isJumping) {
      jump();
    }
  }
}

function handleKeyDown2(event) {
    if (event.keyCode === 88) {
      if (!isJumping) {
        roll();
      }
    }
  }

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 10;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      // Subindo
      position += 10;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function roll() {
    isJumping = true;
  
    let upInterval = setInterval(() => {
      if (position >= 200) {
        // Descendo
        clearInterval(upInterval);
  
        let downInterval = setInterval(() => {
          if (position <= 0) {
            clearInterval(downInterval);
            isJumping = false;
            dino.classList.remove('rollando');
          } else {
            position -= 15;
            dino.style.bottom = position + 'px';
          }
        }, 30);
      } else {
        // Subindo
        position += 15;
        dino.classList.add('rollando');
        dino.style.bottom = position + 'px';
      }
    }, 30);
  }



function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 4000;

  if (isGameOver) return;

  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  let leftTimer = setInterval(() => {
    if (cactusPosition < -20) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = 
      ('<h1 class="game-over">Fim de jogo</h1> <button onclick=location.reload(true)> Repetir </button>');

    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keydown', handleKeyDown2);