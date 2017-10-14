import React from "react";
import {createStore} from "redux";
import reducers from "./Reducers.js";

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
		},

		// count of outstanding ajax requests
		ajaxingCount: 0,

		// the csrf token/name
		csrf: {
			name: '',
			token: '',
		},

		// current logged in user
		user: false,
	}

	// for chrome redux plugin
	, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;