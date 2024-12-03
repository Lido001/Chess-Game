

var boxes =document.getElementsByClassName("box");
var clickCount=1;
var child=null;
var width = 8;
var currentBoxIndex='';


// console.log(boxes);
for(let i=0; i<boxes.length; i++)
{
    boxes[i].addEventListener('click', function(){content(i)});
}


function isPathClear(startIndex, endIndex, isHorizontal) {
   if (isHorizontal) {
       // Moving horizontally (same row)
       let direction = endIndex > startIndex ? 1 : -1;  // Determine left or right
       for (let i = startIndex + direction; i !== endIndex; i += direction) {
           if (boxes[i].childNodes[0]) {
               return false;  // A piece is blocking the path
           }
       }
   } else {
       // Moving vertically (same column)
       let direction = endIndex > startIndex ? width : -width;  // Determine up or down
       for (let i = startIndex + direction; i !== endIndex; i += direction) {
           if (boxes[i].childNodes[0]) {
               return false;  // A piece is blocking the path
           }
       }
   }
   return true;  // No pieces are blocking the path
}


function isPathClearBishop(startIndex, endIndex) {
    let startRow = Math.floor(startIndex / width);
    let endRow = Math.floor(endIndex / width);
    let startCol = startIndex % width;
    let endCol = endIndex % width;

    let rowDirection = endRow > startRow ? 1 : -1; // Determine if moving down or up
    let colDirection = endCol > startCol ? 1 : -1; // Determine if moving right or left

    let steps = Math.abs(endRow - startRow); // Number of steps to move diagonally
    for (let i = 1; i < steps; i++) {
        let row = startRow + i * rowDirection;
        let col = startCol + i * colDirection;
        let index = row * width + col;

        if (boxes[index].childNodes[0]) {
            // There's a piece blocking the diagonal path
            return false;
        }
    }
    return true; // Path is clear
}


function isEnemyPiece(targetIndex) {
    let targetPiece = boxes[targetIndex].childNodes[0];
    if (!targetPiece === "whitepawn") {
        return false;
    }
    return true;    
}





function content(boxValue) {   // function call



    
     currentBox=boxes[boxValue];

     
     
     if(clickCount===1)
     {
        if(currentBox.childNodes[0] || boxValue==currentBoxIndex+width+8)
            {
               child = currentBox.childNodes[0];  //store the value of the piece
               currentBoxIndex = boxValue;
               currentBox.removeChild(child);     // remove the piece from the parent node
               console.log("picked up from the box:",currentBoxIndex); // first click value               
               clickCount=2;
               
            }
            
     }
     else{
      console.log("atempt to drop in box:",boxValue);  // attempt of second click
      let validMove = false;
      let piecetype = child.id;

      // if (boxValue==currentBoxIndex+width+1 || boxValue==currentBoxIndex+width-1) {
      //    console.log("first");        
      //    validMove=true;
         
      // } 
      // else if (boxValue==currentBoxIndex+width+8 || boxValue==currentBoxIndex+width) {
      //    console.log("second");        
      //    validMove=true;
         
      // }
   

      switch (piecetype) {   
         case "blackpawn":
            if (boxValue==currentBoxIndex+width+1 || boxValue==currentBoxIndex+width-1) {
               console.log("first");        
               validMove=true;
               
            } 
            else if (boxValue==currentBoxIndex+width+8 || boxValue==currentBoxIndex+width) {
               console.log("second");        
               validMove=true;
               
            }
            else if (!piecetype == "whitepawn") {
                validMove=true;
                
            }
         break;

         case "whitepawn":
            if (boxValue== currentBoxIndex-width-1 || boxValue==currentBoxIndex-width+1) {
               console.log("third");              
               validMove= true;
            }
            else if (boxValue==currentBoxIndex-width-8 || boxValue==currentBoxIndex-width) {
               console.log("fourth");             
               validMove=true;               
            }
         break; 
         
         case "rook":
            let startRow = Math.floor(currentBoxIndex / width);
            let targetRow = Math.floor(boxValue / width);
            let startCol = currentBoxIndex % width;
            let targetCol = boxValue % width;

            if (startRow === targetRow) {
                // Rook moving horizontally
                if (isPathClear(currentBoxIndex, boxValue, true)) {
                    console.log("Rook move is valid (horizontal)");
                    validMove = true;
                } else {
                    console.log("Path is blocked (horizontal)");
                }
            } else if (startCol === targetCol) {
                // Rook moving vertically
                if (isPathClear(currentBoxIndex, boxValue, false)) {
                    console.log("Rook move is valid (vertical)");
                    validMove = true;
                } else {
                    console.log("Path is blocked (vertical)");
                }
            }
         break;
         
         case "knight":
            let startrow = Math.floor(currentBoxIndex / width);
            let targetrow = Math.floor(boxValue / width);
            let startcol = currentBoxIndex % width;
            let targetcol = boxValue % width;
        
            let rowDiff = Math.abs(startrow - targetrow);
            let colDiff = Math.abs(startcol - targetcol);
        
            // A valid knight move is either (2, 1) or (1, 2)
            if ((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)) {
                console.log("Knight move is valid");
                validMove = true;
            } else {
                console.log("Invalid knight move");
            }
         break;


         case "Bishop":
            let start_Row = Math.floor(currentBoxIndex / width);
            let target_Row = Math.floor(boxValue / width);
            let start_Col = currentBoxIndex % width;
            let target_Col = boxValue % width;

            let rowdiff = Math.abs(start_Row - target_Row);
            let coldiff = Math.abs(start_Col - target_Col);
            
            
            if (rowdiff === coldiff) {
                if (isPathClearBishop(currentBoxIndex, boxValue)) {
                    console.log("Bishop move is valid");
                    validMove = true;
                }
                else{
                    console.log("Path is Blocked");
                }
            }
            else{
                console.log("Invalid Bishop move");               
            }
         break;


         case "Queen":
            let StartRow = Math.floor(currentBoxIndex / width);
            let TargetRow = Math.floor(boxValue / width);
            let StartCol = currentBoxIndex % width;
            let TargetCol = boxValue % width;
    
            // Horizontal movement
            if (StartRow === TargetRow) {
                if (isPathClear(currentBoxIndex, boxValue, true)) {
                    console.log("Queen move is valid (Horizontal)");                   
                    validMove = true;
                }
                else{
                    console.log("Path is Blocked");                   
                }
            }
            // Vertical movement
            else if (StartCol === TargetCol) {
                if (isPathClear(currentBoxIndex, boxValue, false)) {
                    console.log("Queen move is valid (vertical)");                   
                    validMove = true;
                }
                else{
                    console.log("Path is blocked");
                }
            }
            // Diagonal movement
            else if (Math.abs(StartRow - TargetRow) === Math.abs(StartCol - TargetCol)) {
                if (isPathClearBishop(currentBoxIndex, boxValue)) {
                    console.log("Queen move is valid (Diagonal)");
                    validMove = true;
                }
                else{
                    console.log("Path is blocked");
                }
            } else {
                console.log("Invalid queen move");
            }
         break;


         case "King":
            let Startrow = Math.floor(currentBoxIndex / width);
            let Targetrow = Math.floor(boxValue / width);
            let Startcol = currentBoxIndex % width;
            let Targetcol = boxValue % width;
        
            let RowDiff = Math.abs(Startrow - Targetrow);
            let ColDiff = Math.abs(Startcol - Targetcol);
        
            // Check if the king is moving only one square in any direction
            if (RowDiff <= 1 && ColDiff <= 1) {
                // Ensure the target square doesn't have a friendly piece (optional: implement this check)
                if (!boxes[boxValue].childNodes[0] || isEnemyPiece(boxValue)) {
                    validMove = true;
                } else {
                    console.log("Target square is occupied by a friendly piece");
                }
            } else {
                console.log("Invalid king move");
            }
            break;




         

         

               
      
         default:
            // validMove= true;
            break;
      }




      
        if(currentBox.childNodes[0])
            {
               
               currentBox.removeChild(currentBox.childNodes[0]); //remove existing child node by another
               console.log("Piece removed from box:",boxValue)
            }








              //check if the move is valid
            // console.log("run");
            
            


            // if (child == child + width) {
            //    validMove = true;
               
               
            // }

            // switch (child) {
            //    case "box":
            //       if (boxes.includes(child) && child + width * 2 === targetbox || child + width == targetbox) {
            //          validMove = true;
                     
                     
            //       }
                  
            //       break;
            
            //    default:
            //       break;
            // }

            // if (child === child+8) {
            //    validMove= true;
            // }

            // switch (child) {
            //    case "box":

            //    // let initial=boxValue[8,9,10,11,12,13,14,15]                            
            //    // if (initial.includes(boxValue) && boxValue + width * 2 === targetbox || initial + width == targetbox) {
            //    //    validMove = true;
            //    //       console.log("run");
               

                  
               
            //    // }

               
                
            //     break;
            
            //    default:
                  
            //       break;
                  
            // }

            if (validMove) {
               currentBox.appendChild(child);
               console.log("pieced moved to box:",boxValue); //second click value
               
               console.log("piece moved from box:", currentBoxIndex);    // Move the piece to the target box   and second click value from which box             
               child = null;                   // Clear the stored piece after moving
           } else {
            console.log("invaid move");
            
               boxes[currentBoxIndex].appendChild(child); // Return piece to original position
               child = null; // Clear stored piece
           }
   
           // Reset click count
           clickCount = 1;
       
            
            // if(child);
            //     {                    
            //        currentBox.appendChild(child)
            //        child=null;
            //        clickCount=1;
            //     }
               


     }
     
   //   console.log(boxValue);
     
    
    }