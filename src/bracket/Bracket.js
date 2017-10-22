import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import PropTypes from "prop-types";


class Game extends React.Component {
	render() {
		const gameId = `game${this.props.round}-${this.props.gameNumber}`;
		return <div className="game" key={gameId}>{gameId}</div>;
	}
}

Game.PropTypes = {
	// which game in the round
	gameNumber: PropTypes.number.isRequired,
	// which round is the game in
	round: PropTypes.number.isRequired,
};

class Round extends React.Component {
	render() {
		// show games: number of games based on the round
		return <div className="roundContainer">
			{
				[...Array([16, 8, 4, 2, 1][this.props.round - 1])].map((_, i) => <Game key={i} round={this.props.round - i} gameNumber={i}/>)
			}
		</div>;
	}
}

Round.PropTypes = {
	// which round is being shown - determine show many games to show
	round: PropTypes.number.isRequired,
};

class Conference extends React.Component {
	render() {
		return (
			<div className="conferenceContainer">
				<div className="roundsContainer">
					<Round round="1" key="round1"/>
					<Round round="2" key="round2"/>
					<Round round="3" key="round3"/>
					<Round round="4" key="round4"/>
					<Round round="5" key="round5"/>
				</div>
			</div>
		);
	}
}

class BracketClass extends React.Component {
	isAdmin() {
		return !this.props.user.isAdmin;
	}

	render() {
		return <div className="bracketContainer">
			<div className="bracketContainerLeft" key="left">
				<Conference key="topLeft"/>
				<Conference key="bottomLeft"/>
			</div>
			<div className="bracketContainerMiddle" key="middle">
				<div className="conferenceContainer">
					<div className="roundsContainer">
						<Game round={6} gameNumber={1}/>
						<Game round={7} gameNumber={1}/>
						<Game round={6} gameNumber={2}/>
					</div>
				</div>
			</div>
			<div className="bracketContainerRight" key="right">
				<Conference key="topRight"/>
				<Conference key="bottomRight"/>
			</div>
		</div>;
	}
}

BracketClass.PropTypes = {
	// is this the real bracket being edited?
	isReal: PropTypes.bool.isRequired,
	// the logged in user
	user: PropTypes.object.isRequired,
};

// withRouter required so that routing isn't blocked: https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
const Bracket = withRouter(connect(
	state => state,
	dispatch => {
		return {}
	},
)(BracketClass));

export default Bracket;