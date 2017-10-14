import React from "react";
import PropTypes from "prop-types";
import NavigationButton from "./NavigationButton.jsx";
import {connect} from "react-redux";
import {Route} from "react-router-dom";
import {withRouter} from "react-router";

// ==== setup react container for the report ==== //
class NavigationClass extends React.Component {
	render() {
		return <div id="buttonSection">
			<Route render={({history}) =>
				<div>
					<div className="buttonRow" key="top">
						<NavigationButton key="dev" buttonClicked={() => history.push('/html/deploy/dev')} size="med" color="purple" altText="Dev Deployments" text="DEV"/>
					</div>

					<div className="buttonRow" key="middle">
						<NavigationButton key="at" buttonClicked={() => history.push('/html/deploy/at')} size="med" color="blue" altText="AT Deployments" text="AT"/>
						<NavigationButton key="prod" buttonClicked={() => history.push('/html/deploy/prod')} size="med" color="cyan" altText="Prod Deployments" text="PROD"/>
					</div>

					<div className="buttonRow" key="bottom">
						<NavigationButton key="home" buttonClicked={() => history.push('/')} size="sm" color="purple" altText="Home" text="Home"/>
						{(this.props.user && this.props.user.isAdmin) ?
							<NavigationButton key="apps" buttonClicked={() => history.push('/html/apps')} size="sm" color="green" altText="Apps" text="Apps"/>
							: false}
						<NavigationButton key="history" buttonClicked={() => history.push('/html/history')} size="sm" color="yellow" altText="History" text="History"/>
						<NavigationButton key="logout" buttonClicked={() => window.location = 'https://login2.utah.gov/user/logoff'} size="sm" color="red" altText="Logout" text="Logout"/>
					</div>
				</div>
			}/>
		</div>;
	}
}

NavigationClass.PropTypes = {
	user: PropTypes.object.isRequired,
};

const Navigation = withRouter(connect(
	state => state,
	dispatch => {return {};},
)(NavigationClass));

export default Navigation;
