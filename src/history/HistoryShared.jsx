import React from "react";
import store from "../Store.jsx";
import reducers from "../Reducers.jsx";
import shared from "../Shared.jsx";

const historyShared = {
	funcs: {
		// get current deploys list
		searchHistory: search => shared.funcs.ajax('POST', 'ws/history/search', search, histories => {
			if (historyShared.vars.tableSorter) {
				historyShared.vars.tableSorter.sort(histories);
			}
			store.dispatch({type: reducers.ACTION_TYPES.HISTORY.SET_HISTORIES, payload: histories})
		}, true),
	},

	vars: {
		tableSorter: false,
	},
};

export default historyShared;