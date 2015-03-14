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
				<div style={{textAlign: "center", color: "green", fontSize: "18px"}}>
				Please Login!!!
				</div>
				<form onSubmit={this.handleSubmit}>
					<div className="row">
						<div className="col-sm-4 col-sm-offset-4">
							<div className="form-group">
									<label>Email</label>
									<input className="form-control" type="email" ref="email" placeholder="Email" />
							</div>
							<div className="form-group">
									<label>Password</label>
									<input ref="pw" type="password" className="form-control" placeholder="Password" />
							</div>
						</div>
					</div>
							<div className="col-sm-3 col-sm-offset-4">
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