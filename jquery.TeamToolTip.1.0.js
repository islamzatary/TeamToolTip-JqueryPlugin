//************************************************************************
// ToolTipTeam - Jquery Plugin
// allow you to add tooltip bubble to each member in the team
// ToolTipTeam version 1.0
// Author: twitter: @islamzatary, my blog: (http://www.islamzatary.com)
// Created on June 09, 2012
//*************************************************************************
(function( $ ){
	$.fn.TeamToolTip = function( options ) {
		// Create some defaults, extending them with any options that were provided
		var settings = $.extend( {
			// JSON File Path
			JsonFile : 'team_memeber.json',
			// View Border Fadeout 
			ViewBorderFadeout : true,
			// Tool Tip Direction of character, there is three direction: 1. default(left_right) 2. top 3. down
			TipPosition: 'left_right',
			// Tool Tip Width of box
			TipWidth : '200px',
			// Tool Tip Background color of box
			TipBackground : '#DDD',
			// Tool Tip Border Radius of box
			TipBorderRadius : '8px'
		}, options);
	
		return this.each(function() {
			Imgwidth = $(this).children("img").width(); //get width
			Imgheight = $(this).children("img").height(); //get height
			ImgPath = $(this).children("img").attr("src"); //get source
			$(this).css("position","relative");
			$(this).children("img").remove(); //remove from DOM
			
			$(this).append("<div style='width:"+Imgwidth+"px;height:"+Imgheight+"px;background-image:url("+ImgPath+")' class='bayt_team_img'></div>");
			var memeber_html = "";
			// Show Loading when ajax starting
			$("#loading").ajaxStart(function(){
				$(this).show();
			});
			// Show Loading when ajax finished
			$("#loading").ajaxStop(function(){
				$(this).hide();
			});
			// Disable asynchronously, to ensure load and manipulate json file completely.  
			$.ajaxSetup({async: false});//To ensure the ajax work a synchronously
			$.getJSON('' + settings.JsonFile + '', function (data) {
				$.each(data, function (entryIndex, entry) {				
					var top_style="", left_position_append="";
					if (settings.TipPosition == "top") {
						top_style = "top:-125%;left:50%;";
					} else if (settings.TipPosition == "down") {
						top_style = "top:75%;left:50%;";
					} else {
						top_style="top:-20px;"
						if (entry['left'] < (Imgwidth/2) ) {
							left_position_append = "left:170px;";
							
						} else {
							left_position_append = "left:-135px;";
							
						}
					}
					// Block tag and style to each character.
					memeber_html += "<a style='left:" + entry['left'] + "px; \
											   top:" + entry['top'] + "px; \
											   text-decoration:none; \
											   position:absolute; \
											   width:40px; \
											   height:60px; \
											   border:1px solid #CCC; \
											   display:block;' \
										class='tooltiplink " + entry['id'] + "' href='#"+ entry['id'] +"'> \
										<div class='tooltip_team ' style='" + top_style + " \
																		display:none; \
																		cursor:pointer; \
																		"+left_position_append+" \
																		background:"+settings.TipBackground+"; \
																		border-radius:"+settings.TipBorderRadius+"; \
																		width:"+settings.TipWidth+"; \
																		position:relative;z-index: 999; \
																		margin-left:-115px; \
																		padding:15px; \
																		color:#000; \
																		opacity:0.85; \
																		border:1px solid #969696; \
																		padding:2px 10px;'> \
														<p style='font-size: 12px;margin:0 0 8px;'> "+entry['desc']+ "</p> \
														<h3 style='font-size:13px;margin: 0 0 5px;'>"+ entry['job_title'] +"</h3> \
														<h2 style='font-size:16px;margin: 0 0 5px;'>"+entry['name']+ "</h2> \
										</div> \
									 </a>";
				});
			});
			$(this).append(memeber_html);
			$.ajaxSetup({async: true});
			 // show/hide the tooltip
			$('.tooltiplink').hover(
				function(){
					$(this).children('.tooltip_team').show();
					$(this).css("border","1px dotted #CCC");
				},function(){
					$(this).children('.tooltip_team').hide();
					$(this).css("border","0px");
			});
			
			// View dotted border with duration 1 sec.
			if (settings.ViewBorderFadeout) {
				if ( $.browser.msie && $.browser.version <= "8.0" ) {
					$('.tooltiplink').css("border","0");
				} else {
					setTimeout(function(){
						var div = $('.tooltiplink');
						$({alpha:1}).animate({alpha:0}, {
							duration: 1000,
							step: function(){
								div.css('border-color','rgba(204, 204, 204,'+this.alpha+')');
							}
						});
					}, 1000);
				}
			} else {
				$(this).children('.tooltip-top, .tooltip-down, .tooltip-left-right').css("border","0px");
			}
			// View Tool Tip if there is character id, this useful to share your tip with social network.
			if(location.hash) {
				var hash_id = location.hash.substr(1); 
				$('.' + hash_id).children('.tooltip_team').show();
			}
		});	
	};
})( jQuery );