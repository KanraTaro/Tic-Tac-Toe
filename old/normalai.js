function normalAI(){
    
    // Useful Tools for MR AI //
    var corners = [1,3,7,9];
    var edges = [2,4,6,8];
    var center = 5;
    var locations = new Array();
    
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
    
    // SPECIAL NOTE: Currently working on AI first two turns and ONLY when AI goes first //
    
    // Turn 1 //
    if(turnCounter === 1){
        
        // If player did not go first //
        if(playerFirst === false){

            var coinflipTwo = Math.floor(Math.random()*(4-1+1)+0);

            if(coinToss() === 1){
                placePieceAI(5);
            }else {
                placePieceAI(corners[coinflipTwo]);
            }

        }
    }
    
    // Turn 2 //
    
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

                    if(checkSpace(corners[i], playerChoice) === true && turnCounter === 2 && playerFirst === false){

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
            } 
            // If AI did not play center check to see if it played corner //
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
        } 
    }

    if(turnCounter === 3){

        if(playerFirst === false){

            //AI played in center //
            if(checkSpace(5,aiChoice) === true){

                // Check to see if player played in edge //
                if(checkLocations(edges, playerChoice) === true){



                }

                // Check to see if player played in corner //
                else if(checkLocations(corners, playerChoice) === true){

                    reportLocations(playerChoice);

                    switch (locations.toString()){

                        case "1,7":
                            placePieceAI(4);
                            break;
                        case "1,3":
                            placePieceAI(2);
                            break;
                        case "7,9":
                            placePieceAI(8);
                            break;
                        case "3,9":
                            placePieceAI(6);
                            break;
                    }
                }

            }
            //If not, AI must have played in corner//
            else if (checkSpace(5, aiChoice)=== false){

                //Check to see if player played in center //
                if(checkSpace(5,playerChoice) === true){

                }
                // else...? //
                else{


                }

            }


        }


    }

    if(turnCounter === 4){

    }

    if(turnCounter === 5){

    }
    
    // After all is said and done, set turn counter to be +1 //
    turnCounter +=1;

}