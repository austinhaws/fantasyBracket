import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import PropTypes from "prop-types";
import Conference from "./Conference";
import Game from "./Game";
import shared from "../Shared";

class RealBracketClass extends React.Component {
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
								)})
					}
				</div>
				<div className="bracketContainer">
					<div className="bracketContainerLeft" key="left">
						<Conference conference={Conference.CONFERENCES.TOP_LEFT}/>
						<Conference conference={Conference.CONFERENCES.BOTTOM_LEFT}/>
					</div>
					<div className="bracketContainerMiddle" key="middle">
						<div className="conferenceContainer">
							<div className="roundsContainer">
								<Game conference={Conference.CONFERENCES.FINALS} round={1} gameNumber={0}/>
								<Game conference={Conference.CONFERENCES.FINALS} round={2} gameNumber={0}/>
								<Game conference={Conference.CONFERENCES.FINALS} round={1} gameNumber={1}/>
							</div>
						</div>
					</div>
					<div className="bracketContainerRight" key="right">
						<Conference conference={Conference.CONFERENCES.TOP_RIGHT}/>
						<Conference conference={Conference.CONFERENCES.BOTTOM_RIGHT}/>
					</div>
				</div>
			</div>
		);
	}
}

RealBracketClass.PropTypes = {
	// the logged in user
	user: PropTypes.object.isRequired,
};

// withRouter required so that routing isn't blocked: https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
const RealBracket = withRouter(connect(
	state => state,
	dispatch => {
		return {}
	},
)(RealBracketClass));

export default RealBracket;
