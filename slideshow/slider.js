var currentIndex = 1;
var myTimeout;
var dots = document.getElementsByClassName("dot");
//display img[0]
showSlide(currentIndex);
// Auto transistion slide
tranSlide();

//process transistion to slide next/prev
function plusSlide(n) {
	showSlide(currentIndex += n);
	clearTimeout(myTimeout);
	myTimeout = setTimeout(tranSlide, 4000);
}
function currentSlide(n) {
	currentIndex = n;
	showSlide(currentIndex);
	clearTimeout(myTimeout);
	myTimeout = setTimeout(tranSlide, 4000);
}
/*
*
*/
function showSlide(n) {
	var i;
	var x = document.getElementsByClassName("mySlides");
	var y = document.getElementsByClassName("description");
	if (n > x.length) {
		currentIndex = 1
	}
	if (n < 1) {currentIndex = x.length}
	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";
		y[i].style.display = "none";
	}
	x[currentIndex-1].style.display = "block";
	y[currentIndex-1].style.display = "block"
}
//auto transistion slide function
function tranSlide() {
	var i;
	var x = document.getElementsByClassName("mySlides");
	var y = document.getElementsByClassName("description");
	for (i = 0; i < x.length; i++) {
	    x[i].style.display = "none";  
	    y[i].style.display = "none";
	}
	if (currentIndex > x.length) {currentIndex = 1}
	y[currentIndex-1].style.display = "block";
	x[currentIndex-1].style.display = "block";
	currentIndex++;
	myTimeout = setTimeout(tranSlide, 4000);    
}
