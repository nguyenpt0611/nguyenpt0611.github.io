/*main function to check user from server after check validate input data
* use AJAX XMLHttpRequest 
* check user name on database
* return correct/incorrect
*/
function checkSubmit() {
	var user_error = document.getElementById("user-error");
        var username = document.getElementById("user-name");
	var pwd = document.getElementById("password");
	var email = document.getElementById("email");
	if(checkValidator()) {
		var xhttp;
		if (window.XMLHttpRequest) {
			// code for modern browsers
			xhttp = new XMLHttpRequest();
		}
		else {
			// code for IE6, IE5
			xhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			user_error.innerHTML = this.responseText;
		}
		};
                xhttp.open("POST", "/WebAJAX/formAjax?username=" + username.value 
			   + "&password=" + pwd.value + "&email=" + email.value , true);
		xhttp.send();
	}
}
/*check input username, password, email and birthday
* input valid return true 
* input invalid
*/
function checkValidator() {
	var flag = true;
	if(!isUserName()) flag= false;
	if(!isPassword()) flag = false;
	if(!isEmail()) flag = false;
	if(!isDate()) flag = false;
	return flag;
}
/*check input user name 
* format user name
* not null or length min 8 letter
*/
function isUserName() {
	var username = document.getElementById("user-name");
	var result = document.getElementById("user-error");
	result.innerHTML = "";
	var regexUsername = new RegExp("^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$");
	if(username.value === "") {
		result.innerHTML = "Please input your username";
		return false;
	}
	if(!regexUsername.test(username.value)) {
		result.innerHTML = "Invalid username";
		return false;
	}
	if(username.value.length < 8) {
		result.innerHTML = "Username length min 8 letter";
		return false;
	}
	return true;
}
/*check input password 
* not null or length min 8 letter
*/
function isPassword() {
	var pwd = document.getElementById("password");
	var result = document.getElementById("pwd-error");
	result.innerHTML = "";
	if(pwd.value === "") {
		result.innerHTML = "Please input your password";
		return false;
	}
	if(pwd.value.length< 8) {
		result.innerHTML = "Password length min 8 letter";
		return false;
	}
	return true;
}
/*check input email
* format email
* not null 
*/
function isEmail() {
	var email = document.getElementById("email");
	var result = document.getElementById("email-error");
	result.innerHTML = "";
	var regexEmail = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$");
	if(email.value === "") {
		result.innerHTML = "Please input your email";
		return false;
	}
	if(!regexEmail.test(email.value)) {
		result.innerHTML = "Email wrong format";
		return false;
	}
	return true;
}
/*check input birthday
* type format date
*/
function isDate(){
	var birthday = document.getElementById("output-date");
	//case1 YYYY/MM/DD
	var case1 =  "(([0-9]{4})[-|/]([1-9]{1}|0[1-9]|1[0-2])[-|/]([1-9]{1}|0[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1}))";
	//case2 DD/MM/YYYY
	var case2 = "(([1-9]{1}|0[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1})[-|/]([1-9]{1}|0[1-9]|1[0-2])[-|/]([0-9]{4}))";
	//case3 MM/DD/YYYY
	var case3 = "(([1-9]{1}|0[1-9]|1[0-2])[-|/]([1-9]{1}|0[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1})[-|/]([0-9]{4}))";
	var regexDate = new RegExp(case3);
	var result = document.getElementById("date-error");
	result.innerHTML = "";
	console.log(regexDate.test(birthday.value));
	if(birthday.value === "") {
		result.innerHTML = "Please input your date";
		return false;
	}
	if(!regexDate.test(birthday.value)) {
		result.innerHTML = "Birthday wrong format";
		return false;
	}
	return true;
}
function clearForm() {
	var input_list= document.getElementsByTagName("input");
	var error_list = document.getElementsByClassName("result-validate");
	for (var i =0; i<input_list.length; i++) {
		input_list[i].value = "";
		error_list[i].innerHTML = "";
	}
}
