import React from "react";
import PropTypes from "prop-types";

export default class NavigationButton extends React.Component {
	render() {
		return (
			<div className={`button sendButton color-${this.props.color} size-${this.props.size}`} onClick={this.props.buttonClicked}>
				<img src={`images/buttons/${this.props.color}-${this.props.size}.png`} alt={this.props.altText}/>
				<div className="button-text">{this.props.text}</div>
			</div>
		);
	}
}
NavigationButton.PropTypes = {
	buttonClicked: PropTypes.func.isRequired,
	size: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
	altText: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
};
