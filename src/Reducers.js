import React from "react";
import moment from "moment";
import Conference from "./bracket/Conference";

// !!!!  Be careful that no names match  !!! //
let reducers = {
	ACTION_TYPES: {
		// == Generic == //
		// set ajaxing start/stop
		SET_AJAXING: 'SET_AJAXING',

		// CSRF Token information: name, token
		SET_CSRF: 'SET_CSRF',

		// set the current logged in user information
		SET_USER: 'SET_USER',

		SET_TOURNAMENT: 'SET_TOURNAMENT',

		TOURNAMENT: {
			SET_DATE_FIELD: 'SET_DATE_FIELD',
			SET_EDITING_TOURNAMENT: 'SET_EDITING_TOURNAMENT',
		},
		BRACKET: {
			// clicked on a game and started dragging
			START_DRAG: 'START_DRAG',
		},
	}
};

/*
 !! make sure to always create a copy of state instead of manipulating state directly
 action = {
 type: constant action name (required),
 error: error information (optional),
 payload: data for action (optional),
 meta: what else could you possibly want? (optional)
 }
 */

// set ajaxing state for the spinner to show
// payload: boolean true for an ajax began, false an ajax ended
reducers[reducers.ACTION_TYPES.SET_AJAXING] = (state, action) => {
	const result = Object.assign({}, state);
	result.ajaxingCount += action.payload ? 1 : -1;
	return result;
};

reducers[reducers.ACTION_TYPES.SET_CSRF] = (state, action) => {
	const result = Object.assign({}, state);
	result.csrf = action.payload;
	return result;
};

reducers[reducers.ACTION_TYPES.SET_USER] = (state, action) => {
	const result = Object.assign({}, state);
	result.user = action.payload;
	return result;
};

reducers[reducers.ACTION_TYPES.SET_TOURNAMENT] = (state, action) => {
	const result = Object.assign({}, state);
	result.tournament = action.payload;

	// load extra info like next upcoming date
	result.home.nextDateIndex = 0;
	const today = moment();
	result.home.upcomingDates = result.tournament.dates.map(d => {
		const momentDate = moment(d.date);
		return {
			name: d.name,
			momentDate: momentDate,
			afterToday: today.isBefore(momentDate),
		};
	});
	result.home.nextDateIndex = result.home.upcomingDates.reduce((result, d, i) => (result === false && d.afterToday) ? i : result, false);

	return result;
};

reducers[reducers.ACTION_TYPES.TOURNAMENT.SET_DATE_FIELD] = (state, action) => {
	const result = Object.assign({}, state);
	// assumes editing tournament is already loaded
	result.tournamentEdit = Object.assign({}, result.tournamentEdit);
	result.tournamentEdit.tournament = Object.assign({}, result.tournamentEdit.tournament);
	result.tournamentEdit.tournament.dates = result.tournamentEdit.tournament.dates.map(d => Object.assign({}, d));
	result.tournamentEdit.tournament.dates[action.payload.index].date = action.payload.value;
	return result;
};

reducers[reducers.ACTION_TYPES.TOURNAMENT.SET_EDITING_TOURNAMENT] = (state, action) => {
	const result = Object.assign({}, state);
	result.tournamentEdit.tournament = Object.assign({}, action.payload);
	result.tournamentEdit.tournament.dates = result.tournamentEdit.tournament.dates.map(d => {
		d.date = d.date.split('T')[0];
		return d;
	});
	return result;
};

reducers[reducers.ACTION_TYPES.BRACKET.START_DRAG] = (state, action) => {
	const result = Object.assign({}, state);
	// quick and dirty full object deep copy
	result.bracket = JSON.parse(JSON.stringify(result.bracket));
	result.bracket.draggedGame = action.payload;
	result.bracket.droppableGames = [];
	let gameNumber = action.payload.gameNumber;
	for (let x = action.payload.round + 1; x < 8; x++) {
		const conference = x >= 6 ? Conference.CONFERENCES.FINALS : action.payload.conference;
		if (x === 6 && (
				action.payload.conference === Conference.CONFERENCES.TOP_RIGHT ||
				action.payload.conference === Conference.CONFERENCES.BOTTOM_RIGHT
			)) {
			gameNumber = 1;
		} else {
			gameNumber = Math.floor(gameNumber /= 2);
		}
		result.bracket.droppableGames.push({
			conference: conference,
			round: x,
			gameNumber: gameNumber,
		})
	}
	return result;
};

export default reducers;