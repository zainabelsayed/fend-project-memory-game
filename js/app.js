//start modal with sweet alert https://sweetalert.js.org/guides/#cdn
swal({
  title: "Start Play!",
  button: "Play Now!",
}).then((value)=>{
				timer();
			});

 // Create a list that holds all of your cards
let cards=document.getElementsByClassName('card')
cards=Array.from(cards);
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
const deck=document.querySelector('.deck');
cards=Array.prototype.slice.call(cards);
cards=shuffle(cards);

for(const card of cards){
  deck.appendChild(card);
}
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

     return array;
}


let openCards=[];//open cards container array
let moves=0;//moves counter
let starNum=0;//stars number
	deck.addEventListener('click',function(event){
		
        const card=event.target;
        
        // no more than two open cards and match cards not count
		if(openCards.length<2&&!card.classList.contains('match')&&!openCards.includes(card)&&!card.classList.contains('open')&&!card.classList.contains('show')&&card.classList.contains('card'))
		{
			moves+=1
        	counter(moves);
			display(card);//diplay card sympol
            addTolist(card);//add open card to open cards list
            if(openCards.length===2){
			match(card);//if there is two open cards check for match
		}     

		}
	
		stars_rating(moves);//call star rating function
	    congratulations(); //call congratulation function after finish playing 
    
});
//start button reset
const repeat=document.querySelector('.restart');
repeat.addEventListener('click',function(){
 location.reload();
})
// add classes open and show to display cards and animated for card animation
function display(card){
	card.classList.add('open','show','animated','jello');
}
//pushing every open card to open cards array
function addTolist(card){
	 openCards.push(card);
}

function match(){
	if(openCards[0].innerHTML===openCards[1].innerHTML)//check if cards are match 
			{
				openCards[0].classList.remove('animated','jello');//remove animation classes to restart animation
				openCards[1].classList.remove('animated','jello');
				openCards[0].classList.add('match','animated','tada');//add animation to matched cards
				openCards[1].classList.add('match','animated','tada');
				openCards=[];
			}
			else{
				setTimeout(()=>{	
			    openCards[0].classList.remove('open','show','animated','jello');//if cards not matched remove open and show classes to flip it down again
				openCards[1].classList.remove('open','show','animated','jello');
				openCards=[];}
				,1000);
			}
}
//change move counter with every click
function counter(moves){

        document.querySelector('.moves').innerHTML=moves;
}

//detect star rating depend on number of moves
function stars_rating(){
let stars=Array.from(document.getElementsByClassName('fa-star'));	
	switch(true){
		case (30<=moves&&moves<=32):
		
		stars[0].classList.add('glow');
		stars[1].classList.remove('glow');
		stars[2].classList.remove('glow');
		stars[3].classList.remove('glow');
		stars[4].classList.remove('glow');
		starNum=1;
		break;
		case (27<=moves&&moves<=29):

		stars[0].classList.add('glow');
		stars[1].classList.add('glow');
		stars[2].classList.remove('glow');
		stars[3].classList.remove('glow');
		stars[4].classList.remove('glow');
		starNum=2;
		break;
		case (24<=moves&&moves<=26):
	
		stars[0].classList.add('glow');
	    stars[1].classList.add('glow');
		stars[2].classList.add('glow');
		stars[3].classList.remove('glow');
		stars[4].classList.remove('glow');
		starNum=3;
		break;
		case (21<=moves&&moves<=23):
	
		stars[0].classList.add('glow');
	    stars[1].classList.add('glow');
		stars[2].classList.add('glow');
		stars[3].classList.add('glow');
		stars[4].classList.remove('glow');
		starNum=4;
		break;
		case (moves<=20):

		for(const star of stars)
		{
			star.classList.add('glow');
		}
		starNum=5;
		break;	
}
}
//if all cards are matched then diplay congratulation message
function congratulations(){

	setTimeout(()=>{
	const matched=document.querySelectorAll('.match');
	if(matched.length===16)
		{
			clearInterval(time);
			if(starNum===1)
			{
				swal('Congratulations! You won!','Moves: '+moves+' moves '+'Stars: '+starNum+' star'+'Time: '+pad(minute)+':'+pad(second), 'success',{
				button:'Play again',
			}).then((value)=>{
				location.reload();
			})
			}
			else{
				//modal with sweet alert https://sweetalert.js.org/guides/#cdn
				swal('Congratulations! You won!','Moves: '+moves+' moves '+' Stars: '+starNum+' stars '+' Time: '+pad(minute)+':'+pad(second), 'success',{
				button:'Play again',
			}).then((value)=>{
				location.reload();
			})
			}
			
		}}
		,1500)
	
}

//timer function
let time;
let second = 0;
let minute=0;
function timer(){
	let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");

time=setInterval(setTime, 1000);//every secon seconds counter increase by one

function setTime() {
  second+=1;
  seconds.innerHTML =pad(second);
  if (second===60)//evey 60 seconds minutes counter increase by one
  {
  	second=0;
  	minute+=1;
  	minutes.innerHTML =pad(minute);
  }
  
}

}
// pad function from stackoverflow that make counter have two digits
function pad(val) {
  let valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
