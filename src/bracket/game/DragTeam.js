import React from "react";
import PropTypes from "prop-types";
import reducers from "../../Reducers";
import {connect} from "react-redux";

// drag and drop game for editing your bracket
class DragTeamClass extends React.Component {
	teamName(team) {
		return (team && team.name) ? `${team.name} (${team.rank})` : false;
	}

	startDrag() {
		this.props.startCellDrag(this.props);
	}

	render() {
		let statusClass = '';
		if (this.props.isCorrect === true) {
			statusClass = 'correct';
		} else if (this.props.isCorrect === false) {
			statusClass = 'incorrect';
		}
		return <div className={statusClass} onMouseDown={this.startDrag.bind(this)}>{this.teamName(this.props.team)}</div>;
	}
}

DragTeamClass.PropTypes = {
	team: PropTypes.object.isRequired,

	// which conference this game is in (Conference.CONFERENCES... constants)
	conference: PropTypes.string.isRequired,
	// which round is the game in
	round: PropTypes.number.isRequired,
	// which game number in the group of games is this?
	gameNumber: PropTypes.number.isRequired,

	// used for styling: true = this is a correct pick; false = this is not a correct pick; undefined means it is not yet decided
	isCorrect: PropTypes.bool,


	// -- DISPATCHERS -- //
	// a drag started on this game
	startCellDrag: PropTypes.func.isRequired,
};

const DragTeam = connect(
	state => state,
	dispatch => {
		return {
			startCellDrag: ({conference, round, gameNumber, team}) => dispatch({type: reducers.ACTION_TYPES.BRACKET.START_DRAG, payload: {conference: conference, round: round, gameNumber: gameNumber, team: team}}),
		}
	},
)(DragTeamClass);

export default DragTeam;