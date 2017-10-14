import React from "react";
import store from "../Store.jsx";
import reducers from "../Reducers.jsx";
import shared from "../Shared.jsx";

function safeLowerCase(s) {
	return s ? s.toLowerCase() : '';
}

const appsShared = {
	funcs: {
		// get current deploys list
		ajaxApplicationList: () => {
			shared.funcs.ajax('GET', 'ws/application/all', {},
				apps => {
					if (appsShared.vars.tableSorter) {
						appsShared.vars.tableSorter.sort(apps);
					}
					apps.forEach(a => a.search = safeLowerCase(a.department) + safeLowerCase(a.name) + safeLowerCase(a.type));

					store.dispatch({type: reducers.ACTION_TYPES.APPS.SET_APPS, payload: apps,});
				});
		},

		deleteApplicationInfo: applicationInfoPk => shared.funcs.ajax('POST', `ws/application/delete/${applicationInfoPk}`, {}, () => store.dispatch({type: reducers.ACTION_TYPES.APPS.DELETE_APP, payload: applicationInfoPk})),

		getApp: applicationInfoPk => shared.funcs.ajax('GET', `ws/application/get/${applicationInfoPk}`, {}, app => store.dispatch({type: reducers.ACTION_TYPES.APPS.SET_APP, payload: app})),

		saveApp: (app, history) => shared.funcs.ajax('POST', 'ws/application/update', app, () => history.push('/html/apps'), true),
	},

	vars: {
		tableSorter: false,
	},
};

export default appsShared;