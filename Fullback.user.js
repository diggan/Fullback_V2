// ==UserScript==
// @name           Fullback V2
// @namespace      flashback
// @description    Skriptet för dig som önskar att Flashback var så mycket mera
// @include        https://www.flashback.org/*
// @version        0.2.0
// ==/UserScript==

/*! jQuery v1.7.1 jquery.com | jquery.org/license */
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "jQuery.noConflict();(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {

	/*! jQuery Cookie Plugin */
jQuery.cookie=function(a,b,c){if(arguments.length>1&&(b===null||typeof b!=="object")){c=jQuery.extend({},c);if(b===null){c.expires=-1}if(typeof c.expires==="number"){var d=c.expires,e=c.expires=new Date;e.setDate(e.getDate()+d)}return document.cookie=[encodeURIComponent(a),"=",c.raw?String(b):encodeURIComponent(String(b)),c.expires?"; expires="+c.expires.toUTCString():"",c.path?"; path="+c.path:"",c.domain?"; domain="+c.domain:"",c.secure?"; secure":""].join("")}c=b||{};var f,g=c.raw?function(a){return a}:decodeURIComponent;return(f=(new RegExp("(?:^|; )"+encodeURIComponent(a)+"=([^;]*)")).exec(document.cookie))?g(f[1]):null}

//jQuery Hotkeys Plugin
shortcut = {
	'all_shortcuts':{},//All the shortcuts are stored in this array
	'add': function(shortcut_combination,callback,opt) {
		//Provide a set of default options
		var default_options = {
			'type':'keydown',
			'propagate':false,
			'disable_in_input':false,
			'target':document,
			'keycode':false
		}
		if(!opt) opt = default_options;
		else {
			for(var dfo in default_options) {
				if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
			}
		}

		var ele = opt.target;
		if(typeof opt.target == 'string') ele = document.getElementById(opt.target);
		var ths = this;
		shortcut_combination = shortcut_combination.toLowerCase();

		//The function to be called at keypress
		var func = function(e) {
			e = e || window.event;
			
			if(opt['disable_in_input']) { //Don't enable shortcut keys in Input, Textarea fields
				var element;
				if(e.target) element=e.target;
				else if(e.srcElement) element=e.srcElement;
				if(element.nodeType==3) element=element.parentNode;

				if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
			}
	
			//Find Which key is pressed
			if (e.keyCode) code = e.keyCode;
			else if (e.which) code = e.which;
			var character = String.fromCharCode(code).toLowerCase();
			
			if(code == 188) character=","; //If the user presses , when the type is onkeydown
			if(code == 190) character="."; //If the user presses , when the type is onkeydown

			var keys = shortcut_combination.split("+");
			//Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
			var kp = 0;
			
			//Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
			var shift_nums = {
				"`":"~",
				"1":"!",
				"2":"@",
				"3":"#",
				"4":"$",
				"5":"%",
				"6":"^",
				"7":"&",
				"8":"*",
				"9":"(",
				"0":")",
				"-":"_",
				"=":"+",
				";":":",
				"'":"\"",
				",":"<",
				".":">",
				"/":"?",
				"\\":"|"
			}
			//Special Keys - and their codes
			var special_keys = {
				'esc':27,
				'escape':27,
				'tab':9,
				'space':32,
				'return':13,
				'enter':13,
				'backspace':8,
	
				'scrolllock':145,
				'scroll_lock':145,
				'scroll':145,
				'capslock':20,
				'caps_lock':20,
				'caps':20,
				'numlock':144,
				'num_lock':144,
				'num':144,
				
				'pause':19,
				'break':19,
				
				'insert':45,
				'home':36,
				'delete':46,
				'end':35,
				
				'pageup':33,
				'page_up':33,
				'pu':33,
	
				'pagedown':34,
				'page_down':34,
				'pd':34,
	
				'left':37,
				'up':38,
				'right':39,
				'down':40,
	
				'f1':112,
				'f2':113,
				'f3':114,
				'f4':115,
				'f5':116,
				'f6':117,
				'f7':118,
				'f8':119,
				'f9':120,
				'f10':121,
				'f11':122,
				'f12':123
			}
	
			var modifiers = { 
				shift: { wanted:false, pressed:false},
				ctrl : { wanted:false, pressed:false},
				alt  : { wanted:false, pressed:false},
				meta : { wanted:false, pressed:false}	//Meta is Mac specific
			};
                        
			if(e.ctrlKey)	modifiers.ctrl.pressed = true;
			if(e.shiftKey)	modifiers.shift.pressed = true;
			if(e.altKey)	modifiers.alt.pressed = true;
			if(e.metaKey)   modifiers.meta.pressed = true;
                        
			for(var i=0; k=keys[i],i<keys.length; i++) {
				//Modifiers
				if(k == 'ctrl' || k == 'control') {
					kp++;
					modifiers.ctrl.wanted = true;

				} else if(k == 'shift') {
					kp++;
					modifiers.shift.wanted = true;

				} else if(k == 'alt') {
					kp++;
					modifiers.alt.wanted = true;
				} else if(k == 'meta') {
					kp++;
					modifiers.meta.wanted = true;
				} else if(k.length > 1) { //If it is a special key
					if(special_keys[k] == code) kp++;
					
				} else if(opt['keycode']) {
					if(opt['keycode'] == code) kp++;

				} else { //The special keys did not match
					if(character == k) kp++;
					else {
						if(shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
							character = shift_nums[character]; 
							if(character == k) kp++;
						}
					}
				}
			}
			
			if(kp == keys.length && 
						modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
						modifiers.shift.pressed == modifiers.shift.wanted &&
						modifiers.alt.pressed == modifiers.alt.wanted &&
						modifiers.meta.pressed == modifiers.meta.wanted) {
				callback(e);
	
				if(!opt['propagate']) { //Stop the event
					//e.cancelBubble is supported by IE - this will kill the bubbling process.
					e.cancelBubble = true;
					e.returnValue = false;
	
					//e.stopPropagation works in Firefox.
					if (e.stopPropagation) {
						e.stopPropagation();
						e.preventDefault();
					}
					return false;
				}
			}
		}
		this.all_shortcuts[shortcut_combination] = {
			'callback':func, 
			'target':ele, 
			'event': opt['type']
		};
		//Attach the function with the event
		if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
		else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);
		else ele['on'+opt['type']] = func;
	},

	//Remove the shortcut - just specify the shortcut and I will remove the binding
	'remove':function(shortcut_combination) {
		shortcut_combination = shortcut_combination.toLowerCase();
		var binding = this.all_shortcuts[shortcut_combination];
		delete(this.all_shortcuts[shortcut_combination])
		if(!binding) return;
		var type = binding['event'];
		var ele = binding['target'];
		var callback = binding['callback'];

		if(ele.detachEvent) ele.detachEvent('on'+type, callback);
		else if(ele.removeEventListener) ele.removeEventListener(type, callback, false);
		else ele['on'+type] = false;
	}
}

	//Debug-mode
	if($.cookie('debugMode') == "true")
		var debug = true;
	else
		var debug = false;

	//When to update
	if(!($.cookie('updateTime') == null))
		var updateTime = $.cookie('updateTime')*1000;
	else
		var updateTime = 60000;


	//Local version
	var versionLocal = "0.2.0";

	// When page have loaded
	$(document).ready(function() {2
		if(debug)
			console.log('DOM ready');
	//Add mod toolbox option dialog
	var settingsDialog = '\
	<div id="settingsDialog" style="background-color: white; width: 500px; border-radius: 20px; position: absolute;\
	z-index: 12; top: 100px; left: 50%; display: none; box-shadow: 0px 0px 5px #FFF; margin-left: -250px; padding-bottom: 50px;">\
	<div style="font-size: 20px; width: 300px; text-align: center; margin: 0 auto;">Fullback '+versionLocal+'</div>\
	<div id="tabs">\
	<ul style="float: left; margin-left: 5px; width: 110px;">\
	<li><a href="#tab-1">Grundläggande</a></li>\
	<li><a href="#tab-2">Design</a></li>\
	<li><a href="#tab-3">Uppdateringar</a></li>\
	<li><a href="#tab-4">Trådar</a></li>\
	</ul>\
	<div id="tab-1" style="float: left; margin-left: 5px;">\
	<h1 style="font-weight: bolder; font-size: 120%;">Grundläggande</h1>\
	<p>Detta är grundläggande inställningar</p>\
	<input type="checkbox" id="debugMode"/> Debug<br/>\
	</div>\
	<div id="tab-2" style="float: left; margin-left: 5px;">\
	<h1 style="font-weight: bolder; font-size: 120%;">Design</h1>\
	<p>Detta är inställningar som har med designen att göra</p>\
	<input type="checkbox" id="removeTop"/> Ta bort topp<br/>\
	<input type="checkbox" id="floatingTabs"/> Meny-rad följer scroll<br/>\
	<input type="checkbox" id="hetaAmnenMod"/> Heta Ämnen-väljare<br/>\
	</div>\
	<div id="tab-3" style="float: left; margin-left: 5px;">\
	<h1 style="font-weight: bolder; font-size: 120%;">Uppdateringar</h1>\
	<p>Detta är uppdaterings-inställningar</p>\
	<input type="checkbox" id="checkPM"/> Kolla automatiskt efter PM<br/>\
	<input type="checkbox" id="checkQuote"/> Kolla automatiskt efter citeringar<br/>\
	<input type="text" id="updateTime"/> Hur ofta det ska uppdateras\
	</div>\
	<div id="tab-4" style="float: left; margin-left: 5px;">\
	<h1 style="font-weight: bolder; font-size: 120%;">Trådar</h1>\
	<p>Detta är Trådar inställningar</p>\
	<input type="checkbox" id="stopGif"/> Stanna GIF-animationer (ej Chrome)<br/>\
	<input type="checkbox" id="fixLinks"/> Fixa utgående länkar<br/>\
	<input type="checkbox" id="myPostInThread"/> Visa länk till alla mina inlägg i nuvarande tråd<br/>\
	<input type="checkbox" id="showImages" title="Du måste använda fixLinks tillsammans med showImages"/> Visa bilder<br/>\
	<input type="checkbox" id="keyShorts"/> Aktivera tangentbords-styrning<br/>\
	<input type="checkbox" id="goToTop"/> Aktivera "Gå till toppen"-länk vid inlägg<br/>\
	</div>\
	</div>\
	<div style="position:absolute; bottom:5px; width: 200px; left: 50%; margin-left: -100px; text-align: center;"><a href="#" id="closeToolboxSettings">Spara, stäng och ladda om sidan</a></div>\
	<div style="position:absolute; bottom:5px; width: 50px; right: 10px; text-align: right;"><a href="#" id="forceCloseToolboxSettings">Stäng</a></div>\
	</div>\
	';

		$('body').prepend(settingsDialog);
		$('body').prepend('<div id="backgroundCover" style="display: none; background-color: black; width: 100%; height: 100%; position: absolute; z-index: 11; opacity:0.9; filter:alpha(opacity=90);"> </div>');

	$('#tabs div').hide();
	$('#tabs div:first').show();
	$('#tabs ul li:first').addClass('active');
	$('#tabs ul li:first').css('font-weight', 'bolder');
	 
	$('#tabs ul li a').click(function(){
		$('#tabs ul li').css('font-weight','');
		$('#tabs ul li').removeClass('active');
		$(this).parent().css('font-weight', 'bolder');
		$(this).parent().addClass('active');
		var currentTab = $(this).attr('href');
		$('#tabs div').hide();
		$(currentTab).show();
		return false;
	});

		//Add mod toolbox href
		$('.top-menu-sub').append('<li class="l2"><a href="#" id="openToolboxSettings">Fullback</a></li>');

		//Intro popup
		if($.cookie('intro') == null) {
			if(debug)
				console.log('Första gången');
			var controlPosition = $('ul.top-menu-main li.l0').offset();
			var controlLeft = controlPosition.left - 30;
			if(debug)
				console.log(controlPosition);
			$('body').prepend('<img src="http://i.imgur.com/Tn8De.png" style="position: absolute; top: 30px; left: '+controlLeft+'px;" width="100"/>');
			$('body').prepend('<div style="background-color: #004C4C; position: absolute; z-index: 1; top: 130px; width: 100px; padding: 5px; color: white; left: '+controlLeft+'px;">Du hittar länken till Fullback här</div>');
			$('#openToolboxSettings').css('background-color', '#004C4C')
			$('#openToolboxSettings').css('color', 'white')
			$.get('http://riktiganyheter.se/counter.php');
			$.cookie('intro', 'T', { expires: 1000 });
		}

		//Set checkboxes accordingly
		if($.cookie('debugMode') == "true")
			$('#debugMode').attr('checked','checked');
		if($.cookie('removeTop') == "true")
			$('#removeTop').attr('checked','checked');
		if(!($.cookie('updateTime') == null))
			$('#updateTime').val(updateTime/1000);
		else
			$('#updateTime').val('1');
		if($.cookie('stopGif') == "true")
			$('#stopGif').attr('checked','checked');
		if($.cookie('checkPM') == "true")
			$('#checkPM').attr('checked','checked');
		if($.cookie('floatingTabs') == "true")
			$('#floatingTabs').attr('checked','checked');
		if($.cookie('checkQuote') == "true")
			$('#checkQuote').attr('checked','checked');
		if($.cookie('fixLinks') == "true")
			$('#fixLinks').attr('checked','checked');
		if($.cookie('myPostInThread') == "true")
			$('#myPostInThread').attr('checked','checked');	
		if($.cookie('hetaAmnenMod') == "true")
			$('#hetaAmnenMod').attr('checked','checked');	
		if($.cookie('showImages') == "true")
			$('#showImages').attr('checked','checked');	
		if($.cookie('keyShorts') == "true")
			$('#keyShorts').attr('checked','checked');
		if($.cookie('goToTop') == "true")
			$('#goToTop').attr('checked','checked');
			

		//Remove #top
		if($.cookie('removeTop') == "true")
			$('#top').remove();

		//Hide GIF-images
		//TODO make it work in Chrome also
		if($.cookie('stopGif') == "true") {
			window.stop();
		}

		//Check for new PMs
		if($.cookie('checkPM') == "true") {
			window.setInterval(function() {
				if(debug)
					console.log('Checking for PM!');
				$('#top-tabs-icons').load('https://www.flashback.org/regler #top-tabs-icons');
			}, updateTime);
		}
		//Floats #top-tabs
		if($.cookie('floatingTabs') == "true") {
			if(debug)
				console.log('Removing #top-tabs');
			var topTabsWidth = $('ul#top-tabs').width()
			var topMenuHeight = $('#top-menu').height();
				$('ul#top-tabs').css('position','fixed');
				$('ul#top-tabs').css('width', topTabsWidth);
				$('ul#top-tabs').css('top', topMenuHeight+5);
				$('#site').css('padding-top', '40px');
		}

		//Check for new quotations
		if($.cookie('checkQuote') == "true") {
			var oldData;
			var newData;

			var quotePage = $('.top-menu-sub li:nth-child(5) a').attr('href');
			if(debug)
				console.log('Quote page: '+quotePage);
			$.ajax({
					  url: "https://www.flashback.org"+quotePage,
					  success: function(data){
						    var $response=$(data);
							//query the jq object for the values
							oldData = $response.find('.smallfont em:first').text();
							//console.log(oldData);
					  }
			});
			window.setInterval(function() {
				if(debug)
					console.log("Checking for new quotes");
				$.ajax({
					  url: "https://www.flashback.org"+quotePage,
					  success: function(data){
						    var $response=$(data);
							//query the jq object for the values
							newData = $response.find('.smallfont em:first').text();
							//console.log(oldData);
							if(oldData == newData) {
								if(debug)
									console.log("No new quotes");
							} else {
								if(newData) {
									if(debug)
										console.log("This is the newData: "+newData);
									var where_to= confirm("Du har blivit citerad, vill du bli skickad till sidan för dina citerade inlägg?");
									 if (where_to== true)
									 {
									   window.location="https://www.flashback.org"+quotePage;
									 }
									 else
									 {
									 }
									 oldData = newData;
								}
							}
					  }
				});
			}, updateTime);
		}

		//Fix links
		if($.cookie('fixLinks') == "true") {
			$('a').each(function(index) {
				var aLink = $(this).attr('href');
				if(aLink) {
					if(aLink.indexOf("leave.php?u=") > 0) {
						aLink = aLink.substring(13);
						aLink = decodeURIComponent (aLink);
						aLink = aLink.replace (/&amp;/gi, "&");
						$(this).attr('href', aLink);
						if(debug)
							console.log("Fixed this link: "+$(this).attr('href')+" to this: "+aLink);
					}

				}
			});
		}

		//Creates a link to all my posts in the current thread
		if($.cookie('myPostInThread') == "true") {
			var currentPage = location.pathname;
			currentPage = currentPage.substring(0,2);
			if((currentPage == "/p") || (currentPage == "/t")) {
				var threadId = $('.navbar strong a:first').attr('href').substring(2);
				var profileId = $('.top-menu-sub li:nth-child(2) a').attr('href').substring(2);
				if(debug) {
					console.log('Current threadId: '+threadId);
					console.log('Current profileId: '+profileId);
				}
				$('tr[valign^="bottom"]:last').prepend('<td class="alt1" style="white-space:nowrap;padding:0 !important;"><a href="https://www.flashback.org/find_posts_by_user.php?userid='+profileId+'&threadid='+threadId+'" class="doaction">Mina inlägg i denna tråd</a></td>');
			}
		}
		//Enables users to mod heta-amnen
		if($.cookie('hetaAmnenMod') == "true") {
			if(debug)
				console.log('Heta amnen mod active');
			var currentPage = location.pathname;
			if(currentPage == "/heta-amnen"){
				var hetaAmnenModVar = 'Kryssa i de kategorier du vill visa.\
					<input type="checkbox" id="aktuellt" class="hetaAmnenMod" checked="checked"/>Aktuella händelser\
					<input type="checkbox" id="ovrigt" class="hetaAmnenMod" checked="checked"/>Övriga\
					<input type="checkbox" id="aldre" class="hetaAmnenMod" checked="checked"/>äldre än en månad\
				<hr/>';

				$('div[style="padding-top:10px"]').prepend(hetaAmnenModVar);
				
				if($.cookie('aktuellt') == "false") {
					$('#aktuellt').attr('checked',null);
					$('#threadslist:nth-child(1)').hide();
				}
				if($.cookie('ovrigt') == "false"){
					$('#ovrigt').attr('checked',null);
					$('#threadslist:nth-child(2)').hide();
				}
				if($.cookie('aldre') == "false"){
					$('#aldre').attr('checked',null);
					$('#threadslist:nth-child(3)').hide();
				}
			}
		}
		//Show images in threads 
		if($.cookie('showImages') == "true") {
			if($.cookie('fixLinks') == "true") {
				//alt1 post-right
				var maxWidth = $('.post-right').width() - 20;
				$('a[href$="jpg"], a[href$="jpeg"], a[href$="png"], a[href$="gif"], a[href$="JPG"]').each(function() {
					if(debug)
						console.log($(this).css('color'));

					if($(this).css('color') == 'rgb(102, 102, 102)') {
						if(debug)
							console.log($(this).attr('href')+' is in signature');
					} else {
						if(debug)
							console.log('True '+$(this).attr("href"));
						$(this).html('<br/><a href="'+$(this).attr('href')+'" target="_blank"><img src="'+$(this).attr('href')+'" style="max-width: '+maxWidth+'px;"/></a>'); 
						if(debug)
							console.log('Fixed image link!'+$(this).attr('href'));
					}
				});
			}
		}

		if($.cookie('keyShorts') == "true") {
			var currentPage = location.pathname;
			currentPage = currentPage.substring(0,2);

			var firstPost = $('a[id^="postcount"]:first').text();
			var currentPost = firstPost;
			var lastPost = $('a[id^="postcount"]:last').text();
			currentPost--;
			if(debug)
				console.log(currentPost);
			//If in thread
			if((currentPage == "/p") || (currentPage == "/t")) {

				shortcut.add("Ctrl+Right",function() {
					var tempVar = $("a:contains('>')").attr('href');
					if(debug)
						console.log(tempVar);
					if(!(tempVar == null))
						window.location = tempVar;
				});
				shortcut.add("Ctrl+Left",function() {
					var tempVar = $("a:contains('<')").attr('href');
					if(debug)
						console.log(tempVar);
					if(!(tempVar == null))
						window.location = tempVar;
				});
				shortcut.add("Ctrl+Down",function() {
					if(!(currentPost >= lastPost)) {
						currentPost++;
						$('html,body').animate({
							scrollTop: $('a[id^="postcount"]:contains('+currentPost+')').offset().top-55},
						'slow');
						$('a[id^="postcount"]:contains('+(currentPost-1)+')').css('color','');
						$('a[id^="postcount"]:contains('+currentPost+')').css('color','red');
						if(debug)
							console.log(currentPost);
					}
				});
				shortcut.add("Ctrl+Up",function() {
					if(!(currentPost <= firstPost)) {
						currentPost = currentPost - 1;
						if(debug)
							console.log(currentPost);
						$('html,body').animate({
							scrollTop: $('a[id^="postcount"]:contains('+currentPost+')').offset().top-55},
						'slow');
						$("a:contains("+(currentPost+1)+")").css('color','');
						$("a:contains("+currentPost+")").css('color','red');
					}
				});
				shortcut.add("Ctrl+C",function() {
					var quoteLink = $('a[id^="postcount"]:contains('+currentPost+')').attr('href');
					quoteLink = quoteLink.substring(3,1000);
					quoteLink = 'https://www.flashback.org/newreply.php?do=newreply&p='+quoteLink;
					window.location = quoteLink;
					//console.log(currentPost+' have '+quoteLink+' as quoteLink');
				});
				shortcut.add("Ctrl+S",function() {
					ev.preventDefault();
					alert('CTRL + S');
				});
			}
			currentPage = location.pathname;
			currentPage = currentPage.substring(0,13);
			if(debug)
				console.log(currentPage);
			if(currentPage = "/newreply.php") {
				var input = $("#vB_Editor_001_textarea");
				input.focus();
				tmpStr = input.val();
				input.val('');
				input.val(tmpStr);
			}
		}
		if($.cookie('goToTop') == "true") {
			$('table[id^="post"]').hover(function(){
				$('<a href="#top" class="topLink" style="position: absolute; margin-top: -17px; margin-left: 4px;">Gå till toppen</a>').hide().appendTo(this).delay(100).fadeIn();
			}, function(){
				$('.topLink').delay(400).fadeOut();
			});
		}
		// ======================

		//openToolboxSettings
		$('#openToolboxSettings').click(function(){
			if(debug)
				console.log('Mod Toolbox settings dialog opened');
			$('body').css('overflow', 'hidden');
			$('#backgroundCover').fadeIn('Slow', function(){
				$('#settingsDialog').fadeIn('Slow');
			});
		});

		$('#closeToolboxSettings').click(function(){
			if ($('#debugMode').attr('checked')) {
				$.cookie('debugMode', 'true', { expires: 1000 });
			} else {
				$.cookie('debugMode', 'false', { expires: 1000 });
			}

			var updateTime = $('#updateTime').val();
			$.cookie('updateTime', updateTime, { expires: 1000 });

			if ($('#removeTop').attr('checked')) {
				$.cookie('removeTop', 'true', { expires: 1000 });
			} else {
				$.cookie('removeTop', 'false', { expires: 1000 });
			}
			if ($('#stopGif').attr('checked')) {
				$.cookie('stopGif', 'true', { expires: 1000 });
			} else {
				$.cookie('stopGif', 'false', { expires: 1000 });
			}
			if ($('#checkPM').attr('checked')) {
				$.cookie('checkPM', 'true', { expires: 1000 });
			} else {
				$.cookie('checkPM', 'false', { expires: 1000 });
			}
			if ($('#floatingTabs').attr('checked')) {
				$.cookie('floatingTabs', 'true', { expires: 1000 });
			} else {
				$.cookie('floatingTabs', 'false', { expires: 1000 });
			}
			if ($('#checkQuote').attr('checked')) {
				$.cookie('checkQuote', 'true', { expires: 1000 });
			} else {
				$.cookie('checkQuote', 'false', { expires: 1000 });
			}
			if ($('#fixLinks').attr('checked')) {
				$.cookie('fixLinks', 'true', { expires: 1000 });
			} else {
				$.cookie('fixLinks', 'false', { expires: 1000 });
			}
			if ($('#myPostInThread').attr('checked')) {
				$.cookie('myPostInThread', 'true', { expires: 1000 });
			} else {
				$.cookie('myPostInThread', 'false', { expires: 1000 });
			}
			if ($('#hetaAmnenMod').attr('checked')) {
				$.cookie('hetaAmnenMod', 'true', { expires: 1000 });
			} else {
				$.cookie('hetaAmnenMod', 'false', { expires: 1000 });
			}
			if ($('#showImages').attr('checked')) {
				$.cookie('showImages', 'true', { expires: 1000 });
			} else {
				$.cookie('showImages', 'false', { expires: 1000 });
			}
			if ($('#keyShorts').attr('checked')) {
				$.cookie('keyShorts', 'true', { expires: 1000 });
			} else {
				$.cookie('keyShorts', 'false', { expires: 1000 });
			} 
			if ($('#goToTop').attr('checked')) {
				$.cookie('goToTop', 'true', { expires: 1000 });
			} else {
				$.cookie('goToTop', 'false', { expires: 1000 });
			}

			$('#settingsDialog').fadeOut('Slow', function(){
				$('#backgroundCover').fadeOut('Slow', function(){
					$('body').css('overflow', 'auto');
					location.reload();
				});
			});
			if(debug)
				console.log('Save and exit!');	
		});

		$(".hetaAmnenMod").change( function(){
			var hetaAmnenModCheckbox = $(this).attr('id');

			if($(this).is(':checked')) {
				if(debug)
					console.log('Checked '+hetaAmnenModCheckbox);
				
				switch(hetaAmnenModCheckbox)
				{
				case "aktuellt":
					$.cookie('aktuellt', 'true');
					$('#threadslist:nth-child(1)').show();
					break;
				case "ovrigt":
					$.cookie('ovrigt', 'true');
					$('#threadslist:nth-child(2)').show();
					break;
				case "aldre":
					$.cookie('aldre', 'true');
					$('#threadslist:nth-child(3)').show();
					break;
				default:
					if(debug)
						console.log('Fel i hetaAmnenMod');
				}
				window.scrollTo(0, document.body.scrollHeight);
			} else {
				if(debug)
					console.log('Unchecked '+hetaAmnenModCheckbox);
				
				switch(hetaAmnenModCheckbox)
				{
				case "aktuellt":
					$.cookie('aktuellt', 'false');
					$('#threadslist:nth-child(1)').hide();
					break;
				case "ovrigt":
					$.cookie('ovrigt', 'false');
					$('#threadslist:nth-child(2)').hide();
					break;
				case "aldre":
					$.cookie('aldre', 'false');
					$('#threadslist:nth-child(3)').hide();
					break;
				default:
					if(debug)
						console.log('Fel i hetaAmnenMod');
				}
			}
		});

		$('#forceCloseToolboxSettings').click(function(){
			$('#settingsDialog').fadeOut('Slow', function(){
				$('#backgroundCover').fadeOut('Slow', function(){
					$('body').css('overflow', 'auto');
				});
			});
		});

		//Check if there is any updates
		$.ajax({
		     url:"https://www.flashback.org/sp29394165",
		     success:function(versionRemote){
		         // do stuff with json (in this case an array)
		         versionRemote = $(versionRemote).find('#post_message_29394165').html();
		         versionRemote = versionRemote.substr(versionRemote.length - 8);
		         versionRemote = versionRemote.replace(/\s+/g, " ");
		         versionRemote = versionRemote.slice(0, -1);
		         if(debug)
		         	console.log('versionLocal: '+versionLocal+' | versionRemote: '+versionRemote);
		         $('html').append('<div id="updateNotice" style="text-align: center; position: fixed; top: 200px; width: 150px; background-color: white; left: -200px; padding: 5px;"><h1 style="font-weight: bolder; font-size: 200%;">Uppdatering!</h1><p>Det finns en uppdatering tillgänglig för <a href="https://www.flashback.org/t1482213" target="_blank">Fullback</a></p><br/><p>Du har version '+versionLocal+' och nyaste versionen är '+versionRemote+'</p><br/><a href="https://github.com/VictorBjelkholm/Fullback_V2/raw/master/Fullback.user.js" target="_blank" style="font-size: 130%;">Uppdatera</a></div>');
		         if(!(versionLocal == versionRemote)) {
		         	 $('#updateNotice').animate({
					    left: '0',
					  }, 1000, function() {
					    // Animation complete.
					  });
		        }
	 	     }
		});
	});
}

// load jQuery and execute the main function
addJQuery(main);