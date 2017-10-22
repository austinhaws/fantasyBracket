import React from "react";
import {connect} from "react-redux";
import {Route, withRouter} from "react-router";
import PropTypes from "prop-types";
import shared from "../Shared";
import {Button, InputInformation} from "dts-react-common";

class GameEditClass extends React.Component {
	constructor(props) {
		super(props);

		if (!this.props.tournament) {
			shared.funcs.getCurrentTournament();
		}
	}
	render() {
		return !this.props.tournament ? false: <div className="editorContainer">
			<div className="inputs">
				<div key="title" className="title">{`${this.props.tournament.conferences[this.props.conference]} - Round ${this.props.round} - Game ${this.props.gameNumber}`}</div>
			</div>

			<Route render={({history}) => (
				<div className="buttonContainer">
					<Button key="cancel" label="Cancel" clickedCallback={() => history.push('./')} color={Button.BACKGROUND_COLOR.BLUE_LIGHTTONE} size={InputInformation.SIZE_SMALL}/>
					<Button key="save" label="Save" clickedCallback={() => this.saveTournament(history)} color={Button.BACKGROUND_COLOR.GREEN_LIGHTTONE} size={InputInformation.SIZE_SMALL}/>
				</div>
			)}/>
		</div>;
	}
}

GameEditClass.PropTypes = {
	// uses Conference.CONFERENCES... constants
	conference: PropTypes.string.isRequired,
	// which round of the conference
	round: PropTypes.number.isRequired,
	// which game in that round
	gameNumber: PropTypes.number.isRequired,
};

// withRouter required so that routing isn't blocked: https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
const GameEdit = withRouter(connect(
	state => state,
	dispatch => {
		return {}
	},
)(GameEditClass));

export default GameEdit;
