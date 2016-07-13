/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-07-12 17:54:46
 * @version $Id$
 */
//基于单位为rem的移动端轮播和触控滑动插件
//A carousel and swipe plug-in used on mobile front-end, triggered by touch events based on "rem" and Native implementation 

var carouselSwipe=function(settingobj){
	 //创建所需的元素
	 //create the elements that we need;
     this.play(settingobj);
}
carouselSwipe.prototype={
       	 play:function(obj){
	        var outercon=document.createElement("div");
		    outercon.className+="carouselSwipe";

		    var innercon=document.createElement("div");
		    innercon.className+="cs-innercon";
		    var ul=document.createElement("ul");
		    var li=document.createElement("li");
		    for(var i=0;i<obj.licount;i++){
		    	var li=document.createElement("li");
		    	var a=document.createElement("a");
                $(a).attr("href","#");
		    	var img=document.createElement("img");
		    	img.src=obj.imgsrc[i];
		    	a.appendChild(img);
		    	li.appendChild(a);
		    	ul.appendChild(li);
		    }
		   innercon.appendChild(ul);
           var hintcon=document.createElement("div");
           hintcon.className+="carouselSwipe-hintcon";
           for(var j=0;j<obj.licount;j++){
           	  var spans=document.createElement("span");
           	  if(j==0){
           	  	spans.className+="carouselSwipe-hinton";
           	  }
              hintcon.appendChild(spans);
           }
           outercon.appendChild(innercon);
           outercon.appendChild(hintcon);
           $(outercon).insertAfter(obj.prevele);

            var container=document.querySelector(".carouselSwipe");
            var imgnum=ul.children.length;
    		var imgwidth=parseInt($(container).css("width"))/37.5;
    		var cloneli=ul.children[0].cloneNode(true);
            console.log(cloneli);
            var cloneli1=ul.children[imgnum-1].cloneNode(true);
            console.log(cloneli1);
    		var span=outercon.querySelectorAll("span");          
    		$(ul).append(cloneli);
            $(cloneli1).insertBefore(ul.children[0]);
            var li=ul.querySelectorAll("li");

    		var timer;
            var autoplay=function(){
    	        clearInterval(timer);
    	        timer=setInterval(function(){
    			     animateright();},obj.delay);
            }

            var count=1;
            var animateright=function(){
                 count++;
                if(count==imgnum+1){
                	count=1;
                	$(ul).css("transform","translateX(0)");
                }
                $(ul).animate({translateX:-1*count*imgwidth+"rem"},obj.duration)
                for(var i=0;i<span.length;i++){
                	span[i].className="";
                }
                if(count>imgnum){
                	span[0].className="carouselSwipe-hinton";
                }else{
                span[count-1].className="carouselSwipe-hinton";}
            }
            var animateleft=function(){
               count--;
                if(count==0){
                	count=imgnum;               	
                	$(ul).css("transform","translateX("+-1*(count+1)*imgwidth+"rem"+")");
                }                
                 $(ul).animate({translateX:-1*count*imgwidth+"rem"},obj.duration);
                 for(var i=0;i<span.length;i++){
                	span[i].className="";
                }
                if(count<1){
                	span[imgnum-1].className="carouselSwipe-hinton";
                }else{
                span[count-1].className="carouselSwipe-hinton";}
            }

            for(var i=0;i<li.length;i++){
                 li[i].index=i;
                 var pagex,pagex1,x,y;          
                 li[i].ontouchstart=function(e){
                 	clearInterval(timer);
                 	var touch=e.touches[0];
                 	 pagex=touch.pageX;                 	
            	  }
            	  var ulleft;                  
                 li[i].ontouchmove=function(e){
                 	var touch=e.touches[0];
                 	 pagex1=touch.pageX;
                     y=pagex1-pagex;
                     x=(pagex1-pagex)/37.5+ulleft;
                 	 ulleft=-1*this.index*10;                    
                 	 if(ulleft==-(img.length-2)*imgwidth&&y<0){
                 	 	ulleft=0;                                                
                 	 }if(ulleft==-(img.length-2)*imgwidth&&y>0){
                        ulleft=-(img.length-2)*imgwidth;                       
                     }
                     if(ulleft==-10&&y<0){
                        ulleft=-10;                       
                     }
                     $(".carouselSwipe ul").css("transform","translateX("+x+"rem"+")");
                     if(ulleft==-10&&y>0){
                        ulleft=-(img.length-1)*imgwidth;
                     }                 	 
                 	 $(".carouselSwipe ul").css("transform","translateX("+x+"rem"+")");
                 }
                 li[i].ontouchend=function(e){
                 	count=this.index;
                 	if(y<0){
                 	if(ulleft==0){
                 		$(ul).animate({translateX:-1*count*10+"rem"},obj.duration);
                 	}                 	
                    animateright();}
                    else{
                        if(ulleft==-(img.length-1)*imgwidth){
                            $(ul).animate({translateX:-(img.length-1)*imgwidth+"rem"},obj.duration);
                        }
                        animateleft();}                    
                     autoplay();
                  }
                 }           
            autoplay();       	 
           }
}
