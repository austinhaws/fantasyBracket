import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Button, ColumnInformation, InputInformation, Table, TableSorter, TableSorterField, TableSorterInformation, TextInput} from "dts-react-common";
import appsShared from "./AppsShared.jsx";
import {Route} from 'react-router-dom'
import {withRouter} from "react-router";
import reducers from "../Reducers.jsx";

class HomeClass extends React.Component {
	componentDidMount() {
		appsShared.funcs.ajaxApplicationList();
	}

	buttonsTd(column, record) {
		return (
			<Route key="buttonsRoute" render={({history}) =>
			<td key="buttons" className="nowrap appsButtonsTd">
				<Button label="Delete" clickedCallback={() => this.deleteApplicationInfo(record)} color={Button.BACKGROUND_COLOR.DARK_GRAY} size={InputInformation.SIZE_SMALL}/>
				<Button label="Edit" clickedCallback={() => history.push(`/html/apps/${record.applicationInfoPk}`)} color={Button.BACKGROUND_COLOR.BLUE_LIGHTTONE} size={InputInformation.SIZE_SMALL}/>
			</td>
			}/>
		);
	}

	deleteApplicationInfo(record) {
		if (confirm(`Are you sure you want to delete this entry: ${record.department} - ${record.name} - ${record.type}?`)) {
			appsShared.funcs.deleteApplicationInfo(record.applicationInfoPk);
		}
	}

	constructor(props) {
		super(props);

		this.columns = [
			new ColumnInformation({title: 'Buttons', key: 'buttons', field: 'buttons', tdCallback: this.buttonsTd.bind(this)}),

			new ColumnInformation({title: 'Department', field: 'department', tableSorterInformation: new TableSorterInformation([
				new TableSorterField('department', TableSorter.SORT_TEXT, TableSorter.DIRECTION_ASCENDING),
				new TableSorterField('name', TableSorter.SORT_TEXT, TableSorter.DIRECTION_ASCENDING),
				new TableSorterField('type', TableSorter.SORT_TEXT, TableSorter.DIRECTION_ASCENDING),
			])}),
			new ColumnInformation({title: 'Name', field: 'name', tableSorterInformation: new TableSorterInformation([
				new TableSorterField('name', TableSorter.SORT_TEXT, TableSorter.DIRECTION_ASCENDING),
				new TableSorterField('department', TableSorter.SORT_TEXT, TableSorter.DIRECTION_ASCENDING),
				new TableSorterField('type', TableSorter.SORT_TEXT, TableSorter.DIRECTION_ASCENDING),
			])}),
			new ColumnInformation({title: 'Type', field: 'type', tableSorterInformation: new TableSorterInformation([
				new TableSorterField('type', TableSorter.SORT_TEXT, TableSorter.DIRECTION_ASCENDING),
				new TableSorterField('department', TableSorter.SORT_TEXT, TableSorter.DIRECTION_ASCENDING),
				new TableSorterField('name', TableSorter.SORT_TEXT, TableSorter.DIRECTION_ASCENDING),
			])}),
		];
	}

	render() {
		const lowerSearch = this.props.apps.search ? this.props.apps.search.toLowerCase() : false;
		const filteredApps = this.props.apps.apps.filter(a => !lowerSearch || a.search.includes(lowerSearch));
		return (
			<Route render={({history}) =>
				<div>
					<div className="controls center">
						<div className="row clearfix formRow">
							<Button label="Add New Application" color={Button.BACKGROUND_COLOR.GREEN_MIDTONE} size={InputInformation.SIZE_MEDIUM} clickedCallback={() => history.push('/html/apps/new')}/>
						</div>
					</div>
					<div className="controls">
						<div className="row clearfix formRow">
							<TextInput field="search" label="Search" changedCallback={this.props.searchChanged} size={InputInformation.SIZE_LARGE} value={this.props.apps.search}/>
						</div>
					</div>
					<Table
						columns={this.columns}
						list={filteredApps}
						rowClicked={record => history.push(`/html/apps/${record.applicationInfoPk}`)}
						additionalTableClasses="deployListTable"
						fluidfixedcontent={false}
						defaultSortField="department"
						tableSorterSet={tableSorter => appsShared.vars.tableSorter = tableSorter}
					/>
				</div>
			}/>
		);
	}
}
HomeClass.PropTypes = {
	// see state for the fields in this object
	apps: PropTypes.object.isRequired,
	// when search input is changed
	searchChanged: PropTypes.func.isRequired,
};

const Home = withRouter(connect(
	state => state,
	dispatch => {return {
		searchChanged: (field, value) => dispatch({type: reducers.ACTION_TYPES.APPS.SET_SEARCH, payload: value}),
	}},
)(HomeClass));

export default Home;
