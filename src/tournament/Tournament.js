import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Route, withRouter} from "react-router";
import shared from "../Shared";
import reducers from "../Reducers";
import {Button, InputInformation} from "dts-react-common";

class DateInput extends React.Component {
	render() {
		return (
			<div className="inputGroup">
				<div className="label">{this.props.label}</div>
				<div className="input"><input type="text" className="dataFont" value={this.props.value} onChange={e => this.props.dateChanged(e.target.value)}/></div>
			</div>
		);
	}
}

DateInput.PropTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	dateChanged: PropTypes.func.isRequired,
};

// ==== setup react container for the report ==== //
class TournamentClass extends React.Component {
	constructor(props) {
		super(props);
		if (this.props.tournament) {
			this.props.setTournamentEdit(this.props.tournament);
		} else {
			shared.funcs.getCurrentTournament(this.props.setTournamentEdit);
		}
	}

	saveTournament(history) {
		shared.funcs.ajax('POST', 'ws/tournament/save', this.props.tournamentEdit.tournament, () => history.push('./'), false, false, false);
	}

	render() {
		return (
			this.props.tournamentEdit.tournament ? (
				<div id="tournamentContainer">
					<div className="inputs">
						{
							this.props.tournamentEdit.tournament ?
								<div>
									{this.props.tournamentEdit.tournament.dates.map((d, i) =>
										<DateInput
											key={d.name}
											label={d.name}
											value={d.date}
											dateChanged={value => this.props.changeTournamentDateField(i, value)}/>
									)}
								</div>
								: false
						}
					</div>
					<Route render={({history}) => (
						<div className="buttonContainer">
							<Button key="cancel" label="Cancel" clickedCallback={() => history.push('./')} color={Button.BACKGROUND_COLOR.BLUE_LIGHTTONE} size={InputInformation.SIZE_SMALL}/>
							<Button key="save" label="Save" clickedCallback={() => this.saveTournament(history)} color={Button.BACKGROUND_COLOR.GREEN_LIGHTTONE} size={InputInformation.SIZE_SMALL}/>
						</div>
					)}/>
				</div>
			) : false
		);
	}
}

TournamentClass.PropTypes = {
	// see state for the fields in this object
	home: PropTypes.object.isRequired,

	// if tournament not set then will ajax for it
	tournament: PropTypes.object,
};

const Tournament = withRouter(connect(
	state => state,
	dispatch => {
		return {
			changeTournamentDateField: (index, value) => dispatch({type: reducers.ACTION_TYPES.TOURNAMENT.SET_DATE_FIELD, payload: {index: index, value: value}}),
			setTournamentEdit: tournament => dispatch({type: reducers.ACTION_TYPES.TOURNAMENT.SET_EDITING_TOURNAMENT, payload: tournament}),
		}
	},
)(TournamentClass));

export default Tournament;