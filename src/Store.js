import React from "react";
import {createStore} from "redux";
import reducers from "./Reducers";

// the store to connect all components to their data
const store = createStore((state, action) => {
		// === reducers ===
		let reducer = false;

		// is reducer valid?
		if (action.type in reducers) {
			reducer = reducers[action.type];
		}

		// ignore redux/react "system" reducers
		if (!reducer && action.type.indexOf('@@') !== 0) {
			console.error('unknown reducer action:', action.type, action)
		}

		return reducer ? reducer(state, action) : state;
	}, {
		// home page
		home: {
			// which of the tournament's dates is the next upcoming event
			nextDateIndex: false,
			// converted dates to moment dates; keeps data in natural format for saving, but can uses moment for easier processing
			upcomingDates: false,
		},

		// count of outstanding ajax requests
		ajaxingCount: 0,

		// the csrf token/name
		csrf: {
			name: '',
			token: '',
		},

		tournamentEdit: {
			tournament: false,
		},

		// current logged in user
		user: false,

		// the current tournament
		tournament: undefined,
	}

	// for chrome redux plugin
	, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;