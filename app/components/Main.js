var React = require("react");

var Router = require("react-router");
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var firebaseUtils = require("../utils/firebaseUtils");

var Main = React.createClass({

	getInitialState: function() {
		return {
			loggedIn: firebaseUtils.isLoggedIn(),
			showLogin: false
		}
	},

	handleLogout: function(loggedIn) {
		this.setState({
			loggedIn: loggedIn
		});
	},

	handleLogin: function() {
		this.setState({
			showLogin: true
		});
	},

	componentWillMount: function() {
		firebaseUtils.onChange = this.handleLogout;
	},

	render: function() {
		var loginOrOut;
		var register;
		if(this.state.loggedIn) {
			loginOrOut = <li><Link to="logout" className="navbar-brand navbar-link"> Logout </Link></li>;
			register = null
		}
		else {
			loginOrOut = <li> <Link to="login" className="navbar-brand navbar-link"> Login </Link></li>;
			register = <li> <Link to='register' className='navbar-brand navbar-link'> Register </Link> </li>;
		}
		return (
			<span>
				<nav className="navbar navbar-default navbar-static-top navbar-height"> 
					<div className="container-fluid">
						<div className="navbar-header">
							<Link to="home" className="navbar-brand navbar-title"> Sole Renewal </Link>
						</div>
						<ul className="nav navbar-nav pull-right">
							<li><Link to="dashboard" className="navbar-brand navbar-link"> Dashboard </Link></li>
							{register}
							{loginOrOut}
						</ul>
						</div>
				</nav>
				<div className="container" id="container">
					<div className="row">
						<RouteHandler />
					</div>
				</div>
			</span>
		)
	}
});

module.exports = Main;