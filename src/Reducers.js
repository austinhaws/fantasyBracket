import React from "react";

let reducers = {
	ACTION_TYPES: {
		// == Generic == //
		// set ajaxing start/stop
		SET_AJAXING: 'SET_AJAXING',

		// CSRF Token information: name, token
		SET_CSRF: 'SET_CSRF',

		// set the list of projects this user can deploy
		SET_PROJECTS: 'SET_PROJECTS',

		// set the current logged in user information
		SET_USER: 'SET_USER',


		// == home dashboard == //
		HOME: {
			// the deploy list to show on the front page
			SET_DEPLOYS: 'SET_DEPLOYS',
		},


		// == deploy editing == //
		DEPLOY: {
			// set the currently edited deploy object
			SET_DEPLOY: 'SET_DEPLOY',

			// change a field on deploy being edited
			SET_DEPLOY_FIELD_VALUE: 'SET_DEPLOY_FIELD_VALUE',
		},

		HISTORY: {
			SET_SEARCH_FIELD: 'SET_SEARCH_FIELD',
			CLEAR_SEARCH: 'CLEAR_SEARCH',
			SET_HISTORIES: 'SET_HISTORIES',
		},

		APPS: {
			SET_APPS: 'SET_APPS',
			SET_SEARCH: 'SET_SEARCH',
			DELETE_APP: 'DELETE_APP',
			SET_APP_FIELD: 'SET_APP_FIELD',
			SET_APP: 'SET_APP',
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

reducers[reducers.ACTION_TYPES.HOME.SET_DEPLOYS] = (state, action) => {
	const result = Object.assign({}, state);
	result.home = Object.assign({}, state.home);
	result.home.activeDeploys = action.payload;
	return result;
};

reducers[reducers.ACTION_TYPES.DEPLOY.SET_DEPLOY] = (state, action) => {
	const result = Object.assign({}, state);
	result.deploy = Object.assign({}, state.deploy);
	result.deploy.deploy = action.payload ? Object.assign({}, action.payload) : action.payload;
	return result;
};

// action is an array of objects: {field: fieldName, value: newValue}
reducers[reducers.ACTION_TYPES.DEPLOY.SET_DEPLOY_FIELD_VALUE] = (state, action) => {
	const result = Object.assign({}, state);
	result.deploy = Object.assign({}, result.deploy);
	action.payload.forEach(a => result.deploy.deploy[a.field] = a.value);
	return result;
};

reducers[reducers.ACTION_TYPES.SET_PROJECTS] = (state, action) => {
	const result = Object.assign({}, state);
	result.projects = action.payload;
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

reducers[reducers.ACTION_TYPES.HISTORY.SET_SEARCH_FIELD] = (state, action) => {
	const result = Object.assign({}, state);
	result.history = Object.assign({}, result.history);
	result.history.search = Object.assign({}, result.history.search);
	result.history.search[action.payload.field] = action.payload.value;
	return result;
};

reducers[reducers.ACTION_TYPES.HISTORY.CLEAR_SEARCH] = (state, action) => {
	const result = Object.assign({}, state);
	result.history = Object.assign({}, result.history);
	result.history.search = Object.assign({}, result.history.searchDefault);
	result.history.histories = [];
	return result;
};

reducers[reducers.ACTION_TYPES.HISTORY.SET_HISTORIES] = (state, action) => {
	const result = Object.assign({}, state);
	result.history = Object.assign({}, result.history);
	result.history.histories = action.payload;
	return result;
};

reducers[reducers.ACTION_TYPES.APPS.SET_APPS] = (state, action) => {
	const result = Object.assign({}, state);
	result.apps = Object.assign({}, result.apps);
	result.apps.apps = action.payload;
	return result;
};

reducers[reducers.ACTION_TYPES.APPS.SET_SEARCH] = (state, action) => {
	const result = Object.assign({}, state);
	result.apps = Object.assign({}, result.apps);
	result.apps.search = action.payload;
	return result;
};

reducers[reducers.ACTION_TYPES.APPS.DELETE_APP] = (state, action) => {
	const result = Object.assign({}, state);
	result.apps = Object.assign({}, result.apps);
	result.apps.apps = result.apps.apps.filter(a => a.applicationInfoPk !== action.payload);
	return result;
};

reducers[reducers.ACTION_TYPES.APPS.SET_APP_FIELD] = (state, action) => {
	const result = Object.assign({}, state);
	result.apps = Object.assign({}, result.apps);
	result.apps.editing = Object.assign({}, result.apps.editing);
	result.apps.editing[action.payload.field] = action.payload.value;
	return result;
};

reducers[reducers.ACTION_TYPES.APPS.SET_APP] = (state, action) => {
	const result = Object.assign({}, state);
	result.apps = Object.assign({}, result.apps);
	result.apps.editing = action.payload;
	return result;
};

export default reducers;