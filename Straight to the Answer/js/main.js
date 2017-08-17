$(document).ready(function() {
// Create a function that creates the start button and initial screen

function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();

//Create a function, generateHTML(), that is triggered by the start button, and generates the HTML seen on the project video...

$("body").on("click", ".start-button", function(event){
	event.preventDefault();  // added line to test issue on GitHub Viewer
	clickSound.play();
	generateHTML();

	timerWrapper();

}); // Closes start-button click

$("body").on("click", ".answer", function(event){
	//answeredQuestion = true;
	clickSound.play();
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		//alert("correct");

		clearInterval(theClock);
		generateWin();
	}
	else {
		//alert("wrong answer!");
		clearInterval(theClock);
		generateLoss();
	}
}); // Close .answer click

$("body").on("click", ".reset-button", function(event){
	clickSound.play();
	resetGame();
}); // Reset button closure

});  // jQuery wrapper closure

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + 
	"<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + 
	"</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + 
	"<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + 
	"<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + 
	"<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); //  change to 4000 or other amount
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + 
	questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + 
	"</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+
	"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + 
	"<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + 
	correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + 
	"<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["Where were the remains of the oldest humans found?", "What was the name of the Architect who layed out Washington D.C.?", "Who is known to have sung Strange Fruit?", "Who broke the color barrier in Major League Baseball?", "Who invented the Traffic Signal and the Gas Mask?", "Who is known as the father of modern medicine?", "What global population has committed the most genocides in all of history?", "Who wrote Giovanni's Room?"];
var answerArray = [["America", "Asia", "Africa", "Europe"], ["George Washington","Benjamin Banneker","Thomas Jefferson","Martin Delaney"], ["Billie Holiday", "Sarah Vaughn", "Carmen McRae", "Bessie Smith"], ["Luke Easter","Hank Aaron","Satchel Paige","Jackie Robinson"], ["Carter G. Woodson", "W.E.B. DuBois", "Garret A. Morgan", "George Washington Carver"], ["Seti I","Imhotep","Khufu","Rameses"], ["Asian", "European", "African", "Native"], ["Langston Hughes","James Baldwin","Countee Cullen","Bruce Nugent"]];
var imageArray = ["<img class='center-block img-right' src='img/Africa.png'>", "<img class='center-block img-right' src='img/Ben.png'>", "<img class='center-block img-right' src='img/Billie.png'>", "<img class='center-block img-right' src='img/Jackie.png'>", "<img class='center-block img-right' src='img/Morgan.png'>", "<img class='center-block img-right' src='img/Imhotep.png'>", "<img class='center-block img-right' src='img/Sociopath.png'>", "<img class='center-block img-right' src='img/James.png'>"];
var correctAnswers = ["C. Africa", "B. Benjamin Banneker", "A. Billie Holiday", "D. Jackie Robinson", "C. Garret A. Morgan", "B. Imhotep", "B. European", "B. James Baldwin"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("sound/button-click.mp3");
