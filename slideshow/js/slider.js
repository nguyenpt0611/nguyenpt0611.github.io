var currentIndex = 1;
var myTimeout;

/*Load function when startup JS
* @para currentIndex
* showSlide func will run with currentIndex
* tranSlide func will auto transition slide start in slide 1
*/
showSlide(currentIndex);
tranSlide();


/* Below func is move to slide next/prev
*@para n
* ex: n=1 to next slide
* n=-1 to prev slide
*/
function plusSlide(n) {
	showSlide(currentIndex += n);
	clearTimeout(myTimeout);
	tranSlide();
}


function currentSlide(n) {
	currentIndex = n;
	showSlide(currentIndex);
	clearTimeout(myTimeout);
	tranSlide();
}
/*
*
*/
function showSlide(n) {
	var i;
	var x = document.getElementsByClassName("mySlides");
	var y = document.getElementsByClassName("description");
	var z = document.getElementsByClassName("dot");
	if (n > x.length) {
		currentIndex = 1
	}
	if (n < 1) {currentIndex = x.length}
	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";
		y[i].style.display = "none";
		z[i].style.color = "#000";
	}
	x[currentIndex-1].style.display = "block";
	y[currentIndex-1].style.display = "block"
	z[currentIndex-1].style.color = "#fff";
}
//auto transistion slide function
function tranSlide() {
	var i;
	var x = document.getElementsByClassName("mySlides");
	var y = document.getElementsByClassName("description");
	var z = document.getElementsByClassName("dot");
	for (i = 0; i < x.length; i++) {
	    x[i].style.display = "none";  
	    y[i].style.display = "none";
	    z[i].style.color = "#000";
	}
	if (currentIndex > x.length) {currentIndex = 1}
	y[currentIndex-1].style.display = "block";
	x[currentIndex-1].style.display = "block";
	z[currentIndex-1].style.color = "#fff";
	currentIndex++;
	myTimeout = setTimeout(tranSlide, 4000);    
}