import React from "react";
import PropTypes from "prop-types";
import RealGame from "./game/RealGame";


class Round extends React.Component {
	render() {
		// show games: number of games based on the round
		return <div className="roundContainer">
			{this.props.games.map((g, i) => <RealGame key={`${this.props.round}-${i}`} conference={this.props.conference} round={this.props.round} game={g} gameNumber={i}/>)}
		</div>;
	}
}

Round.PropTypes = {
	// in which conference contains this round
	conference: PropTypes.string.isRequired,
	// which round is being shown - determine show many games to show
	round: PropTypes.number.isRequired,
	// the games being played this round (should be 5 long)
	games: PropTypes.array.isRequired,
};

export default Round;