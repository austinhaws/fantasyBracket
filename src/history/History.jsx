import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Button, ColumnInformation, InputInformation, Table, TableSorter, TableSorterField, TableSorterInformation, TextInput} from "dts-react-common";
import {Route} from 'react-router-dom'
import {withRouter} from "react-router";
import historyShared from "./HistoryShared.jsx";
import reducers from "../Reducers.jsx";

// ==== setup react container for the report ==== //
class HistoryClass extends React.Component {
	constructor(props) {
		super(props);

		this.columns = [
			new ColumnInformation({title: 'Project', field: 'projectName', tdClass: record => `project ${record.deployType}`, tableSorterInformation: new TableSorterInformation([
				new TableSorterField('project', TableSorter.SORT_TEXT, TableSorter.DIRECTION_ASCENDING),
				new TableSorterField('deployType', TableSorter.SORT_TEXT, TableSorter.DIRECTION_ASCENDING),
				new TableSorterField('statusDate', TableSorter.SORT_DATE, TableSorter.DIRECTION_ASCENDING),
			])}),
			new ColumnInformation({title: 'Developer', field: 'developer', tableSorterInformation: new TableSorterInformation([
				new TableSorterField('developer', TableSorter.SORT_TEXT, TableSorter.DIRECTION_ASCENDING),
				new TableSorterField('project', TableSorter.SORT_TEXT, TableSorter.DIRECTION_ASCENDING),
				new TableSorterField('deployType', TableSorter.SORT_TEXT, TableSorter.DIRECTION_ASCENDING),
				new TableSorterField('statusDate', TableSorter.SORT_DATE, TableSorter.DIRECTION_ASCENDING),
			])}),
			new ColumnInformation({title: 'Status', field: 'status', tableSorterInformation: new TableSorterInformation([
				new TableSorterField('status', TableSorter.SORT_TEXT, TableSorter.DIRECTION_ASCENDING),
				new TableSorterField('project', TableSorter.SORT_TEXT, TableSorter.DIRECTION_ASCENDING),
				new TableSorterField('deployType', TableSorter.SORT_TEXT, TableSorter.DIRECTION_ASCENDING),
				new TableSorterField('statusDate', TableSorter.SORT_DATE, TableSorter.DIRECTION_ASCENDING),
			])}),
			new ColumnInformation({title: 'Date', field: 'statusDate', tableSorterInformation: new TableSorterInformation([
				new TableSorterField('statusDate', TableSorter.SORT_DATE, TableSorter.DIRECTION_ASCENDING),
				new TableSorterField('project', TableSorter.SORT_TEXT, TableSorter.DIRECTION_ASCENDING),
				new TableSorterField('deployType', TableSorter.SORT_TEXT, TableSorter.DIRECTION_ASCENDING),
			])}),
		];
	}

	search() {
		if (!this.props.user) {
			alert('User was not yet loaded. Please try again.');
		} else if (!this.props.user.isAdmin && !this.props.history.search.applicationInfoPk) {
			alert('Must select a project. If there are no projects then contact dtsathosting@utah.gov to be added to a project.');
		} else {
			historyShared.funcs.searchHistory(this.props.history.search);
		}
	}

	render() {
		return (
			<Route render={({history}) =>
				<div>
					<div className="controls">
						<div className="row clearfix formRow">
							<div className="reactSiblingContainer">
								<label htmlFor="deployNow">Type</label>
								<select className="large" value={this.props.history.search.deployType} onChange={e => this.props.searchFieldChanged('deployType', e.target.value)}>
									<option value=""></option>
									<option value="DEV">Dev</option>
									<option value="AT">AT</option>
									<option value="PROD">Prod</option>
								</select>
							</div>
						</div>

						<div className="row clearfix formRow">
							<div className="reactSiblingContainer">
								<label htmlFor="projects">Projects</label>
								<select className="large" value={this.props.history.search.applicationInfoPk} onChange={e => this.props.searchFieldChanged('applicationInfoPk', e.target.value)}>
									<option value=""></option>
									{this.props.projects
										.filter(p => !this.props.history.search.deployType || p.type === this.props.history.search.deployType)
										.map(p => <option key={p.applicationInfoPk} value={p.applicationInfoPk}>{`${p.name} (${p.server ? p.server : ''} - ${p.instanceName ? p.instanceName : ''}) ${!this.props.history.search.deployType ? `: ${p.type}` : ''}`} </option>)
									}
								</select>
							</div>
						</div>

						<div className="row clearfix formRow">
							<TextInput field="developer" label="Developer" changedCallback={this.props.searchFieldChanged} enterPressedCallback={this.search.bind(this)} size={InputInformation.SIZE_LARGE} value={this.props.history.search.developer}/>
						</div>
						<div className="row clearfix formRow buttonsDiv">
							<Button label="Reset" size={InputInformation.SIZE_MEDIUM} color={Button.BACKGROUND_COLOR.MEDIUM_DARK_GRAY} clickedCallback={this.props.clearSearch}/>
							<Button label="Search" size={InputInformation.SIZE_MEDIUM} color={Button.BACKGROUND_COLOR.GREEN_MIDTONE} clickedCallback={this.search.bind(this)}/>
						</div>
					</div>
					<Table
						columns={this.columns}
						list={this.props.history.histories}
						rowClicked={record => history.push(`/html/deploy/${record.deployPk}`)}
						additionalTableClasses="deployListTable"
						fluidfixedcontent={false}
						defaultSortField="statusDate"
						tableSorterSet={tableSorter => historyShared.vars.tableSorter = tableSorter}
					/>
				</div>
			}/>
		);
	}
}
HistoryClass.PropTypes = {
	// current logged in user - not required because the user may not be ajaxed yet
	user: PropTypes.object,

	// see state for the fields in this object
	search: PropTypes.object.isRequired,

	// called when a field is changed to update the state
	searchFieldChanged: PropTypes.func.isRequired,
};

const History = withRouter(connect(
	state => state,
	dispatch => {return {
		searchFieldChanged: (field, value) => dispatch({type: reducers.ACTION_TYPES.HISTORY.SET_SEARCH_FIELD, payload: {field: field, value: value}}),
		clearSearch: (field, value) => dispatch({type: reducers.ACTION_TYPES.HISTORY.CLEAR_SEARCH, payload: false}),
	}},
)(HistoryClass));

export default History;
