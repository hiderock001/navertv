// dizia  mobiwoos@naver.com

(function($){
	$.fn.diziaMovie = function(opt){
		opt = $.fn.extend({
			src : "",
			width : 0,
			fix : true,
			height : opt.width * 0.5625, // 16:9로 자동 설정되는 세로 크기
			right : false,
			controls : true,
			autoplay : false,
			loop : false,
			muted : false
		},opt);

		var _that = $(this);
		var movie = {
			init : function(){
				_that.append("<div class='ni-video'><div class='ni-inner'><video></video></div></div>");
				movie.render();
			},
			render : function(){
				var wrap = $(".ni-video");
				var innerDiv = $(".ni-inner");
				var target = $(".ni-video .ni-inner video");
				wrap.css({
					width : opt.width,
					height : opt.height
				});
				target.attr({"width":opt.width,"height":opt.height,"src":opt.src});
				opt.controls ? target.attr("controls",true) : target.attr("controls",false);
				opt.autoplay ? target.attr("autoplay",true) : target.attr("autoplay",false);
				opt.loop ? target.attr("loop",true) : target.attr("loop",false);
				opt.muted ? target.prop("muted",true) : target.prop("muted",false);
				movie.controls(wrap,innerDiv,target);
					
			},
			controls : function(wrap,innerDiv,target){
				var offTop = wrap.offset().top,originalX,oldX,originalY,isDown=false,isClick = false,sWidth = 384,sHeight = sWidth * 0.5625
				$(window).scroll(function(){
					var scrollTop = $(window).scrollTop();
					if(opt.fix == true){
						if(scrollTop > offTop + opt.height){
							target.attr({"width":sWidth,"height":sHeight});
							innerDiv.css({"position":"fixed","z-index":9999});
							if(!isClick){
								opt.right ? innerDiv.css({"left":window.innerWidth - (sWidth + 50),"top": window.innerHeight - (sHeight + 100)}) : $(".ni-inner").css({"left":50,"top":window.innerHeight - (sHeight + 100)});
							}
							innerDiv.on("mousedown",function(e){
								touchStart(e);	
							});
							innerDiv.on("mousemove",function(e){
								touchMove(e);	
							});
							innerDiv.on("mouseup",function(e){
								touchUp(e);	
							});
						}else{
							$(".ni-inner").css({"position":"static"});
							target.attr({"width":opt.width,"height":opt.height});
						}
					}
				});

				function touchStart(e){
					oldX = originalX = e.pageX;
					oldY = originalY = e.pageY;
					isDown = true;
					isClick = true;
					e.preventDefault();
				}
				function touchMove(e){
					if(isDown){
						var distanceX = oldX - e.pageX;
						var distanceY = oldY - e.pageY;
						oldX = e.pageX;
						oldY = e.pageY;
						innerDiv.css({
							left : "-=" + distanceX,
							top : "-=" + distanceY
						},0);	
						if(parseInt(innerDiv.css("left")) + sWidth >=  window.innerWidth - 17){
							innerDiv.css("left",(window.innerWidth - 17)-sWidth);
						}else if(parseInt(innerDiv.css("left")) <= 0){
							innerDiv.css("left",0);
						}else if(parseInt(innerDiv.css("top")) + sHeight >=  window.innerHeight){
							innerDiv.css("top",window.innerHeight-sHeight);
						}else if(parseInt(innerDiv.css("top")) <= 0){
							innerDiv.css("top",0);
						}else{
							return
						}
					}
					e.preventDefault();
				}
				function touchUp(e){
					isDown = false;
					e.preventDefault();
				}
			}
		};
		movie.init();	
	}
})(jQuery);