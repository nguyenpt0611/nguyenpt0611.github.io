//List name of months in year
var MONTH_OF_YEAR = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//List name of days in week
var DAY_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/*main table of calendar 
* @var table is display days in calendar
* @var cells_of_table is days in calendar table
*/
var table;
var cells_of_table;
//get now today
TODAY = new Date();
//month, year is showing on calendar
var CURR_MONTH;
var CURR_YEAR;

//add event onclick into input to showCalendar
var input = document.getElementById("output-date");
input.addEventListener("click", function () {
	if (input.value == "") {
		//Display exacly date
		//set value at today
		CURR_MONTH = TODAY.getMonth() + 1;
		CURR_YEAR = TODAY.getFullYear();
		showCalendar();
	}else {
		/*------Check in format Date-----*/
		//case1 YYYY/MM/DD
		if(typeDate(input.value) == 1) {
			//Display with value in input
			CURR_MONTH = parseInt(input.value.split("-")[1]);
			CURR_YEAR = parseInt(input.value.split("-")[0]);
			showCalendar();

		}else
		//case2 DD/MM/YYYY
		if(typeDate(input.value) == 2) {
			console.log(typeDate(input.value));
			//Display with value in input
			CURR_MONTH = parseInt(input.value.split("-")[1]);
			CURR_YEAR = parseInt(input.value.split("-")[2]);
			showCalendar();
		}else
		//case3 MM/DD/YYYY
		if(typeDate(input.value) == 3) {
			console.log(typeDate(input.value));
			//Display with value in input
			CURR_MONTH = parseInt(input.value.split("-")[0]);
			CURR_YEAR = parseInt(input.value.split("-")[2]);
			showCalendar();
		}else {
			window.alert("Input invalid");
			console.log(typeDate(input.value));
		}
	}
});

//main func to show calendar
//get calendar from a day in month and num_of_day in this month
function showCalendar() {
	//first Day of curr_month
	var first_day = new Date(MONTH_OF_YEAR[CURR_MONTH-1] + " " + 1 + " " + CURR_YEAR);
	var last_of_month = new Date(CURR_YEAR, CURR_MONTH, 0);
	//get num_of_day in month
	var num_of_month = last_of_month.getDate();

	clear_Calendar();
	create_Empty_Calendar();

	document.getElementById("select-month").value = CURR_MONTH;
	document.getElementById("select-year").value = CURR_YEAR;

	/*get cell in table*/
	var cal_frame = document.getElementById("cal-frame");
	var rows_table = cal_frame.getElementsByTagName("td");

	//display day of month
	for ( var i=0;i<rows_table.length; i++) {
		//days of before curr_month
		if (i<first_day.getDay()) {
			rows_table[i].innerHTML = getDaysOfBeforeMonth(first_day) - (first_day.getDay() - 1) + i;
			rows_table[i].classList.add("before");
		}else {
		//fill value to cells
			var index = i - first_day.getDay() +1;
			if (index <= num_of_month) {
				rows_table[i].innerHTML = index;	
				if (first_day.getMonth() == TODAY.getMonth() && first_day.getFullYear() == TODAY.getFullYear()) {
			            	if (index == TODAY.getDate()) {
			        	   		rows_table[i].classList.add("today");
			            }
			        	}
			        	else {
			        		if (index == 1) {
			        			rows_table[i].classList.add("default");
			        		}
			        	}
			}
			//days of after curr_month
			else {
				rows_table[i].innerHTML = i - num_of_month - first_day.getDay() + 1;	
			        	rows_table[i].classList.add("after");	
			}
		}
	}
	//Choose a day on calendar then print to input
	chooseDay();
	//create selector for cells_of_table;
	select_Month();
	select_Year();
}
/*check-out text of input
* @para text 
* type YYYY/MM/DD return 1 
* type DD/MM/YYYY return 2 
* type MM/DD/YYYY return 3
* not type of date return 0
*/
function typeDate(text){
	//case1 YYYY/MM/DD
	var case1 = "(([0-9]{4})[-|/]([1-9]{1}|0[1-9]|1[0-2])[-|/]([1-9]{1}|0[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1}))";
	//case2 DD/MM/YYYY
	var case2 = "(([1-9]{1}|0[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1})[-|/]([1-9]{1}|0[1-9]|1[0-2])[-|/]([0-9]{4}))";
	//case3 MM/DD/YYYY
	var case3 = "(([1-9]{1}|0[1-9]|1[0-2])[-|/]([1-9]{1}|0[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1})[-|/]([0-9]{4}))";
	var regexDate = new RegExp(case1).test(text)
	if (regexDate) { return 1; }
	else {
		regexDate = new RegExp(case2).test(text);
		if (regexDate) { return 2; }
		else {
			regexDate = new RegExp(case3).test(text);
			if (regexDate) { return 3; }
		}
	}
	return 0;
}
/*choose month in select-month*/
function select_Month() {
	var option_month = document.getElementById("select-month");
	option_month.onchange = function() {
		CURR_MONTH = option_month.value;
		showCalendar(CURR_MONTH, CURR_YEAR);
	};
}
/*choose year in select-year*/
function select_Year() {
	var option_year = document.getElementById("select-year");
	option_year.onchange = function() {
		CURR_YEAR = parseInt(option_year.value);
		showCalendar(CURR_MONTH, CURR_YEAR);
	};
}
/*selectDay on calendar
*selectDay function add event onClick to cells_of_table
*showDay function use to stick & select day in cell
*/
function chooseDay() {
	for (var i=0; i<cells_of_table.length; i++) {
		// cells_of_table[i].setAttribute("onclick", "showDay(this)");
		cells_of_table[i].addEventListener("click", function () {
			showDay(this);});
	}
}
/*showDay function*/
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
		var month = CURR_MONTH-1;
		var year = CURR_YEAR;
		if(month<1) {year--; month= 12;};
		input.value = day.innerHTML + "-" + month + "-" + year;
	}
	else 
	if(day.classList.contains("after"))
	{
		var month = CURR_MONTH + 1;
		var year = CURR_YEAR;
		if(month>12) {year++; month = 1;}
		input.value = day.innerHTML + "-" + month + "-" + year ;
	}
	else {
		var month = CURR_MONTH;
		var year = CURR_YEAR;
		input.value = day.innerHTML + "-" + month + "-" + year;
	}

	//unshow calendar after chooseDate
	var cal = document.getElementById("cal");
	cal.parentNode.removeChild(cal);
}

/*move to prev/next month
* @para n
* n is number to plus
* ex: n=1 to next month
* n=-1 to prev month
*/
function plus_month(n) {
	if (document.getElementsByClassName("today").length != 0){
		document.getElementsByClassName("today")[0].classList.remove("today");
	}
	if (document.getElementsByClassName("default").length != 0){
		document.getElementsByClassName("default")[0].classList.remove("default");
	}
	CURR_MONTH += n;

	if (CURR_MONTH > 0 && CURR_MONTH < 13)
	{
		showCalendar(CURR_MONTH, CURR_YEAR);
	}
	else {
		if (CURR_MONTH == 0) {
			CURR_YEAR -= 1;
			CURR_MONTH = 12;
			showCalendar(CURR_MONTH, CURR_YEAR);
		}
		else {
			CURR_YEAR += 1;
			CURR_MONTH = 1;
			showCalendar(CURR_MONTH, CURR_YEAR);
		}
	}	

}
/*move to prev/next year
* @para n
* n is number to plus
* ex: n=1 to next year
* n=-1 to prev year
*/
function btn_plus_year(n) {
	if (document.getElementsByClassName("today").length != 0){
		document.getElementsByClassName("today")[0].classList.remove("today");
	}
	if (document.getElementsByClassName("default").length != 0){
		document.getElementsByClassName("default")[0].classList.remove("default");
	}
	CURR_YEAR += n;

	if (CURR_YEAR > 1950 && CURR_YEAR < (TODAY.getFullYear() + 200))
	{
		showCalendar(CURR_MONTH, CURR_YEAR);
	}
	else {
		//reset calendar to current time
		CURR_YEAR = TODAY.getFullYear();
		showCalendar(CURR_MONTH, CURR_YEAR);
	}
}
/*create empty_cal*/
function create_Empty_Calendar() {
	var input = document.getElementById("input");
	var div = document.createElement("div");

	div.id = "cal";
	input.parentNode.appendChild(div);

	/*----------  Create header of calendar ----------*/
	var header = document.createElement("div");
	header.className = "header";

	//create prev_month button
	var left_button = document.createElement("span");
	left_button.classList.add("left");
	left_button.classList.add("button");
	left_button.id = "prev";
	left_button.setAttribute("onclick","plus_month(-1)");
	left_button.innerHTML = " &lang; ";

	//create next_month button
	var right_button = document.createElement("span");
	right_button.classList.add("right");
	right_button.classList.add("button");
	right_button.id = "next";
	right_button.setAttribute("onclick","plus_month(1)");
	right_button.innerHTML = " &rang; ";

	//create prev_year button
	var left_button2 = document.createElement("span");
	left_button2.classList.add("left2");
	left_button2.classList.add("button");
	left_button2.id = "prev2";
	left_button2.setAttribute("onclick","btn_plus_year(-1)");
	left_button2.innerHTML = " &lang; ";

	//create next_year button
	var right_button2 = document.createElement("span");
	right_button2.classList.add("right2");
	right_button2.classList.add("button");
	right_button2.id = "next2";
	right_button2.setAttribute("onclick","btn_plus_year(1)");
	right_button2.innerHTML = " &rang; ";

	//create select-month to choose month
	var select_month = document.createElement("select");
	for (var i=0; i<MONTH_OF_YEAR.length; i++){
		var option_month = document.createElement("option");
		option_month.value = i+1;
		option_month.text = MONTH_OF_YEAR[i];
		select_month.appendChild(option_month);
	}
	select_month.id = "select-month";

	//create select-year to choose year
	var select_year = document.createElement("select");
	for (var i=1950; i<TODAY.getFullYear()+200; i++){
		var option_year= document.createElement("option");
		option_year.value = i;
		option_year.text = i;
		select_year.appendChild(option_year);
	}
	select_year.id = "select-year";

	//append node childs of header into node parent
	header.appendChild(left_button);
	header.appendChild(select_month);
	header.appendChild(right_button);
	header.appendChild(left_button2);
	header.appendChild(select_year);
	header.appendChild(right_button2);

	div.appendChild(header);
	/*----------  End header of calendar  ----------*/

	/*----------  Create table of calendar ----------*/
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

	//append node childs of table into cal-frame
	cal_frame.appendChild(tbody);
	div.appendChild(cal_frame);

	//get cells into cells_of_table para
	table = document.getElementById("cal-frame");
	cells_of_table = table.getElementsByTagName("td");
}
/*to remove old-calendar*/
function clear_Calendar() {
	var calendar = document.getElementById("cal");
	if (calendar != null) {
		calendar.parentNode.removeChild(calendar);
	}
}
/*get Number day of a month
* @para date {date}
*/
function getDaysOfBeforeMonth(date) {
	var newDate = new Date(date.getFullYear(), date.getMonth(), 0);
	return newDate.getDate();
}
/*get index for month_name
* @para name is name of month
* return index of month from MONTH_OF_YEAR
*/
function indexOfMonth(name) {
	for (var i=0; i<MONTH_OF_YEAR.length; i++) {
		if (MONTH_OF_YEAR[i] == name) {
			return i+1;
		}
	}
}