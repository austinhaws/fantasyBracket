import React from "react";
import PropTypes from "prop-types";
import {Button, ColumnInformation, InputInformation, InputList, Table, TableSorter, TableSorterField, TableSorterInformation} from "dts-react-common";
import deployShared from "./DeployShared.jsx";
import {connect} from "react-redux";
import {Route, withRouter} from "react-router";
import reducers from "../Reducers.jsx";

class DeployEditorClass extends React.Component {

	constructor(props) {
		super(props);

		this.columns = [
			new ColumnInformation({
				title: 'Who', field: 'name', tableSorterInformation:
					new TableSorterInformation([
						new TableSorterField('name', TableSorter.SORT_TEXT, TableSorter.DIRECTION_ASCENDING),
						new TableSorterField('dateTime', TableSorter.SORT_DATE, TableSorter.DIRECTION_ASCENDING),
					])
			}),
			new ColumnInformation({
				title: 'Date', field: 'dateTime', tableSorterInformation: new TableSorterInformation([
					new TableSorterField('dateTime', TableSorter.SORT_DATE, TableSorter.DIRECTION_DESCENDING),
				])
			}),
			new ColumnInformation({
				title: 'Event', field: 'auditEvent', tableSorterInformation: new TableSorterInformation([
					new TableSorterField('auditEvent', TableSorter.SORT_TEXT, TableSorter.DIRECTION_ASCENDING),
					new TableSorterField('dateTime', TableSorter.SORT_DATE, TableSorter.DIRECTION_ASCENDING),
				])
			}),
			new ColumnInformation({
				title: 'Information', field: 'information', tableSorterInformation: new TableSorterInformation([
					new TableSorterField('information', TableSorter.SORT_TEXT, TableSorter.DIRECTION_ASCENDING),
					new TableSorterField('dateTime', TableSorter.SORT_DATE, TableSorter.DIRECTION_ASCENDING),
				])
			}),
		];
	}

	componentDidMount() {
		this.checkNewDeploy();
	}

	componentWillUnmount() {
		this.props.setDeploy(false);
	}

	checkNewDeploy() {
		// if no deploy set and a deploy type parameter given, create a new deploy
		if ((!this.props.deploy.deploy && this.props.match.params.deployPk) ||
			// if the deploy type has changed then they clicked a button
			(this.props.deploy.deployType !== this.props.match.params.deployPk) ||
			(!this.props.match.params.deployPk && this.props.deploy.deploy.deployPk)) {
			switch (this.props.match.params.deployPk) {
				// create new deploy
				case 'at':
				case 'dev':
				case 'prod':
					this.props.setDeploy({
						deployType: this.props.match.params.deployPk.toUpperCase(),
						deleted: 0,
						status: 'new',
						deployNow: this.props.match.params.deployPk === 'prod' ? 'No' : 'Yes',
					});
					break;

				// already existing deploy
				default:
					deployShared.funcs.getDeploy(this.props.match.params.deployPk);
					break;
			}
		}
	}

	sendDeploy(history) {
		// validate data
		const deploy = this.props.deploy.deploy;
		if (this.props.user.isAdmin && this.props.deploy.deploy.deployPk) {
			deployShared.funcs.sendDeploy(this.props.deploy.deploy, history);
		} else {
			let errorMessage = false;
			if (!deploy.warLink) {
				errorMessage = 'War link must be given';
			} else if (!deploy.applicationInfoPk) {
				errorMessage = 'A project must be picked';
			} else if (deploy.deployNow === 'No' && !deploy.deployDate) {
				errorMessage = 'If not deploying \'Now\' then a date/time must be picked';
			} else if (deploy.deployType === 'PROD' && !deploy.changeRequestNumber) {
				errorMessage = 'Production deploys require a change request number';
			}

			// if valid
			if (errorMessage) {
				alert(errorMessage + '. Please correct this and try again.');
			} else {
				// ajax send the deploy && go home
				deployShared.funcs.createDeploy(this.props.deploy.deploy, history);
			}
		}
	}

	projectNameChanged(e) {
		const applicationInfoPk = parseInt(e.target.value, 10);
		const project = this.props.projects.filter(p => p.applicationInfoPk === applicationInfoPk)[0];
		this.props.deployFieldsChanged([
			{field: 'projectName', value: project.name},
			{field: 'packageName', value: project.warName},
			{field: 'instanceName', value: project.instanceName},
			{field: 'server', value: project.server},
			{field: 'canaryContact', value: project.canaryContact},
			{field: 'testUrl', value: project.testUrl},
			{field: 'applicationInfoPk', value: project.applicationInfoPk},
		]);
	}

	render() {
		const viewOnly = !!(this.props.deploy.deploy && this.props.deploy.deploy.deployPk);

		let inputs1 = false;
		let inputs2 = false;
		let inputs3 = false;
		const deploy = this.props.deploy.deploy;
		if (deploy) {

			inputs1 = [
				new InputInformation({type: InputInformation.TYPE_INPUT, label: 'Status', field: 'status', value: deploy.status, disabled: true}),
				new InputInformation({type: InputInformation.TYPE_INPUT, label: 'Developer', field: 'developer', value: this.props.user.email, disabled: true}),
				new InputInformation({type: InputInformation.TYPE_INPUT, label: 'WAR File Url', field: 'warLink', value: deploy.warLink, disabled: viewOnly}),
			];

			inputs2 = [
				deploy.deployNow === 'Yes' ? false : new InputInformation({type: InputInformation.TYPE_INPUT, label: "Deploy Date/Time (MM/DD/YYYY HH24:MM:SS)", field: 'deployDate', value: deploy.deployDate, required: true, disabled: viewOnly}),
				deploy.deployType === 'PROD' ? new InputInformation({type: InputInformation.TYPE_INPUT, label: 'Change Request #', field: 'changeRequestNumber', value: deploy.changeRequestNumber, disabled: viewOnly}) : false,
			];

			inputs3 = [
				new InputInformation({type: InputInformation.TYPE_INPUT, label: 'Package', field: 'packageName', value: deploy.packageName, disabled: true}),
				new InputInformation({type: InputInformation.TYPE_INPUT, label: 'Instance', field: 'instanceName', value: deploy.instanceName, disabled: true}),
				new InputInformation({type: InputInformation.TYPE_INPUT, label: 'Server', field: 'server', value: deploy.server, disabled: true}),
				new InputInformation({type: InputInformation.TYPE_INPUT, label: 'Canary Contact', field: 'canaryContact', value: deploy.canaryContact, disabled: true}),
				new InputInformation({type: InputInformation.TYPE_INPUT, label: 'Error', field: 'error', value: deploy.error, disabled: true}),
				deploy.deployType === 'AT' ? new InputInformation({type: InputInformation.TYPE_LINK, label: 'Test Url', field: 'testUrl', value: (deploy.testUrl ? deploy.testUrl : ''), link: (deploy.testUrl ? deploy.testUrl : '')}) : false,
				new InputInformation({type: InputInformation.TYPE_CHECKBOX, label: 'Deleted:', field: 'deleted', value: deploy.deleted === 'Yes' || deploy.deleted === true, required: false, disabled: true}),
			];

			inputs1.concat(inputs2).concat(inputs3).filter(i => i).forEach(i => {
				i.size = 'large';
				i.changeCallback = (field, value) => this.props.deployFieldsChanged([{field: field, value: value}]);
			});
		}

		let table = false;
		if (deploy && deploy.deployPk) {
			table = (
				<div>
					<div className="divider"></div>
					<Table additionalTableClasses="auditTrailList" list={deploy.histories} columns={this.columns} defaultSortField="dateTime" fluidfixedcontent={false}/>
				</div>
			);
		}

		const deployNowMenu = deploy ? (
			<div className="row clearfix formRow">
				<div className="reactSiblingContainer">
					<label htmlFor="deployNow">Deploy Now</label>
					<select className="large" id="deployNow" value={deploy.deployNow} disabled={viewOnly} readOnly={viewOnly} onChange={event => this.props.deployFieldsChanged([{field: 'deployNow', value: event.target.value}])}>
						<option key="yes" value="Yes">Yes</option>
						<option key="no" value="No">No</option>
					</select>
				</div>
			</div>
		) : false;

		let projectMenu = false;
		if (deploy) {
			if (deploy.deployPk) {
				inputs2.push(new InputInformation({type: InputInformation.TYPE_INPUT, label: 'Project', field: 'project', value: `${deploy.projectName} (${deploy.server ? deploy.server : ''} - ${deploy.instanceName ? deploy.instanceName : ''})`, disabled: true}));
			} else {
				projectMenu = (
					<div className="row clearfix formRow">
						<div className="reactSiblingContainer">
							<label htmlFor="projectName">Project</label>
							<select className="large" id="projectName" value={deploy.applicationInfoPk} disabled={viewOnly} readOnly={viewOnly} onChange={this.projectNameChanged.bind(this)}>
								<option key="blank" value="">Choose Project...</option>
								{
									this.props.projects
										.filter(p => p.type === this.props.deploy.deploy.deployType)
										.map(p => <option key={p.applicationInfoPk} value={p.applicationInfoPk}>{`${p.name} (${p.server ? p.server : ''} - ${p.instanceName ? p.instanceName : ''})`} </option>)
								}
							</select>
						</div>
					</div>
				);
			}
		}

		let buttons = false;
		if (!deploy.deployPk || this.props.user.isAdmin) {
			buttons = (
				<Route render={({history}) => {
					return (
						<div className="buttonsDiv">
							<Button label="Cancel" size={InputInformation.SIZE_MEDIUM} clickedCallback={() => history.push('/')} color={Button.BACKGROUND_COLOR.MEDIUM_DARK_GRAY}/>
							{(deploy.deployPk && this.props.user.isAdmin) ?
								<Button label="Delete" size={InputInformation.SIZE_MEDIUM} clickedCallback={() =>
									confirm('Are you sure you want to delete this deploy?') ?
										deployShared.funcs.deleteDeploy(deploy.deployPk, history) : false} color={Button.BACKGROUND_COLOR.DARK_GRAY}/>
							 : false}
							<Button label="Send" size={InputInformation.SIZE_MEDIUM} clickedCallback={() => this.sendDeploy(history)} color={Button.BACKGROUND_COLOR.GREEN_MIDTONE}/>
						</div>
					);
				}}/>
			);
		}

		const prettyTypeNames = {
			'PROD': 'Production',
			'AT': 'Testing',
			'DEV': 'Development',
		};
		return (
			<div>
				<h1>{this.props.deploy.deploy ? (prettyTypeNames[this.props.deploy.deploy.deployType] + (this.props.deploy.deploy.projectName ? ' - ' + this.props.deploy.deploy.projectName : '')) : ''}</h1>
				{inputs1 ? <InputList inputs={inputs1.filter(i => i)}/> : false}

				{deployNowMenu}

				{inputs2 ? <InputList inputs={inputs2.filter(i => i)}/> : false}

				{projectMenu}

				{inputs3 ? <InputList inputs={inputs3.filter(i => i)}/> : false}

				{table}

				{buttons}
			</div>
		);
	}
}

DeployEditorClass.PropTypes = {
// ==== From Router ==== //
	// contains information from React Router: deployPk
	match: PropTypes.object.isRequired,

// ==== From Redux ==== //
	// the deploy to edit - ajaxes to get data so starts empty
	deploy: PropTypes.object,

	// a list of all the projects this user can deploy - for picking deploys from menu
	projects: PropTypes.array.isRequired,

	// the current logged in user
	user: PropTypes.object.isRequired,


// ==== Dispatchers ==== //
	// cancel editing the deploy
	cancelEdit: PropTypes.func.isRequired,

	// a field has changed on the deploy information by the user
	deployFieldsChanged: PropTypes.func.isRequired,
};

// get access to router for history pushing
DeployEditorClass.contextTypes = {
	router: PropTypes.object.isRequired
};

const DeployEditor = withRouter(connect(
	state => state,
	dispatch => {return {
		setDeploy: deploy => dispatch({type: reducers.ACTION_TYPES.DEPLOY.SET_DEPLOY, payload: deploy}),
		deployFieldsChanged: changes => dispatch({type: reducers.ACTION_TYPES.DEPLOY.SET_DEPLOY_FIELD_VALUE, payload: changes}),
	}},
)(DeployEditorClass));

export default DeployEditor;
