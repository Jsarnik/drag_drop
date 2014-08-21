	var xOffset,
		yOffset,
		_startX,
		_startY,
		counter = 0,
		timer = 75,
		coordinates = [],
		currIndex = 0;
		indexChange = 0
		isLoaded = false,
		movetoX = 0,
		movetoY = 0,
		canMove = true,
		isDown = false,
		placeholder = '',
		selectedEl = '';
	
    $(document).ready(function() {			
			loadImages();
			
			if($(window).width() <= 767){				
				$('.random_img').each(function(){						
					$(this).find('a').attr("href", $(this).attr("data-href"));
				});								
				return;
			};
								
			$('.random_img').on('mousedown',function(e){													
				if (isLoaded == true && canMove == true)						
					initMove($(this),e);								
			});
			
							
			$('.content').on('mouseout',function(){
				if (canMove == false || isDown == false){
					canMove = true;
					return;
				}		
				$('.move').mouseup();
			});
			
			$('.random_img').on('mouseup',function(){								
				if (canMove == false || isDown == false){
					canMove = true;
					return;
				}			
				isDown == false;				
				canMove = false;
					
				$(this).addClass('set').css({
					top: movetoY,
					left:movetoX
				});	
				
				if($('.placeholder').length < 1){
					$(this).removeClass('move');
				}
				else{				
					$(this).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
						e.stopPropagation();
						if ($('.placeholder').index() == 0)
							$(this).insertBefore('.random_img:nth-child(1)').removeClass('move').css({left: 0, top: 0});
						else
							$(this).insertAfter('.random_img:nth-child(' + $('.placeholder').index() + ')').removeClass('move').css({left: 0, top: 0});	
							
						$('.placeholder').remove();
					});	
				}
				canMove = true;
				document.onmousemove = null;
			});			
					
    });

	function initMove(el,ev){		
		selectedEl = el;
		isDown = true;
		$('.random_img').css({left: 0, top: 0});
	
		var position = el.position();

		xOffset = ExtractNumber(position.left);
		yOffset = ExtractNumber(position.top);
		
		el.removeClass('set').addClass('move');
		
		if (el.index() != 0)		
			placeholder = el.clone().removeClass().addClass('random_img placeholder set').insertAfter('.random_img:nth-child(' + el.index() + ')');
		else
			placeholder = el.clone().removeClass().addClass('random_img placeholder set').insertBefore('.random_img:nth-child(1)');
		OnMouseDown(ev);

	}
	
	function OnMouseDown(e){
			_startX = e.clientX;
			_startY = e.clientY;
			onMouseMove(e);
			document.onmousemove = onMouseMove;
		};
		
function setCoords() {

	isLoaded = false;
	coordinates = [];	
    $('.random_img').each(function() {
		$(this).removeClass('move').css({left:0, top: 0});
			var pos = $(this).position();
			coordinates.push({
				dom: $(this).index(),
				left: pos.left - $(window).scrollLeft() + ExtractNumber($('.content_container').css('margin-left').replace(/[^-\d\.]/g, '')),
				top: pos.top - $(window).scrollTop() + 60,
				right: (pos.left - $(window).scrollLeft()) + $(this).width() + ExtractNumber($('.content_container').css('margin-left').replace(/[^-\d\.]/g, '')),
				bottom: (pos.top - $(window).scrollTop() + 60) + $(this).height(),
				truTop: pos.top,
				truLeft: pos.left
			});
					console.log($('.content_container').css('margin-left').replace(/[^-\d\.]/g, ''));
		});		
		isLoaded = true;
		console.log(coordinates);



	}	
		
	function onMouseMove(e){
			e.preventDefault();
			var el = $('.move');	
			el.css({
				left : (xOffset + e.clientX - _startX),
				top : (yOffset + e.clientY - _startY)
			});				
			
			console.log('x : ' + e.clientX + ' y : ' + e.clientY);
			
			for (var i in coordinates) {
				if (e.clientX >= coordinates[i].left && e.clientX <= coordinates[i].right) {			
					if (e.clientY >= coordinates[i].top && e.clientY <= coordinates[i].bottom) {
						currIndex = coordinates[i].dom;
						movetoX = coordinates[i].truLeft;
						movetoY = coordinates[i].truTop;

						continue;
					}
				}
			}
											
			if (currIndex != indexChange){
				if ($('.placeholder').length > 0)
					$('.placeholder').remove();

				var index = currIndex+1;
								
				if (el.index() < index)
					placeholder.insertAfter('.random_img:nth-child(' + index + ')');		
				else
					placeholder.insertBefore('.random_img:nth-child(' + index + ')');

			}
			indexChange = currIndex;			
	}
	
	function ExtractNumber(value)	{
		var n = parseInt(value);
		return n == null || isNaN(n) ? 0 : n;
	}
	
		function loadImages(){		
			if(counter <= $('.random_img').length){
			
				$('.random_img:nth-child('+(counter+1)+')').removeClass('unset').addClass('set');
				counter++;
			
				setTimeout(function(){				
					loadImages();
				},timer);	
			}
			else
				setCoords();
	}
	
	function shuffle(array) {
	  var currentIndex = array.length
		, temporaryValue
		, randomIndex
		;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	  }	  
		return array;
	}
	
	$(window).scroll(function() {
		setCoords();
	});
	$(window).resize(function(){
		setCoords();
	});