import React from "react";
import PropTypes from "prop-types";
import reducers from "../../Reducers";
import {connect} from "react-redux";
import shared from "../../Shared";
import DragTeam from "./DragTeam";

// drag and drop game for editing your bracket
class DragGameClass extends React.Component {
	teamName(team) {
		return team ? `${team.name} (${team.rank})` : false;
	}
	render() {
		const game = shared.funcs.getGame(this.props);

		const team = shared.funcs.getTeam(game.teamId);
		const teamTop = shared.funcs.getTeam(game.topTeamId);
		const teamBottom = shared.funcs.getTeam(game.bottomTeamId);

		return (
			<div className="dragGameContainer game">{
				team.name ?
					<DragTeam {...Object.assign({team: team}, this.props)}/>
					: (
						<div className="dragTeamsContainer">
							<DragTeam {...Object.assign({team: teamTop}, this.props)}/>
							<DragTeam {...Object.assign({team: teamBottom}, this.props)}/>
						</div>
					)
			}</div>
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