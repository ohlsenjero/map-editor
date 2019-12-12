/*  
						KSJFKJDSFHKJSDFHKJDSFHKJDSFHKJDSFHKJDSFHKJDSFHSKJDFH
*/

// C A N V A S 
var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d");
var canvas2 = document.getElementById("canvas2"),
	ctx2 = canvas2.getContext("2d");
///define now and use array, since later it might be one or the other canvas down there..
var offTop = canvas.offsetTop;
var offWidth = canvas.offsetWidth;
var offHeight= canvas.offsetHeight;
var offLeft = canvas.offsetLeft;

function clearCtx(ctx) {
	ctx.clearRect(0, 0, offWidth, offHeight);
}



// S W A T C H E S 
var swatch = document.querySelectorAll('.swatch');
var currentSwatch = new Image();
var bSwatch = new Image();
var img;


// M A P 
var map = [];

var curRoom= 'A';

var tileSize;
/// Length in tiles per X,Y
var mapWidth;
var	mapHeight;
//// USER DEFINED  

   
var mapObjInit = {
	mapForLoading:map, 
	tilesXY:{x:30, y:20}, 
	tileSize:25
}
/// 		intialize map as a set of null values -> based both on canvas & tileSize;
initMap(mapObjInit.tilesXY.x, mapObjInit.tilesXY.y, mapObjInit.tileSize);
	/// this should be drawFromLoad, bt its got a problem with the map Array, need to separate, from init or not..

//           so that later on when draw() into it, it can write on an existing block, already in place 

/// I N I T
function initMap(w,h,ts){

	mapWidth=w;
	mapHeight=h;

	tileSize = ts;

	offWidth = tileSize*mapWidth;
	offHeight = tileSize*mapHeight;

	canvas.height=offHeight;
	canvas2.height=offHeight;
	canvas.width=offWidth;
	canvas2.width=offWidth;

	console.log(tileSize*mapWidth)
	for(var i=0; i< offHeight/tileSize; i++){
		for(var j=0; j< offWidth/tileSize; j++){
			map.push("images/a/0.jpg");
		}
	}
	console.log(map);
}

///
var switchRooms= document.getElementById("switch-rooms");

switchRooms.addEventListener('click', function(e) {

	console.log('SWITCHED');

	if(curRoom=='A'){
		document.getElementById('canvas2').style.display="block";
		document.getElementById('canvas').style.display="none";
		curRoom='B';
	}else{
		document.getElementById('canvas2').style.display="none";
		document.getElementById('canvas').style.display="block";
		curRoom='A';
	}
	

	

});

///  M A P  -  E X P A N D / R E T R A C T

var buttonTakeX = document.getElementById("btn-x-take");
var buttonAddX = document.getElementById("btn-x-add");
var buttonTakeY = document.getElementById("btn-y-take");
var buttonAddY = document.getElementById("btn-y-add");

buttonTakeX.addEventListener('click', function(e) {

	addTake(e.target.id, 'x');

});
buttonAddX.addEventListener('click', function(e) {

	addTake(e.target.id, 'x');

});
buttonTakeY.addEventListener('click', function(e) {

	addTake(e.target.id, 'y');

});
buttonAddY.addEventListener('click', function(e) {

	addTake(e.target.id, 'y');

});

function addTake(btn, x_or_y){
	var inputAddTakeX = document.getElementById("add-take-x").value;
	var inputAddTakeY = document.getElementById("add-take-y").value;
	//alert(inputAddTakeX);
	if(btn=="btn-x-take"){
		
		takeX(inputAddTakeX);
	}else if(btn=="btn-x-add"){
		
		addX(inputAddTakeX);
	}else if(btn=="btn-y-take"){
		
		takeY(inputAddTakeY);
	}else if(btn=="btn-y-add"){
		
		addY(inputAddTakeY);
	}

	function addX(howmany){
		var counter=0;


		for (var i = 0; i < mapHeight; i++) {
			for (var j = 0; j < mapWidth; j++) {
				
				if(j==mapWidth-1){
					console.log(map[counter]);
					var k=0
					while(k<inputAddTakeX){

						map.splice(counter+(i+1), 0, "images/a/0.jpg");
						
						//console.log(k);
						k++;
					}
					counter+=k-1;
				}				
				counter++;			
			}

		}

		var mapAdded = {mapForLoading:map, tilesXY:{x:parseInt(mapWidth)+parseInt(howmany),y:parseInt(mapHeight)}, tileSize:parseInt(tileSize)};

		drawFromLoad(mapAdded);
	}

	function takeX(howmany){
		var counter=0;


		for (var i = 0; i < mapHeight; i++) {
			for (var j = 0; j < mapWidth; j++) {
				console.log(mapWidth-inputAddTakeX);
				if(j>=(mapWidth-inputAddTakeX)){
										
					map.splice(counter, 1);
				
				}else{
					counter++;		
				}														
			}
		}

		var mapAdded = {mapForLoading:map, tilesXY:{x:parseInt(mapWidth)-parseInt(howmany),y:parseInt(mapHeight)}, tileSize:parseInt(tileSize)};

		drawFromLoad(mapAdded);
	}

	function takeY(howmany){

		var counter=0;


		for (var i = 0; i < mapHeight; i++) {
			for (var j = 0; j < mapWidth; j++) {
				
				

				if(i>=mapHeight-howmany){
					//console.log(counter);
					
					map.splice(counter,1);
					counter--;	
				}
				counter++;
			}
		}

		console.log(map.length);
		var mapAdded = {mapForLoading:map, tilesXY:{x:parseInt(mapWidth),y:parseInt(mapHeight)-parseInt(howmany)}, tileSize:parseInt(tileSize)};

		drawFromLoad(mapAdded);
	}
	function addY(howmany){

		console.log(currentSwatch.src);
		var counter=0;

		var k=0;
		while(k<howmany){
			var f=0
			while(f<mapWidth){

				map.push("images/a/0.jpg");
				f++;
			}

			k++;
		}
		console.log(map);
	
		var mapAdded = {mapForLoading:map, tilesXY:{x:parseInt(mapWidth),y:parseInt(mapHeight)+parseInt(howmany)}, tileSize:parseInt(tileSize)};

		drawFromLoad(mapAdded);
	}
}


////   S E T T I N G S

var buttonTileSettings = document.getElementById("btn-tile-settings");
	buttonTileSettings.addEventListener('click', function() {

		//esta funcion de paso tb servira pa los window.resize.. y cualquier otro reload
	var tileSizeNew = document.getElementById('tile-settings').value;
	
	var savedMap = [];

    for (var i = 0; i<map.length; i++) {
		var rex = /([^\/]+$)/g;
		var rex2 = /.*(?=\.)/g;
		
		var regexe = map[i].match(rex).toString();
		var regexe2 = regexe.match(rex2);

		savedMap.push(parseInt(regexe2[0].toString()));
		///parseInt as it is an Int in GameArray	
	}
	//console.log(savedMap);	

	
							
    $.ajax({ 
      type: 'POST',
      url: '/tile-settings',
      datatype:'json',
      data: {
      	tileSize:tileSizeNew, 
      	x:mapWidth, 
      	y:mapHeight,
     	map:JSON.stringify(savedMap), 
     	mapForLoading: JSON.stringify(map)},
      success: function(data){
        console.log("Tiles");

        clearCtx(ctx);
        clearCtx(ctx2);
	 	drawFromLoad(data.map);

      }
    });
});


///   S A V E

var buttonSave = document.getElementById("btn-save");
    buttonSave.addEventListener('click', function() {
	////  OK, entonces  el objeto a ser guardado.. contiene 1: nombre del file
	//												//		2: canvas y tileSize (a la hora de guardar)
													  //	3: Array <- map.pure
														//	4: Array <- map.regex
	var fileName = document.getElementById('save').value;
													   //   1, 2 y 3 nos sirven para el re-load
													   //   4 para el juego
	var savedMap = [];

	for (var i = 0; i<map.length; i++) {
		var rex = /([^\/]+$)/g;
		var rex2 = /.*(?=\.)/g;
		
		var regexe = map[i].match(rex).toString();
		var regexe2 = regexe.match(rex2);

		savedMap.push(parseInt(regexe2[0].toString()));
		///parseInt as it is an Int in GameArray	
	}
	console.log(map);	
												     
    $.ajax({ 
      type: 'POST',
      url: '/save',
      datatype:'json',
      data: {
      	name:fileName, 
      	tileSize:25,   /// <<-- A Default size to keep consistency. Looks better. User can then define.
      	tilesXY:JSON.stringify({x:mapWidth, y:mapHeight}),
      	map:JSON.stringify(savedMap), mapForLoading: JSON.stringify(map)},
      success: function(data){
        alert("SAVED");
      }
    });
});



///   L O A D

var loadedMap = [];

var buttonLoad = document.getElementById("btn-load");
    buttonLoad.addEventListener('click', function() {

    var selectedOption = document.getElementById("load-option");	
	
	var fileName = selectedOption.options[selectedOption.selectedIndex].value;  

    $.ajax({ 
      type: 'POST',
      url: '/load',
      data: {
      	name:fileName
      },
      success: function(data){

      	document.getElementById('canvas2').style.display="none";
		document.getElementById('canvas').style.display="block";
		curRoom='A';

        console.log("LOADED");

        clearCtx(ctx);
        clearCtx(ctx2);
        ///loadedMap var, ->  re-draw.. based on this map

        document.getElementById('save').value = data.map.name;
       
        //console.log(map);
        drawFromLoad(data.map);
      }
    });
});


function drawFromLoad(mapObject){

	console.log(mapObject.tilesXY.x);
	console.log(mapObject);

	map = [];
	initMap(mapObject.tilesXY.x, mapObject.tilesXY.y, mapObject.tileSize);


	map = mapObject.mapForLoading;

	canvas.width = mapObject.tilesXY.x * mapObject.tileSize;
	canvas.height = mapObject.tilesXY.y * mapObject.tileSize;
	canvas2.width = mapObject.tilesXY.x * mapObject.tileSize;
	canvas2.height = mapObject.tilesXY.y * mapObject.tileSize;

	var counter = 0;

	for (var i = 0; i < mapObject.tilesXY.y; i++) {
		for (var j = 0; j < mapObject.tilesXY.x; j++) {

			//	  ser the currentSwatch and Draw that img.src for this Tile...
			//						based on path --> mapObject.mapForLoading[counter]

			//// set x/y points to draw 
			//                          x/y += tileSize -> draw next Tile.

			//function drawRoomA(){
				var curMap = mapObject.mapForLoading[counter];
				setCurrentSwatch(curMap, 'A');
				
				ctx.drawImage(currentSwatch, j*mapObject.tileSize, i*mapObject.tileSize, mapObject.tileSize, mapObject.tileSize);

			
				setCurrentSwatch(curMap, 'B');

				ctx2.drawImage(currentSwatch, j*mapObject.tileSize, i*mapObject.tileSize, mapObject.tileSize, mapObject.tileSize);
			// }

			// function drawRoomB(){
				

			//     //
			  
			// 	ctx2.drawImage(currentSwatch, j*mapObject.tileSize, i*mapObject.tileSize, mapObject.tileSize, mapObject.tileSize);
			// }
			
			// drawRoomA();
			// drawRoomB();


			counter++;
			///counter at the end so it does index 0 first, then adds
		}
	}
}



/// S W A T C H E S >> P I C K

swatch.forEach(function(element){element.addEventListener("click", function(){
	
	img = this.children;

		for (var i = 0; i < img.length; i++) {
			//console.log(img[i].src);

			console.log(curRoom);

			setCurrentSwatch(img[i].src, 'A');
			
		}
		
	});
});

var setCurrentSwatch = function(newSrc, room){

	
	if(room=='A'){

		function swapRooms(str) {
			return str.replace("/b/", "/a/");
		}

		var esto2 = swapRooms(newSrc);

		currentSwatch.src = esto2;
		//console.log(esto2);
	}else{
		function swapRooms(str) {
			return str.replace("/a/", "/b/");
		}

		var esto = swapRooms(newSrc);

		currentSwatch.src = esto;
		//console.log(esto);
	}
	
}


/// P A L E T T E   >>  M O V E

/////////////////////////////////////////////////////////////////////////////////////
/// move palette                 												   ////////
var contextmenu = document.querySelector('.palette');
var initX, initY, mousePressX, mousePressY;

contextmenu.addEventListener('mousedown', function() {

    initX = this.offsetLeft;
    initY = this.offsetTop;
    mousePressX = event.pageX;
    mousePressY = event.pageY;

    document.addEventListener('mousemove', repositionElement, false);


    document.addEventListener('mouseup', function() {
      
      document.removeEventListener('mousemove', repositionElement, false);
    }, false);

}, false);

function repositionElement() {
    contextmenu.style.left = initX + event.pageX - mousePressX + 'px';
    contextmenu.style.top = initY + event.pageY - mousePressY + 'px';

}
																				  ///////
////////////////////////////////////////////////////////////////////////////////////
canvas.addEventListener('mousedown', function(){

	var movingMousePressX;
	var movingMousePressY;


	drawing("first-click");

	this.addEventListener('mousemove', drawing, true);

	this.addEventListener('mouseup', function(){


		canvas.removeEventListener('mousemove', drawing, true);
	});

});	
canvas2.addEventListener('mousedown', function(){

	var movingMousePressX;
	var movingMousePressY;


	drawing("first-click");

	this.addEventListener('mousemove', drawing, true);

	this.addEventListener('mouseup', function(){


		canvas2.removeEventListener('mousemove', drawing, true);
	});

});	


///  D R A W          / / ////////////////////////////////////////////////////////////////////////////////////
function drawing(e){

	var d=false;

	if(e == "first-click"){
		//console.log("come on " +Math.floor((event.pageX)/tileSize))

		//console.log(tileSize);
		movingMousePressX=Math.floor((event.pageX-offLeft)/tileSize)*tileSize;
		movingMousePressY=Math.floor((event.pageY-offTop)/tileSize)*tileSize;
										////// do the same for offsetLeft.. if needed (drag scren..i.e.)

		mousePressX=movingMousePressX;
		mousePressY=movingMousePressY;

		if(!d){
			d=true;
		}
		//console.log(map);
	}


		movingMousePressX=event.pageX-offLeft;
		movingMousePressY=event.pageY-offTop;

		//console.log(mousePressX + " , "+mousePressY);
		console.log(mousePressY);
		
		if(movingMousePressX>mousePressX+parseInt(tileSize)||movingMousePressX<mousePressX){
			
				if(!d){
					mousePressX=Math.floor((event.pageX-offLeft)/tileSize)*tileSize;
				d=true;
			}
		}
		if(movingMousePressY>mousePressY+parseInt(tileSize)||movingMousePressY<mousePressY){
			
				if(!d){
					mousePressY=Math.floor((event.pageY-offTop)/tileSize)*tileSize;
				d=true;
			}
		}											
	
	if(d){
		/// need to pass down, or else will be overwriten in the loop
		draw(mousePressY, mousePressX);
		d=false;
	}
		

	function draw(y,x){
		//console.log(y);

		setCurrentSwatch(currentSwatch.src, 'A');
		console.log(currentSwatch.src);
		ctx.drawImage(currentSwatch, x, y, tileSize, tileSize);
		
		setCurrentSwatch(currentSwatch.src, 'B');
		ctx2.drawImage(currentSwatch, x, y, tileSize, tileSize);

		store(x, y, currentSwatch.src);
	}



	/// store into mapArray with X,Y coordinates + regex of src name
	//                        \ in fact no need for X, Y since that is bound to canvas&tileSize/index
    function store(x, y, src){

    	//console.log(map.length);

    	var x=Math.floor((x)/tileSize);
    	var y=Math.floor((y)/tileSize);
    	//console.log(x);
    	//console.log(y);
    	var w = y*(offWidth/tileSize)+x;
    	//console.log(w);

    
    	setCurrentSwatch(src, 'A');
    	map.splice(w, 1, currentSwatch.src);

    	console.log(map);

    	//console.log(map.length);

    	if(map.length>mapWidth*mapHeight){
    		//alert("EPA");
    		map.pop();
    	}
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////
////////////////////////////////
////////////////
//////
//

///      -  input validation checks
//		

//		 - beautify.. <- fake loader anims!

///  !!!  CAMBIAR LOAD input - a treeDir los files qe esten en el folder <- <select><option>s...

/// apretas load y abre una sub-ventana (tb para prevencion).. y de ahi la lista pa elegir


/// also: the click to paint is kinda off.. click here.. draws square next.. gotta center and separate click area vs draw area properly..

