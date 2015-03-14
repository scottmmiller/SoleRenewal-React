var React = require("react");
var firebaseUtils = require("../utils/firebaseUtils");


var Home = React.createClass({

	getInitialState: function() {
		return {
			name:""
		}
	},	

	componentDidMount: function() {
		var ref = firebaseUtils.getRef();
		var email = firebaseUtils.getCurrentUser();
		ref.child("user/" + email).once("value", function(snapshot) {
			console.log(snapshot.val())
			this.setState({
				name: snapshot.val().firstName
			})
		}.bind(this));
	},

	render: function() {
		return (
			<h3> Welcome {this.state.name} </h3>
		)
	}
});

module.exports = Home;