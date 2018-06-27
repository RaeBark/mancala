/*----- constants -----*/
var stones = {
    1: "https://imgur.com/sJjKMan",
    2: "https://imgur.com/LrTwEib",
    3: "https://imgur.com/ZGkoRJd",
    4: "https://imgur.com/lrltXBm",
    5: "https://imgur.com/USludbO",
    6: "https://imgur.com/GCACIgn",
    7: "https://imgur.com/TBIcaiD",
    8: "https://imgur.com/dXYRsJp",
    9: "https://imgur.com/STz6VAs",
    10: "https://imgur.com/0Ie6D5X",
    11: "https://imgur.com/gTsIOw8",
    12: "https://imgur.com/Rbp3xXZ",
    13: "https://imgur.com/LXtmNS9",
    14: "https://imgur.com/qFSHgsS",
    15: "https://imgur.com/S5Xvi3y",
    16: "https://imgur.com/6XJbMSH",
    17: "https://imgur.com/OdQCwnD",
    18: "https://imgur.com/p2tydKx",
    19: "https://imgur.com/iGXgdrH",
    20: "https://imgur.com/ZCyWyPU",
    21: "https://imgur.com/KvMZYH2",
    22: "https://imgur.com/EYqjDQq",
    23: "https://imgur.com/nzanJfr",
    24: "https://imgur.com/BGh4dUr",
    25: "https://imgur.com/8gHExcs",
    26: "https://imgur.com/70SWrbd",
    27: "https://imgur.com/20r5nXe",
    28: "https://imgur.com/DVPXGb6",
    29: "https://imgur.com/rUP96Kx",
    30: "https://imgur.com/eLo2yLS",
    31: "https://imgur.com/hl9pLdy",
    32: "https://imgur.com/tYJUB4G",
    33: "https://imgur.com/CmGveaF",
    34: "https://imgur.com/KgdPfLv",
    35: "https://imgur.com/wiH3Ol7",
    36: "https://imgur.com/u6AuTvR",
    37: "https://imgur.com/LbkiEco",
    38: "https://imgur.com/tQMVlBU",
    39: "https://imgur.com/1JKK0T5",
    40: "https://imgur.com/c1J22AL",
    41: "https://imgur.com/V36PCd7",
    42: "https://imgur.com/cRWT3fV",
    43: "https://imgur.com/Qmi2DWM",
    44: "https://imgur.com/TQrGoUU",
    45: "https://imgur.com/q2QxdUk",
    46: "https://imgur.com/E9kbMn7",
    47: "https://imgur.com/l1nXrxf",
    48: "https://imgur.com/XAqOsPN"
}

var p1store = 6;
var p2store = 13;

var p1holes = [0, 1, 2, 3, 4, 5];
var p2holes = [7, 8, 9, 10, 11, 12];




/*----- app's state (variables) -----*/
var board, turn, winner;


/*----- cached element references -----*/






/*----- event listeners -----*/

document.querySelector('button').addEventListener('click', initialize);
document.querySelector('table').addEventListener('click', handleMove)

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

    // spread the stones

    var lastHoleIdx = spreadStones(idx);
    //below is how we check in the console the idx of the div clicked
    // console.log(lastHoleIdx)

    capture(lastHoleIdx);
    // checkForClearedRow();
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
};

function capture(lastHoleIdx) {
    if (board[lastHoleIdx] === 1 && isIndexOnPlayerSide(lastHoleIdx)){
        var opposite = 12 - lastHoleIdx; 
        board[getPlayersStoreIdx()] += board[opposite];
        board[opposite] = 0; 
    }
}
// in progress...
// function checkForClearedRow() {
//     if (p1holes || p2holes 
// };
  
function changeTurn(lastHoleIdx) {
    if (turn === 1 && lastHoleIdx === p1store) return ;
    if (turn === 2 && lastHoleIdx === p2store) return ;
    turn = turn === 1 ?  2 : 1;
 }




function render() {
    board.forEach(function (numStones, idx) {
        document.getElementById(`hole${idx}`).textContent = numStones;
    });

};




initialize();