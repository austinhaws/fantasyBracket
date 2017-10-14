import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Route, withRouter} from "react-router";
import {Button, InputInformation, TextInput} from "dts-react-common";
import reducers from "../Reducers.jsx";
import appsShared from "./AppsShared.jsx";

class AppEditorClass extends React.Component {

	componentDidMount() {
		this.checkNewApp();
	}

	componentWillUnmount() {
		this.props.setApp(false);
	}

	checkNewApp() {
		// if no deploy set and a deploy type parameter given, create a new deploy
		if (!this.props.apps.editing && this.props.match.params.applicationInfoPk) {
			if (this.props.match.params.applicationInfoPk === 'new') {
				this.props.setApp({
					department: '',
					name: '',
					type: '',
					warName: '',
					instanceName: '',
					server: '',
					developers: '',
					phoneNumber: '',
					testUrl: '',
					canaryContact: '',
				});
			} else {
				appsShared.funcs.getApp(this.props.match.params.applicationInfoPk);
			}
		}
	}

	saveApplication(history) {
		appsShared.funcs.saveApp(this.props.apps.editing, history);
	}

	render() {
		return this.props.apps.editing ? (
			<div>
				<TextInput label="Department" field="department" value={this.props.apps.editing.department} changedCallback={this.props.fieldChanged} size={InputInformation.SIZE_MEDIUM}/>
				<TextInput label="Project" field="name" value={this.props.apps.editing.name} changedCallback={this.props.fieldChanged} size={InputInformation.SIZE_MEDIUM}/>
				<TextInput label="Deploy" field="type" value={this.props.apps.editing.type} changedCallback={this.props.fieldChanged} size={InputInformation.SIZE_MEDIUM}/>
				<TextInput label="Package" field="warName" value={this.props.apps.editing.warName} changedCallback={this.props.fieldChanged} size={InputInformation.SIZE_MEDIUM}/>
				<TextInput label="Instance" field="instanceName" value={this.props.apps.editing.instanceName} changedCallback={this.props.fieldChanged} size={InputInformation.SIZE_MEDIUM}/>
				<TextInput label="Server" field="server" value={this.props.apps.editing.server} changedCallback={this.props.fieldChanged} size={InputInformation.SIZE_MEDIUM}/>
				<TextInput label="Developers" field="developers" value={this.props.apps.editing.developers} changedCallback={this.props.fieldChanged} size={InputInformation.SIZE_MEDIUM}/>
				<TextInput label="Phone Number" field="phoneNumber" value={this.props.apps.editing.phoneNumber} changedCallback={this.props.fieldChanged} size={InputInformation.SIZE_MEDIUM}/>
				<TextInput label="Test URL" field="testUrl" value={this.props.apps.editing.testUrl} changedCallback={this.props.fieldChanged} size={InputInformation.SIZE_MEDIUM}/>
				<TextInput label="Canary Contact" field="canaryContact" value={this.props.apps.editing.canaryContact} changedCallback={this.props.fieldChanged} size={InputInformation.SIZE_MEDIUM}/>

				<Route render={({history}) => {
					return (
						<div className="buttonsDiv">
							<Button label="Cancel" size={InputInformation.SIZE_MEDIUM} clickedCallback={() => history.push('/html/apps')} color={Button.BACKGROUND_COLOR.MEDIUM_DARK_GRAY}/>
							<Button label="Save" size={InputInformation.SIZE_MEDIUM} clickedCallback={() => this.saveApplication(history)} color={Button.BACKGROUND_COLOR.GREEN_MIDTONE}/>
						</div>
					);
				}}/>
			</div>
		) : false;
	}
}

AppEditorClass.PropTypes = {
	router: PropTypes.object.isRequired,
	fieldChanged: PropTypes.func.isRequired,
};

const AppEditor = withRouter(connect(
	state => state,
	dispatch => {return {
		fieldChanged: (field, value) => dispatch({type: reducers.ACTION_TYPES.APPS.SET_APP_FIELD, payload: {field: field, value: value}}),
		setApp: app => dispatch({type: reducers.ACTION_TYPES.APPS.SET_APP, payload: app}),
	}},
)(AppEditorClass));

export default AppEditor;
