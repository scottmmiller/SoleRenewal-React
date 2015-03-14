var React = require("react");

var Router = require("react-router");
var Route = Router.Route;

var Main = require("../components/Main");
var Home = require("../components/Home");
var Dashboard = require("../components/Dashboard");
var Register = require("../components/login-register/Register");
var Login = require("../components/login-register/Login");
var Logout = require("../components/login-register/Logout");

var routes = (
	<Route handler={Main} >
		<Route name="home" path="/" handler={Home} />
		<Route name="login" handler={Login} />
		<Route name="logout" handler={Logout} />
		<Route name="register" handler={Register} />
		<Route name="dashboard" path="/dashboard/" handler={Dashboard} />
	</Route>
);

module.exports = routes;
