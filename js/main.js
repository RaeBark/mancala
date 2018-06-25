/*----- constants -----*/


/*----- app's state (variables) -----*/
var board, score;


/*----- cached element references -----*/
var scoreEl = document.querySelector('h1');



/*----- event listeners -----*/
document.getElementById('inc-btn').addEventListener('click',function() {
    handleUpdateScore(1)
});
document.getElementById('dec-btn').addEventListener('click',function() {
    handleUpdateScore(-1)
});

/*----- functions -----*/
 function initialize() {
    board = []
    score = 0; 


    //render is LAST!!
    render();
 }

 //responsible for trasfering all state to the DOm

 function render() {
    scoreEl.textContent = score;

 }

 function handleUpdateScore(diff) {
    score += diff;


    render();
 }

 initialize();