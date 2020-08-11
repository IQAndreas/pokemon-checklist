#!/bin/bash

CSV_FILE="$1";
CONFIG_ARG="$2";
VARNAME="$3";

if [ -z "$CONFIG_ARG" ]; then
	CONFIG_ARG="ID";
fi

if [ -z "$VARNAME" ]; then
	VARNAME="pokemonstats";
fi

TAB=$'\t';

echo "var $VARNAME = [";

declare -a HEADER;

#while read -a arr -d ',' -r -u 10; do
#while IFS='|'$'\n' read -a data -r -u 10; do
#while IFS=',' read -a data -r -u 10; do
while IFS='|' read -a data -r -u 10; do

	if [ ${#HEADER[@]} -eq 0 ]; then
		
		# get length of an array
		arraylength=${#data[@]}
		
		# use for loop to read all values and indexes
		for (( i=0; i<${arraylength}; i++ ));
		do
			key="${data[$i]}";
			HEADER["$i"]="$key";
			
			if [ "$key" == "$CONFIG_ARG" ]; then
				CONFIG_ARG_ID="$i";
			fi
			
			#echo "$(( $i+1 )) / ${arraylength} : ${key}";
		done
		
		continue
		
	fi
	
	# get length of an array
	arraylength=${#data[@]}
	
	echo -n "${TAB}{ ";
	# use for loop to read all values and indexes
	for (( i=0; i<${arraylength}; i++ ));
	do
		#echo "${HEADER[$i]}"$'\t'"${data[$i]}";
		key="${HEADER[$i]}";
		value="${data[$i]}";
		echo -n "\"${key}\":\"${value}\", ";
	done
	echo "},";
	

done 10<"${CSV_FILE}"

echo "]";

exit 0;


