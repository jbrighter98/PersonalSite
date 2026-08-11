var piecesGlobal = [];
var done = false;
var timerStarted = false;
var numBombs = 10;
var x = 9;
var intervalID;


var totalSeconds = 0;
        

function setTime() {
    var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

class Piece {
    constructor(bomb, place) {
        this.bomb = bomb;
        this.val = "0";
        this.place = place;
        this.neighbors = [];
        this.textDiv = null;
        this.flag = false;
    }
    
    setBomb(val) {
        this.bomb = val;
    }

    setVal(pieces, x) {
        
        if(this.bomb == true) {
            this.val = "-1";
        }
        else {
            this.findNeighbors(pieces, x);
            let tmpVal = 0;
            for(let i=0; i<this.neighbors.length; i++) {
                if(this.neighbors[i].bomb == true) {
                    tmpVal++;
                }
            }
            this.val = tmpVal.toString();
        }

    }

    getVal() {
        return this.val;
    }

    findNeighbors(pieces, x) {

        var tmpNeighbors = [];
        
        for(let i=0; i<pieces.length; i++) {
            let p = pieces[i];
            
            if(p.place == this.place-x-1 && this.place%x != 1) {
                tmpNeighbors.push(p);
            }
            else if(p.place == this.place-x) {
                tmpNeighbors.push(p);
            }
            else if(p.place == this.place-x+1 && this.place%x != 0) {
                tmpNeighbors.push(p);
            }
            else if(p.place == this.place-1 && this.place%x != 1) {
                tmpNeighbors.push(p);
            }
            else if(p.place == this.place+1 && this.place%x != 0) {
                tmpNeighbors.push(p);
            }
            else if(p.place == this.place+x-1 && this.place%x != 1) {
                tmpNeighbors.push(p);
            }
            else if(p.place == this.place+x) {
                tmpNeighbors.push(p);
            }
            else if(p.place == this.place+x+1 && this.place%x != 0) {
                tmpNeighbors.push(p);
            }
        }

        this.neighbors = tmpNeighbors;

    }

    wakeNeighbors(val) {
        if(val == -1) {
            for(let i=0; i<piecesGlobal.length; i++) {
                    piecesGlobal[i].textDiv.style.visibility = "visible";      
            }
        }
        if(val == 0) {
            for(let i=0; i<this.neighbors.length; i++) {

                if(this.neighbors[i].textDiv.style.visibility == "hidden") {
                    if(this.neighbors[i].val == 0) {
                        this.neighbors[i].textDiv.style.visibility = "visible";
                        this.neighbors[i].wakeNeighbors(0);
                    }
                    else if (this.neighbors[i].val > 0) {
                        this.neighbors[i].textDiv.style.visibility = "visible";
                    }
                }
            }
        }
    }

    wakeUp() {
        if(this.textDiv.style.visibility == "hidden") {
            this.textDiv.style.visibility = "visible";
            if(this.val == "-1") {
                this.wakeNeighbors(-1);
                return -1;
            }
            else if (this.val == "0") {
                this.wakeNeighbors(0);
                return 0;
            }
            else {
                return 1;
            }
        }
    }

    plantFlag() {
        if(this.flag == false && this.textDiv.style.visibility == "hidden" && isGameGoing()) {
            this.textDiv.innerHTML = "<i class='fa-solid fa-flag'></i>";
            if(this.val == "-1") {
                this.textDiv.classList.remove("numB");
            }
            else {
                this.textDiv.classList.remove("num"+this.val);
            }
            this.textDiv.classList.add("flag");
            this.textDiv.style.visibility = "visible";
            this.flag = true;
            var bombNum = document.getElementById("bombNum").innerHTML;
            document.getElementById("bombNum").innerHTML = (parseInt(bombNum) - 1).toString();
        }
        else if(this.flag == true && isGameGoing()) {
            if(this.val == "-1") {
                this.textDiv.classList.remove("flag");
                this.textDiv.classList.add("numB");
                this.textDiv.innerHTML = '<i class="fa-solid fa-bomb"></i>';
            }
            else if (this.val > 0) {
                this.textDiv.classList.remove("flag");
                this.textDiv.classList.add("num"+this.val);
                this.textDiv.innerHTML = this.val;
            }
            else {
                this.textDiv.classList.remove("flag");
                this.textDiv.classList.add("num"+this.val);
                this.textDiv.innerHTML = "";
            }

            this.textDiv.style.visibility = "hidden";

            this.flag = false;
            var bombNum = document.getElementById("bombNum").innerHTML;
            document.getElementById("bombNum").innerHTML = (parseInt(bombNum) + 1).toString();
        }
    }


    displayPiece(parent) {
        var newDiv = document.createElement("div");
        newDiv.classList.add("tile");
        
        this.textDiv = document.createElement("div");
        this.textDiv.classList.add("prevent-select");
        
        this.textDiv.style.visibility = "hidden";
        newDiv.appendChild(this.textDiv);
        newDiv.addEventListener('click', (event) => {
            if(!timerStarted && !done) {
                timerStarted = true;
                intervalID = setInterval(setTime, 1000);
                beginGame(this);
            }
            if(this.wakeUp() == -1) {
                if(!done) {
                    timerStarted = false;
                    clearInterval(intervalID);
                    alert("Game Over :(");
                    done = true;
                }
                
            }
            else {
                if(isGameGoing() == false) {
                    if(!done) {
                        timerStarted = false;
                        clearInterval(intervalID);
                        alert("YOU WON!");
                        for(let i=0; i<piecesGlobal.length; i++) {
                            if(piecesGlobal[i].bomb == true) {
                                if(piecesGlobal[i].flag == false) {
                                    piecesGlobal[i].textDiv.innerHTML = "<i class='fa-solid fa-flag'></i>";
                                    piecesGlobal[i].textDiv.classList.remove("numB");
                                    piecesGlobal[i].textDiv.classList.add("flag");
                                    piecesGlobal[i].textDiv.style.visibility = "visible";
                                    piecesGlobal[i].flag = true;
                                    var bombNum = document.getElementById("bombNum").innerHTML;
                                    document.getElementById("bombNum").innerHTML = (parseInt(bombNum) - 1).toString();
                                }
                            }
                        }
                        done = true;
                        
                    }
                    
                }
            }
        });

        newDiv.addEventListener('contextmenu', (event) => {
            this.plantFlag();
        });

        parent.appendChild(newDiv);
    }
    
}


function isGameGoing() {

    var tilesLeft = false;

    for(let i=0; i<piecesGlobal.length; i++) {
        if(piecesGlobal[i].val != "-1") {
            if(piecesGlobal[i].textDiv.style.visibility == "hidden") {
                tilesLeft = true;
                break;
            }
        }
    }

    return tilesLeft;
}


function chooseBombs(arr, num, ele) {

    var cache = [];
    var i = 0;
    var bombs = 0;
    while(bombs < num) {
        var randIndex = Math.floor(Math.random() * arr.length);
        if(!cache.includes(randIndex)) {
            randPiece = arr[randIndex];
            if(randPiece != ele) {
                console.log(randPiece);
                randPiece.bomb = true;
                cache.push(randIndex);
                bombs++;
            }
            else {
                console.log("matched!!!");
            }
        }

    }
}

function beginGame(ele) {
    chooseBombs(piecesGlobal, numBombs, ele);

    for(let i=0; i < piecesGlobal.length; i++) {
        piecesGlobal[i].setVal(piecesGlobal, x);

        if(piecesGlobal[i].val == "-1") {
            piecesGlobal[i].textDiv.classList.add("numB");
            piecesGlobal[i].textDiv.innerHTML = '<i class="fa-solid fa-bomb"></i>';
        }
        else if (piecesGlobal[i].val > 0) {
            piecesGlobal[i].textDiv.classList.add("num"+piecesGlobal[i].val);
            piecesGlobal[i].textDiv.innerHTML = piecesGlobal[i].val;
        }
        else {
            piecesGlobal[i].textDiv.classList.add("num"+piecesGlobal[i].val);
        }
    }
}

function buildBoard(tempx, y) {

    x = tempx;

    document.getElementById("bombNum").innerHTML = numBombs;

    var game = document.createElement("div");
    game.setAttribute('id','game');
    game.classList.add("game");
    game.style.width = (x*32).toString() + "px";
    game.style.height = (y*32).toString() + "px";
    document.getElementById("gameContainer").appendChild(game);
    
    for(let i=0; i < x*y; i++) {
        
        var p = new Piece(false, i+1);
        piecesGlobal.push(p);
        piecesGlobal[i].displayPiece(game);
        
        
    }

    /*chooseBombs(piecesGlobal, numBombs);

    for(let i=0; i < piecesGlobal.length; i++) {
        piecesGlobal[i].setVal(piecesGlobal, x);
        piecesGlobal[i].displayPiece(game);
        
    }*/


    done = false;
}

function endGame() {
    var element = document.getElementById('game');
    piecesGlobal = [];
    element.innerHTML = "";
    element.remove();
    timerStarted = false;
    clearInterval(intervalID);
    totalSeconds = 0;

    var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    minutesLabel.innerHTML = "00";
    secondsLabel.innerHTML = "00";
}

function startEasy() {
    endGame();
    numBombs = 10;
    buildBoard(9,9);
}

function startMedium() {
    endGame();
    numBombs = 40;
    buildBoard(16,16);
}

function startHard() {
    endGame();
    numBombs = 99;
    buildBoard(30,16);
}

function startVeryHard() {
    endGame();
    numBombs = 120;
    buildBoard(30,16);
}