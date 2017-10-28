import React from "react";

const bracketShared = {
	funcs: {
		pickTeamToGame: (team, conference, round, gameNumber) => {
			// send to the server that a specific team is picked to play in a certain game
			// the server will then put that team in this person's bracket in to that position
		},
	},
	vars: {},
};

export default shared;
