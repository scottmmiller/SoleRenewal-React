var Firebase = require("firebase");
var Forge = "https://solerenewal-react.firebaseio.com/"
var ref = new Firebase(Forge);
var cachedUser = null;

var formatEmailForFB = function(email) {
	var key = email.replace("@", "^");
	if(key.indexOf(".") !== -1) {
		return key.split(".").join("*");
	}
	return key;
};

var addNewUserToFB = function(newUser) {
	var key = formatEmailForFB(newUser.email);
	ref.child("user").child(key).set(newUser);
};

var firebaseUtils = {

	getRef: function() {
		return ref;
	},

	getCurrentUser: function() {
		authData = ref.getAuth()
		console.log(authData);
		if(authData) {
			var key = formatEmailForFB(authData.password.email);
		
			return key;
		}
		else {
			return null;
		}
	},

	createUser: function(user, callback) {
		ref.createUser(user, function(error) {
			if(error) {
				switch (error.code) {
					case "EMAIL_TAKEN":
						console.log("The new user account cannot be created because the email is already in our system.");
						break;
					case "INVALID_EMAIL":
						console.log("The specified email is not a valid email.");
						break;
					default: 
						console.log("Error creating user: ", error);
				}
			}
			else {
				this.loginWithPW(user, function(authData) {
					addNewUserToFB({
						email: user.email,
						uid: authData.uid,
						token: authData.token,
						firstName: user.firstName,
						lastName: user.lastName,
						phone: user.phone,
						address: user.address,
						city: user.city,
						state: user.state,
						zip: user.zip,
						pin: user.pin,
						pin2: user.pin 
					});
				}, callback);
			}
		}.bind(this));
	},

	loginWithPW: function(userObject, callback, cbOnRegister) {
		ref.authWithPassword(userObject, function(error, authData) {
			if (error) {
				console.log("Login Failed!", error);
				cbOnRegister && cbOnRegister(false);
			}
			else {
				console.log("Authenticated successfully with payload: ", authData);
				authData.email = userObject.email;
				cachedUser = authData;
				callback(authData);
				this.onChange(true);
				cbOnRegister && cbOnRegister(true);
			}
		}.bind(this));
	},

	isLoggedIn: function() {
		return cachedUser && true || ref.getAuth() || false;
	},

	logout: function() {
		ref.unauth();
		cachedUser = null;
		this.onChange(false);
	},

	toArray: function(fbObject) {
		var arr = [];
		for(var key in fbObject) {
			arr.push(fbObject[key]);
		}
		return arr;
	}
};

module.exports = firebaseUtils;
