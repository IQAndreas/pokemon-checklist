
// ------------------------------------------------------------

function sortByCP(a, b) {
	//var arr = lucky.map( p => Pokemon.auto2(p) );
	return (b.cp - a.cp);
}	
	
function defaultMap(pokemonMatch) {
	var pokemonArray = Pokemon.querySelectorAll( pokemonMatch );
	if (!pokemonArray || pokemonArray.length == 0) {
		console.log("Could not find pokemon with that matches:", pokemonMatch);
		return;
	}
	
	// TODO: SORT
	pokemonArray.sort( (a,b) => {
		return (a.generationID - b.generationID) || (a.pokedexID - b.pokedexID) || (b.cp - a.cp);
	});
	
	// Only return one result
	return pokemonArray[0];
}

function makeFullPokedex(pokedex, filter, map) {
	
	if (map == null) {
		map = defaultMap;
	}
	
	var header = null;
	filter.forEach( pokemonMatch => {
		
		if ( pokemonMatch["TYPE"] == 'HEADER' ) {
			if (header) pokedex.addEmpties();
			header = pokemonMatch;
			pokedex.addHeader(header["ID"], header["TEXT"], header["IMG1"], header["IMG2"]);
			return;
			
		} if ( pokemonMatch.hasOwnProperty('virtual') || pokemonMatch["TYPE"] == 'VIRTUAL' ) {
			
			//var pokemonID = pokemonMatch.ID;
			var pokemon = Pokemon.querySelector( pokemonMatch );
			//var pokemon = new PokemonStats( pokemonMatch );
			var template = pokemonMatch.hasOwnProperty('virtual') ? pokemonMatch.virtual : pokemonMatch;
			
			if (template.display) pokemon.display = template.display;
			
			if (template.move) pokemon.move1 = template.move;
			if (template.move1) pokemon.move1 = template.move1;
			if (template.move2) pokemon.move1 = template.move1;
			if (template.move3) pokemon.move1 = template.move1;
			
			if (template.lucky) pokemon.lucky = template.lucky;
			if (template.shiny) pokemon.shiny = template.shiny;
			
			if (template.cp) pokemon.cp = template.cp;
			if (template.hp) pokemon.hp = template.hp;
			if (template.lvl) pokemon.lvl = template.lvl;
			if (template.lvl == 'max') pokemon.lvl = pokemon.lvlMax;
			if (template.raidTier) pokemon.raidTier = template.raidTier;
			
			if (template.cpMax || template.league) {
				
				if (template.lvl) {
					console.log("WARNING:", "Trying to set the pokemon's lvl and cpMax at the same time will replace the set lvl");
				}
				
				var league = (template.league) ? League.fromID(template.league) : null;
				var cpMax = (league) ? league.cpMax : template.cpMax;
				
				//if (!league && !cpMax) {
				if (!cpMax) {
					console.log("ERROR:", "No matching league or cpMax found");
				} else {
				
					var lvlBest = undefined;
				
					// Automatic LVL
					for (var lvl = 1; lvl <= pokemon.lvlMax; lvl++) {
						
						pokemon.lvl = lvl;
						if (league.qualifies(pokemon)) {
							lvlBest = lvl;
						}
						
						/*if (pokemon.getLvlCp(lvl) <= cpMax) {
							lvlBest = lvl;
						}*/
					}
					
					if (lvlBest === undefined) {
						console.log("Could not find the best lvl for Pokemon", pokemon);
						return;
					} else {
						pokemon.lvl = lvlBest;
					}
					
				}
			}
			
			pokedex.addPokemon(pokemon);
			
			return;
			
		} else if (Array.isArray(pokemonMatch)) {
			
			var pokemonArray = [];
			pokemonMatch.forEach(require => {
				var pokemon = map(require);
				//console.log(pokemon);
				if (!pokemon) {
					return;
				} else if (Array.isArray(pokemon)) {
					pokemonArray.concat(pokemon);
				} else {
					pokemonArray.push(pokemon);
				}
			});
			
			var family = pokedex.addFamily();
			pokemonArray.forEach( p => {
				pokedex.addPokemon(p,family);
			});
			return;
			
		} else {
			
			var pokemon = map(pokemonMatch);
			//console.log(pokemon);
			
			if (!pokemon) {
				return;
			} else if (Array.isArray(pokemon)) {
				var family = pokedex.addFamily();
				pokemon.forEach( p => {
					pokedex.addPokemon(p,family);
				});
			} else {
				pokedex.addPokemon(pokemon);
			}
		}
	});
	
	if (header) pokedex.addEmpties();
	
}

// ------------------------------------------------------------

const SORT_ASC = +1;
const SORT_DESC = -1;
//function sortBy(...args) {
function sortBy(sortValues) {

	if (typeof sortValues === 'string') {
		var str = sortValues;
		sortValues = {};
		sortValues[str] = 'asc';
	}
	
	var keys = Object.keys(sortValues);

	return function(a,b) {
		for (var i = 0; i < keys.length; i++) {
			//console.log(c, typeof a[c], a[c], b[c], ((a[c] > b[c]) ? +1 : -1));
			var property = keys[i];
			var options = sortValues[property];
			if (a[property] != b[property]) {
				return ((a[property] > b[property]) ? +1 : -1) * (options == 'asc' ? SORT_ASC : SORT_DESC);
			}
		};
		
		return 0;
	}
}

// ------------------------------------------------------------

class Pokedex {

	constructor(container, style) {
		this.container = container;
		
		this.style = style || '';
		
		this.display = {};
		this.display.cp = 'hover-hide';
		this.display.cpMax = false;
		this.display.raidCp = 'hover-hide';
		this.display.hp = false;
		this.display.cpMax = false;
		this.display.raidHp = false;
		this.display.lvl = 'hover-show';
		this.display.lvlMax = false;
		this.display.raidTier = true;
		this.display.purified = true;
		this.display.shiny = true;
		
		this.display.league = true;
		
		this.display.name = true;
		//this.display.moves = true;
		this.display.moveIcons = 'hover-hide';
		this.display.moveList = 'hover-show';
		this.display.moveListSpecial = 'hover-hide';
		
		this._pokemon = [];
		this._families = [];
		this._headers = [];
		//this._empties = [];
	}
	
	sortBy( property, sortOrder ) {
		if (!sortOrder) sortOrder = SORT_ASC;
		this._pokemon.forEach( element => {
			element.style.order = sortOrder * element.data[property];
		});
	}
	
	makeSpan(container, textContent, className, hoverOptions) {
		var span = document.createElement('span');
		if (className)   span.className = className;
		
		if ((hoverOptions == 'hover-hide') || (hoverOptions == 'hover-show')) {
			span.classList.add(hoverOptions);
		}
		
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
		element.className = 'pokemon-padding';
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
		element.data = pokemon;
		
		//console.log(pokemon.purified);
		
		var classes = ['pokemon'];
		pokemon.type1 && classes.push(pokemon.type1.toLowerCase());
		//pokemon.type2 && classes.push(pokemon.type2.toLowerCase());
		pokemon.purified && classes.push('pokemon-purified');
		pokemon.shadow && classes.push('pokemon-shadow');
		pokemon.shiny && classes.push('pokemon-shiny');
		pokemon.disabled && classes.push('disabled');
		pokemon.unreleased && classes.push('unreleased');
		pokemon.mystery && classes.push('mystery');
		pokemon.lucky && classes.push('lucky');
		element.className = classes.join(' ');
		
		
		
		
		if (this.display.league) {
		
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
		
		}
		
		
		
		//console.log(pokemon.image);
		if (pokemon.image) {
			var img = document.createElement('img');
			img.className = 'pokemon-image hover-blur';
			img.src = pokemon.image;
			element.appendChild(img);
		}
		
		
		
		
		
		
		var overlayTop = document.createElement('div');
		overlayTop.className = 'overlay-top';
		element.appendChild(overlayTop);
		
		
		if (this.display.raidTier && pokemon.raidTier) {
						
			var raidIconContainer = document.createElement('span');
			raidIconContainer.className = 'overlay raid-tier';
			
			if (Number.isInteger(pokemon.raidTier)) {
				var numIcons = Math.min(Math.max(1, pokemon.raidTier), 5);
				for (var i = 0; i<numIcons; i++) {
					var img = document.createElement('img');
					img.className = 'raid-tier-icon';
					img.src = ASSETS + 'raid.png';
					raidIconContainer.appendChild(img);
				}
			} else if (pokemon.raidTier == 'mega') {
				var img = document.createElement('img');
				img.className = 'raid-tier-icon';
				img.src = ASSETS + 'mega.png';
				raidIconContainer.appendChild(img);
			} else {
				console.log("Unknown raid tier:", pokemon.raidTier);
			}
			
			overlayTop.appendChild(raidIconContainer);
			
		}
		
		
		// <div class='pokemon flying fire pokemon-purified'><img class='pokemon-image' src='pokemon_icons/pokemon_icon_146_00.png' /><span class='cp'>CP<span class='cp-value'>2,412</span></span><span class='purified'><img src='assets/purified.png'><span>PURIFIED</span><img src='assets/purified.png'></span><span class='name'>Moltres</span></div>
		if (this.display.purified && pokemon.purified) {
			var purified = this.makeOverlay(overlayTop, "Purified", 'purified-overlay', 'purified', 'purified')
		}
		
		if (this.display.purified && pokemon.shadow) {
			var shadow = this.makeOverlay(overlayTop, "Shadow", 'shadow-overlay', 'shadow', 'shadow')
		}
		
		
		// <div class='pokemon dragon ghost'><img class='pokemon-image' src='pokemon_icons/pokemon_icon_487_11_shiny.png' /><span class='cp'>CP<span class='cp-value'>1,881</span></span><span class='shiny'><img src='assets/shiny.png'><span>SHINY</span><img src='assets/shiny.png'></span><span class='name'>Giratina (Altered)</span></div>
		if (this.display.shiny && pokemon.shiny) {
			var shiny = this.makeOverlay(overlayTop, "Shiny", 'shiny-overlay', 'shiny', 'shiny')
		}
		
		//console.log(pokemon, this.display.cp, pokemon.cp);
		if (this.display.cp && pokemon.cp) {
			var span = this.makeSpan(overlayTop, "CP", 'cp', this.display.cp);
			var value = this.makeSpan(span, pokemon.cp, 'value');
		}
		
		//console.log(pokemon, this.display.cpMax, pokemon.cpMax);
		if (this.display.cpMax && pokemon.cpMax) {
			var span = this.makeSpan(overlayTop, "MAX", 'cp max', this.display.cpMax);
			var value = this.makeSpan(span, pokemon.cpMax, 'value');
		}
		
		if (this.display.raidCp && pokemon.raidTier) {
			var span = this.makeSpan(overlayTop, "CP", 'cp', this.display.raidCp);
			var value = this.makeSpan(span, pokemon.getRaidCp(pokemon.raidTier), 'value');
		}
		
		//console.log(pokemon, this.display.hp, pokemon.hp);
		if (this.display.hp && pokemon.hp) {
			var span = this.makeSpan(overlayTop, "HP", 'hp', this.display.hp);
			var value = this.makeSpan(span, pokemon.hp, 'value');
		}
		
		//console.log(pokemon, this.display.hpMax, pokemon.hpMax);
		if (this.display.hpMax && pokemon.hpMax) {
			var span = this.makeSpan(overlayTop, "HP MAX", 'hp max', this.display.hpMax);
			var value = this.makeSpan(span, pokemon.hpMax, 'value');
		}
		
		if (this.display.raidHp && pokemon.raidTier) {
			var span = this.makeSpan(overlayTop, "HP", 'hp', this.display.raidHp);
			var value = this.makeSpan(span, pokemon.getRaidHp(pokemon.raidTier), 'value');
		}
		
		//console.log(pokemon, this.display.lvl, pokemon.lvl);
		if (this.display.lvl && pokemon.lvl) {
			var span = this.makeSpan(overlayTop, "LVL", 'lvl', this.display.lvl);
			var value = this.makeSpan(span, pokemon.lvl, 'value');
		}
		
		//console.log(pokemon, this.display.lvlMax, pokemon.lvlMax);
		if (this.display.lvlMax && pokemon.lvlMax) {
			var span = this.makeSpan(overlayTop, "MAX", 'lvl max', this.display.lvlMax);
			var value = this.makeSpan(span, pokemon.lvl, 'lvl-value');
		}
		
		
		var overlayBottom = document.createElement('div');
		overlayBottom.className = 'overlay-bottom';
		element.appendChild(overlayBottom);
		
		if (this.display.name && pokemon.name) {
			
			var nameValue = pokemon.name;
			var nameSub = "";
			
			var nameMatch = nameValue.match(/^([^(]+) ?\(([^)]+)\)$/);
			if (nameMatch) {
				nameValue = nameMatch[1];
				nameSub = nameMatch[2];
				//console.log(nameValue, nameSub);
			}
			
			var name = this.makeSpan(overlayBottom, nameValue, 'name', this.display.name)
			// We're already displaying Purified/Shadow status. No need to do it again.
			if (nameSub && nameSub != "Purified" && nameSub != "Shadow") {
				var subTitle = this.makeSpan(name, `(${nameSub})`, 'subtitle');
			}
		}
		
		//if (this.display.moveIcons || this.display.moveList || this.display.moveListSpecial) {
		if (pokemon.move1 || pokemon.move2 || pokemon.move3) {
				
			if (this.display.moveList) {
				var moveList = this.makeSpan(overlayBottom, '', 'move-list', this.display.moveList);
				pokemon.moves.forEach( moveName => {
					
					var move = Move.fromName( moveName );
					//if (!move) return;
					if (!move) {
						move = new Move(undefined, moveName, undefined, undefined);
					}
					
					var element = document.createElement('span');
					element.className = 'move';
					//element.textContent = textContent
					
					var img = document.createElement('img');
					img.src = move.getIconURL();
					//img.alt = move.pokemonType;
					img.title = move.name;
					element.appendChild(img);
					
					var span = document.createElement('span');
					span.innerText = move.name;
					element.appendChild(span);
					
					moveList.appendChild(element);
				});
			}	
				
			var specialMoves = pokemon.getSpecialMoves();
			if (this.display.moveListSpecial && (specialMoves.length > 0)) {
				
				var moveList = this.makeSpan(overlayBottom, '', 'move-list', this.display.moveListSpecial);
				specialMoves.forEach( moveName => {
					
					var move = Move.fromName( moveName );
					//if (!move) return;
					if (!move) {
						move = new Move(undefined, moveName, undefined, undefined);
					}
					
					var element = document.createElement('span');
					element.className = 'move';
					//element.textContent = textContent
					
					var img = document.createElement('img');
					img.src = move.getIconURL();
					//img.alt = move.pokemonType;
					img.title = move.name;
					element.appendChild(img);
					
					var span = document.createElement('span');
					span.innerText = move.name;
					element.appendChild(span);
					
					moveList.appendChild(element);
				});
					
			}
					
			if (this.display.moveIcons) {
			
				function makeMoveIcon(element, move) {
					var img = document.createElement('img');
					img.className = 'type-icon';
					img.src = move.getIconURL();
					//img.alt = move.pokemonType;
					img.title = move.name;
					element.appendChild(img);
				}
				
				// Make little icons of every move
				var moves = this.makeSpan(overlayBottom, '', 'move-icons', this.display.moveIcons);
				pokemon.moves.forEach( moveName => {
					var move = Move.fromName( moveName );
					//if (!move) return;
					if (!move) {
						move = new Move(undefined, moveName, undefined, undefined);
					}
					
					var icon = makeMoveIcon(moves, move);
				});
			
			}
			
		}
		
		return element;
		
	}
	
	addHeader( id, text, imageLeft, imageRight ) {
		var headerElement = this.makeHeader( id, text, imageLeft, imageRight );
		this.container.appendChild( headerElement );
		this._headers.push(headerElement); //TEMP
		return headerElement;
	}
	
	addFamily ( ) {
		var familyElement = document.createElement('div');
		familyElement.className = 'family';
		this.container.appendChild( familyElement );
		this._families.push(familyElement); //TEMP
		return familyElement;
	}
	
	addPokemon( pokemon , family ) {
		var pokemonElement = this.makePokemon( pokemon );
		if ( family ) {
			family.appendChild( pokemonElement );
		} else {
			this.container.appendChild( pokemonElement );
		}
		this._pokemon.push(pokemonElement); //TEMP
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


