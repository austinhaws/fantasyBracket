import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Button, ColumnInformation, Table, TableSorter, TableSorterField, TableSorterInformation} from "dts-react-common";
import homeShared from "./HomeShared.jsx";
import {Route} from 'react-router-dom'
import {withRouter} from "react-router";
import shared from "../Shared.jsx";

// ==== setup react container for the report ==== //
class HomeClass extends React.Component {
	constructor(props) {
		super(props);
		this.columns = [
			new ColumnInformation({title: 'Project', field: 'projectName', tdClass: record => `project ${record.deployType}`, tableSorterInformation: new TableSorterInformation([
				new TableSorterField('project', TableSorter.SORT_TEXT, TableSorter.DIRECTION_ASCENDING),
				new TableSorterField('deployType', TableSorter.SORT_TEXT, TableSorter.DIRECTION_ASCENDING),
				new TableSorterField('deployStatusDate', TableSorter.SORT_DATE, TableSorter.DIRECTION_ASCENDING),
			])}),
			new ColumnInformation({title: 'Dev', field: 'developerSimple', tableSorterInformation: new TableSorterInformation([
				new TableSorterField('developerSimple', TableSorter.SORT_TEXT, TableSorter.DIRECTION_ASCENDING),
				new TableSorterField('project', TableSorter.SORT_TEXT, TableSorter.DIRECTION_ASCENDING),
				new TableSorterField('deployType', TableSorter.SORT_TEXT, TableSorter.DIRECTION_ASCENDING),
				new TableSorterField('deployStatusDate', TableSorter.SORT_DATE, TableSorter.DIRECTION_ASCENDING),
			])}),
			new ColumnInformation({title: 'Status', field: 'status', tableSorterInformation: new TableSorterInformation([
				new TableSorterField('status', TableSorter.SORT_TEXT, TableSorter.DIRECTION_ASCENDING),
				new TableSorterField('project', TableSorter.SORT_TEXT, TableSorter.DIRECTION_ASCENDING),
				new TableSorterField('deployType', TableSorter.SORT_TEXT, TableSorter.DIRECTION_ASCENDING),
				new TableSorterField('deployStatusDate', TableSorter.SORT_DATE, TableSorter.DIRECTION_ASCENDING),
			])}),
			new ColumnInformation({title: 'Date', field: 'deployStatusDate', tableSorterInformation: new TableSorterInformation([
				new TableSorterField('deployStatusDate', TableSorter.SORT_DATE, TableSorter.DIRECTION_ASCENDING),
				new TableSorterField('project', TableSorter.SORT_TEXT, TableSorter.DIRECTION_ASCENDING),
				new TableSorterField('deployType', TableSorter.SORT_TEXT, TableSorter.DIRECTION_ASCENDING),
			])}),
		];
	}

	componentDidMount() {
		// wait just a snitch to make sure csrf credentials are in place
		setTimeout(homeShared.funcs.ajaxCurrentDeploys, 500);

		// every so often go see if there is new deploy information
		this.intervalId = setInterval(homeShared.funcs.ajaxCurrentDeploys, 10000);
	}

	componentWillUnmount() {
		// stop checking for deploys
		clearInterval(this.intervalId);
	}

	render() {
		return (
			<Route render={({history}) => { return (
				<div>
					<Button label="Test Mycah" clickedCallback={() => {
						const deploy = this.props.home.activeDeploys[0];
						shared.funcs.ajax('POST', `deployResponse/${deploy.deployPk}/deployed`, {person: 'mycah', message: 'this failed so badly!'}, () => {console.log(arguments)}, true, false, true);
					}}/>

					<Table
						columns={this.columns}
						list={this.props.home.activeDeploys.filter(d => this.props.user.isAdmin || d.developer === `${this.props.user.email}`)}
						rowClicked={record => history.push(`/html/deploy/${record.deployPk}`)}
						additionalTableClasses="deployListTable"
						fluidfixedcontent={false}
						defaultSortField="deployStatusDate"
						tableSorterSet={tableSorter => homeShared.vars.tableSorter = tableSorter}
					/>
				</div>
			)}}/>
		);
	}
}
HomeClass.PropTypes = {
	// see state for the fields in this object
	home: PropTypes.object.isRequired,
};

const Home = withRouter(connect(
	state => state,
	dispatch => {return {}},
)(HomeClass));

export default Home;
