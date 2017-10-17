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
		return <Route render={({history}) => <a href="#" onClick={e => {
			e.preventDefault();
			e.stopPropagation();
			history.push(this.props.url);
		}} className={`${this.props.isCurrent ? 'current' : ''} ${this.props.isUser ? 'account' : ''}`}>{this.props.title}</a>}/>;
	}
}
MenuItem.defaultProps = {
	isUser: false,
	isCurrent: false,
};

MenuItem.PropTypes = {
	url: PropTypes.string.isRequired,
	isCurrent: PropTypes.bool,
	title: PropTypes.string.isRequired,
	// is this the user menu item
	isUser: PropTypes.bool,
};

class AppClass extends React.Component {
	componentDidMount() {
		shared.funcs.startup();
	}

	render() {

		let admin = [];
		if (this.props.user && this.props.user.isAdmin) {
			admin = admin.concat([
				<MenuItem key="tournament" url="tournament" title="Tournament"/>,
				<MenuItem key="reports" url="reports" title="Reports"/>,
			]);
		}
		return (
			<div id="app">
				<div id="title">Fantasy Bracket</div>

				<div id="appBody">
					<div id="navigation">
						{this.props.user ? <MenuItem key="account" isUser={true} url="/account" title={this.props.user ? `${this.props.user.firstName} ${this.props.user.lastName}` : ''}/>: false}
						<MenuItem account="home" url="./" title="Home" isCurrent={true}/>
						<MenuItem key="myBracket" url="bracket" title="My Bracket"/>
						<MenuItem key="realBracket" url="realBracket" title="Real Bracket"/>
						{admin}
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
