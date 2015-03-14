var React = require("react");
var Router = require("react-router");
var firebaseUtils = require("../../utils/firebaseUtils");

var Login = React.createClass({

	mixins: [Router.Navigation],
	statics: {
		attemptedTransition: null
	},

	getInitialState: function() {
		return {
			error: false,
		}
	},

	handleSubmit: function(event) {
		event.preventDefault();
		var email = this.refs.email.getDOMNode().value;
		var pw = this.refs.pw.getDOMNode().value;
		firebaseUtils.loginWithPW({email: email, password: pw}, function() {
			if(Login.attemptedTransition) {
				var transition = Login.attemptedTransition;
				Login.attemptedTransition = null;
				transition.retry();
			}
			else {
				this.replaceWith("home");
			}
		}.bind(this));
	},

	render: function() {
		var errors = this.state.error ? <p> Error on Login </p> : "";
		return (
			<div>
				<div style={{textAlign: "center", color: "red"}}>
				All fields are REQUIRED!!!
				</div>
				<form onSubmit={this.handleSubmit}>
					<div className="row">
						<div className="col-sm-3 col-sm-offset-3">
							<div className="form-group">
								<label>First Name</label>
								<input type="text" className="form-control" ref="firstName" placeholder="First Name" />
							</div>
							<div className="form-group">
								<label>Last Name</label>
								<input type="text" className="form-control" ref="lastName" placeholder="Last Name" />
							</div>
							<div className="form-group">
								<label>Phone Number</label>
								<input type="tel" className="form-control" ref="phone" placeholder="Phone" />
							</div>
								<div className="form-group">
									<label>Email</label>
									<input className="form-control" type="email" ref="email" placeholder="Email" />
								</div>
								<div className="form-group">
									<label>Password</label>
									<input ref="pw" type="password" className="form-control" placeholder="Password" />
								</div>
						</div>

						<div className="col-sm-3">
							<div className="form-group">
								<label>Address</label>
								<input type="text" className="form-control" ref="address" placeholder="Address" />
							</div>
							<div className="form-group">
								<label>City</label>
								<input type="text" className="form-control" ref="city" placeholder="City" />
							</div>
								<div className="form-group">
									<label>State</label>
									<input className="form-control" type="text" ref="state" placeholder="State" />
								</div>
								<div className="form-group">
									<label>ZIP</label>
									<input ref="zip" type="text" className="form-control" placeholder="ZIP" />
								</div>
								<div className="form-group">
									<label>PIN</label>
									<input ref="pin" type="number" className="form-control" placeholder="PIN" />
								</div>
						</div>
					</div>
							<div className="col-sm-3 col-sm-offset-8">
									<button type="submit" className="btn btn-primary">Login</button>
							</div>
							
				</form>
			</div>
		);
	},

});

module.exports = Login;
			/* <div>
				<div class="modal fade">
					<div class='modal-dialog'>
						<div class="modal-content">
							<div class="modal-header">
								<h4 class="modal-title"> Log Me In </h4>
							</div>
							<div class="modal-body">
								<form onSubmit={this.handleSubmit}>
							        <div className="form-group">
							        	<label> Email </label>
							        	<input className="form-control" ref="email" placeholder="Email"/>
							        </div>
							        <div className="form-group">
							        	<label>Password</label>
							        	<input ref="pw" type="password" className="form-control" placeholder="Password" />
							        </div>
							            {errors}
							    </form>
							</div>
							<div class="modal-footer">
						    	<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
						    	<button type="submit" class="btn btn-primary">Login</button>
						    </div>
						</div>
					</div>
				</div>
			</div> */