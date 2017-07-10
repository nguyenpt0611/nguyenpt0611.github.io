function checkSubmit() {
	if(isUserName() && isPassword() && isEmail() && isDate())
	{
		console.log("success!!!");
	}
}
function isUserName() {
	var username = document.getElementById("user-name");
	var regexUsername = new RegExp("^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$");
	if(username.value.length < 8) {
		document.getElementById("user-error").innerHTML = "Username length min 8 letter";
		return false;
	}
	if(username.value == "") {
		document.getElementById("user-error").innerHTML = "Please input your username";
		return false;
	}
	if(!regexUsername.test(username.value)) {
		document.getElementById("user-error").innerHTML = "Invalid username";
		return false;
	}
	return true;
}
function isPassword() {
	var pwd = document.getElementById("password");
	if(pwd.value.length< 8) {
		document.getElementById("pwd-error").innerHTML = "Password length min 8 letter";
		return false;
	}
	return true;
}
function isEmail() {
	var email = document.getElementById("email");
	var regexEmail = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$");
	if(!regexEmail.test(email.value)) {
		document.getElementById("email-error").innerHTML = "Email wrong format";
		return false;
	}
	return true;
}
function isDate(){
	var birtday = document.getElementById("output-date");
	//case1 YYYY/MM/DD
	var case1 = "(([0-9]{4})[-|/]([1-9]{1}|0[1-9]|1[0-2])[-|/]([1-9]{1}|0[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1}))";
	//case2 DD/MM/YYYY
	var case2 = "(([1-9]{1}|0[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1})[-|/]([1-9]{1}|0[1-9]|1[0-2])[-|/]([0-9]{4}))";
	//case3 MM/DD/YYYY
	var case3 = "(([1-9]{1}|0[1-9]|1[0-2])[-|/]([1-9]{1}|0[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1})[-|/]([0-9]{4}))";
	var regexDate = new RegExp(case1 + "|" + case2 + "|" + case3);
	if(!regexDate.test(birtday.value)) {
		document.getElementById(date-error).innerHTML = "Birthday wrong format";
		return false;
	}
	return true;
}
//for form AJAX
function load() {
	var xhttp;
	if (window.XMLHttpRequest) {
	// code for modern browsers
	xhttp = new XMLHttpRequest();
	}else {
	// code for IE6, IE5
	xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		document.getElementById("demo").innerHTML = this.responseText;
	}
	};
	xhttp.open("GET", "ajax_info.txt", true);
	xhttp.send();
}