//start in first slide index of image equal 0
var CURRENT_INDEX = 1;
//list of  images/descrption image/image dots
var images = document.getElementsByClassName("mySlides");
var descriptions = document.getElementsByClassName("description");
var dots = document.getElementsByClassName("dot");
//time to auto transistion by second
var TIME_AUTO_SEC = 4;
//ID of timeout
var ID_TIME_OUT;

/*Load function when startup JS
* @para CURRENT_INDEX
* showSlide func will run with CURRENT_INDEXCURRENT_INDEX
* tranSlide func will auto transition slide start in slide 1
*/
showSlide(CURRENT_INDEX);
//auto transistion slide
// myTimeout = setInterval(function(){showSlide(CURRENT_INDEX += 1);}, TIME_AUTO_SEC*1000);

/* Below func is move to slide next/prev
*@para n
* n is number to plus
* ex: n=1 to next slide
* n=-1 to prev slide
*/
function plusSlide(n) {
	showSlide(CURRENT_INDEX += n);
}
/*move to slide that have index equal index of active dot
*    @para n
* n is number of order dot
*/
function currentSlide(n) {
	showSlide(CURRENT_INDEX = n);
}
/*main function to show slide
* @para n
* n is number of order image
*/
function showSlide(n) {
	var i;
	//case n more than size of images_list will show first image
	if (n > images.length) {CURRENT_INDEX = 1}
	//case n less than size of images_list will show last image
	if (n < 1) {CURRENT_INDEX = images.length}
	//initial to none-display images
	for (i = 0; i < images.length; i++) {
		images[i].style.display = "none";
		descriptions[i].style.display = "none";
		dots[i].style.color = "#000";
	}
	//set to display image have index=CURRENT_INDEX
	images[CURRENT_INDEX-1].style.display = "block";
	descriptions[CURRENT_INDEX-1].style.display = "block"
	dots[CURRENT_INDEX-1].style.color = "#fff";
	/*process to auto transistion to next slide
	* reset time out after active prev/next button or image dots
	*/
	clearInterval(ID_TIME_OUT);
	ID_TIME_OUT = setInterval(function(){showSlide(CURRENT_INDEX += 1);}, TIME_AUTO_SEC*1000);
}
