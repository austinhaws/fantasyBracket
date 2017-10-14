import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import * as ReactDOM from "react-dom";
import {connect, Provider} from "react-redux";
import PropTypes from "prop-types";
import {withRouter} from "react-router";
import store from './Store.js';
import shared from './Shared.js';
import Home from './home/Home.js';

// ==== setup react container for the report ==== //
class AppClass extends React.Component {
	componentDidMount() {
		shared.funcs.startup();
	}

	render() {

		return (
			<div id="wrapper">
				<div className="clear"></div>
				<div id="content">
{/*============================= React World =======================================*/}
					<div id="identification">
						<span className="name">{this.props.user ? `${this.props.user.firstName} ${this.props.user.lastName} ` : ''}</span>

						<span className="email">{this.props.user ? `${this.props.user.email}` : ''}</span>
					</div>

					<div id="contentBody">
						<div id="inputSection" className="middleContent">
							<Switch>
								{/*<Route path='/html/deploy/:deployPk' render={props => <DeployEditor key={props.match.params.deployPk}/>}/>*/}
								{/*<Route path='/html/history' component={History}/>*/}
								{/*<Route path='/html/apps/:applicationInfoPk' render={props => <AppEditor key={props.match.params.applicationInfoPk}/>}/>*/}
								{/*<Route path='/html/apps' component={Apps}/>*/}
								<Route component={Home}/>
							</Switch>

							{this.props.ajaxingCount ? <div id="ajaxingOverlay"/> : false}
						</div>
					</div>
{/*============================= End  React World  =================================*/}

					<div className="clear"></div>
					<div id="footer" className="site">

						<div className="versionNumber">
							VERSION.GOES.HERE
							| &copy;
							{new Date().getFullYear()}
							DTS
						</div>

						<div className="clearfix"></div>
					</div>
				</div>

			</div>
		);
	}
}

AppClass.PropTypes = {
	// the current logged in user, not required because it is undefined until it is ajax fetched
	user: PropTypes.object,

	ajaxingCount: PropTypes.number.isRequired,
};

// withRouter required so that routing isn't blocked: https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
const App = withRouter(connect(
	state => state,
	dispatch => {return {}},
)(AppClass));

ReactDOM.render((<BrowserRouter basename="/fantasyBracket"><Provider store={store}><App/></Provider></BrowserRouter>), document.getElementById('react'));
