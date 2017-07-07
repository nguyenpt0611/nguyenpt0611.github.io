var MONTH_OF_YEAR = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var DAY_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

var table;
var cells_of_table;
var header_label;

TODAY = new Date();
var CURR_MONTH;
var CURR_YEAR;

//calendar on screen
curr_cal = new Date();

var input = document.getElementById("output-date");

input.addEventListener("click", function () {
	
	if (input.value == ""){

		CURR_MONTH = TODAY.getMonth();
		CURR_YEAR = TODAY.getFullYear();
		showCalendar(CURR_MONTH, CURR_YEAR);
	}else{
		var month = input.value.split("-")[1];
		var year = input.value.split("-")[2];
		showCalendar(month-1, year);
	}
});

/*selectDay on calendar
*selectDay func add event onClick to cells_of_table
*showDay func use to stick & select day in cell
*/
function selectDay() {
	for (var i=0; i<cells_of_table.length; i++) {
		// cells_of_table[i].setAttribute("onclick", "showDay(this)");
		cells_of_table[i].addEventListener("click", function () {
			showDay(this);});
	}
}
function showDay(day) {
	for (var i=0; i<cells_of_table.length; i++) {
		if(cells_of_table[i].classList.contains("active"))
			cells_of_table[i].classList.remove("active");
		if(cells_of_table[i].classList.contains("default"))
			cells_of_table[i].classList.remove("default");
	}
	day.classList.add("active");

	if(day.classList.contains("before"))
	{
		var month = indexOfMonth(header_label.innerHTML.split(" ")[0]) - 1;
		var year = header_label.innerHTML.split(" ")[1];
		if(month<1) {year--; month= 12;};
		input.value = day.innerHTML + "-" + month + "-" + year;
	}else
	if(day.classList.contains("after"))
	{
		var month = indexOfMonth(header_label.innerHTML.split(" ")[0]) + 1;
		var year = header_label.innerHTML.split(" ")[1];
		if(month>12) {year++; month = 1;}
		input.value = day.innerHTML + "-" + month + "-" + year ;
	}else {
		var month = indexOfMonth(header_label.innerHTML.split(" ")[0]);
		input.value = day.innerHTML + "-" + month + "-" + header_label.innerHTML.split(" ")[1] ;
	}

	//unshow calendar after chooseDate
	var cal = document.getElementById("cal");
	cal.parentNode.removeChild(cal);
}
//show calendar of next month
function btn_prev() {
	if (document.getElementsByClassName("today").length != 0){
		document.getElementsByClassName("today")[0].classList.remove("today");
	}
	if (document.getElementsByClassName("default").length != 0){
		document.getElementsByClassName("default")[0].classList.remove("default");
	}
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
	if (document.getElementsByClassName("today").length != 0){
		document.getElementsByClassName("today")[0].classList.remove("today");
	}
	if (document.getElementsByClassName("default").length != 0){
		document.getElementsByClassName("default")[0].classList.remove("default");
	}
	CURR_MONTH += 1;
	if (CURR_MONTH < 11){
		showCalendar(CURR_MONTH, CURR_YEAR);
	}else {
		CURR_MONTH  = 0;
		CURR_YEAR +=1;
		showCalendar(CURR_MONTH, CURR_YEAR);
	}
}
//main func to show calendar
function showCalendar(month, year) {
	//first Day of curr_month
	var first_of_month = new Date(MONTH_OF_YEAR[month] + " " + 1 + " " + year);
	var last_of_month = new Date(year, month+1, 0);//get num_of_day in month
	var num_of_month = last_of_month.getDate();
	create_Calendar(first_of_month, num_of_month);
}
//create empty_cal
function create_Empty_Calendar() {
	var input = document.getElementById("input");
	var div = document.createElement("div");
	div.id = "cal";
	input.parentNode.appendChild(div);
	var header = document.createElement("div");
	header.className = "header";

	var left_button = document.createElement("span");
	left_button.classList.add("left");
	left_button.classList.add("button");
	left_button.id = "prev";
	left_button.setAttribute("onclick","btn_prev()");
	left_button.innerHTML = " &lang; ";

	var right_button = document.createElement("span");

	right_button.classList.add("right");
	right_button.classList.add("button");
	right_button.id = "next";
	right_button.setAttribute("onclick","btn_next()");
	right_button.innerHTML = " &rang; ";
	var label = document.createElement("span");
	label.className = "month-year";
	label.id = "label";
	
	header.appendChild(left_button);
	header.appendChild(label);
	header.appendChild(right_button);

	div.appendChild(header);

	var top_table = document.createElement("table");
	top_table.id = "days";
	for (var i=0;i<DAY_OF_WEEK.length; i++) {
		var tmp = document.createElement("td");
		tmp.innerHTML = DAY_OF_WEEK[i];
		top_table.appendChild(tmp);
	}
	div.appendChild(top_table);

	var  cal_frame = document.createElement("div");
	cal_frame.id= "cal-frame";
	var cal_table = document.createElement("table");
	cal_table.className = "cal-table";
	var tbody = document.createElement("tbody");
	for (var i=0; i<6; i++) {
		var tr = document.createElement("tr");
		for (var j=0; j<7; j++) {
			var td = document.createElement("td");
			tr.appendChild(td)
		}
		tbody.appendChild(tr);
	}
	cal_frame.appendChild(tbody);
	div.appendChild(cal_frame);
	//get cells_of_table
	table = document.getElementById("cal-frame");
	cells_of_table = table.getElementsByTagName("td");
}
function clear_Calendar() {
	var calendar = document.getElementById("cal");
	if(calendar != null)
		calendar.parentNode.removeChild(calendar);
}
//get calendar from a day in month and num_of_day in this month
function create_Calendar(first_day, last_of_month) {
	clear_Calendar();
	create_Empty_Calendar();
	header_label = document.getElementById("label");

	/*get cell in table*/
	var cal_frame = document.getElementById("cal-frame");
	var rows_table = cal_frame.getElementsByTagName("td");
	//set value of label
	header_label.innerHTML = MONTH_OF_YEAR[first_day.getMonth()] + " " + first_day.getFullYear();

	//display day of month
	for ( var i=0;i<rows_table.length; i++){
		//days of before curr_month
		if(i<first_day.getDay()){
			rows_table[i].innerHTML = getDaysOfBeforeMonth(first_day) - (first_day.getDay() - 1 - i);
			rows_table[i].classList.add("before");
		}else {
		    var index = i - first_day.getDay() +1;//value to fill cell
		    if(index <= last_of_month)
		    {
		        rows_table[i].innerHTML = index;	
		        if (first_day.getMonth() == TODAY.getMonth()) {
		            if (index == TODAY.getDate())
		        	    rows_table[i].classList.add("today");
		        }else {
		        	if (index == 1) {
		        		rows_table[i].classList.add("default");
		        	}
		        }
		    }
		//days of after curr_month
		    else {
		        	rows_table[i].innerHTML = i - last_of_month - first_day.getDay() + 1;	
		        	rows_table[i].classList.add("after");	
		    }
		}
	}
	//create selector for cells_of_table;
	selectDay();
}
function getDaysOfBeforeMonth(date) {
	var newDate = new Date(date.getFullYear(), date.getMonth(), 0);
	return newDate.getDate();
}
// function getDaysOfMonth(date) {
// 	var last_of_month = new Date(date.getFullYear(), MONTH_OF_YEAR[date.getMonth()] + 1, 0);
// 	return last_of_month.getDate();
// }
function indexOfMonth(name) {
	for (var i=0; i<MONTH_OF_YEAR.length; i++){
		if (MONTH_OF_YEAR[i] == name)
			return i+1;
	}
}