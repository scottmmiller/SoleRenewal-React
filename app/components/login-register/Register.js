var React = require("react");
var firebaseUtils = require("../../utils/firebaseUtils");
var Router = require("react-router");

var Register = React.createClass({

	mixins: [Router.Navigation],

	handleSubmit: function(event) {
		event.preventDefault();
		var email = this.refs.email.getDOMNode().value;
		var pw = this.refs.pw.getDOMNode().value;
		var firstName = this.refs.firstName.getDOMNode().value;
		var lastName = this.refs.lastName.getDOMNode().value;
		var phone = this.refs.phone.getDOMNode().value;
		var address = this.refs.address.getDOMNode().value;
		var city = this.refs.city.getDOMNode().value;
		var state = this.refs.state.getDOMNode().value;
		var zip = this.refs.zip.getDOMNode().value;
		var pin = this.refs.pin.getDOMNode().value;
		firebaseUtils.createUser({
			email: email, 
			password: pw,
			firstName: firstName,
			lastName: lastName,
			phone: phone,
			address: address,
			city: city,
			state: state,
			zip: zip,
			pin: pin,
			pin2: pin 

		}, function(result) {
			if(result) {
				this.replaceWith("home");
			}
		}.bind(this));
	},

	render: function() {
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
									<button type="submit" className="btn btn-primary">Register</button>
							</div>
							
				</form>
			</div>
		)
	}
});

module.exports = Register;