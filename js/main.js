/*----- constants -----*/
var stones = {
    0: "",
    1: "https://i.imgur.com/sJjKMan.png",
    2: "https://i.imgur.com/LrTwEib.png",
    3: "https://i.imgur.com/ZGkoRJd.png",
    4: "https://i.imgur.com/bz22JUK.png",
    5: "https://i.imgur.com/USludbO.png",
    6: "https://i.imgur.com/GCACIgn.png",
    7: "https://i.imgur.com/TBIcaiD.png",
    8: "https://i.imgur.com/dXYRsJp.png",
    9: "https://i.imgur.com/STz6VAs.png",
    10: "https://i.imgur.com/0Ie6D5X.png",
    11: "https://i.imgur.com/gTsIOw8.png",
    12: "https://i.imgur.com/Rbp3xXZ.png",
    13: "https://i.imgur.com/LXtmNS9.png",
    14: "https://i.imgur.com/qFSHgsS.png",
    15: "https://i.imgur.com/S5Xvi3y.png",
    16: "https://i.imgur.com/6XJbMSH.png",
    17: "https://i.imgur.com/OdQCwnD.png",
    18: "https://i.imgur.com/p2tydKx.png",
    19: "https://i.imgur.com/iGXgdrH.png",
    20: "https://i.imgur.com/ZCyWyPU.png",
    21: "https://i.imgur.com/KvMZYH2.png",
    22: "https://i.imgur.com/EYqjDQq.png",
    23: "https://i.imgur.com/nzanJfr.png",
    24: "https://i.imgur.com/BGh4dUr.png",
    25: "https://i.imgur.com/8gHExcs.png",
    26: "https://i.imgur.com/70SWrbd.png",
    27: "https://i.imgur.com/20r5nXe.png",
    28: "https://i.imgur.com/DVPXGb6.png",
    29: "https://i.imgur.com/rUP96Kx.png",
    30: "https://i.imgur.com/eLo2yLS.png",
    31: "https://i.imgur.com/hl9pLdy.png",
    32: "https://i.imgur.com/tYJUB4G.png",
    33: "https://i.imgur.com/CmGveaF.png",
    34: "https://i.imgur.com/KgdPfLv.png",
    35: "https://i.imgur.com/wiH3Ol7.png",
    36: "https://i.imgur.com/u6AuTvR.png",
    37: "https://i.imgur.com/LbkiEco.png",
    38: "https://i.imgur.com/tQMVlBU.png",
    39: "https://i.imgur.com/1JKK0T5.png",
    40: "https://i.imgur.com/c1J22AL.png",
    41: "https://i.imgur.com/V36PCd7.png",
    42: "https://i.imgur.com/cRWT3fV.png",
    43: "https://i.imgur.com/Qmi2DWM.png",
    44: "https://i.imgur.com/TQrGoUU.png",
    45: "https://i.imgur.com/q2QxdUk.png",
    46: "https://i.imgur.com/E9kbMn7.png",
    47: "https://i.imgur.com/l1nXrxf.png",
    48: "https://i.imgur.com/XAqOsPN.png"
}

var p1store = 6;
var p2store = 13;

var p1holes = [0, 1, 2, 3, 4, 5];
var p2holes = [7, 8, 9, 10, 11, 12];


var winSound = new Audio("https://freesound.org/data/previews/413/413801_394391-lq.mp3")
var stoneSound = new Audio("https://freesound.org/data/previews/364/364711_2531187-lq.mp3")

/*----- app's state (variables) -----*/
var board, turn, winner;


/*----- cached element references -----*/
var p1scoreDisplay = document.getElementById('p1-score');
var p2scoreDisplay = document.getElementById('p2-score')


var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];
var displayWinner = document.querySelector('p');




/*----- event listeners -----*/

document.querySelector('button').addEventListener('click', initialize);
document.querySelector('table').addEventListener('click', handleMove)
document.querySelector('span').addEventListener('click', closeModal)







// /*----- functions -----*/
function initialize() {
    board = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
    winner = null;
    turn = 1;
    //render is LAST!!
    render();
}

function handleMove(evt) {
    var idx = parseInt(evt.target.id.replace('hole', ''));
    // return if not a valid hole idx for the cur player
    if (turn === 1 && !p1holes.includes(idx)) {
        return;
    }
    if (turn === 2 && !p2holes.includes(idx)) {
        return;
    }
    stoneSound.play();
    // spread the stones

    var lastHoleIdx = spreadStones(idx);
    //below is how we check in the console the idx of the div clicked
    // console.log(lastHoleIdx)

    capture(lastHoleIdx);

    checkForClearedRow();

    changeTurn(lastHoleIdx);

    render();
}

function isIndexOnPlayerSide(idx) {
    return turn === 1 ? p1holes.includes(idx) : p2holes.includes(idx);
}

function getPlayersStoreIdx() {
    return turn === 1 ? p1store : p2store;
}

function spreadStones(idx) {
    var numStones = board[idx];
    board[idx] = 0;
    while (numStones > 0) {
        idx++;
        if (turn === 1 && idx === p2store) {
            idx = 0;
        } else if (turn === 2 && idx === p1store) {
            idx = 7;
        } else if (idx > 13) {
            idx = 0;
        }
        board[idx]++;
        numStones--;
    };
    return idx;
}

function capture(lastHoleIdx) {
    if (board[lastHoleIdx] === 1 && isIndexOnPlayerSide(lastHoleIdx)) {
        var opposite = 12 - lastHoleIdx;
        board[getPlayersStoreIdx()] += board[opposite];
        board[opposite] = 0;
    }
}

function checkForClearedRow() {
    var sum = p1holes.reduce(function (acc, idx) {
        return acc + board[idx];
    }, 0);
    if (sum === 0) {
        board[getPlayersStoreIdx()] += p2holes.reduce(function (acc, idx) {
            var sum = acc + board[idx];
            board[idx] = 0;
            return sum;
        }, 0);
        getWinner();
        return;
    }
    sum = p2holes.reduce(function (acc, idx) {
        return acc + board[idx];
    }, 0);
    if (sum === 0) {
        board[getPlayersStoreIdx()] += p1holes.reduce(function (acc, idx) {
            var sum = acc + board[idx];
            board[idx] = 0;
            return sum;
        }, 0);
        getWinner();
        return;
    }
}

function getWinner() {
    winner = board[p1store] > board[p2store] ? 'Player 1 wins!' : 'Player 2 wins!';
}

function changeTurn(lastHoleIdx) {
    if (turn === 1 && lastHoleIdx === p1store) return;
    if (turn === 2 && lastHoleIdx === p2store) return;
    turn = turn === 1 ? 2 : 1;
}

function highlightHoles(turn) {
    if (turn === 1) {
        for (var i = 0; i < p1holes.length; i++) {
            var elem = p1holes[i];
            document.getElementById('hole' + elem).style.border = '2px solid blue';
            document.getElementById('hole' + elem).style.boxShadow = '0px 0px 20px blue';
            elem = p2holes[i];
            document.getElementById('hole' + elem).style.border = '';
            document.getElementById('hole' + elem).style.boxShadow = '';
        }
    } else {
        for (var i = 0; i < p1holes.length; i++) {
            elem = p2holes[i];
            document.getElementById('hole' + elem).style.border = '2px solid blue';
            document.getElementById('hole' + elem).style.boxShadow = '0px 0px 20px blue';
            elem = p1holes[i];
            document.getElementById('hole' + elem).style.border = '';
            document.getElementById('hole' + elem).style.boxShadow = '';
        }
    }
}


function closeModal() {
    modal.style.display = "none";
}



function renderStones(numStones, idx) {

    var parent = document.getElementById(`hole${idx}`);
    var img = parent.childNodes[1];
    img.src = stones[numStones];
}

function render() {
    board.forEach(function (numStones, idx) {
        renderStones(numStones, idx); 

        // document.getElementById(`hole${idx}`).textContent = numStones;
        
    });
    p1scoreDisplay.textContent = `Player 1: ${board[p1store]}`;
    p2scoreDisplay.textContent = `Player 2: ${board[p2store]}`;
    if (turn === 1) {
        document.getElementById('p1-turn').style.border = '2px solid blue';
        document.getElementById('p1-turn').style.boxShadow = '0px 0px 20px blue';
        document.getElementById('p2-turn').style.border = '';
        document.getElementById('p2-turn').style.boxShadow = '';
        highlightHoles(turn);
        
    } else {

        document.getElementById('p2-turn').style.border = '2px solid blue';
        document.getElementById('p2-turn').style.boxShadow = '0px 0px 20px blue';
        document.getElementById('p1-turn').style.border = '';
        document.getElementById('p1-turn').style.boxShadow = '';
        highlightHoles(turn);
    };
    if (winner) {
        modal.style.display = "block";
        displayWinner.textContent = winner;
        winSound.play();
    }
    
}







initialize();