// Global Variables //
var playerChoice = undefined;
var aiChoice = undefined;
var playerPiece = undefined;
var aiPiece = undefined;
var xPiece = "background-image:url(images/x.png);";
var oPiece = "background-image:url(images/o.png);";
var whichAI = undefined;
var list = new Array();
var results = new Array();
var concluded = false;
var playerScore = 0;
var aiScore = 0;
var tieScore = 0;
var tie = false;
var playerFirst = true;
var turnCounter = 1;

//A list of win conditions//

    var winConditions = new Array();
    //Horizontal//
    winConditions[0] = [1,2,3];
    winConditions[1] = [4,5,6];
    winConditions[2] = [7,8,9];
    //Vertical//
    winConditions[3] = [1,4,7];
    winConditions[4] = [2,5,8];
    winConditions[5] = [3,6,9];
    //Diagonal//
    winConditions[6]= [3,5,7];
    winConditions[7]= [1,5,9];


// Functions //
function forEach(array, action){
    
    for(var i = 0; i < array.length; i++){
        action(array[i]);
    }
}

function compare(number){

    for(var i = 0; i < list.length; i++){
        if(number === list[i]){results.push(number);}  
    }
    console.log(results);
}

function reset(){
 
    results = new Array();
    list = new Array();
    for (i = 1; i <=9; i++){
        document.getElementById(i).removeAttribute("o");
        document.getElementById(i).removeAttribute("x");
        document.getElementById(i).removeAttribute("style");
    }
    concluded = false;
    tie = false;
    playerFirst = true;
    turnCounter = 1;
    resetCheck = true;
    coinFlip();
    
}

function coinToss(){ return Math.floor(Math.random()*(2-1+1)+1);}

//Who goes first//
function coinFlip(){
    
    if (coinToss() === 2){
        playerFirst=false;
        letsplay();
    }else if (coinToss() === 1){playerFirst = true;}
}


//Choose a Piece//
function myChoice(choice){
    
    if(playerChoice === undefined){
        
        playerChoice = choice;
        if(choice === "x"){ 
            playerPiece = xPiece; 
            aiPiece = oPiece; 
            aiChoice = "o";
            document.getElementById(choice).setAttribute("style", "background-image:url(images/x-icon-over.png);");
        } else if (choice === "o"){
            playerPiece = oPiece; 
            aiPiece = xPiece; 
            aiChoice = "x";
            document.getElementById(choice).setAttribute("style", "background-image:url(images/o-icon-over.png);");
        }
    }
}

//Choose an Ai//
function setAI(choice){
    
    if(whichAI === undefined){
        whichAI = choice;
        document.getElementById(choice).setAttribute("style", "color: #e74c3c");
    }
}

// Verify my piece //
function myPiece(){

    if (playerChoice === "x"){
        return xPiece
    }else if (playerChoice === "o"){
        return oPiece
    }
}

function verify(){

    if(playerChoice === undefined){
        alert("Please choose X or O");
    }else if(whichAI === undefined){
        alert("Please choose an AI difficulty");
    }
}

// Start Here //
function mySelection(idname){
    
    verify();
    
	if(concluded === false && playerChoice != undefined && whichAI != undefined){

		if(checkSpace(idname, playerChoice) === false && checkSpace(idname, aiChoice) === false){

			document.getElementById(idname).setAttribute("style", myPiece());
			document.getElementById(idname).setAttribute(playerChoice, true);
            winCondition(playerChoice);
		}
        
        if(concluded === false){letsplay();}

        if(concluded === true){reset();}
        
	}
    

}

// Choose an AI //
function letsplay(){
    
    if(concluded === false){
        if (whichAI === "random"){ randomAI(); }
        else if (whichAI === "normal"){ normalAI(); }
    }
}

//AIs//
function placePieceAI(id){
    
    //Put down your Piece//
    document.getElementById(id).setAttribute("style", aiPiece);
    document.getElementById(id).setAttribute(aiChoice, true);
}

function checkSpace(id,whichPlayer){
    if(document.getElementById(id).hasAttribute(whichPlayer)){ return true } else { return false }
}

function randomAI(){

    var randNumber = Math.floor(Math.random()*(9-1+1)+1);      
    while(checkSpace(randNumber, playerChoice) != false || checkSpace(randNumber, aiChoice) != false){
            randNumber = Math.floor(Math.random()*(9-1+1)+1);
    }
    placePieceAI(randNumber);
    winCondition(aiChoice);
}

// Check for Win Condition //
function setConclusion(playerPiece){
    
    concluded=true;      
    if(tie === true){
        alert("It was a tie!"); 
        tieScore+=1; 
        document.getElementById("tieScore").innerHTML = tieScore;
    }else if(playerPiece === playerChoice){
        alert("You won!"); 
        playerScore+=1;
        document.getElementById("yourScore").innerHTML = playerScore;
    }else if(playerPiece === aiChoice){
        alert("Wow, what a scrub..."); 
        aiScore+=1;
        document.getElementById("theirScore").innerHTML = aiScore;
    } 
}
    
function winCondition(playerPiece){
    
    list = new Array();
    results = new Array();

    // Check each square, and if it has a piece and it is the same as the user who is playing, push the numbers to an array //
    for (i = 1; i <=9; i++){
        if(checkSpace(i, playerPiece) === true){
            list.push(i);
            list.sort();
        }   
    }
    
    // Run through each potential condition and see if these numbers are in any of them //
    for (o = 0; o <=7; o++){
        forEach(winConditions[o], compare);
        
        if(results.length === 3){
            o=8;
            setConclusion(playerPiece);
        }else if(list.length >= 5 && o === 7){
            tie = true;
            setConclusion(); 
        }else{results = new Array();}
    }
}