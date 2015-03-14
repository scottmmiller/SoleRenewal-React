var React = require("react");

var Router = require("react-router");
var routes = require("./config/routes");


// var App = React.createClass({

// 	getInitialState: function() {
// 		return {
// 			<Header >

// 			</Header>
// 		}
// 	},

// 	render: function() {
// 		return (
// 			<div>

// 			</div>
// 		)
// 	}
// });

Router.run(routes, function(Handler) {
	React.render(<Handler />, document.getElementById("app"))
});