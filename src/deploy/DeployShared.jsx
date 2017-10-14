import React from "react";
import store from "../Store.jsx";
import reducers from "../Reducers.jsx";
import shared from "../Shared.jsx";

const deployShared = {
	funcs: {
		// get a specific deploy
		getDeploy: deployPk => {
			shared.funcs.ajax('GET', `ws/deploy/${deployPk}`, {},
				deploy => {
					store.dispatch({type: reducers.ACTION_TYPES.DEPLOY.SET_DEPLOY, payload: deploy});
				});
		},

		// create a new deploy on the server
		createDeploy: (deploy, history) => shared.funcs.ajax('POST', 'ws/deploy/create', deploy, () => history.push('/'), true),

		// send a deploy to be deployed (admin)
		sendDeploy: (deploy, history) => shared.funcs.ajax('POST', `ws/deploy/deploy/${deploy.deployPk}`, {}, () => history.push('/')),

		deleteDeploy: (deployPk, history) => shared.funcs.ajax('POST', `ws/deploy/delete/${deployPk}`, {}, () => history.push('/')),
	},

	vars: {
		tableSorter: false,
	},
};

export default deployShared;