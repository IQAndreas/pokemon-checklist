
class Type {
	static BUG = "BUG";
	static DARK = "DARK";
	static DRAGON = "DRAGON";
	static ELECTRIC = "ELECTRIC";
	static FAIRY = "FAIRY";
	static FIGHTING = "FIGHTING";
	static FIRE = "FIRE";
	static FLYING = "FLYING";
	static GHOST = "GHOST";
	static GRASS = "GRASS";
	static GROUND = "GROUND";
	static ICE = "ICE";
	static NORMAL = "NORMAL";
	static POISON = "POISON";
	static PSYCHIC = "PSYCHIC";
	static ROCK = "ROCK";
	static STEEL = "STEEL";
	static WATER = "WATER";
}

class Generation {

	static KANTO = new Generation(1, "Kanto", 'kanto');
	static JOHTO = new Generation(2, "Johto", 'johto');
	static HOENN = new Generation(3, "Hoenn", 'hoenn');
	static SINNOH = new Generation(4, "Sinnoh", 'sinnoh');
	static UNOVA = new Generation(5, "Unova", 'unova');
	static KALOS = new Generation(6, "Kalos", 'kalos');
	static ALOLA = new Generation(7, "Alola", 'alola');
	static GALAR = new Generation(8, "Galar", 'galar');
	static UNKNOWN = new Generation(undefined, "Unknown Generation", 'unknown');	

	static fromID(value) {
	
		if (value == "-") {
			return Generaiton.UNKNOWN;
		}
		
		switch (parseInt(value), 10) {
		
			case 1: return KANTO;
			case 2: return JOHTO;
			case 3: return HOENN;
			case 4: return SINNOH;
			case 5: return UNOVA;
			case 6: return KALOS;
			case 7: return ALOLA;
			case 8: return GALAR;
			default: return UNKNOWN;
		}
	}
	
	constructor(value, name, id) {
		this.value = value;
		this.name = name;
		this.id = id;
	}
	
	toString() {
		if (this.id) {
			return 	`${this.name} (Gen #${this.id})`;
		} else {
			return this.name;
		}
	}
}

class Pokemon {
	
	static auto(POKEMON_ID) {
		
		var pokemonTemplate = pokemonstats.find( p => p.POGO_ID_FULL == POKEMON_ID );
		if (!pokemonTemplate) {
			console.log("Could not find pokemon with ID:", POKEMON_ID);
			return null;
		}
		
		return new PokemonAuto(pokemonTemplate);
	}
	
	static auto2(data) {
	
		var POKEMON_ID = data.ID;
		if (POKEMON_ID == '') return null;
		
		var p = Pokemon.auto(POKEMON_ID);
		if (p == null) return null;
		
		if (data.hasOwnProperty('NAME')) p.name = String(data['NAME']);
		if (data.hasOwnProperty('LVL'))  p.lvl  = parseInt(data['LVL'],10);
		if (data.hasOwnProperty('CP'))   p.cp   = parseInt(data['CP'],10);
		
		if (data.hasOwnProperty('STATE')) {
			if (data['STATE'] == 'LUCKY') p.lucky = true;
			if (data['STATE'] == 'TRASH') p.trash = true;
			if (data['STATE'] == 'VALUABLE') p.valuable = true;
			//console.log(POKEMON_ID, data['STATE']);
		}
		
		if (data['LUCKY'] == 'LUCKY')       p.lucky = true;
		if (data['SHINY'] == 'SHINY')       p.shiny = true;
		if (data['PURIFIED'] == 'PURIFIED') p.purified = true;
		if (data['SHADOW'] == 'SHADOW')     p.shadow = true;
		
		if (data.hasOwnProperty('MOVE1')) p.move1 = String(data['MOVE1']);
		if (data.hasOwnProperty('MOVE2')) p.move2 = String(data['MOVE2']);
		if (data.hasOwnProperty('MOVE3')) p.move3 = String(data['MOVE3']);
		if (data['MOVE3'] == '-')         p.move3 = '';
		
		return p;
	}
	
	hasMove(moveName) {
		return (this.move1 == moveName) || (this.move2 == moveName) || (this.move3 == moveName);
	}
	
	hasMove3() {
		return (this.move3 !== undefined) && (this.move3 != '');
	}
	
	isType(type) {
		return (this.type1 == type || this.type2 == type);
	}
}

const POKEMON_IMAGE_DIR = 'pokemon_icons/';
const HEADERS = 'headers/';
const ASSETS = 'assets/';

class PokemonAuto extends Pokemon {

	constructor(template) {
		super();
		this.template = template;
	}
	
	get ID_FULL() 	{ return this.template.POGO_ID_FULL; }
	get ID()		{ return this.template.POGO_ID; }
	get FORM()		{ return this.template.POGO_FORM; }
	get GENDER()	{ return this.template.POGO_GENDER; }
	get FORM_ID()	{ return this.template.POGO_FORM_ID; }
	
	get pokedexID() { return parseInt(this.template.POKEDEX_ID, 10); }
	get name() 	{ return this.template.DISPLAY; }
	get type1() { return this.template.TYPE1; }
	get type2() { return this.template.TYPE2; }
	
	get atk()	{ return parseInt(this.template.ATK, 10); }
	get def()	{ return parseInt(this.template.DEF, 10); }
	get sta()	{ return parseInt(this.template.STA, 10); }
	
	get family() { return this.template.FAMILY; }
	get parent() { return this.template.PARENT; }
	get generation()   { return this.template.GEN == '-' ? Generation.UNKNOWN : Generation.fromID( this.generationID ); }
	get generationID() { return this.template.GEN == '-' ? Generation.UNKNOWN.id : parseInt(this.template.GEN); }
	
	get legendary() { return this.template.LEGENDARY == 'LEGENDARY'; }
	get mythical() 	{ return this.template.MYTHICAL == 'MYTHICAL'; }
	//get purified() 	{ return this.template.PURIFIED == 'PURIFIED'; }
	get costume() 	{ return this.template.COSTUME == 'COSTUME'; }
	get baby() 		{ return this.template.BABY == 'BABY'; }
	
	set name(value) { this._name = value; }
	get name()      { return (this._name !== undefined) ? this._name : this.template.DISPLAY; }
	
	set purified(value) { this._purified = value; }
	get purified()      { return (this._purified !== undefined) ? this._purified : (this.template.PURIFIED == 'PURIFIED'); }
	
	get shinyReleased() { return this.template.SHINY == 'SHINY'; }
	get regional() 		{ return this.template.REGIONAL != ''; }
	get regions() 		{ return this.template.REGIONAL ? this.template.REGIONAL.split(',') : []; }
	get unreleased() 	{ return this.template.UNRELEASED == 'UNRELEASED'; }
	get rarity() 	{ return this.template.RARITY; }
	
	get image() {
		if (this.shiny) {
			return POKEMON_IMAGE_DIR + this.template.pokemon_image_shiny;
		} else {
			return POKEMON_IMAGE_DIR + this.template.pokemon_image;
		}
	
	}
	
	toString() {
		return `${this.name} (${this.ID_FULL})`; 
	}
		
}





class Pokedex {

	constructor(container) {
		this.container = container;
	}
	
	makeSpan(container, textContent, className) {
		var span = document.createElement('span');
		if (className)   span.className = className;
		if (textContent) span.textContent = textContent
		if (container)   container.appendChild(span);
		return span;
	}
	
	makeOverlay(container, text, className, imgL, imgR) {
		
		var element = document.createElement('span');
		if (className)   element.className = className;
		//if (textContent) element.textContent = textContent
		
		if (imgL) {
			var img = document.createElement('img');
			img.src = ASSETS + imgL + '.png';
			img.alt = imgL;
			element.appendChild(img);
		}
		
		if (text) {
			var span = document.createElement('span');
			span.innerText = text;
			element.appendChild(span);
		}
		
		if (imgR) {
			var img = document.createElement('img');
			img.src = ASSETS + imgR + '.png';
			img.alt = imgR;
			element.appendChild(img);
		}
		
		if (container)   container.appendChild(element);
		return element;
	}

	makeEmpties(container, count) {
		for (var i = 0; i < count; i++) {
			this.container.appendChild( this.makeEmpty() );
		}
	}
	
	makeEmpty() {
		var element = document.createElement('div');
		element.className = 'pokemon padding';
		return element;
	}

	makeHeader(id, text, imageLeft, imageRight) {
	
		// <h2 class='header'><img src='headers/regional.png'><span>Regionals for Trade<img src='headers/trade.png'></span></h2>
		
		var element = document.createElement('h2');
		element.id = id;
		element.className = 'header2';
		
		if (imageLeft) {
			var img = document.createElement('img');
			img.src = HEADERS + imageLeft + '.png';
			img.alt = imageLeft;
			element.appendChild(img);
		}
		
		if (text) {
			var span = document.createElement('span');
			span.innerText = text;
			element.appendChild(span);
		}
		
		if (imageRight) {
			var img = document.createElement('img');
			img.src = HEADERS + imageRight + '.png';
			img.alt = imageRight;
			element.appendChild(img);
		}
		
		return element;
		
	}

	makePokemon(pokemon) {
	
		// <div class='pokemon flying fire pokemon-purified'><img class='pokemon-image' src='pokemon_icons/pokemon_icon_146_00.png' /><span class='cp'>CP<span class='cp-value'>2,412</span></span><span class='purified'><img src='assets/purified.png'><span>PURIFIED</span><img src='assets/purified.png'></span><span class='name'>Moltres</span></div>
	
		var element = document.createElement('div');
		
		//console.log(pokemon.purified);
		
		var classes = ['pokemon'];
		pokemon.type1 && classes.push(pokemon.type1.toLowerCase());
		//pokemon.type2 && classes.push(pokemon.type2.toLowerCase());
		pokemon.purified && classes.push('pokemon-purified');
		pokemon.shadow && classes.push('pokemon-shadow');
		pokemon.shiny && classes.push('pokemon-shiny');
		pokemon.unreleased && classes.push('unreleased');
		pokemon.mystery && classes.push('mystery');
		pokemon.lucky && classes.push('lucky');
		element.className = classes.join(' ');
		
		//console.log(pokemon.image);
		
		if (pokemon.image) {
			var img = document.createElement('img');
			img.className = 'pokemon-image';
			img.src = pokemon.image;
			element.appendChild(img);
		}
		
		var overlayTop = document.createElement('div');
		overlayTop.className = 'overlay-top';
		element.appendChild(overlayTop);
		
		if (pokemon.lvl) {
			var cpSpan = this.makeSpan(overlayTop, "LVL", 'lvl');
			var cpValue = this.makeSpan(cpSpan, pokemon.lvl, 'lvl-value');
		}
		
		if (pokemon.cp) {
			var cpSpan = this.makeSpan(overlayTop, "CP", 'cp');
			var cpValue = this.makeSpan(cpSpan, pokemon.cp, 'cp-value');
		}
		
		// <div class='pokemon flying fire pokemon-purified'><img class='pokemon-image' src='pokemon_icons/pokemon_icon_146_00.png' /><span class='cp'>CP<span class='cp-value'>2,412</span></span><span class='purified'><img src='assets/purified.png'><span>PURIFIED</span><img src='assets/purified.png'></span><span class='name'>Moltres</span></div>
		if (pokemon.purified) {
			var purified = this.makeOverlay(overlayTop, "Purified", 'purified-overlay', 'purified', 'purified')
		}
		
		if (pokemon.shadow) {
			var shadow = this.makeOverlay(overlayTop, "Shadow", 'shadow-overlay', 'shadow', 'shadow')
		}
		
		// <div class='pokemon dragon ghost'><img class='pokemon-image' src='pokemon_icons/pokemon_icon_487_11_shiny.png' /><span class='cp'>CP<span class='cp-value'>1,881</span></span><span class='shiny'><img src='assets/shiny.png'><span>SHINY</span><img src='assets/shiny.png'></span><span class='name'>Giratina (Altered)</span></div>
		if (pokemon.shiny) {
			var shiny = this.makeOverlay(overlayTop, "Shiny", 'shiny-overlay', 'shiny', 'shiny')
		}
		
		
		var overlayBottom = document.createElement('div');
		overlayBottom.className = 'overlay-bottom';
		element.appendChild(overlayBottom);
		
		if (pokemon.name) {
			
			var nameValue = pokemon.name;
			var nameSub = "";
			
			var nameMatch = nameValue.match(/^([^(]+) ?\(([^)]+)\)$/);
			if (nameMatch) {
				nameValue = nameMatch[1];
				nameSub = nameMatch[2];
				//console.log(nameValue, nameSub);
			}
			
			var name = this.makeSpan(overlayBottom, nameValue, 'name')
			if (nameSub) {
				var subTitle = this.makeSpan(name, `(${nameSub})`, 'subtitle');
			}
		}
		
		return element;
		
	}
	
	addHeader( id, text, imageLeft, imageRight ) {
		var headerElement = this.makeHeader( id, text, imageLeft, imageRight );
		this.container.appendChild( headerElement );
		return headerElement;
		
	}
	
	addPokemon( pokemon ) {
		var pokemonElement = this.makePokemon( pokemon );
		this.container.appendChild( pokemonElement );
		return pokemonElement;
	}
	
	addEmpties( count ) {
		this.makeEmpties( this.container, count || 16 );
	}
	
	/*function addAllPokemon( pokemonArray ) {
		pokemonArray.forEach( pokemon => {
			this.addPokeon( pokemon );
		});
		this.makeEmpties(this.container, 16);
	}*/
}



this.onload = function() {

	var container = document.querySelector('.pokemon-container.auto');
	
	/*lucky.forEach( p => {
		if (p.PURIFIED == 'PURIFIED') {
			console.log(p.ID);
		}
	});*/
	
	var pokedex = new Pokedex(container);
	
	pokedex.addHeader('missing', "Missing from Pokedex", 'pokedex', 'pokedex');
	var arr = all.filter( p => p.STATE == 'MISSING' );
	arr.forEach( p => {
		//console.log(p.ID);
		var pokemon = Pokemon.auto2(p);
		//console.log(p.ID, pokemon);
		
		if (pokemon.regional) {
			console.log(pokemon.ID, pokemon.regions);
			if ( !pokemon.regions.includes('EUROPE') && !pokemon.regions.includes('EAST') && !pokemon.regions.includes('NORTH') ) {
				return;
			}
		}
		
		switch (pokemon.ID) {
			case 'KLINKLANG': return;
		}
		
		//if (pokemon.unreleased) return;
		
		pokedex.addPokemon( pokemon );
	});
	pokedex.addEmpties();
	
	pokedex.addHeader('missing', "Missing from Pokedex (Regional)", 'regional', 'regional');
	var arr = all.filter( p => p.STATE == 'MISSING' );
	arr.forEach( p => {
		//console.log(p.ID);
		var pokemon = Pokemon.auto2(p);
		//console.log(p.ID, pokemon);
		
		/*if (pokemon.regional) {
			if ( !pokemon.regions.includes('EUROPE') && !pokemon.regions.includes('EAST') && !pokemon.regions.includes('NORTH') ) {
				return;
			}
		}*/
		if (!pokemon.regional) return;
		//if (pokemon.unreleased) return;
		
		pokedex.addPokemon( pokemon );
	});
	pokedex.addEmpties();
	
	var arr = shiny.map( p => Pokemon.auto2(p) );
	arr = arr.sort( (a,b) => {
		if (a.pokedexID == b.pokedexID) {
			return (b.cp - a.cp);
		} else {
			return -1 * (b.pokedexID - a.pokedexID);
		}
	});
	
	pokedex.addHeader('shiny', "Shiny Pokemon");
	arr.forEach( pokemon => {
		if (pokemon.lucky) return;
		if (pokemon.valuable) return;
		pokemon.lvl = "";
		pokedex.addPokemon( pokemon );
	});
	pokedex.addEmpties();
	
	pokedex.addHeader('shiny', "Valuable Shiny Pokemon");
	arr.forEach( pokemon => {
		if (pokemon.lucky) return;
		if (!pokemon.valuable) return;
		pokemon.lvl = "";
		pokedex.addPokemon( pokemon );
	});
	pokedex.addEmpties();
	
	
	
	var currentGen = null;
	pokemonList.forEach( pokemonID => {
		
		//console.log(pokemonID);
		var pokemon = Pokemon.auto( pokemonID );
		if (!pokemon) {
			console.log("Could not find pokemon with ID:", pokemonID);
			return;
		}
		
		//if (!pokemon.isType(Type.NORMAL)) {
		/*if (!pokemon.isType(Type.FLYING)) {
			return;
		}*/
		
		//console.log(pokemon);
		
		if (pokemon.generationID !== currentGen) {
		
			if (currentGen) {
				pokedex.addEmpties(16);
			}
			
			switch (pokemon.generationID) {
				case 1: pokedex.addHeader('kanto', "Kanto (Gen #1)", 'kanto', 'kanto'); break;
				case 2: pokedex.addHeader('johto', "Johto (Gen #2)", 'johto', 'johto'); break;
				case 3: pokedex.addHeader('hoenn', "Hoenn (Gen #3)", 'hoenn', 'hoenn'); break;
				case 4: pokedex.addHeader('sinnoh', "Sinnoh (Gen #4)", 'sinnoh', 'sinnoh'); break;
				case 5: pokedex.addHeader('unova', "Unova (Gen #5)", 'unova', 'unova'); break;
				case 6: pokedex.addHeader('kalos', "Kalos (Gen #6)", 'kalos', 'kalos'); break;
				case 7: pokedex.addHeader('alola', "Alola (Gen #7)", 'alola', 'alola'); break;
				case 8: pokedex.addHeader('galar', "Galar (Gen #8)", 'galar', 'galar'); break;
				default:  pokedex.addHeader('unknown', "Unknown Generation"); console.log(pokemon.generationID); break;
			}
			currentGen = pokemon.generationID;
		}
		
		/*pokemon.lucky = Math.random() > 0.90;
		pokemon.shiny = Math.random() > 0.95;
		pokemon.purified = Math.random() > 0.95;
		
		pokemon.lvl = Math.floor(Math.random() * 40);
		pokemon.cp = Math.floor(Math.random() * 4000);
		*/
		
		var a = all.find( p => p.ID == pokemonID );
		
		// Small hack
		//var luckyAll = lucky.filter( p => (p.ID == pokemonID) || (p.ID == pokemonID + "_PURIFIED") || (p.ID == pokemonID + "_MALE") || (p.ID == pokemonID + "_FEMALE") );
		var luckyAll = lucky.filter( p => (p.ID == pokemonID) || (p.ID.startsWith(pokemonID + "_")));
		var l = null;
		if (luckyAll.length > 0) {
			luckyAll.forEach( p => {
				//console.log(pokemonID, parseInt(p.CP, 10), p);
				if (l == null || parseInt(p.CP, 10) > parseInt(l.CP, 10)) {
					l = p;
				}
			});
		}
		
		//console.log(pokemonID, a, l);
		
		if (l) {
			//console.log("LUCKY", pokemonID);
			pokemon.lucky = true;
			pokemon.lvl = (l.trash ? "" : l.LVL);
			//pokemon.purified = (l.PURIFIED == 'PURIFIED');
		} else if (a && a.STATE == 'MISSING') {
			//console.log("MISSING:", pokemonID);
			pokemon.mystery = true;
		} else if (a) {
			//console.log("HAVE:", pokemonID);
			pokemon.lvl = a.LVL;
			pokemon.purified = a.ID.endsWith('_PURIFIED');
		}
		
		// DEBUGGING
		//pokemon.lucky = true;
		//pokemon.purified = true;
		//pokemon.shadow = true;
		//pokemon.shiny = true;
		
		pokedex.addPokemon( pokemon );
		
	});
	
	if (currentGen) {
		pokedex.addEmpties(16);
	}
	
	
	var pokedexRegional = new Pokedex(container);
	
	function listPokemon(list, pokedex) {
		list.forEach( pokemonID => {
			var p = Pokemon.auto( pokemonID );
			pokedex.addPokemon( p );
		});
		
		pokedex.addEmpties();
		
	}
	
	pokedexRegional.addHeader( 'reginals-sweden', "Regionals (Sweden) for Trade", 'regional', 'trade' );
	listPokemon(regional.sweden, pokedexRegional);
	
	pokedexRegional.addHeader( 'reginals-usa', "Regionals (USA) for Trade", 'regional', 'trade' );
	listPokemon(regional.usa, pokedexRegional);
	
	pokedexRegional.addHeader( 'reginals-sweden', "Regionals (Other) for Trade", 'regional', 'trade' );
	listPokemon(regional.other, pokedexRegional);
	
	//pokedexRegional.addHeader( 'reginals-sweden', "Regionals (Other) for Trade", 'regional', 'trade' );
	//pokedexRegional.addPokemon( Pokemon.auto('ELGYEM') );
	//pokedexRegional.addPokemon( Pokemon.auto('BULBASAUR_FALL_2019') );
	//pokedexRegional.addPokemon( Pokemon.auto('BULBASAUR_PURIFIED') );
	//pokedexRegional.addPokemon( Pokemon.auto('PIKACHU') );
	
	/*
	//container.appendChild( makeHeader('kanto', "Kanto (Gen #1)", 'kanto', 'kanto') );
	var currentGen = null;
	
	pokemonList.forEach( pokemonID => {
	
		//console.log(pokemonID);
		
		var pokemon = pokemonstats.find( p => p.POGO_ID_FULL == pokemonID );
		if (!pokemon) {
			console.log("Could not find pokemon with ID:", pokemonID);
			return;
		}
		
		console.log(pokemon);
		
		if (pokemon.GEN != currentGen) {
		
			if (currentGen) {
				makeEmpties(container, 16);
			}
		
			switch (pokemon.GEN) {
				case "1": container.appendChild(makeHeader('kanto', "Kanto (Gen #1)", 'kanto', 'kanto')); break;
				case "2": container.appendChild(makeHeader('johto', "Johto (Gen #2)", 'johto', 'johto')); break;
				case "3": container.appendChild(makeHeader('hoenn', "Hoenn (Gen #3)", 'hoenn', 'hoenn')); break;
				case "4": container.appendChild(makeHeader('sinnoh', "Sinnoh (Gen #4)", 'sinnoh', 'sinnoh')); break;
				case "5": container.appendChild(makeHeader('unova', "Unova (Gen #5)", 'unova', 'unova')); break;
				case "6": container.appendChild(makeHeader('kalos', "Kalos (Gen #6)", 'kalos', 'kalos')); break;
				case "7": container.appendChild(makeHeader('alola', "Alola (Gen #7)", 'alola', 'alola')); break;
				case "8": container.appendChild(makeHeader('galar', "Galar (Gen #8)", 'galar', 'galar')); break;
				default:  container.appendChild(makeHeader('unknown', "Unknown Generation")); break;
			}
			currentGen = pokemon.GEN;
		}
		
		// <div class='pokemon ghost electric'><img class='pokemon-image' src='pokemon_icons/pokemon_icon_479_11.png' /><span class='name'>Rotom<br/>(Normal)</span></div>
		
		var p = new Pokemon();
		p.name = pokemon.DISPLAY;
		p.type1 = pokemon.TYPE1;
		p.type2 = pokemon.TYPE2;
		//p.lucky = true;
		p.image = 'pokemon_icons/' + pokemon.pokemon_image;
		
		if (pokemon.UNRELEASED == 'UNRELEASED') {
			p.unreleased = true;
		}	
		
		container.appendChild( makePokemon(p) );
		
	} );
	*/
	
}









