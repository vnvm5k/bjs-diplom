'use strict'; 

const newUser = new UserForm(); 
newUser.loginFormCallback = (data) => ApiConnector.login(data, (response) => 
	{ 
		console.log(response);
		if(response.success) {
			location.reload();
		} else {
			newUser.loginErrorMessageBox();
		}
	});


newUser.registerFormCallback = (data) => ApiConnector.register(data, (response) => 
	{ 
		console.log(response);
		if(response.success) {
			location.reload();
		} else {
			newUser.registerErrorMessageBox();
		}
	});

