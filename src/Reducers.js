import React from "react";
import moment from "moment";

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
			SET_FIELD: 'TOURNAMENT',
			SET_EDITING_TOURNAMENT: 'SET_EDITING_TOURNAMENT',
		}
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

reducers[reducers.ACTION_TYPES.TOURNAMENT.SET_FIELD] = (state, action) => {
	const result = Object.assign({}, state);
	// assumes editing tournament is already loaded
	result.tournamentEdit.tournament = Object.assign({}, result.tournamentEdit.tournament);
	result.tournamentEdit.tournament[action.field] = action.value;
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

export default reducers;