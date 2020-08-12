
class Type {
	static getIconURL( ID ) {
		// Lazy method
		return TYPES + ID.toLowerCase() + '.png'; 
	}
}

Type.BUG = "BUG";
Type.DARK = "DARK";
Type.DRAGON = "DRAGON";
Type.ELECTRIC = "ELECTRIC";
Type.FAIRY = "FAIRY";
Type.FIGHTING = "FIGHTING";
Type.FIRE = "FIRE";
Type.FLYING = "FLYING";
Type.GHOST = "GHOST";
Type.GRASS = "GRASS";
Type.GROUND = "GROUND";
Type.ICE = "ICE";
Type.NORMAL = "NORMAL";
Type.POISON = "POISON";
Type.PSYCHIC = "PSYCHIC";
Type.ROCK = "ROCK";
Type.STEEL = "STEEL";
Type.WATER = "WATER";


class League {

	constructor( arg1, arg2 ) {
		const MIN = 0;
		const MAX = 9999;
		
		// new League()
		if (arg1 === undefined && arg2 === undefined) {
			this.minCP = MIN;
			this.maxCP = MAX;
		}
		
		// new League(1500)
		else if (arg2 === undefined) {
			this.minCP = MIN;
			this.maxCP = arg1;
		}
		
		// But whyyyyyyyyyyy
		// new League(undefined, 1500)
		else if (arg1 === undefined) {
			this.minCP = MIN;
			this.maxCP = arg2;
		}
		
		// new League(1300, 1500)
		else {
			this.minCP = arg1;
			this.maxCP = arg2;
		}
		
	}
	
	qualifies( pokemon ) {
		if (pokemon.cp === undefined) {
			return false;
		}
		
		return (pokemon.cp >= this.minCP && pokemon.cp <= this.maxCP);
	}

}

// Technically there is no min requirement for these leagues, but it makes it easier
League.GREAT  = new League(1300, 1500);
League.MASTER = new League(2300, 2500);
League.ULTRA  = new League(2501, 9999);


class Generation {

	static fromID(value) {
	
		if (value == "-") {
			return Generaiton.UNKNOWN;
		}
		
		switch (parseInt(value), 10) {
		
			case 1: return Generation.KANTO;
			case 2: return Generation.JOHTO;
			case 3: return Generation.HOENN;
			case 4: return Generation.SINNOH;
			case 5: return Generation.UNOVA;
			case 6: return Generation.KALOS;
			case 7: return Generation.ALOLA;
			case 8: return Generation.GALAR;
			default: return Generation.UNKNOWN;
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
Generation.KANTO =   new Generation(1, "Kanto",  'kanto');
Generation.JOHTO =   new Generation(2, "Johto",  'johto');
Generation.HOENN =   new Generation(3, "Hoenn",  'hoenn');
Generation.SINNOH =  new Generation(4, "Sinnoh", 'sinnoh');
Generation.UNOVA =   new Generation(5, "Unova",  'unova');
Generation.KALOS =   new Generation(6, "Kalos",  'kalos');
Generation.ALOLA =   new Generation(7, "Alola",  'alola');
Generation.GALAR =   new Generation(8, "Galar",  'galar');
Generation.UNKNOWN = new Generation(undefined, "Unknown Generation", 'unknown');


class Move {

	static fromID(ID) {
		var template = moves.find( m => m.ID == ID );
		if (!template) {
			console.log("Could not find move with ID:", ID);
			return null;
		}
		
		return new Move(template.ID, template.DISPLAY, template.MOVE_TYPE, template.POKEMON_TYPE);
	}

	static fromName(NAME) {
		var template = moves.find( m => m.DISPLAY == NAME );
		if (!template) {
			console.log("Could not find move with name:", NAME);
			return null;
		}
		
		return new Move(template.ID, template.DISPLAY, template.MOVE_TYPE, template.POKEMON_TYPE);
	}
	
	constructor(id, name, moveType, pokemonType) {
		this.id = id;
		this.name = name;
		this.moveType = moveType;
		this.pokemonType = pokemonType;
	}
	
	// Alias, just in case
	get type() { return this.pokemonType; }
	
	isCharged() { return (this.moveType == Move.CHARGED); }
	isFast()    { return (this.moveType == Move.FAST); }

}
Move.CHARGED = 'CHARGED';
Move.FAST = 'FAST';


class Pokemon {
	
	static auto(POKEMON_ID) {
		
		var template = pokemonstats.find( p => p.POGO_ID_FULL == POKEMON_ID );
		if (!template) {
			console.log("Could not find pokemon with ID:", POKEMON_ID);
			return null;
		}
		
		return new PokemonAuto(template);
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
			if (data['STATE'] == '@SPECIAL') p.valuable = true;
			if (data['STATE'] == 'RESERVED') p.valuable = true;
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
	
	
	matches( require ) {
	
		if (require.hasOwnProperty('ID_FULL') && (this.ID_FULL != require.ID_FULL)) return false;
		if (require.hasOwnProperty('ID')      && (this.ID      != require.ID))      return false;
		if (require.hasOwnProperty('FORM')    && (this.FORM    != require.FORM))    return false;
		if (require.hasOwnProperty('GENDER')  && (this.GENDER  != require.GENDER))  return false;
		if (require.hasOwnProperty('FORM_ID') && (this.FORM_ID != require.FORM_ID)) return false;
		
		if (require.hasOwnProperty('type') && !this.isType(require.type))  return false;
		if (require.hasOwnProperty('move') && !this.hasMove(require.move)) return false;
		
		// More later
		
		// All passed
		return true;
	}
	
	
	get moves() {
		var m = [];
		if (this.move1) { m.push(this.move1); }
		if (this.move2) { m.push(this.move2); }
		if (this.move3) { m.push(this.move3); }
		return m;
	}
	
	getSpecialMoves() {
	
		var moves = [];
	
		// Shadow/Purified Pokemon
		if (this.hasMove('Return')) {
			moves.push('Return');
		}
		
		if (this.hasMove('Frustration')) {
			moves.push('Frustration');
		}
	
		// TODO: Dynamic
		var COMMUNITY_DAY = [
			{ID:"PIKACHU", move:"Surf"},
			{ID:"DRAGONITE", move:"Draco Meteor"},
			{ID:"VENUSAUR", move:"Frenzy Plant"},
			{ID:"AMPHAROS", move:"Dragon Pulse"},
			{ID:"CHARIZARD", move:"Blast Burn"},
			{ID:"TYRANITAR", move:"Smack Down"},
			{ID:"BLASTOISE", move:"Hydro Cannon"},
			{ID:"EEVEE", move:"Last Resort"},
			{ID:"VAPOREON", move:"Last Resort"},
			{ID:"JOLTEON", move:"Last Resort"},
			{ID:"FLAREON", move:"Last Resort"},
			{ID:"ESPEON", move:"Last Resort"},
			{ID:"UMBREON", move:"Last Resort"},
			{ID:"LEAFEON", move:"Last Resort"},
			{ID:"GLACEON", move:"Last Resort"},
			{ID:"MEGANIUM", move:"Frenzy Plant"},
			{ID:"METAGROSS", move:"Meteor Mash"},
			{ID:"TYPHLOSION", move:"Blast Burn"},
			{ID:"FERALIGATR", move:"Hydro Cannon"},
			{ID:"MAMOSWINE", move:"Ancient Power"},
			{ID:"SCEPTILE", move:"Frenzy Plant"},
			{ID:"SALAMENCE", move:"Outrage"},
			{ID:"BLAZIKEN", move:"Blast Burn"},
			{ID:"SLAKING", move:"Body Slam"},
			{ID:"SWAMPERT", move:"Hydro Cannon"},
			{ID:"GARDEVOIR", move:"Synchronoise"},
			{ID:"GALLADE", move:"Synchronoise"},
			{ID:"TORTERRA", move:"Frenzy Plant"},
			{ID:"FLYGON", move:"Earth Power"},
			{ID:"INFERNAPE", move:"Blast Burn"},
			{ID:"EMPOLEON", move:"Hydro Cannon"},
			{ID:"RHYPERIOR", move:"Rock Wrecker"},
			{ID:"ALAKAZAM", move:"Counter"},
			{ID:"SHIFTRY", move:"Bullet Seed"},
			{ID:"BEEDRILL", move:"Drill Run"},
			{ID:"GENGAR", move:"Shadow Punch"},
			{ID:"GYARADOS", move:"Aqua Tail"},
		]
		COMMUNITY_DAY.forEach( m => {
			if (this.matches(m)) {
				moves.push(m.move);
			}
		});
		
		var SPECIAL = [
			{ID:"GENGAR", move:"Lick"},
			{ID:"GENGAR", move:"Psychic"},
			{ID:"COBALION", move:"Sacred Sword"},
			{ID:"LICKITUNG", move:"Body Slam"},
			{ID:"MEWTWO", move:"Psystrike"},
		]
		SPECIAL.forEach( m => {
			if (this.matches(m)) {
				moves.push(m.move);
			}
		});
		
		return moves;
			
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
const TYPES = 'assets/type/';
const LEAGUES = 'assets/league/';

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
		if (className)   element.className = `overlay ${className}`;
		//if (textContent) element.textContent = textContent
		
		if (imgL) {
			var img = document.createElement('img');
			img.src = ASSETS + imgL + '.png';
			//img.alt = imgL;
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
			//img.alt = imgR;
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
		
		
		
		
		
		// Calculate great/ultra/master league
		var league = null;
		if (League.GREAT.qualifies(pokemon)) {
			league = 'great';
		} else if (League.MASTER.qualifies(pokemon)) {
			league = 'master';
		} else if (League.ULTRA.qualifies(pokemon)) {
			league = 'ultra';
		}
		
		if (league) {
			var img = document.createElement('img');
			img.className = 'league';
			img.src = LEAGUES + league + '.png';
			element.appendChild(img);
		}
		
		
		
		
		
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
				console.log(nameValue, nameSub);
			}
			
			var name = this.makeSpan(overlayBottom, nameValue, 'name')
			// We're already displaying Purified/Shadow status. No need to do it again.
			if (nameSub && nameSub != "Purified" && nameSub != "Shadow") {
				var subTitle = this.makeSpan(name, `(${nameSub})`, 'subtitle');
			}
		}
		
		if (pokemon.move1 || pokemon.move2 || pokemon.move3) {
			//var moves = this.makeSpan(overlayBottom, '', 'moves');
			
			/*var img = document.createElement('img');
			img.className = 'move-icon';
			img.src = 'assets/moves/psychic.png';
			element.appendChild(img);
			
			var img = document.createElement('img');
			img.className = 'move-icon';
			img.src = 'assets/male.png';
			element.appendChild(img);
			
			var img = document.createElement('img');
			img.className = 'move-icon';
			img.src = 'assets/female.png';
			element.appendChild(img);
			
			var moveName = this.makeSpan(moves, pokemon.move1, 'move-name');*/
			
			function makeMoveIcon(element, MOVE_TYPE) {
				var img = document.createElement('img');
				img.className = 'type-icon';
				img.src = Type.getIconURL(MOVE_TYPE);
				//img.alt = MOVE_TYPE;
				element.appendChild(img);
			}
			
			var specialMoves = pokemon.getSpecialMoves();
			if (specialMoves.length > 0) {
				var moveList = this.makeSpan(overlayBottom, '', 'move-list');
				specialMoves.forEach( moveName => {
					
					var move = Move.fromName( moveName );
					if (!move) return;
					
					var element = document.createElement('span');
					element.className = 'move';
					//element.textContent = textContent
					
					var img = document.createElement('img');
					img.src = Type.getIconURL(move.pokemonType);
					//img.alt = move.pokemonType;
					element.appendChild(img);
					
					var span = document.createElement('span');
					span.innerText = move.name;
					element.appendChild(span);
					
					moveList.appendChild(element);
				});
			
			} else {
				// Make little icons of every move
				var moves = this.makeSpan(overlayBottom, '', 'move-icons');
				pokemon.moves.forEach( moveName => {
					var move = Move.fromName( moveName );
					if (!move) return;
					
					var icon = makeMoveIcon(moves, move.pokemonType);
				});
			}
			
			
			
			
			//
			
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


