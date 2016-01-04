//TODO http://threejs.org/

var polys = new Object(); // global var to hold polys json object
var MAX_SIDES = 12;

function init() {
	var qSides = parseInt(location.search.split('?')[1]);
	if (Number.isInteger(qSides)){
		MAX_SIDES = qSides;
	}
	drawSlider();
	fetchPolys();
	renderPolyOptions();
}

function setPolys(data) {
	//polys = JSON.parse(JSON.stringify(data));
	polys = jQuery.extend(true, {}, data);
}

function renderPolyOptions() {

	console.log ("render says: polys empty is " + (Object.keys(polys).length === 0).toString());
	// if polys is empty, fetch the data
	if (Object.keys(polys).length === 0) {
		fetchPolys();
	}
	console.log ("render now says: polys empty is " + (Object.keys(polys).length === 0).toString());


	var options = "<select onchange=\"draw()\" id=\"x\">";
	var sides= 3;
	for (var prop in polys) {
		sides += 1;
		options += "<option value=\"" + polys[prop] + "\">" + prop + " (" + polys[prop] + ")</option>";
	}
	// the next part is just a little extra dynamic rendering, it also handles case of failed json
	for (i = sides; i < MAX_SIDES + 1; i++) {
		options += "<option value=\"" + i + "\">" + i + "-gon (" + i + ")</option>";
	}
	options += "</select>"

	$('#poly-options').html(options);
}

function fetchPolys() {
		//console.log ("pre-fetch says: polys empty is " + (Object.keys(polys).length === 0).toString() );
		$.getJSON("./poly-data.json", function(data) {
			console.log("got JSON");
			//console.log ("post-fetch says: data empty is " + (Object.keys(data).length === 0).toString() );
			for (var prop in data) {
				//console.log("Shape " + prop + " has " + data[prop] + " sides.");			
			}
			setPolys(data);
			console.log ("post-fetch says: polys empty is " + (Object.keys(polys).length === 0).toString() );
		});
}

function getSides() {
	var s = parseInt($('#x').val() );
	// console.log ("The computer say there are this many sides " + s);
	return s;
}

function getAngle(s) {
	var degrees = 180 * (s - 2) / s;
	// console.log ("The computer say there are this many degrees " + degrees);
	return degrees;
}

function draw() {
	var s = getSides();
	$( '#slider' ).slider('value',s);
	$('#sides').text( s );
	$('#angle').text( (getAngle(s)).toFixed(1) );
	drawPoly(s);
}

function drawPoly(s) {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

	var numberOfSides = s,
	    size = 50,
	    Xcenter = 100,
	    Ycenter = 100;

	ctx.beginPath();
	ctx.moveTo (Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));          

	// tracking points in case I want to display this info...
	var xy = []; while(xy.push([]) < s + 1);

	xy[0][0] = (Xcenter +  size * Math.cos(0)).toFixed(2);
	xy[0][1] = (Ycenter +  size *  Math.sin(0)).toFixed(2);

	//console.log ("Points " + xy[0][0] + " " + xy[0][1] );
	
	for (var i = 1; i <= numberOfSides;i += 1) {
		xy[i][0] = (Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides)).toFixed(2);
		xy[i][1] = (Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides)).toFixed(2);
	//	console.log ("Points " + xy[i][0] + " " + xy[i][1] );

	    ctx.lineTo (Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
	}

	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 1;
	ctx.stroke();

	ctx.fillStyle="red";
	ctx.fill();

	return xy;

}

function drawSlider() {
		$( '#slider' ).slider({
			max: MAX_SIDES,
			min: 3,
			orientation: "vertical",
			value: 3,
			animate: "fast",
			slide: function(event, ui) { 
		        $('#x').val(ui.value);
		        draw();
			    } 
		});
}

