import React from "react";
import store from "./Store.js";
import reducers from "./Reducers.js";
import $ from "jquery";
import jsLogging from 'dts-js-logging';

const shared = {
	funcs: {
		/**
		 * adds csrf to data packet. useful for ajax calls.
		 * @param data your data to which the csrf name/token will be added. can be false/null/blank
		 */
		csrf: data => {
			const csrf = store.getState().csrf;
			return csrf ? Object.assign({[csrf.name]: csrf.token}, data ? data : {}) : data;
		},

		/**
		 * add csrf token to url
		 *
		 * @param url the url
		 * @return {string} url w/ token
		 */
		csrfUrl: url => {
			const csrf = store.getState().csrf;
			return csrf ? `${url}${url.includes('?') ? '&' : '?'}${csrf.name}=${csrf.token}` : url;
		},

		startAjax: () => store.dispatch({type: reducers.ACTION_TYPES.SET_AJAXING, payload: true,}),
		stopAjax: () => store.dispatch({type: reducers.ACTION_TYPES.SET_AJAXING, payload: false}),
		ajaxFail: () => false /*console.error(arguments)*/,

		/**
		 * make an ajax call; takes care of ajaxing flag setting and error logging
		 *
		 * @param url - the url to call
		 * @param method - POST / GET
		 * @param data - js object of the data to send
		 * @param callback - function to get the results of the ajax call
		 * @param isRequestBody if true then sends as json string instead of data packet
		 * @param isRefreshCsrf is this the csrf fetch call? all other calls will be queued for later
		 */
		ajax: (method, url, data, callback, isRequestBody, isRefreshCsrf, doNotUseCsrf) => {
			// wait for csrf to complete before actually performing the request
			if (isRefreshCsrf || shared.vars.csrfComplete) {
				shared.funcs.startAjax();

				$.ajax({
					type: method,
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					url: doNotUseCsrf ? url : shared.funcs.csrfUrl(url),
					data: doNotUseCsrf ? data : (isRequestBody ? JSON.stringify(shared.funcs.csrf(data)) : shared.funcs.csrf(data)),
					cache: false,
					success: callback,
					error: shared.funcs.ajaxFail,
					complete: shared.funcs.stopAjax,
				});
			} else {
				shared.vars.delayAjaxes.push([method, url, data, callback, isRequestBody]);
			}
		},

		// get csrf token for posting
		refreshCsrf: callback => {
			shared.funcs.ajax('GET', 'ws/csrf/get', {},
				csrf => {
					jsLogging({url: 'log/error.json', csrfName: csrf.parameterName, csrfToken: csrf.token,});

					store.dispatch({type: reducers.ACTION_TYPES.SET_CSRF, payload: {name: csrf.parameterName, token: csrf.token}});
					if (callback) {
						callback();
					}
				}, false, true);
		},

		// who is currently logged in?
		getCurrentUser: () => {
			shared.funcs.ajax('POST', 'ws/user/current', {},
				user => store.dispatch({type: reducers.ACTION_TYPES.SET_USER, payload: user}));
		},

		getCurrentTournament: () => shared.funcs.ajax('GET', 'ws/tournament/current', {}, tournament => store.dispatch({type: reducers.ACTION_TYPES.SET_TOURNAMENT, payload: tournament})),

		// app has started, get some basic information
		startup: () => {
			// load csrf
			shared.vars.csrfComplete = false;
			shared.funcs.refreshCsrf(() => {
				shared.vars.csrfComplete = true;
				shared.vars.delayAjaxes.forEach(args => shared.funcs.ajax(...args));
				shared.vars.delayAjaxes = [];

				// get user information
				shared.funcs.getCurrentUser();
			});
		},
	},
	vars: {
		// has csrf been fetched?
		csrfComplete: false,
		// ajaxes to call when csrf is gathered
		delayAjaxes: [],
	},
};

export default shared;