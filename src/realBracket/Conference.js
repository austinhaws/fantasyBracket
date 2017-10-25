import React from "react";
import PropTypes from "prop-types";
import Round from "./Round";
import {connect} from "react-redux";
import store from "../Store";


class ConferenceClass extends React.Component {

	constructor(props) {
		super(props);
		this.conference = store.getState().tournament.conferences[this.props.conference];
	}

	render() {
		return (
			<div className="conferenceContainer">
				<div className="roundsContainer">
					{Object.keys(this.conference.rounds).map(i => <Round conference={this.props.conference} round={parseInt(i, 10)} key={`round-${i}`} games={this.conference.rounds[i]}/>)}
				</div>
			</div>
		);
	}
}

ConferenceClass.PropTypes = {
	// which conference is this? use Conference.CONFERENCES... constants
	conference: PropTypes.string.isRequired,
};

const Conference = connect(
	state => state,
	dispatch => {
		return {}
	},
)(ConferenceClass);

Conference.CONFERENCES = {
	"TOP_LEFT": "topLeft",
	"BOTTOM_LEFT": "bottomLeft",
	"TOP_RIGHT": "topRight",
	"BOTTOM_RIGHT": "bottomRight",
	"FINALS": "finals",
};

export default Conference;