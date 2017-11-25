import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import PropTypes from "prop-types";
import Conference from "./Conference";
import RealGame from "./game/RealGame";
import shared from "../Shared";
import DragGame from "./game/DragGame";
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class BracketClass extends React.Component {

	// get game properties object to send to a RealGame or DragGame component
	getGameProps(bracket, conference, round, gameNumber) {
		return {
			game: bracket[conference].rounds[round][gameNumber],
			conference: conference,
			round: round,
			gameNumber: gameNumber,
		};
	}

	render() {
		if (!this.props.tournament || (!this.props.realBracket && !this.props.myPicks)) {
			return false;
		}

		const useBracket = this.props.realBracket ? this.props.tournament.conferences : this.props.myPicks;
		const finalsGame10 = this.getGameProps(useBracket, Conference.CONFERENCES.FINALS, 1, 0);
		const finalsGame11 = this.getGameProps(useBracket, Conference.CONFERENCES.FINALS, 1, 1);
		const finalsGame20 = this.getGameProps(useBracket, Conference.CONFERENCES.FINALS, 2, 0);
		return (
			<div className="bracketTopContainer">
				<div className="roundTitles" key="titles">
					{
						[1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1]
							.map((r, i) => {
								const round = shared.funcs.getRoundInfo(r);
								const roundName = round.length ? round[0].name : '';
								const roundDate = round.length ? round[0].date.split('T')[0] : String.fromCharCode(0x200b);

								return (
									<div className="roundTitle" key={`roundTitle${roundName}${i}`}>
										<div key="round">{roundName}</div>
										<div key="date">{roundDate}</div>
									</div>
								)
							})
					}
				</div>
				<div className="bracketContainer">
					<div className="bracketContainerLeft" key="left">
						<Conference conference={Conference.CONFERENCES.TOP_LEFT} realBracket={this.props.realBracket}/>
						<Conference conference={Conference.CONFERENCES.BOTTOM_LEFT} realBracket={this.props.realBracket}/>
					</div>
					<div className="bracketContainerMiddle" key="middle">
						<div className="conferenceContainer">
							<div className="roundsContainer">
								{this.props.realBracket ? <RealGame {...finalsGame10}/> : <DragGame {...finalsGame10}/>}
								{this.props.realBracket ? <RealGame {...finalsGame20}/> : <DragGame {...finalsGame20}/>}
								{this.props.realBracket ? <RealGame {...finalsGame11}/> : <DragGame {...finalsGame11}/>}
							</div>
						</div>
					</div>
					<div className="bracketContainerRight" key="right">
						<Conference conference={Conference.CONFERENCES.TOP_RIGHT} realBracket={this.props.realBracket}/>
						<Conference conference={Conference.CONFERENCES.BOTTOM_RIGHT} realBracket={this.props.realBracket}/>
					</div>
				</div>
			</div>
		);
	}
}

BracketClass.PropTypes = {
	// == Props == //
	// true if this the real bracket to edit for played games, false if someone is editing their own bracket
	realBracket: PropTypes.bool.isRequired,

	// if doing my bracket then this is their picks, otherwise it's the real bracket
	myPicks: PropTypes.object,

	// == STORE == //
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

export default DragDropContext(HTML5Backend)(Bracket);
