import React from "react";
import {createStore} from "redux";
import reducers from "./Reducers.jsx";

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
			// === default data ===
			// the current deploys in the queue
			activeDeploys: [],
		},

		// deploy page
		deploy: {
			// the deploy record current being edited or false for none
			deploy: false,
		},

		// history search page
		history: {
			// current found histories
			histories: [],
			search: {
				deployType: '',
				applicationInfoPk: undefined,
				developer: '',
				top: 15,
			},
			searchDefault: {
				deployType: '',
				applicationInfoPk: undefined,
				developer: '',
				top: 15,
			}
		},

		apps: {
			apps: [],
			editing: false,
		},

		// the projects this user can deploy, starts empty and fills in when ajax returns
		projects: [],

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