$(document).ready(function(){
	// ----------------------------------
	// Characters
	// ----------------------------------
	var lukeSkywalker = {
		name: "lukeSkywalker",
		attack: 200,
		defense: 2000,
		aligance: "rebel",
		image: "skywalker.jpg"
	};

	var darthVader = {
		name: "darthVader",
		attack: 230,
		defense: 1750,
		aligance: "empire",
		image: "vader.jpg"
	};

	var hanSolo = {
		name: "hanSolo",
		attack: 120,
		defense: 3000,
		aligance: "rebel",
		image: "solo.jpg"
	};

	var bobaFett = {
		name: "bobaFett",
		attack: 160,
		defense: 2500,
		aligance: "empire",
		image: "fett.jpg"
	};

	var characters = {lukeSkywalker:lukeSkywalker, darthVader:darthVader, hanSolo:hanSolo, bobaFett:bobaFett};

	// ----------------------------------
	// to identify charachters
	// ----------------------------------
	var selectChar;

	var selectEnemy;

	var enemiesChars = {};

	var newEnemiesChars = {};

	var enemy;

	// ---------------------------------------
	//to stop battle when someone is defeated
	// ----------------------------------
	var enemyDeath = false;

	var playerDeath = false;

	var victoryLength;

	// ----------------------------------
	//for battle
	// ----------------------------------
	var playerAtt;
	var playerDef;
	var enemyAtt;
	var enemyDef;

	// ----------------------------------
	// Choose your character
	// ----------------------------------

	$('.playerCharacter').click(function(){
		var player;
		player = $(this).attr("data-player");
		// console.log(player);
		// console.log(this);
		selectChar = characters[player];
		console.log(selectChar);


		// ----------------------------------
		//remove player from character list
		// ----------------------------------

		for (var charkey in characters) {
			var char = characters[charkey];
			if (char != selectChar) {
			enemiesChars[char.name]=char;
			}
		}
		console.log(enemiesChars);


		// ----------------------------------
		//show chosen player in player div
		// ----------------------------------

		// console.log();
		var printPlayer = `<div class="${aliganceClass(selectChar)} playerCharacter" data-player="${selectChar.name}"><img class="imgChar" src="./assets/images/${selectChar.image}"></div>`;
		$('#player').html(printPlayer);
		$('#charText').html('<br/><p> Your Chatacter: </p>');

		// console.log(printPlayer);

		// ----------------------------------
		//write Enemies text
		// ----------------------------------

		$('#enemiesText').html('<br/><p>Choose your first opponent:</p>');

		// ----------------------------------
		//print Enemies in Enemies Div
		// ----------------------------------

		// console.log('a');
		// console.log(Object.keys(enemiesChars));
		// for (var i = 0; i < Object.keys(enemiesChars).length; i++) {
		for (var charkey in enemiesChars) {
			// console.log('b');
			var character = enemiesChars[charkey];
			// console.log(character);
			var printChar = '<div class="'+ aliganceClass(character) +' enemiesCharacter" data-player="'+character.name+'"><img class="imgChar" src="./assets/images/'+character.image+'"></div>';
			// console.log(printChar);

			$('#enemiesDiv').append(printChar);
		}

		// ----------------------------------
		// Choose your enemy
		// ----------------------------------
		// console.log(characters);

		$('.enemiesCharacter').click(enemyClick);

		// ----------------------------------
		//pull player stats
		// ----------------------------------

		playerAtt = selectChar.attack;
		console.log(playerAtt);
		playerDef = selectChar.defense;

		// ----------------------------------
		// Fight
		// ----------------------------------
		$('#attack').click(battle);
		


	});

	//----------------------------
	// choose new enemy
	//----------------------------


	//----------------------------
	// fight
	//----------------------------









	


 //======================================
 // Functions:
 //======================================

	// ----------------------------------
	// Empire/Rebelion border effect
	// ----------------------------------
	function aliganceClass(input){
		if (input.aligance === 'rebel') {
			return 'charImageR';
		}
		else {
			return 'charImageE';
		}
	}


	// ----------------------------------
	//Function to select enemy character
	// ----------------------------------
	function enemyClick(){
		$('#winLose').empty();
		// console.log(characters);
		enemy = $(this).attr("data-player");
		// console.log(enemy);
		// console.log(this);
		selectEnemy = characters[enemy];
		console.log(selectEnemy);

		// ----------------------------------
		//remove enemy from characters,
		//------------------------------------ 
		
		// console.log(selectEnemy);
		// console.log(enemiesChars);
		for (var charkey in enemiesChars) {
			var char = enemiesChars[charkey];
			// console.log(char);
			if (char != selectEnemy) {
				// console.log(selectEnemy);
				console.log('MATCH');
				newEnemiesChars[char.name]=char;
			}
			// console.log(newEnemiesChars);
			// console.log(enemiesChars);
		}
		enemiesChars = newEnemiesChars;
		newEnemiesChars = {};
	
		// console.log(enemiesChars);
		$('#enemiesDiv').empty();

		// ----------------------------------
		//reprint Enemies in Enemies Div
		// ----------------------------------

		for (var charkey in enemiesChars) {
			// console.log('b');
			var character = enemiesChars[charkey];
			console.log(character);
			var printChar = `<div class="${aliganceClass(character)} enemiesCharacter" data-player="${character.name}"><img class="imgChar" src="./assets/images/${character.image}"></div>`;
			console.log(printChar);
			$('#enemiesDiv').append(printChar);
		}

		$('.enemiesCharacter').click(enemyClick);
		console.log(enemiesChars);
		// ----------------------------------
		//rewrite enemies text
		// ----------------------------------

		$('#enemiesText').html('<br/><p>These opponents are waiting for you:</p>');

		// ----------------------------------
		//print enemy in enemy div
		// ----------------------------------

		var printEnemy = `<div class="${aliganceClass(selectEnemy)} playerCharacter" data-player="${selectEnemy.name}"><img class="imgChar" src="./assets/images/${selectEnemy.image}"></div>`;
		$('#enemyDiv').html(printEnemy); 


		// console.log(enemy);
		// console.log(selectEnemy);


		// ----------------------------------
		//print enemy text
		//-----------------------------------

		var enemySay;

		// ----------------------------------
		//each character has its own saying
		// ----------------------------------

		if (enemy === 'lukeSkywalker') {
			enemySay = 'Ill never join you.';
		}
		else if (enemy === 'hanSolo') {
			enemySay = 'Hokey religions and ancient weapons are no match for a good blaster at your side, kid.';
		}
		else if (enemy === 'darthVader') {
			enemySay = 'You don’t know the power of the dark side.';
		}
		else if (enemy === 'bobaFett') {
			enemySay = 'Your arrogance is the cause of your destruction, not me.';
		}

		$('#enemyText').html(`<br/><p>${enemySay}</p>`);

		// ----------------------------------
		//pull enemy stats
		// ----------------------------------

		enemyAtt = selectEnemy.attack;
		enemyDef = selectEnemy.defense;

		// ----------------------------------
		//reset battle
		// ----------------------------------

		enemyDeath = false;
		playerDeath = false;
	};

	// ----------------------------------
	// function to have players fight
	// ----------------------------------

	function battle(){
		// console.log('c');

		if (enemyDeath === false && playerDeath === false){

			playerDef = playerDef - enemyAtt;
			enemyDef = enemyDef - playerAtt;

			console.log(playerDef);
			console.log(enemyDef);

			// ----------------------------------
			//win/lose
			// ----------------------------------

			if (playerDef <= 0) {
				$('#winLose').html('<br/><p>You have failed to save the enemy from the Enemy. You were our last hope. <strong>We are Doomed!</strong></p>');
				playerDeath = true;
				playerAtt += playerAtt;
			}
			else if (enemyDef <= 0) {
				$('#winLose').html('<br/><p><strong>Well Done!</strong> You have vanquished your enemy to the annals of history.</p>');
				enemyDeath = true;
			}
		}

		// ----------------------------------
		//Total Victory Notice
		// ----------------------------------

		victoryLength = Object.keys(enemiesChars).length;

		console.log(victoryLength);
		if (enemyDef <= 0 && victoryLength === 0) {
			$('#final').addClass('col-8');
			if (selectChar.aligance === 'rebel') {
				$('#final').html('<img class="victory" src="./assets/images/rebel-victory.jpg">');
			}
			else if (selectChar.aligance === 'empire') {
				$('#final').html('<img class="victory" src="./assets/images/empire-victory.jpg">');
			}
		}
	}
});


