#!/bin/bash

function player_data() {
	player="$1";
	for type in all lucky purified shiny; do
		./csv-to-json.sh "$player/$type.csv" "" "$type" >"$player/$type.js";
	done
}

./csv-to-json.sh data/pokemonstats.csv 'ID' pokemonstats >data/pokemonstats.js
./csv-to-json.sh data/moves.csv 'ID' moves >data/moves.js

player_data "iqandreas/data";
player_data "iqandrea/data";



