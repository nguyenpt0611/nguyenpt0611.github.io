var MONTH_OF_YEAR = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var DAY_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

TODAY = new Date();
var CURR_MONTH = TODAY.getMonth();
var CURR_YEAR = TODAY.getFullYear();
//calendar on screen
curr_cal = new Date();

showCalendar(CURR_MONTH, CURR_YEAR);
	
function btn_prev() {
		// var parrent = document.getElementById("cal-frame");
		// var child = document.getElementsByClassName("curr");
		// parrent.removeChild(child[0]);
	if (document.getElementById("today") != null) 
		document.getElementById("today").removeAttribute("id");
	if (document.getElementById("default") != null) 
		document.getElementById("default").removeAttribute("id");
	CURR_MONTH -= 1;
	if (CURR_MONTH > 0)
	{
		showCalendar(CURR_MONTH, CURR_YEAR);
	}else {
		CURR_YEAR -= 1;
		CURR_MONTH = 11;
		showCalendar(CURR_MONTH, CURR_YEAR);
	}
}
function btn_next() {
	// var parrent = document.getElementById("cal-frame");
	// var child = document.getElementsByClassName("curr");
	// parrent.removeChild(child[0]);
	if (document.getElementById("today") != null) 
		document.getElementById("today").removeAttribute("id");
	if (document.getElementById("default") != null) 
		document.getElementById("default").removeAttribute("id");
	CURR_MONTH += 1;
	if (CURR_MONTH < 11)
	{
		showCalendar(CURR_MONTH, CURR_YEAR);
	}else {
		CURR_MONTH  = 0;
		CURR_YEAR +=1;
		showCalendar(CURR_MONTH, CURR_YEAR);
	}
}
function showCalendar(month, year) {
	
	//first Day of curr_month
	var first_of_month = new Date(MONTH_OF_YEAR[month] + " " + 1 + " " + year);
	var last_of_month = new Date(year, month+1, 0);//get num_of_day in month
	var num_of_month = last_of_month.getDate();

	create_Calendar(first_of_month, num_of_month);
}
//get calendar from a day in month and num_of_day in this month
function create_Calendar(first_day, last_of_month) {
	/*get cell in table*/
	var cal_frame = document.getElementById("cal-frame");
	var rows_table = cal_frame.getElementsByTagName("td");
	//set value of label
	document.getElementById("label").innerHTML = MONTH_OF_YEAR[first_day.getMonth()] + " " + first_day.getFullYear();
	//display day of month
	for ( var i=0;i<rows_table.length; i++){
		//days of before curr_month
		if(i<first_day.getDay()){
			rows_table[i].innerHTML = getDaysOfBeforeMonth(first_day) - (first_day.getDay() - 1 - i);
		}else {
		    var index = i - first_day.getDay() +1;//value to fill cell
		    console.log(first_day.getDay());
		    if(index <= last_of_month)
		    {
		        rows_table[i].innerHTML = index;	
		        if (first_day.getMonth() == TODAY.getMonth()) {
		            if (index == TODAY.getDate())
		        	    rows_table[i].id = "today";
		        }else {
		        	if (index == 1) {
		        		rows_table[i].id = "default";
		        	}
		        }
		    }
		//days of after curr_month
		else {
		    rows_table[i].innerHTML = i - last_of_month - first_day.getDay() + 1;		
		}
		}
	}
}
function getDaysOfBeforeMonth(date) {
	var newDate = new Date(date.getFullYear(), date.getMonth(), 0);
	return newDate.getDate();
}
// function getDaysOfMonth(date) {
// 	var last_of_month = new Date(date.getFullYear(), MONTH_OF_YEAR[date.getMonth()] + 1, 0);
// 	return last_of_month.getDate();
// }
