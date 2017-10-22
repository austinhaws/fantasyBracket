import React from "react";
import PropTypes from "prop-types";
import reducers from "../Reducers";
import {connect} from "react-redux";


class GameClass extends React.Component {
	render() {
		const dragged = this.props.bracket.draggedGame
			&& this.props.conference === this.props.bracket.draggedGame.conference
			&& this.props.round === this.props.bracket.draggedGame.round
			&& this.props.gameNumber === this.props.bracket.draggedGame.gameNumber;
		const droppable = this.props.bracket.droppableGames && this.props.bracket.droppableGames.filter(d =>
			this.props.conference === d.conference
			&& this.props.round === d.round
			&& this.props.gameNumber === d.gameNumber).length;

		return <div
			className={`game ${dragged ? 'dragged' : ''} ${droppable ? 'droppable' : ''}`}
			onMouseDown={() => this.props.startCellDrag(this.props.conference, this.props.round, this.props.gameNumber)}>
				{`${this.props.round}-${this.props.gameNumber}`}
			</div>;
	}
}

GameClass.PropTypes = {
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

const Game = connect(
	state => state,
	dispatch => {
		return {
			startCellDrag: (conference, round, gameNumber) => dispatch({type: reducers.ACTION_TYPES.BRACKET.START_DRAG, payload: {conference: conference, round: round, gameNumber: gameNumber}}),
		}
	},
)(GameClass);

export default Game;