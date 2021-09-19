 document.addEventListener("DOMContentLoaded", () => {
 	
 	// const squares = gridItem;
    const myNodelist = document.querySelectorAll(".grid-item");
    const scoreDisplay = document.getElementById("score");
    const resultDisplay = document.getElementById("result");
    let score = 0;

  	gridValue = () =>{
  		// const myNodelist = document.querySelectorAll(".grid-item");
        for (let i = 0; i < myNodelist.length; i++) {
          myNodelist[i].innerHTML = 0;
         
        }
        
    }

    gridValue();


 	generate = () =>{
  		const randomNumber = Math.floor(Math.random() * myNodelist.length );
  		if(myNodelist[randomNumber].innerHTML == 0){
  			myNodelist[randomNumber].innerHTML = 2 ;
            
  		} 
  		else generate();

  	}
  	generate();
  	

  	
  	

  moveRight = () =>{
    for (let i=0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = myNodelist[i].innerHTML;
        let totalTwo = myNodelist[i+1].innerHTML;
        let totalThree = myNodelist[i+2].innerHTML;
        let totalFour = myNodelist[i+3].innerHTML;
        let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

        let filteredRow = row.filter(num => num);
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = zeros.concat(filteredRow);

        myNodelist[i].innerHTML = newRow[0];
        myNodelist[i +1].innerHTML = newRow[1];
        myNodelist[i +2].innerHTML = newRow[2];
        myNodelist[i +3].innerHTML = newRow[3];
      }
    }
  }

  moveLeft = () =>{
    for (let i=0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = myNodelist[i].innerHTML;
        let totalTwo = myNodelist[i+1].innerHTML;
        let totalThree = myNodelist[i+2].innerHTML;
        let totalFour = myNodelist[i+3].innerHTML;
        let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

        let filteredRow = row.filter(num => num);
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = filteredRow.concat(zeros);

        myNodelist[i].innerHTML = newRow[0];
        myNodelist[i +1].innerHTML = newRow[1];
        myNodelist[i +2].innerHTML = newRow[2];
        myNodelist[i +3].innerHTML = newRow[3];
      }
    }
  }


  moveUp = () =>{
    for (let i=0; i < 4; i++) {
      let totalOne = myNodelist[i].innerHTML;
      let totalTwo = myNodelist[i +4].innerHTML;
      let totalThree = myNodelist[i +8].innerHTML;
      let totalFour = myNodelist[i +12].innerHTML;
      let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

      let filteredColumn = column.filter(num => num);
      let missing = 4 - filteredColumn.length;
      let zeros = Array(missing).fill(0);
      let newColumn = filteredColumn.concat(zeros);

      myNodelist[i].innerHTML = newColumn[0];
      myNodelist[i +4].innerHTML = newColumn[1];
      myNodelist[i +8].innerHTML = newColumn[2];
      myNodelist[i +12].innerHTML = newColumn[3];
    }
  }

  moveDown = () =>{
    for (let i=0; i < 4; i++) {
      let totalOne = myNodelist[i].innerHTML;
      let totalTwo = myNodelist[i +4].innerHTML;
      let totalThree = myNodelist[i +8].innerHTML;
      let totalFour = myNodelist[i +12].innerHTML;
      let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

      let filteredColumn = column.filter(num => num);
      let missing = 4 - filteredColumn.length;
      let zeros = Array(missing).fill(0);
      let newColumn = zeros.concat(filteredColumn);

      myNodelist[i].innerHTML = newColumn[0];
      myNodelist[i +4].innerHTML = newColumn[1];
      myNodelist[i +8].innerHTML = newColumn[2];
      myNodelist[i +12].innerHTML = newColumn[3];
    }
  }

  combineRow = () =>{
    for (let i =0; i < 15; i++) {
      if (myNodelist[i].innerHTML === myNodelist[i +1].innerHTML) {
        let combinedTotal = parseInt(myNodelist[i].innerHTML) + parseInt(myNodelist[i +1].innerHTML);
        myNodelist[i].innerHTML = combinedTotal;
        myNodelist[i +1].innerHTML = 0;
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
    checkForGameOver();
    
  }

  combineColumn = () =>{
    for (let i =0; i < 12; i++) {
      if (myNodelist[i].innerHTML === myNodelist[i +4].innerHTML) {
        let combinedTotal = parseInt(myNodelist[i].innerHTML) + parseInt(myNodelist[i +4].innerHTML);
        myNodelist[i].innerHTML = combinedTotal;
        myNodelist[i +4].innerHTML = 0;
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
    
    checkForGameOver();
  }

  
  control = (e) =>{
    if(e.keyCode === 37) {
      keyLeft();
    } else if (e.keyCode === 38) {
      keyUp();
    } else if (e.keyCode === 39) {
      keyRight();
    } else if (e.keyCode === 40) {
      keyDown();
    }
  }
  document.addEventListener('keyup', control);

  keyRight = () => {
    moveRight();
    combineRow();
    moveRight();
    generate();
  }

  keyLeft = () => {
    moveLeft();
    combineRow();
    moveLeft();
    generate();
  }

  keyUp = () =>{
    moveUp();
    combineColumn();
    moveUp();
    generate();
  }

  keyDown = () =>{
    moveDown();
    combineColumn();
    moveDown();
    generate();
  }
  

  //check if there are no zeros on the board to game over!!!
  function checkForGameOver(){
    let zeros = 0;
    for (let i=0; i < myNodelist.length; i++) {
      if (myNodelist[i].innerHTML == 0) {
        zeros++;
      }
    }
    if (zeros === 0) {
      resultDisplay.innerHTML = "Game Over !!!";
      document.removeEventListener('keyup', control);
      setTimeout(() => clear(), 3000);
    }
  }
  
  clear = () =>{
    clearInterval(myTimer);
  }


  //add colours
  addColours = () =>{
    for (let i=0; i < myNodelist.length; i++) {
      if (myNodelist[i].innerHTML == 0) myNodelist[i].style.backgroundColor = '#737373';
      else if (myNodelist[i].innerHTML == 2) myNodelist[i].style.backgroundColor = '#eee4da';
      else if (myNodelist[i].innerHTML  == 4) myNodelist[i].style.backgroundColor = '#e6d5b2'; 
      else if (myNodelist[i].innerHTML  == 8) myNodelist[i].style.backgroundColor = '#f2b179';
      else if (myNodelist[i].innerHTML  == 16) myNodelist[i].style.backgroundColor = '#ffcea4';
      else if (myNodelist[i].innerHTML  == 32) myNodelist[i].style.backgroundColor = '#e8c064'; 
      else if (myNodelist[i].innerHTML == 64) myNodelist[i].style.backgroundColor = '#ffab6e'; 
      else if (myNodelist[i].innerHTML == 128) myNodelist[i].style.backgroundColor = '#fd9982'; 
      else if (myNodelist[i].innerHTML == 256) myNodelist[i].style.backgroundColor = '#ead79c'; 
      else if (myNodelist[i].innerHTML == 512) myNodelist[i].style.backgroundColor = '#008080'; 
      else if (myNodelist[i].innerHTML == 1024) myNodelist[i].style.backgroundColor = '#88d85a'; 
      else if (myNodelist[i].innerHTML == 2048) myNodelist[i].style.backgroundColor = '#d7d4f0'; 
    }
}
addColours()

var myTimer = setInterval(addColours, 50);

});
  	
     
  