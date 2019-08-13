﻿    MAX_DEPTH = 50;
 
    var canvas, ctx;
    var stars = new Array(512);
	var windowWidth = 1000;
	var windowHeight=150;


console.log('... site.js has loaded ...');

window.addEventListener('DOMContentLoaded', function (event) {
    console.log("DOM fully loaded and parsed");
	document.getElementById("closebtn").style.display = "none";
    addEvents();
    //initSlideshow();


});




function openNav() {
    console.log("Open Nav Clicked");
	setTimeout(function(){document.getElementById("closebtn").style.display = "block";}, 500);		// show close button after waiting 0.5 seconds
    document.getElementById("main-nav").style.width = "100%";


	//	document.getElementById("closebtn").style.vertical-align = "top";
	
}

function closeNav() {
    console.log("Close Nav Clicked");
    document.getElementById("main-nav").style.width = "0%";
		document.getElementById("closebtn").style.display = "none";
}

function accordion() {

    var acc = document.getElementsByClassName("accordion");
    var i;
    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
}


function addEvents() {
	console.log(" ------------  in addEvents");
canvas = document.getElementById("starfield");
	if( canvas && canvas.getContext ) {
		console.log("in if statement");
        ctx = canvas.getContext("2d");
        initStars();
		var timing = 35;		// timing is the time (in millisecons) between star movement (greater timing, slower speed)
		var decelerate=10;				// rate of deceleration of stars at beginning
		for (i=1; i<timing; i=i+decelerate)
		{
			if (decelerate>1)
				decelerate--;			// reduce the rate of deceleration
			for (j=1; j<(i*(10-decelerate)); j++)		// stay longer at the larger timings (so that deceleration is gradual)
			{
				setTimeout(loop, i);
			}
		}
        setInterval(loop,timing);
    }
    //document.getElementById('buttonA').addEventListener('click', function () {changeBgColor(this);});
}


var currentImg;
var imgArray;

function initSlideshow() {
    currentImg = 0;
    imgArray = getChildrenById('slide-img');
    displaySlideButtons(true);
    fadeImage(currentImg);
    setInterval(function () { plusSlides(1); }, 2000); // Change image every 2 seconds
}


function fadeImage(x) {
    for (var i = 0; i < imgArray.length; i++) {
        imgArray[i].style.opacity = 0;
    }
    imgArray[x].style.opacity = 1;
}

function displaySlideButtons(disp) {
    var buttons = document.getElementsByClassName('slide-buttons');
    for (var i = 0; i < buttons.length; i++) {
        if (disp == true) {
            buttons[i].style.display = 'block';
        }
        else {
            buttons[i].style.display = 'none';
        }
    }
}


function plusSlides(x) {
    //console.log('Move index by: ', x)
    currentImg = currentImg + x;
    if (currentImg == imgArray.length) {
        currentImg = 0;
    }
    else if (currentImg < 0) {
        currentImg = imgArray.length - 1;
    }
    //console.log('Moved index to: ', currentImg)
    fadeImage(currentImg);
}




//This will return an array of all HTML elements of one parent element
function getChildrenById(x) {
    return document.getElementById(x).children;
}

  /* Returns a random number in the range [minVal,maxVal] */
    function randomRange(minVal,maxVal) {
      return Math.floor(Math.random() * (maxVal - minVal - 1)) + minVal;
    }
 
    function initStars() {
		console.log(" ------------------------ in initStars");
		/*
		/   Change the canvas width to be the same as screen width
		*/
		console.log("********** window.innerWidth is "+window.innerWidth);
		windowWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
		canvas.width = windowWidth;
					console.log("********** windowWidth is "+windowWidth);
			console.log("********** canvas.width is "+canvas.width);	

		/*
		/   Change the canvas height to be 20% of the screen height
		*/
		windowHeight = (window.innerHeight > 0) ? window.innerHeight : screen.height;
		console.log('height is '+windowHeight);
		canvas.height= windowHeight/5;
		/*
		/   Create the intial stars
		*/
      for( var i = 0; i < stars.length; i++ ) {
        stars[i] = {
          x: randomRange(-canvas.width/4, canvas.width/4),
          y: randomRange(-canvas.height/4,canvas.height/4),
          z: randomRange(1,MAX_DEPTH)
         }
      }

    }
 
    function loop() {
		/*
		//  first check if the dimensions of the window have changed
		*/
		if ((windowWidth != window.innerWidth) && (window.innerWidth > 0))
		{
			windowWidth=window.innerWidth;
			canvas.width=windowWidth;
		}
		if ((windowHeight != window.innerHeight) && (window.innerHeight > 0)){
			windowHeight=window.innerHeight;
			canvas.height=windowHeight/5;
		}
		/*
		// declare varibles to help with placing of text and stars
		*/
		var halfWidth  = canvas.width/2;
		var halfHeight = canvas.height / 2;
		var dimRatio = canvas.width/canvas.height;
		/*
		// declare varibles for colouring the canvas (background, stars, text)
		*/
		var colorBlack = "rgb(0,0,0)";
		var colorMidnight = "rgb(0,0,51)";
		var colorLightBlue = "rgb(0,0,255)";
		var colorWhite = "rgb(255,255,255)";
	  	/*
		/  make the backcolor black, but fade to dark blue (midnight) at bottom
		*/
	  var fill_gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
	  fill_gradient.addColorStop(0, colorBlack);
	  fill_gradient.addColorStop(1, colorMidnight);
	  ctx.fillStyle = fill_gradient;
      ctx.fillRect(0,0,canvas.width,canvas.height);
	   
      for( var i = 0; i < stars.length; i++ ) {
        stars[i].z -= 0.2;
 
        if( stars[i].z <= 0 ) {
          stars[i].x = randomRange(-halfWidth/2, halfWidth/2);
          stars[i].y = randomRange(-halfHeight/2,halfHeight/2);
          stars[i].z = MAX_DEPTH;
        }
 
        var k  = 128.0/stars[i].z;
        var px = stars[i].x * k + halfWidth;
        var py = stars[i].y * k + halfHeight;
 
        if( px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height ) {
			var size = (1.0 - stars[i].z / MAX_DEPTH) * 10;
			var pxc = px + (size/2)		// x co-ordinate of the centre of radial gradient of star
			var pyc = py + (size/2)		// y co-ordinate of the center of radial gradent of star
			var starGradient = ctx.createRadialGradient(pxc, pyc, 0, pxc, pyc, size/2);
			if (Math.random()>0.9)				// give star a blue tinge 10% of time for "twinkling" effect
				starGradient.addColorStop(0,colorLightBlue);
			else
				starGradient.addColorStop(0, colorWhite);
			starGradient.addColorStop(1, colorBlack);

		// Fill with gradient
		ctx.fillStyle = starGradient;
          ctx.fillRect(px,py,size,size);
        }
      }
	  	  /*
	  /    draw the heading text.
	  */
		var fontSize = parseInt(canvas.height/3.0);
		ctx.font= fontSize + "px Georgia, serif";
		ctx.textAlign = "center";
		//var textGradient = ctx.createRadialGradient(halfWidth, canvas.height/1.65, 0, halfWidth, canvas.height/1.65, canvas.height);
		//textGradient.addColorStop(0,"white");
		//textGradient.addColorStop(1,colorLightBlue);
		var text_gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
		text_gradient.addColorStop(0,colorLightBlue);
		text_gradient.addColorStop(1,colorWhite);
		ctx.fillStyle = text_gradient;
		ctx.fillText("Star Life Technologies", halfWidth, canvas.height/1.65); 
    }

