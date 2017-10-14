import React from "react";
import store from "../Store.jsx";
import reducers from "../Reducers.jsx";
import shared from "../Shared.jsx";

const homeShared = {
	funcs: {
		// get current deploys list
		ajaxCurrentDeploys: () => {
			shared.funcs.ajax('POST', 'ws/deploy/all', {},
				deploys => {
					deploys.forEach(d => {
						d.deployStatusDate = d.deployDate ? d.deployDate : d.statusDate;
						d.developerSimple = d.developer.split('@')[0];
						d.deployNow = d.deployNow === 'Yes';
					});

					// <Table> tells what the current sorter is so that when it gets results back it can sort as the table expects
					// before putting new data in the table; otherwise the data would go in to the table unsorted yet the table
					// header shows it should be sorted
					if (homeShared.vars.tableSorter) {
						homeShared.vars.tableSorter.sort(deploys);
					}

					store.dispatch({type: reducers.ACTION_TYPES.HOME.SET_DEPLOYS, payload: deploys,});
				});
		},
	},

	vars: {
		tableSorter: false,
	},
};

export default homeShared;