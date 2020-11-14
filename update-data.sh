#!/bin/bash

function player_data() {
	player="$1";
	for type in all lucky purified shiny all_family; do
		INPUT="$player/$type.csv";
		OUTPUT="$player/$type.js"
		if [[ -f "$INPUT" ]]; then
			stdsuccess "$INPUT";
			./csv-to-json.sh "$INPUT" "" "$type" >"$OUTPUT";
		fi
	done
}

stdsuccess "data/pokemonstats.csv";
./csv-to-json.sh data/pokemonstats.csv 'ID' pokemonstats >data/pokemonstats.js

stdsuccess "data/moves.csv";
./csv-to-json.sh data/moves.csv 'ID' moves >data/moves.js

player_data "iqandreas/data";
player_data "iqandrea/data";



