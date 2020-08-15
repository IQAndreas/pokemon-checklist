#!/bin/bash
ID="$1";
FORM="$2";
if [[ -z "$FORM" ]]; FORM="00";
wget "https://images.gameinfo.io/pokemon/256/${ID}-${FORM}.png"       -O "pokemon_icon_${ID}_${FORM}.png";
wget "https://images.gameinfo.io/pokemon/256/${ID}-${FORM}-shiny.png" -O "pokemon_icon_${ID}_${FORM}_shiny.png";
