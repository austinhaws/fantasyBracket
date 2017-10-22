import React from "react";
import PropTypes from "prop-types";
import Game from "./Game";


class Round extends React.Component {
	render() {
		// show games: number of games based on the round
		return <div className="roundContainer">
			{this.props.games.map((g, i) => <Game key={`${this.props.round}-${i}`} round={this.props.round} game={g} gameNumber={i}/>)}
		</div>;
	}
}

Round.PropTypes = {
	// which round is being shown - determine show many games to show
	round: PropTypes.number.isRequired,
	// the games being played this round (should be 5 long)
	games: PropTypes.array.isRequired,
};

export default Round;