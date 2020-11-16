
const ROOT = '../';

const POKEMON_IMAGE_DIR = ROOT + 'pokemon_icons/';
const HEADERS = ROOT + 'headers/';
const ASSETS = ROOT + 'assets/';
const GENDERS = ROOT + 'assets/gender/';
const TYPES = ROOT + 'assets/type/';
const LEAGUES = ROOT + 'assets/league/';
const REGIONS = ROOT + 'assets/regions/';



class CPM {
	byLevel( lvl ) {
		// Could do a find(), but this returns non-exact values
		var id = Math.floor(2 * lvl) - 2;
		if (id < 0) id = 0;
		if (id > CPM.data.length) id = CPM.data.length;
		return CPM.data[id].cpm;
	}
}
CPM.data = [
	{ lvl:1,    cpm:0.0940000, exp_req:0, candy:1, stardust:200 },
	{ lvl:1.5,  cpm:0.1351374, exp_req:0, candy:1, stardust:200 },
	{ lvl:2,    cpm:0.1663979, exp_req:1000, candy:1, stardust:200 },
	{ lvl:2.5,  cpm:0.1926509, exp_req:1000, candy:1, stardust:200 },
	{ lvl:3,    cpm:0.2157325, exp_req:3000, candy:1, stardust:400 },
	{ lvl:3.5,  cpm:0.2365727, exp_req:3000, candy:1, stardust:400 },
	{ lvl:4,    cpm:0.2557201, exp_req:6000, candy:1, stardust:400 },
	{ lvl:4.5,  cpm:0.2735304, exp_req:6000, candy:1, stardust:400 },
	{ lvl:5,    cpm:0.2902499, exp_req:10000, candy:1, stardust:600 },
	{ lvl:5.5,  cpm:0.3060574, exp_req:10000, candy:1, stardust:600 },
	{ lvl:6,    cpm:0.3210876, exp_req:15000, candy:1, stardust:600 },
	{ lvl:6.5,  cpm:0.3354450, exp_req:15000, candy:1, stardust:600 },
	{ lvl:7,    cpm:0.3492127, exp_req:21000, candy:1, stardust:800 },
	{ lvl:7.5,  cpm:0.3624578, exp_req:21000, candy:1, stardust:800 },
	{ lvl:8,    cpm:0.3752356, exp_req:28000, candy:1, stardust:800 },
	{ lvl:8.5,  cpm:0.3875924, exp_req:28000, candy:1, stardust:800 },
	{ lvl:9,    cpm:0.3995673, exp_req:36000, candy:1, stardust:1000 },
	{ lvl:9.5,  cpm:0.4111936, exp_req:36000, candy:1, stardust:1000 },
	{ lvl:10,   cpm:0.4225000, exp_req:45000, candy:1, stardust:1000 },
	{ lvl:10.5, cpm:0.4335117, exp_req:45000, candy:1, stardust:1000 },
	{ lvl:11,   cpm:0.4431076, exp_req:55000, candy:2, stardust:1300 },
	{ lvl:11.5, cpm:0.4530600, exp_req:55000, candy:2, stardust:1300 },
	{ lvl:12,   cpm:0.4627984, exp_req:65000, candy:2, stardust:1300 },
	{ lvl:12.5, cpm:0.4723361, exp_req:65000, candy:2, stardust:1300 },
	{ lvl:13,   cpm:0.4816850, exp_req:75000, candy:2, stardust:1600 },
	{ lvl:13.5, cpm:0.4908558, exp_req:75000, candy:2, stardust:1600 },
	{ lvl:14,   cpm:0.4998584, exp_req:85000, candy:2, stardust:1600 },
	{ lvl:14.5, cpm:0.5087018, exp_req:85000, candy:2, stardust:1600 },
	{ lvl:15,   cpm:0.5173940, exp_req:100000, candy:2, stardust:1900 },
	{ lvl:15.5, cpm:0.5259425, exp_req:100000, candy:2, stardust:1900 },
	{ lvl:16,   cpm:0.5343543, exp_req:120000, candy:2, stardust:1900 },
	{ lvl:16.5, cpm:0.5426358, exp_req:120000, candy:2, stardust:1900 },
	{ lvl:17,   cpm:0.5507927, exp_req:140000, candy:2, stardust:2200 },
	{ lvl:17.5, cpm:0.5588306, exp_req:140000, candy:2, stardust:2200 },
	{ lvl:18,   cpm:0.5667545, exp_req:160000, candy:2, stardust:2200 },
	{ lvl:18.5, cpm:0.5745692, exp_req:160000, candy:2, stardust:2200 },
	{ lvl:19,   cpm:0.5822789, exp_req:185000, candy:2, stardust:2500 },
	{ lvl:19.5, cpm:0.5898879, exp_req:185000, candy:2, stardust:2500 },
	{ lvl:20,   cpm:0.5974000, exp_req:210000, candy:2, stardust:2500 },
	{ lvl:20.5, cpm:0.6048188, exp_req:210000, candy:2, stardust:2500 },
	{ lvl:21,   cpm:0.6121573, exp_req:260000, candy:3, stardust:3000 },
	{ lvl:21.5, cpm:0.6194041, exp_req:260000, candy:3, stardust:3000 },
	{ lvl:22,   cpm:0.6265671, exp_req:335000, candy:3, stardust:3000 },
	{ lvl:22.5, cpm:0.6336492, exp_req:335000, candy:3, stardust:3000 },
	{ lvl:23,   cpm:0.6406530, exp_req:435000, candy:3, stardust:3500 },
	{ lvl:23.5, cpm:0.6475810, exp_req:435000, candy:3, stardust:3500 },
	{ lvl:24,   cpm:0.6544356, exp_req:560000, candy:3, stardust:3500 },
	{ lvl:24.5, cpm:0.6612193, exp_req:560000, candy:3, stardust:3500 },
	{ lvl:25,   cpm:0.6679340, exp_req:710000, candy:3, stardust:4000 },
	{ lvl:25.5, cpm:0.6745819, exp_req:710000, candy:3, stardust:4000 },
	{ lvl:26,   cpm:0.6811649, exp_req:900000, candy:4, stardust:4000 },
	{ lvl:26.5, cpm:0.6876849, exp_req:900000, candy:4, stardust:4000 },
	{ lvl:27,   cpm:0.6941437, exp_req:1100000, candy:4, stardust:4500 },
	{ lvl:27.5, cpm:0.7005429, exp_req:1100000, candy:4, stardust:4500 },
	{ lvl:28,   cpm:0.7068842, exp_req:1350000, candy:4, stardust:4500 },
	{ lvl:28.5, cpm:0.7131691, exp_req:1350000, candy:4, stardust:4500 },
	{ lvl:29,   cpm:0.7193991, exp_req:1650000, candy:4, stardust:5000 },
	{ lvl:29.5, cpm:0.7255756, exp_req:1650000, candy:4, stardust:5000 },
	{ lvl:30,   cpm:0.7317000, exp_req:2000000, candy:4, stardust:5000 },
	{ lvl:30.5, cpm:0.7347410, exp_req:2000000, candy:4, stardust:5000 },
	{ lvl:31,   cpm:0.7377695, exp_req:2500000, candy:6, stardust:6000 },
	{ lvl:31.5, cpm:0.7407856, exp_req:2500000, candy:6, stardust:6000 },
	{ lvl:32,   cpm:0.7437894, exp_req:3000000, candy:6, stardust:6000 },
	{ lvl:32.5, cpm:0.7467812, exp_req:3000000, candy:6, stardust:6000 },
	{ lvl:33,   cpm:0.7497610, exp_req:3750000, candy:8, stardust:7000 },
	{ lvl:33.5, cpm:0.7527291, exp_req:3750000, candy:8, stardust:7000 },
	{ lvl:34,   cpm:0.7556855, exp_req:4750000, candy:8, stardust:7000 },
	{ lvl:34.5, cpm:0.7586304, exp_req:4750000, candy:8, stardust:7000 },
	{ lvl:35,   cpm:0.7615638, exp_req:6000000, candy:10, stardust:8000 },
	{ lvl:35.5, cpm:0.7644861, exp_req:6000000, candy:10, stardust:8000 },
	{ lvl:36,   cpm:0.7673972, exp_req:7500000, candy:10, stardust:8000 },
	{ lvl:36.5, cpm:0.7702973, exp_req:7500000, candy:10, stardust:8000 },
	{ lvl:37,   cpm:0.7731865, exp_req:9500000, candy:12, stardust:9000 },
	{ lvl:37.5, cpm:0.7760650, exp_req:9500000, candy:12, stardust:9000 },
	{ lvl:38,   cpm:0.7789328, exp_req:12000000, candy:12, stardust:9000 },
	{ lvl:38.5, cpm:0.7817901, exp_req:12000000, candy:12, stardust:9000 },
	{ lvl:39,   cpm:0.7846370, exp_req:15000000, candy:15, stardust:10000 },
	{ lvl:39.5, cpm:0.7874736, exp_req:15000000, candy:15, stardust:10000 },
	{ lvl:40,   cpm:0.7903000, exp_req:20000000, candy:15, stardust:10000 },
	{ lvl:40.5, cpm:0.7931164 },

]



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


class Gender {
	static getString( ID ) {
		switch (ID) {
			case 'MALE':       return "Male";
			case 'FEMALE':     return "Female";
			case 'GENDERLESS': return "Genderless";
			default:           return "Unknown";
		}
	}
	static getStringShort( ID ) {
		switch (ID) {
			case 'MALE':       return "♂";
			case 'FEMALE':     return "♀";
			case 'GENDERLESS': return "×";
			default:           return "×";
		}
	}
	static getIconURL( ID ) {
		// Lazy method
		return GENDERS + ID.toLowerCase() + '.png'; 
	}
}
Gender.MALE =       "MALE";
Gender.FEMALE =     "FEMALE";
Gender.GENDERLESS = "GENDERLESS";



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
	
	getHeaderImageURL() {
		return 
	}

}

// Technically there is no min requirement for these leagues, but it makes it easier
League.GREAT  = new League(1200, 1500);
League.MASTER = new League(2200, 2500);
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
	
	getIconURL( ID ) {
		// Lazy method
		return GENDERS + ID.toLowerCase() + '.png'; 
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
Generation.UNKNOWN = new Generation(10, "Unknown Generation", 'unknown');



class Region {

	
	

}

Region.REGIONAL = 'REGIONAL';

Region.EAST = 'EAST';
Region.WEST = 'WEST';
Region.NORTH = 'NORTH';
Region.SOUTH = 'SOUTH';

Region.AFRICA = 'AFRICA';
Region.AFRICA_NORTH = 'AFRICA_NORTH';
Region.ASIA = 'ASIA';
Region.AUSTRALASIA = 'AUSTRALASIA';
Region.CANADA = 'CANADA';
Region.EUROPE = 'EUROPE';
Region.FLORIDA = 'FLORIDA';
Region.GREENLAND = 'GREENLAND';
Region.INDIA = 'INDIA';
Region.JAPAN = 'JAPAN';
Region.MEDITERRANEAN = 'MEDITERRANEAN';
Region.MIDDLE_EAST = 'MIDDLE_EAST';
Region.NEW_ZEALAND = 'NEW_ZEALAND';
Region.NORTH_AMERICA = 'NORTH_AMERICA';
Region.RUSSIA = 'RUSSIA';
Region.SOUTH_AMERICA = 'SOUTH_AMERICA';
Region.TROPICS = 'TROPICS';





class Move {

	/*static getIconURL( ID ) {
		// Lazy method
		return MOVES + ID.toLowerCase() + '.png'; 
	}*/

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
	
	getIconURL() {
		
		if (this.name == "Return") {
			return TYPES + 'move-return' + '.png'; 
		} else if (this.pokemonType) {
			return Type.getIconURL(this.pokemonType);
		} else {
			return TYPES + 'unknown' + '.png'; 
		}
	}

}
Move.CHARGED = 'CHARGED';
Move.FAST = 'FAST';


class Pokemon {
	
	static searchByID(POKEMON_ID) {
		
		var template = PokemonStats.getAll().find( p => p.ID_FULL == POKEMON_ID );
		if (!template) {
			console.log("Could not find pokemon with ID:", POKEMON_ID);
			return null;
		}
		
		return new PokemonStats(template);
	}
	
	static querySelector(require) {
	
		var template = PokemonStats.getAll().find( p => PokemonStats.matches(p, require) );
		
		if (!template) {
			console.log("Could not find pokemon with ID:", require);
			return null;
		}
		
		return new PokemonStats(template);
	}
	
	static querySelectorAll(require) {
	
		var matches = [];
		PokemonStats.getAll().forEach( p => {
			if (PokemonStats.matches(p, require)) {
				matches.push(new PokemonStats(p));
			}
		});
		
		return matches;
	}
	
	static auto2(data) {
	
		var POKEMON_ID = data.ID;
		if (POKEMON_ID == '') return null;
		
		var p = Pokemon.searchByID(POKEMON_ID);
		if (p == null) return null;
		
		p.data = data;
		
		function parseIntString(value) {
			// Remove thousands separators
			// https://stackoverflow.com/questions/11665884/how-can-i-parse-a-string-with-a-comma-thousand-separator-to-a-number/43448891#comment15461327_11665915
			// This regex is so smooth and clever... I love it.
			value = value.replace(/(\d+),(?=\d{3}(\D|$))/g, "$1");
			return parseInt(value, 10);
		}
		
		// DISABLED TEMPORARILY DUE TO BUG...
		//if (data.hasOwnProperty('NAME')) p.name = String(data['NAME']);
		if (data.hasOwnProperty('LVL'))  p.lvl  = parseIntString(data['LVL']);
		if (data.hasOwnProperty('CP'))   p.cp   = parseIntString(data['CP']);
		
		if (data.hasOwnProperty('STATE')) {
			if (data['STATE'] == 'LUCKY') p.lucky = true;
			if (data['STATE'] == 'TRASH') p.trash = true;
			if (data['STATE'] == 'MISSING') p.missing = true;
			if (data['STATE'] == 'UNRELEASED') p.missing = true;
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
	
	
		function checkProperty(require, requireID, target, targetID) {
					
			if (require.hasOwnProperty(requireID)) {
				var requireArray = Array.isArray(require[requireID]) ? require[requireID] : [require[requireID]];
				var anyMatch = false;
				requireArray.forEach( value => {
					if (target[targetID] == value) anyMatch = true;
				} );
				
				return anyMatch;
			}
			
			return true;
		}
		
		if (!checkProperty(require, 'ID',      this, 'ID'))       return false;
		if (!checkProperty(require, 'FORM',    this, 'FORM'))   return false;
		if (!checkProperty(require, 'COSTUME', this, 'costume'))  return false;
		if (!checkProperty(require, 'REGION', this, 'REGION'))    return false;
			
		
		if (require.hasOwnProperty('ID_FULL') && (this.ID_FULL != require.ID_FULL)) return false;
		//if (require.hasOwnProperty('ID')      && (this.ID      != require.ID))      return false;
		//if (require.hasOwnProperty('FORM')    && (this.FORM    != require.FORM))    return false;
		if (require.hasOwnProperty('FORM_ID') && (this.FORM_ID != require.FORM_ID)) return false;
		if (require.hasOwnProperty('GENDER')  && (this.GENDER  != require.GENDER))  return false;
		
		/*
		// Special case where we allow "form names" like PURIFIED to be considered "normal"
		if (require.hasOwnProperty('FORM') && (this.FORM != require.FORM)) {
			// This if statement is going to confuse me in three weeks
			if (require.FORM == "" && this.FORM == 'PURIFIED') {
				//continue
			} else if (require.FORM == "" && this.FORM == 'SHADOW') {
				//continue
			} else  {
				return false;
			}
		}
		*/
		
		
		if (require.hasOwnProperty('family')  && (this.family  != require.family))  return false;
		if (require.hasOwnProperty('purified')  && (this.purified  != require.purified))  return false;
			
		if (require.hasOwnProperty('legendary')  && (this.LEGENDARY != require.legendary))  return false;
		if (require.hasOwnProperty('mythical')   && (this.MYTHICAL  != require.mythical))   return false;
		if (require.hasOwnProperty('mythic')     && (this.MYTHICAL  != require.mythic))     return false;
		if (require.hasOwnProperty('baby')       && (this.BABY      != require.baby))       return false;
			
		if (require.hasOwnProperty('type') && !this.isType(require.type))  return false;
		if (require.hasOwnProperty('move') && !this.hasMove(require.move)) return false;
		
		// More later
		
		// All passed
		return true;
	}
	
	set cp(value) { this._cp = value; }
	get cp() {
		if (this._cp !== undefined) return this._cp;
		if (this.lvl === undefined) return undefined; 
		return this.getLvlCp( this.lvl );
	}
	
	get cpMax() {
		return this.getLvlCp( this.lvlMax );
	}
	
	getLvlCp( lvl ) {
		
		if (lvl === undefined) {
			return undefined;
		}
		
		if (this.atk === undefined || this.def === undefined || this.sta === undefined) {
			return undefined;
		}
		
		var atk = this.atk + (this.atkIV !== undefined ? this.atkIV : 15);
		var def = this.def + (this.defIV !== undefined ? this.defIV : 15);
		var sta = this.sta + (this.staIV !== undefined ? this.staIV : 15);
		
		var cpm = CPM.data.find( c => c.lvl == lvl );
		var cpScalar = cpm.cpm;
		
		// =MAX(FLOOR(($C8+$C$1)*SQRT($D8+$C$2)*SQRT($E8+$C$3)*POWER(G$7,2)/10),10)
		return Math.max(Math.floor( (atk) * Math.sqrt(def) * Math.sqrt(sta) * Math.pow(cpScalar,2) / 10 ),10);
	}

	
	//get lvl() { }
	get lvlMax() {
		return 40;
	}
	
	
	get moves() {
		var m = [];
		if (this.move1) { m.push(this.move1); }
		if (this.move2) { m.push(this.move2); }
		if (this.move3) { m.push(this.move3); }
		return m;
	}
	
	getSpecialMoves(includeReturn) {
	
		var moves = [];
	
		// Shadow/Purified Pokemon
		if (includeReturn && this.hasMove('Return')) {
			moves.push('Return');
		}
		
		if (includeReturn && this.hasMove('Frustration')) {
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
			{ID:"PORYGON_Z", move:"Tri Attack"},
			{ID:"CHARIZARD", move:"Dragon Breath"},
			{ID:"ELEKTRIKE", move:"Flamethrower"},
			{ID:"MAGMAR", move:"Thunderbolt"},
		]
		COMMUNITY_DAY.forEach( m => {
			if (this.matches(m)) {
				moves.push(m.move);
			}
		});
		
		var SPECIAL = [
			{ID:"GENGAR",    move:"Lick"},
			{ID:"GENGAR",    move:"Psychic"},
			{ID:"COBALION",  move:"Sacred Sword"},
			{ID:"LICKITUNG", move:"Body Slam"},
			{ID:"MEWTWO", form:"",  move:"Psystrike"},
			{ID:"MEWTWO", form:"A", move:"Psystrike"},
			{ID:"ARTICUNO",	move:"Hurricane"},
			{ID:"ZAPDOS",	move:"Thunder Shock"},
			{ID:"MOLTRES",	move:"Sky Attack"},
			
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
	
	
	get traded() {
		if (this._traded !== undefined) {
			return this._traded;
		} else if (this.lucky !== undefined && this.lucky) {
			return true;
		} else {
			return undefined; // return false; instead?
		}
	}
	
}

class PokemonStats extends Pokemon {

		static getAll() {
			return pokemonstats;
		}

		static matches(p, require) {
		
			if (require == null) {
				console.log("[PokemonStats:matches]", "Warning: requirements are null");
				return true;
			}
			
			function checkProperty(require, requireID, target, targetID) {
				
				if (require.hasOwnProperty(requireID)) {
					var requireArray = Array.isArray(require[requireID]) ? require[requireID] : [require[requireID]];
					var anyMatch = false;
					requireArray.forEach( value => {
						if (target[targetID] == value) anyMatch = true;
					} );
					return anyMatch;
				}
				
				return true;
			}
			
			if (!checkProperty(require, 'ID',      p, 'ID'))   return false;
			if (!checkProperty(require, 'FORM',    p, 'FORM')) return false;
			if (!checkProperty(require, 'COSTUME', p, 'COSTUME'))  return false;
			if (!checkProperty(require, 'REGION',  p, 'REGION'))   return false;
			if (!checkProperty(require, 'GENDER',  p, 'GENDER'))   return false;
			
			if (require.hasOwnProperty('ID_FULL') && (p.ID_FULL != require.ID_FULL)) return false;
			//if (require.hasOwnProperty('ID')      && (p.ID      != require.ID))      return false;
			//if (require.hasOwnProperty('FORM')    && (p.FORM    != require.FORM))    return false;
			if (require.hasOwnProperty('FORM_ID') && (p.POGO_FORM_ID != require.FORM_ID)) return false;
			
			if (require.hasOwnProperty('pokedexID')) {
				// Assume integers?
				if (parseInt(p.POKEDEX_ID, 10) != parseInt(require.pokedexID, 10)) return false;
			}
			
			if (require.hasOwnProperty('generationID')) {
				// Assume integers?
				if (parseInt(p.POKEDEX_ID, 10) != parseInt(require.generationID, 10)) return false;
			}
			if (require.hasOwnProperty('generation')) {
				// Assume integers?
				console.log("[Pokemon:searchByMatch()]", "Search by 'generation' not implemented. Please use 'generationID' instead.");
			}
			
			if (require.hasOwnProperty('family')  && (p.FAMILY  != require.family))  return false;
			if (require.hasOwnProperty('gender')  && (p.GENDER  != require.gender))  return false;
			if (require.hasOwnProperty('rarity')  && (p.RARITY  != require.rarity))  return false;
			
			if (require.hasOwnProperty('legendary')  && (p.LEGENDARY != require.legendary))  return false;
			if (require.hasOwnProperty('mythical')   && (p.MYTHICAL  != require.mythical))   return false;
			if (require.hasOwnProperty('mythic')     && (p.MYTHICAL  != require.mythic))     return false;
			if (require.hasOwnProperty('baby')       && (p.BABY      != require.baby))       return false;
			
			if (require.hasOwnProperty('costume')) {
				if (require.costume === true  && p.COSTUME === "") return false;
				if (require.costume === false && p.COSTUME !== "") return false;
			}
		
			if (require.hasOwnProperty('type')) {
				// Check both types
				if (p.TYPE1 != require.type && p.TYPE2 != require.type) return false;
			}
			
			// Allow searching for two types, in any order
			// require = {type:"FIGHTING", type2:"FIRE"}
			if (require.hasOwnProperty('type2')) {
				// Check both types
				if (p.TYPE1 != require.type2 && p.TYPE2 != require.type2) return false;
			}
		
			return true;
		
		}


	constructor(template) {
		super();
		this.template = template;
	}
	
	get ID_FULL() 	{ return this.template.ID_FULL; }
	get ID()		{ return this.template.ID; }
	get FORM()		{ return this.template.FORM; }
	get GENDER()	{ return this.template.GENDER; }
	get REGION()	{ return this.template.REGION; }
	get FORM_ID()	{ return this.template.POGO_FORM_ID; }
	
	get pokedexID() { return parseInt(this.template.POKEDEX_ID, 10); }
	get pokedexID2() {
		return (this.generationID * 1000) + (this.pokedexID);
	}
	
	get name() 	{ return this.template.DISPLAY; }
	get type1() { return this.template.TYPE1; }
	get type2() { return this.template.TYPE2; }
	
	get atk()	{ return parseInt(this.template.ATK, 10); }
	get def()	{ return parseInt(this.template.DEF, 10); }
	get sta()	{ return parseInt(this.template.STA, 10); }
	
	get family() { return this.template.FAMILY; }
	get parent() { return this.template.PARENT; }
	get generation()   { return this.template.GEN == '-' ? Generation.UNKNOWN : Generation.fromID( this.generationID ); }
	get generationID() { return this.template.GEN == '-' ? Generation.UNKNOWN.value : parseInt(this.template.GEN, 10); }
	
	get legendary() { return this.template.LEGENDARY == 'LEGENDARY'; }
	get mythical() 	{ return this.template.MYTHICAL == 'MYTHICAL'; }
	//get purified() 	{ return this.template.PURIFIED == 'PURIFIED'; }
	//get costume() 	{ return this.template.COSTUME == 'COSTUME'; }
	get baby() 		{ return this.template.BABY == 'BABY'; }
	
	get costume() 	{
		if (this.template.COSTUME === undefined) return undefined;
		if (this.template.COSTUME === "")        return "";
		if (this.template.COSTUME === 'COSTUME') return true;
		
		return this.template.COSTUME;
	}
	
	set name(value) { this._name = value; }
	get name()      { return (this._name !== undefined) ? this._name : this.template.DISPLAY; }
	
	set purified(value) { this._purified = value; }
	get purified()      { return (this._purified !== undefined) ? this._purified : (this.template.PURIFIED == 'PURIFIED'); }
	
	get unreleased() 	{ return !this.releasedPokemon; }
	
	//get releasedPokemon() { return this.template.RELEASED_POKEMON == 'RELEASED_POKEMON'; }
	//get releasedShiny()   { return this.template.RELEASED_SHINY   == 'RELEASED_SHINY'; }
	get releasedPokemon() {
		if (this.template.RELEASED_POKEMON == '') return false;
		if (this.template.RELEASED_POKEMON == 'UNRELEASED') return false;
		if (this.template.RELEASED_POKEMON == 'RELEASED_POKEMON') return true;
	}
	get releasedShiny() {
		if (this.template.RELEASED_SHINY == '') return false;
		if (this.template.RELEASED_SHINY == 'UNRELEASED') return false;
		if (this.template.RELEASED_SHINY == 'RELEASED_SHINY') return true;
	}
	get regional() 		{ return this.template.REGIONAL != ''; }
	get regions() 		{ return this.template.REGIONAL ? this.template.REGIONAL.split(',') : []; }
	get rarity() 		{ return this.template.RARITY; }
	
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

