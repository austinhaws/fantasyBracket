import React from "react";
import PropTypes from "prop-types";


class Game extends React.Component {
	render() {
		return <div className="game">{`${this.props.round}-${this.props.gameNumber}`}</div>;
	}
}

Game.PropTypes = {
	// information about this game (first round games have different information)
	game: PropTypes.object.isRequired,
	// which round is the game in
	round: PropTypes.number.isRequired,
	// which game number in the group of games is this?
	gameNumber: PropTypes.number.isRequired,
};

export default Game;