import React from "react";
import {connect} from "react-redux";
import {Route, withRouter} from "react-router";
import PropTypes from "prop-types";
import shared from "../Shared";
import {Button, InputInformation} from "dts-react-common";
import Conference from "../realBracket/Conference";

class GameEditClass extends React.Component {
	constructor(props) {
		super(props);

		if (!this.props.tournament) {
			shared.funcs.getCurrentTournament();
		}
	}

	render() {
		if (!this.props.tournament) {
			return false;
		}
		// get previous game winner
		if (this.props.conference === Conference.CONFERENCES.FINALS) {
			throw 'do not know what conference the previous teams came from...';
		}
		const previousGame1Info = {
			conference: this.props.conference,
			round: this.props.round - 1,
			gameNumber: this.props.gameNumber * 2,
		};
		const previousGame1 = shared.funcs.getGame(previousGame1Info);

		const previousGame2Info = {
			conference: this.props.conference,
			round: this.props.round - 1,
			gameNumber: this.props.gameNumber * 2 + 1,
		};
		const previousGame2 = shared.funcs.getGame(previousGame2Info);

		const gameInfo = {
			conference: this.props.conference,
			round: this.props.round,
			gameNumber: this.props.gameNumber,
		};
		const game = shared.funcs.getGame(gameInfo);

		// get teams from previous round
		// show teams and information
console.log(previousGame1, previousGame2, game);
		return (
			<div className="editorContainer">
				<div className="inputs">
					<div key="title" className="title">{`${this.props.tournament.conferences[gameInfo.conference]} - Round ${gameInfo.round} - Game ${gameInfo.gameNumber}`}</div>
				</div>

				<Route render={({history}) => (
					<div className="buttonContainer">
						<Button key="cancel" label="Cancel" clickedCallback={() => history.push('./')} color={Button.BACKGROUND_COLOR.BLUE_LIGHTTONE} size={InputInformation.SIZE_SMALL}/>
						<Button key="save" label="Save" clickedCallback={() => this.saveTournament(history)} color={Button.BACKGROUND_COLOR.GREEN_LIGHTTONE} size={InputInformation.SIZE_SMALL}/>
					</div>
				)}/>
			</div>
		);
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
