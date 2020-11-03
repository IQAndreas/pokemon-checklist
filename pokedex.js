
class Pokedex {

	constructor(container, style) {
		this.container = container;
		
		this.style = style || '';
		
		this.displayCP = 'hover-hide';
		this.displayLVL = 'hover-show';
		this.displayPurified = true;
		this.displayShiny = true;
		
		this.displayLeague = true;
		
		this.displayName = true;
		//this.displayMoves = true;
		this.displayMoveIcons = 'hover-hide';
		this.displayMoveList = 'hover-show';
		this.displayMoveListSpecial = 'hover-hide';
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
		pokemon.unreleased && classes.push('unreleased');
		pokemon.mystery && classes.push('mystery');
		pokemon.lucky && classes.push('lucky');
		element.className = classes.join(' ');
		
		
		
		
		if (this.displayLeague) {
		
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
		
		
		// <div class='pokemon flying fire pokemon-purified'><img class='pokemon-image' src='pokemon_icons/pokemon_icon_146_00.png' /><span class='cp'>CP<span class='cp-value'>2,412</span></span><span class='purified'><img src='assets/purified.png'><span>PURIFIED</span><img src='assets/purified.png'></span><span class='name'>Moltres</span></div>
		if (this.displayPurified && pokemon.purified) {
			var purified = this.makeOverlay(overlayTop, "Purified", 'purified-overlay', 'purified', 'purified')
		}
		
		if (this.displayPurified && pokemon.shadow) {
			var shadow = this.makeOverlay(overlayTop, "Shadow", 'shadow-overlay', 'shadow', 'shadow')
		}
		
		
		// <div class='pokemon dragon ghost'><img class='pokemon-image' src='pokemon_icons/pokemon_icon_487_11_shiny.png' /><span class='cp'>CP<span class='cp-value'>1,881</span></span><span class='shiny'><img src='assets/shiny.png'><span>SHINY</span><img src='assets/shiny.png'></span><span class='name'>Giratina (Altered)</span></div>
		if (this.displayShiny && pokemon.shiny) {
			var shiny = this.makeOverlay(overlayTop, "Shiny", 'shiny-overlay', 'shiny', 'shiny')
		}
		
		//console.log(pokemon, this.displayCP, pokemon.cp);
		if (this.displayCP && pokemon.cp) {
			var cpSpan = this.makeSpan(overlayTop, "CP", 'cp', this.displayCP);
			var cpValue = this.makeSpan(cpSpan, pokemon.cp, 'cp-value');
		}
		
		//console.log(pokemon, this.displayLVL, pokemon.lvl);
		if (this.displayLVL && pokemon.lvl) {
			var cpSpan = this.makeSpan(overlayTop, "LVL", 'lvl', this.displayLVL);
			var cpValue = this.makeSpan(cpSpan, pokemon.lvl, 'lvl-value');
		}
		
		
		var overlayBottom = document.createElement('div');
		overlayBottom.className = 'overlay-bottom';
		element.appendChild(overlayBottom);
		
		if (this.displayName && pokemon.name) {
			
			var nameValue = pokemon.name;
			var nameSub = "";
			
			var nameMatch = nameValue.match(/^([^(]+) ?\(([^)]+)\)$/);
			if (nameMatch) {
				nameValue = nameMatch[1];
				nameSub = nameMatch[2];
				//console.log(nameValue, nameSub);
			}
			
			var name = this.makeSpan(overlayBottom, nameValue, 'name', this.displayName)
			// We're already displaying Purified/Shadow status. No need to do it again.
			if (nameSub && nameSub != "Purified" && nameSub != "Shadow") {
				var subTitle = this.makeSpan(name, `(${nameSub})`, 'subtitle');
			}
		}
		
		//if (this.displayMoveIcons || this.displayMoveList || this.displayMoveListSpecial) {
		if (pokemon.move1 || pokemon.move2 || pokemon.move3) {
				
			if (this.displayMoveList) {
				var moveList = this.makeSpan(overlayBottom, '', 'move-list', this.displayMoveList);
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
			if (this.displayMoveListSpecial && (specialMoves.length > 0)) {
				
				var moveList = this.makeSpan(overlayBottom, '', 'move-list', this.displayMoveListSpecial);
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
					
			if (this.displayMoveIcons) {
			
				function makeMoveIcon(element, move) {
					var img = document.createElement('img');
					img.className = 'type-icon';
					img.src = move.getIconURL();
					//img.alt = move.pokemonType;
					img.title = move.name;
					element.appendChild(img);
				}
				
				// Make little icons of every move
				var moves = this.makeSpan(overlayBottom, '', 'move-icons', this.displayMoveIcons);
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
		return headerElement;
		
	}
	
	addFamily ( ) {
		var familyElement = document.createElement('div');
		familyElement.className = 'family';
		this.container.appendChild( familyElement );
		return familyElement;
	}
	
	addPokemon( pokemon , family ) {
		var pokemonElement = this.makePokemon( pokemon );
		if ( family ) {
			family.appendChild( pokemonElement );
		} else {
			this.container.appendChild( pokemonElement );
		}
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


