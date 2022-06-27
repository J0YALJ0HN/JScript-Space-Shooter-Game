var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;

var halt = 0;
var halt2 = 0;
var movealien = 0;
var health = 3;

function keyup(event) {
    var player = document.getElementById('player');
    if (event.keyCode == 37) {
        leftPressed = false;
        lastPressed = 'left';
    }
    if (event.keyCode == 39) {
        rightPressed = false;
        lastPressed = 'right';
    }
    if (event.keyCode == 38) {
        upPressed = false;
        lastPressed = 'up';
    }
    if (event.keyCode == 40) {
        downPressed = false;
        lastPressed = 'down';
    }

    player.className = 'character stand ' + lastPressed;
}


function move() {
    var player = document.getElementById('player');
    var positionLeft = player.offsetLeft;
    var positionTop = player.offsetTop;

    if (downPressed) {
        var newTop = positionTop + 1;

        var element = document.elementFromPoint(player.offsetTop, newTop + 32);
        if (element.classList.contains('sky') == false) {
            player.style.top = newTop + 'px';
        }

        if (leftPressed == false) {
            if (rightPressed == false) {
                player.className = 'character walk down';
            }
        }
    }
    if (upPressed) {
        var newTop = positionTop - 1;

        var element = document.elementFromPoint(player.offsetTop, newTop);
        if (element.classList.contains('sky') == false) {
            player.style.top = newTop + 'px';
        }

        if (leftPressed == false) {
            if (rightPressed == false) {
                player.className = 'character walk up';
            }
        }
    }
    if (leftPressed) {
        var newLeft = positionLeft - 1;

        var element = document.elementFromPoint(newLeft, player.offsetTop);
        if (element.classList.contains('sky') == false) {
            player.style.left = newLeft + 'px';
        }


        player.className = 'character walk left';
    }
    if (rightPressed) {
        var newLeft = positionLeft + 1;

        var element = document.elementFromPoint(newLeft + 32, player.offsetTop);
        if (element.classList.contains('sky') == false) {
            player.style.left = newLeft + 'px';
        }

        player.className = 'character walk right';
    }

}


function keydown(event) {
    if (event.keyCode == 37) {
        leftPressed = true;
    }
    if (event.keyCode == 39) {
        rightPressed = true;
    }
    if (event.keyCode == 38) {
        upPressed = true;
    }
    if (event.keyCode == 40) {
        downPressed = true;
    }
}

function myLoadFunction() {
    var start = document.getElementsByClassName('start')[0];
    start.style.backgroundColor = 'lime';
    start.addEventListener('click', begin);
}

function begin() {
    halt = setInterval(move, 10);
    halt2 = setInterval(playerhit, 10);
    document.addEventListener('keydown', keydown);
    document.addEventListener('keyup', keyup);

    var start = document.getElementsByClassName('start')[0];
    start.style.display = 'none';

    for (var i = 0; i < 4; i++) {
        var alien = document.createElement('div');
        var body = document.getElementsByTagName('body')[0];
        alien.className = 'alien';
        alien.classList = 'alien';
        body.appendChild(alien);
    }
    alienposition();
    movealien = setInterval(alienposition, 3000);
}

function bombfall(bomb) {
    var posTop = bomb.offsetTop;
    var speed = Math.ceil(Math.random() * 7);
    var sky = document.getElementsByClassName('sky')[0];
    var grass = window.innerHeight - sky.offsetHeight;
    var randomnum = Math.ceil(Math.random() * grass);

    var move = setInterval(function() {

        if (posTop > sky.offsetHeight + randomnum) {
            bomb.classList = 'explosion';
            setTimeout(function() {
                bomb.parentNode.removeChild(bomb);
            }, 1000);
            clearInterval(move);
        } else {
            posTop++;
            bomb.style.top = posTop + 'px';
        }
    }, speed);
}

function reset() {
    var player = document.getElementById('player');
    player.style.top = 89 + 'vh';
    player.style.left = 200 + 'px';
    player.classList = 'character stand down';
    clearBombs();


}

function clearBombs() {
    var bombs = document.getElementsByClassName('bomb');
    for (var i = 0; i < bombs.length; i++) {
        bombs[i].parentNode.removeChild(bombs[i]);
    }
    var explosion = document.getElementsByClassName('explosion');
    for (var i = 0; i < explosion.length; i++) {
        explosion[i].parentNode.removeChild(explosion[i]);
    }


}

function alienposition() {
    var alien = document.getElementsByClassName('alien');

    for (var i = 0; i < alien.length; i++) {

        var x = Math.ceil(Math.random() * 8);
        alien[i].style.left = x + '0vw';
        alien[i].style.top = 0;

        var bomb = document.createElement('div');
        var body = document.getElementsByTagName('body')[0];
        bomb.classList = 'bomb';
        bomb.style.left = x + '0vw';
        bomb.style.top = 0;
        body.appendChild(bomb);
        bombfall(bomb);
    }
}

function playerhit() {
    var player = document.getElementById('player');
    var position = document.elementFromPoint(player.offsetLeft, player.offsetTop);
    if (position.classList.contains('explosion')) {
        setTimeout(reset, 3000);
        player.classList = 'character stand dead';
        clearInterval(halt);
        document.removeEventListener('keydown', keydown);
        document.removeEventListener('keyup', keyup);
        clearInterval(movealien);

        var start = document.getElementsByClassName('start')[0];
        start.style.display = 'block';
        start.firstChild.nodeValue = 'You died. Play Again?';
        if (start.addEventListener('click', function() {
                clearInterval(movealien);
            }, 10)) {}
        clearInterval(halt2, 2000);
        setInterval(halt2);
    }
}


document.addEventListener('DOMContentLoaded', myLoadFunction);