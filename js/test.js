/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-07-13 11:19:43
 * @version $Id$
 */
		Zepto(function($){
	   var html=document.getElementsByTagName('html')[0];
 	   var std= window.innerWidth / 10 ;
 	   console.log(std);
       if(std>54){
      	std=54;
        }
       html.style.fontSize = std + 'px';
		   var carousel=new carouselSwipe({
					licount:5,
	                imgsrc:["images/carousel2.jpg","images/carousel3.jpg","images/carousel4.jpg","images/carousel5.jpg","images/carousel1.jpg"],
	               delay:3000,
	               duration:500,
	               prevele:".prevele"
			});
		})
