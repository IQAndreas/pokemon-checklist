
class Type {}
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
Generation.KANTO = new Generation(1, "Kanto", 'kanto');
Generation.JOHTO = new Generation(2, "Johto", 'johto');
Generation.HOENN = new Generation(3, "Hoenn", 'hoenn');
Generation.SINNOH = new Generation(4, "Sinnoh", 'sinnoh');
Generation.UNOVA = new Generation(5, "Unova", 'unova');
Generation.KALOS = new Generation(6, "Kalos", 'kalos');
Generation.ALOLA = new Generation(7, "Alola", 'alola');
Generation.GALAR = new Generation(8, "Galar", 'galar');
Generation.UNKNOWN = new Generation(undefined, "Unknown Generation", 'unknown');

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


