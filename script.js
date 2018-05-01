var createPolitician = function(nombre, partyColor){
	// create new object & assign it properties
	var politician = {}; 
	politician.name = nombre;
	politician.electionResults = null;
	politician.totalVotes = 0;
	politician.color = partyColor;

	// track name, results, votes in console
	politician.announce = function(){
		console.log("Name: " + this.name + "\nElection Results: " + this.electionResults + "\nTotal Votes: " + this.totalVotes);
	}
	politician.announce();

	// method for tallying votes
	politician.tallyVotes = function(){
	
		this.totalVotes = 0;

		for (var i = 0; i < this.electionResults.length; i++){
		this.totalVotes = this.totalVotes + this.electionResults[i];
		};
		
		console.log(this.politician + ": " + this.totalVotes)
	};

	return politician;
};

// create the politicians, passing in nombre & the partyColor array
var candidate1 = createPolitician("Hillary Clinton", [11, 32, 57]);
var candidate2 = createPolitician("Donald Trump", [132, 17, 11]);

// check partyColor variables
console.log("Hillary's party color is " + candidate1.color);
console.log("Trump's party color is " + candidate2.color);

candidate1.electionResults = [0, 0, 0, 0, 55, 9, 7, 3, 3, 0, 0, 4, 0, 20, 0, 0, 0, 0, 0, 3, 10, 11, 0, 10, 0, 0, 0, 0, 6, 4, 14, 5, 29, 0, 0, 0, 0, 7, 0, 4, 0, 0, 0, 0, 0, 3, 13, 12, 0, 0, 0];
candidate2.electionResults = [9, 3, 11, 6, 0, 0, 0, 0, 0, 29, 16, 0, 4, 0, 11, 6, 6, 8, 8, 1, 0, 0, 16, 0, 6, 10, 3, 5, 0, 0, 0, 0, 0, 15, 3, 18, 7, 0, 20, 0, 9, 3, 11, 38, 6, 0, 0, 0, 5, 10, 3];

// compare votes within each state to determine state winner
var setStateResults = function(state){
	theStates[state].winner = null;
	if(candidate1.electionResults[state] > candidate2.electionResults[state]){
		theStates[state].winner = candidate1;
	}else if(candidate1.electionResults[state] < candidate2.electionResults[state]){
		theStates[state].winner = candidate2;
	}
	// create new local variable assigned to the state's winner property
	var stateWinner = theStates[state].winner;
	if(stateWinner !== null){
		theStates[state].rgbColor = stateWinner.color;
	}else{
		theStates[state].rgbColor = [225, 225, 0];
	}

	// assign the stateResults table to a javascript variable
	var stateInfoTable = document.getElementById('stateResults');
	// create variables for each position/node within the stateResults table
	var header = stateInfoTable.children[0];
	var body = stateInfoTable.children[1];
	var stateName = header.children[0].children[0];
	var abbrev = header.children[0].children[1];
	var candidate1Name = body.children[0].children[0];
	var candidate2Name = body.children[1].children[0];
	var candidate1Results = body.children[0].children[1];
	var candidate2Results = body.children[1].children[1];
	var winnersName = body.children[2].children[1];

	// fill in the stateInfoTable nodes with the appropriate text
	stateName.innerText = theStates[state].nameFull;
	abbrev.innerText = "(" + theStates[state].nameAbbrev + ")";

	candidate1Name.innerText = candidate1.name;
	candidate2Name.innerText = candidate2.name;

	candidate1Results.innerText = candidate1.electionResults[state];
	candidate2Results.innerText = candidate2.electionResults[state];

	// account for whether there's a state tie
	if(stateWinner === null){
		winnersName.innerText = "DRAW";
	}else{
		winnersName.innerText = stateWinner.name;
	}

}

// call the method to tally all votes for each politician
candidate1.tallyVotes();
candidate2.tallyVotes();

// log total votes
console.log(candidate1.totalVotes);
console.log(candidate2.totalVotes);

// create new winner variable
var winner = "???";

// compare total votes to determine overall winner
if(candidate1.totalVotes > candidate2.totalVotes){
	winner = candidate1.name;
}else if(candidate1.totalVotes < candidate2.totalVotes){
	winner = candidate2.name;
}else{
	winner = "DRAW.";
}

// log winner
console.log("AND THE WINNER IS... " + winner + "!");

// assign the countryResults table to a javascript variable
var countryInfoTable = document.getElementById('countryResults');
// use row shortcut to bypass <table> & <tbody> to <tr>
var row = countryInfoTable.children[0].children[0];
// populate the countryResults table
row.children[0].innerText = candidate1.name;
row.children[1].innerText = candidate1.totalVotes;
row.children[2].innerText = candidate2.name;
row.children[3].innerText = candidate2.totalVotes;
row.children[5].innerText = winner;
