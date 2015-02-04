function normalAI(){
    console.log("enter AI!" + turnCounter + playerFirst);
    // Useful Tools for MR AI //
    var corners = [1,3,7,9];
    var edges = [2,4,6,8];
    var center = 5;
    var locations = new Array();
    var randomChoice = false;
    var counterTime = false;

    function checkLocations(array, whichPlayer){
        for(x=0; x < array.length; x++){
            if(checkSpace(array[x], whichPlayer) === true){
                x=array.length;
                return true
            }else if (x === array.length){ return false}
        }
    }
    
    function reportLocations(whichPlayer){
        
        for(x=1; x<10; x++){
         
            if(document.getElementById(x).hasAttribute(whichPlayer)){
                locations.push(x);
            }
        }
    }

    function searchforWin(){

        list = new Array();

        // Check for all ai pieces, push the numbers to an array //
        for (i = 1; i <=9; i++){
            if(checkSpace(i, aiChoice) === true){
                list.push(i);
                list.sort();
            }   
        }
        
        // Run through each potential condition and see if these numbers are in any of them //
        for (o = 0; o <=7; o++){
            
            forEach(winConditions[o], compare);
            if(results.length === 2){

                for(j = 0; j < 3; j++){

                    if(checkSpace(winConditions[o][j], aiChoice) === false && checkSpace(winConditions[o][j], playerChoice) === false){
                        placePieceAI(winConditions[o][j]);
                        counterTime = false;
                        o=7;
                        j=3;
                    }
                }
                results = new Array();
            } else {results = new Array(); counterTime = true;}

        }
    }
    

    function searchforCounter(){

        list = new Array();

        // Check for all player pieces, push the numbers to an array //
        for (i = 1; i <=9; i++){
            if(checkSpace(i, playerChoice) === true){
                list.push(i);
                list.sort();
            }   
        }
        
        // Run through each potential condition and see if these numbers are in any of them //
        for (o = 0; o <=7; o++){
            
            forEach(winConditions[o], compare);

            if(results.length === 2){

                for(j = 0; j < 3; j++){

                    if(checkSpace(winConditions[o][j], aiChoice) === false && checkSpace(winConditions[o][j], playerChoice) === false){
                        placePieceAI(winConditions[o][j]);
                        randomChoice = false;
                        o=7;
                        j=3;
                    }
                }
                results = new Array();
            } else {results = new Array(); randomChoice = true;}

        }
    }
    
    function randomPlay(){

        var randNumber = Math.floor(Math.random()*(9-1+1)+1);      

        while(checkSpace(randNumber, playerChoice) === true || checkSpace(randNumber, aiChoice) === true){
            randNumber = Math.floor(Math.random()*(9-1+1)+1);
        }
        randomChoice === false;
        placePieceAI(randNumber);
    }

    
    // Turn 1 //
    if(turnCounter === 1){

        var coinflipTwo = Math.floor(Math.random()*(4-1+1)+0);

        // If player did not go first //
        if(playerFirst === false){
            if(coinToss() === 1){
                placePieceAI(5);
            }else{
                placePieceAI(corners[coinflipTwo]);
            }

        }else if (playerFirst === true){

            // If player marked center //
            if(checkSpace(5, playerChoice) === true){

                placePieceAI(corners[coinflipTwo]);

            }else {placePieceAI(5);}
        }
    }
    
    //******************* If it is turn 2 *******************//
    if(turnCounter === 2){

        //******************** If the player was not first *************//
        if(playerFirst === false){
        
            // Check to see if AI played center piece //
            if(checkSpace(5, aiChoice) === true){
                //If AI did play center, check to see if player played on the edges//
                for( x=0; x<edges.length; x++){

                    if(checkSpace(edges[x], playerChoice) === true){

                            switch(edges[x]){
                                case 2:
                                    if(coinToss() === 1){
                                        placePieceAI(7);
                                    }else {
                                        placePieceAI(9);
                                    }   
                                    break;
                                case 4:
                                    if(coinToss() === 1){
                                        placePieceAI(3);
                                    }else {
                                        placePieceAI(9);
                                    }   
                                    break;
                                case 6:
                                    if(coinToss() === 1){
                                        placePieceAI(1);
                                    }else {
                                        placePieceAI(7);
                                    }   
                                    break;
                                case 8:
                                    if(coinToss() === 1){
                                        placePieceAI(1);
                                    }else {
                                        placePieceAI(3);
                                    } 
                                    break;
                            }       
                        x=4;
                    }    
                }
                
                // If player did not place on edge, check to see if they placed on corner //
                for( i=0; i<corners.length; i++){

                    if(checkSpace(corners[i], playerChoice) === true && playerFirst === false){

                        switch(corners[i]){
                            case 1:
                                placePieceAI(9);
                                break;
                            case 3:
                                placePieceAI(7);
                                break;
                            case 7:
                                placePieceAI(3);
                                break;
                            case 9:
                                placePieceAI(1);
                                break;
                        }       
                        i=corners.length;   
                    }
                }
            }// If AI did not play center check to see if it played corner //
            else if(checkLocations(corners, aiChoice) === true){
                
                // If AI did play corner & player Marked center find out where AI played last and place a piece in the opposite corner //
                if(checkSpace(5, playerChoice)){

                    reportLocations(aiChoice);

                    switch(locations[0]){
                     
                            case 1:
                                placePieceAI(9);
                                break;
                            case 3: 
                                placePieceAI(7);
                                break;
                            case 7:
                                placePieceAI(3);
                                break;
                            case 9:
                                placePieceAI(1);
                                break;
                    }
                }else{

                    // Else if player played anwyhere else, check to see which adjacent row to the piece AI played last is totally available and play there //
                    reportLocations(aiChoice);

                    switch(locations[0]){  
                        case 1:
                            if(checkSpace(2, playerChoice) != true && checkSpace(3, playerChoice) != true){
                                placePieceAI(3);
                            }else if(checkSpace(4, playerChoice) != true && checkSpace(7, playerChoice) != true){
                                placePieceAI(7);
                            }
                            break;
                        case 3:
                            if(checkSpace(1, playerChoice) != true && checkSpace(2, playerChoice) != true){
                                placePieceAI(1);
                            }else if(checkSpace(6, playerChoice) != true && checkSpace(9, playerChoice) != true){
                                placePieceAI(9);
                            }
                            break;
                        case 7:
                            if(checkSpace(4, playerChoice) != true && checkSpace(1, playerChoice) != true){
                                placePieceAI(1);
                            }else if(checkSpace(8, playerChoice) != true && checkSpace(9, playerChoice) != true){
                                placePieceAI(9);
                            }
                            break;
                        case 9:
                            if(checkSpace(8, playerChoice) != true && checkSpace(7, playerChoice) != true){
                                placePieceAI(7);
                            }else if(checkSpace(6, playerChoice) != true && checkSpace(3, playerChoice) != true){
                                placePieceAI(3);
                            }
                            break;
                    }
                }
            }

        }else if( playerFirst === true ){
            if(concluded === false){
                searchforWin();
            }

            if(concluded === false && counterTime === true){
                searchforCounter();    
            }

            if(concluded === false && randomChoice === true){
                randomPlay();
            }
        }
    }
    
    // Turn 3 //

    if(turnCounter === 3){

        if(concluded === false){
            searchforWin();
        }

        if(concluded === false && counterTime === true){
            searchforCounter();    
        }

        if(concluded === false && randomChoice === true){
            randomPlay();
        }
    }

    if(turnCounter === 4){

        if(concluded === false){
            searchforWin();
        }

        if(concluded === false && counterTime === true){
            searchforCounter();    
        }

        if(concluded === false && randomChoice === true){
            randomPlay();
        }
    }

    if(turnCounter === 5){

        if(concluded === false){
            searchforWin();
        }

        if(concluded === false && counterTime === true){
            searchforCounter();    
        }

        if(concluded === false && randomChoice === true){
            randomPlay();
        }
    }
    
    if(turnCounter === 6){

        if(concluded === false){
            searchforWin();
        }

        if(concluded === false && counterTime === true){
            searchforCounter();    
        }

        if(concluded === false && randomChoice === true){
            randomPlay();
        }
    }
    
    if(turnCounter === 7){

        if(concluded === false){
            searchforWin();
        }

        if(concluded === false && counterTime === true){
            searchforCounter();    
        }

        if(concluded === false && randomChoice === true){
            randomPlay();
        }
    }


    // After all is said and done, set turn counter to be +1 //
    turnCounter ++;

    // After your done placing a piece, search for win//
    winCondition(aiChoice);

}