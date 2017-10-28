import React from "react";
import PropTypes from "prop-types";
import reducers from "../../Reducers";
import {connect} from "react-redux";
import shared from "../../Shared";
import DragTeam from "./DragTeam";

// drag and drop game for editing your bracket
class DragGameClass extends React.Component {
	render() {
		const realGame = this.props.tournament.conferences[this.props.conference].rounds[this.props.round][this.props.gameNumber];

		const pickedTeam = this.props.game.winningTeamId ? shared.funcs.getTeam(this.props.game.winningTeamId) : false;
		let team = false;
		if (this.props.game.teamId) {
			team = shared.funcs.getTeam(this.props.game.teamId);
		} else if (pickedTeam) {
			team = pickedTeam;
		}
		const teamProps = team ? {
			conference: this.props.conference,
			round: this.props.round,
			gameNumber: this.props.gameNumber,
			team: team,
		} : false;

		if (teamProps && realGame.winningTeamId) {
			teamProps.isCorrect = realGame.winningTeamId === teamProps.team.teamId;
		}

		return (
			<div className={`dragGameContainer ${team.name ? 'game' : ''}`}>
				<div className={`dragTeamsContainer ${team.name ? '' : 'game'}`}>
					{teamProps ? <DragTeam {...teamProps}/> : false}
				</div>
			</div>
		);
	}
}

DragGameClass.PropTypes = {
	// which conference this game is in (Conference.CONFERENCES... constants)
	conference: PropTypes.string.isRequired,
	// which round is the game in
	round: PropTypes.number.isRequired,
	// which game number in the group of games is this?
	gameNumber: PropTypes.number.isRequired,

	// information about this game (first round games have different information)
	game: PropTypes.object.isRequired,

	// -- STORE -- //
	// the bracket edit object from the store
	bracket: PropTypes.object.isRequired,

	// -- DISPATCHERS -- //
	// a drag started on this game
	startCellDrag: PropTypes.func.isRequired,
};

const DragGame = connect(
	state => state,
	dispatch => {
		return {
			startCellDrag: (conference, round, gameNumber) => dispatch({type: reducers.ACTION_TYPES.BRACKET.START_DRAG, payload: {conference: conference, round: round, gameNumber: gameNumber}}),
		}
	},
)(DragGameClass);

export default DragGame;