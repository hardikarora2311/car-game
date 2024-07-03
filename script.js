const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen")
const gameArea = document.querySelector(".gameArea")

let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false
}

let player = { speed: 5, score: 0 };

startScreen.addEventListener("click", start);
document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);

function isCollide(a, b) {
  aRect = a.getBoundingClientRect();
  bRect = b.getBoundingClientRect();

  return !(
    (aRect.top > bRect.bottom) ||
    (aRect.bottom < bRect.top) ||
    (aRect.left > bRect.right) ||
    (aRect.right < bRect.left)
  )
}





function moveLines() {
  let lines = document.querySelectorAll(".line");
  lines.forEach(function (item) {
    if (item.y > 1500) {
      item.y -= 1500;
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  })
}

function moveEnemy(car) {
  let enemies = document.querySelectorAll(".enemy");
  enemies.forEach(function (item) {
    if (isCollide(car, item)) {
      console.log("hit");
      endGame();
    }
    if (item.y > 1500) {
      item.y = -600;
      item.style.left = Math.floor(Math.random() * 250) + "px";
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  })
}


function gamePlay() {
  let car = document.querySelector(".car");
  moveLines();
  moveEnemy(car);
  let road = gameArea.getBoundingClientRect();
  if (player.start) {
    if (keys.ArrowUp && player.y > road.top) { player.y -= player.speed }
    if (keys.ArrowDown && player.y < road.bottom) { player.y += player.speed }
    if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }
    if (keys.ArrowRight && player.x < road.width - 50) { player.x += player.speed }
    car.style.left = player.x + "px";
    car.style.top = player.y + "px";
    window.requestAnimationFrame(gamePlay);
    player.score++;
    score.innerHTML = "Score: " + player.score;
  }
}




function pressOn(e) {
  e.preventDefault();
  keys[e.key] = true;
}

function pressOff(e) {
  e.preventDefault();
  keys[e.key] = false;
}

function start() {
  player.start = true;
  player.score = 0;
  gameArea.innerHTML = "";
  window.requestAnimationFrame(gamePlay);
  startScreen.classList.add("hide");
  // gameArea.classList.remove("hide");
  for (var x = 0; x < 10; x++) {
    let roadLines = document.createElement("div");
    roadLines.classList.add("line");
    roadLines.y = x * 150;
    roadLines.style.top = (x * 150) + "px";
    gameArea.appendChild(roadLines);
  }
  let car = document.createElement("div");
  // car.innerText="car";
  car.setAttribute("class", "car")
  gameArea.appendChild(car);
  player.x = car.offsetLeft;
  player.y = car.offsetTop;
  for (var x = 0; x < 3; x++) {
    let enemy = document.createElement("div");
    enemy.classList.add("enemy");
    enemy.y = ((x + 1) * 700) * -1;
    enemy.style.top = enemy.y + "px";
    enemy.style.left = Math.floor(Math.random() * 250) + "px";
    enemy.style.backgroundImage = "url(https://opengameart.org/sites/default/files/car2.png)";
    enemy.style.backgroundSize = "cover"
    gameArea.appendChild(enemy);
  }
}

function endGame() {
  player.start = false;
  score.innerHTML = "GAME OVER!<br> Score was: " + player.score;
  startScreen.classList.remove("hide");
}



