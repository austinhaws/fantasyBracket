import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withRouter} from "react-router";

// ==== setup react container for the report ==== //
class HomeClass extends React.Component {
	render() {
		return <div>
			Show dates here
		</div>;
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
