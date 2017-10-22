import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import PropTypes from "prop-types";
import Conference from "./Conference";
import Game from "./Game";
import shared from "../Shared";

class BracketClass extends React.Component {
	constructor(props) {
		super(props);

		if (!this.props.tournament) {
			shared.funcs.getCurrentTournament();
		}
	}
	render() {
		return !this.props.tournament ? false: <div className="bracketContainer">
			<div className="bracketContainerLeft" key="left">
				<Conference conference={Conference.CONFERENCES.TOP_LEFT}/>
				<Conference conference={Conference.CONFERENCES.BOTTOM_LEFT}/>
			</div>
			<div className="bracketContainerMiddle" key="middle">
				<div className="conferenceContainer">
					<div className="roundsContainer">
						<Game round={6} gameNumber={0}/>
						<Game round={7} gameNumber={0}/>
						<Game round={6} gameNumber={1}/>
					</div>
				</div>
			</div>
			<div className="bracketContainerRight" key="right">
				<Conference conference={Conference.CONFERENCES.TOP_RIGHT}/>
				<Conference conference={Conference.CONFERENCES.BOTTOM_RIGHT}/>
			</div>
		</div>;
	}
}

BracketClass.PropTypes = {
	// is this the real bracket being edited?
	isReal: PropTypes.bool.isRequired,
	// the logged in user
	user: PropTypes.object.isRequired,
};

// withRouter required so that routing isn't blocked: https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
const Bracket = withRouter(connect(
	state => state,
	dispatch => {
		return {}
	},
)(BracketClass));

export default Bracket;
