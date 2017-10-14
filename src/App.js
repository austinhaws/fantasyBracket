import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import * as ReactDOM from "react-dom";
import {connect, Provider} from "react-redux";
import PropTypes from "prop-types";
import {withRouter} from "react-router";
import store from './Store.js';
import shared from './Shared.js';
import Home from './home/Home.js';


class MenuItem extends React.Component {
	render() {
		return <a href={this.props.url} className={this.props.isCurrent ? 'current' : ''}>{this.props.title}</a>;
	}
}

MenuItem.PropTypes = {
	url: PropTypes.string.isRequired,
	isCurrent: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
};

class AppClass extends React.Component {
	componentDidMount() {
		shared.funcs.startup();
	}

	render() {

		return (
			<div id="app">
				<div id="title">Fantasy Bracket</div>

				<div id="appBody">
					<div id="navigation">
						{this.props.user ? <MenuItem url="/account" title={this.props.user ? `${this.props.user.firstName} ${this.props.user.lastName}` : ''} isCurrent={false}/>: false}
						<MenuItem url="/" title="Home" isCurrent={true}/>
						<MenuItem url="/bracket" title="My Bracket" isCurrent={false}/>
						<MenuItem url="/realBracket" title="Real Bracket" isCurrent={false}/>
						<MenuItem url="/reports" title="Reports" isCurrent={false}/>
					</div>
					<div id="content">
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

				<div id="footer">VERSION.GOES.HERE | &copy;2017 DTS</div>
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
	dispatch => {
		return {}
	},
)(AppClass));

ReactDOM.render((<BrowserRouter basename="/fantasyBracket"><Provider store={store}><App/></Provider></BrowserRouter>), document.getElementById('react'));