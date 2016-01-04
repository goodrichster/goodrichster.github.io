var polys = new Object(); // global var to hold polys json object

function renderPolyOptions() {

	console.log ("render says: polys empty is " + polys === null || polys === undefined  )

	// if polys is empty, fetch the data
	if (polys === undefined || polys == null) {
		fetchPolys();
	}

	var options = "<select onchange=\"draw()\" id=\"x\">";
	var sides= 3;
	for (var prop in polys) {
		sides += 1;
		options += "<option value=\"" + polys[prop] + "\">" + prop + " (" + polys[prop] + ")</option>";
	}
	// the next part is just a little extra dynamic rendering
	for (i = sides; i < 21; i++) {
		options += "<option value=\"" + i + "\">" + i + "-gon (" + i + ")</option>";
	}
	options += "</select>"

	$('#poly-options').html(options);

	draw(); // for first page load, draw the default shape
}

function fetchPolys() {
		console.log ("fetch says: polys empty is " + polys === null || polys === undefined  )
		$.getJSON("./poly-data.json", function(data) {
			console.log("got JSON");
			for (var prop in data) {
				console.log("Shape " + prop + " has " + data[prop] + " sides.");			
			}
			polys = data;
		});
}

function getSides() {
	var s = parseInt($('#x').val() );
	console.log ("The computer say there are this many sides " + s);
	return s;
}

function getAngle(s) {
	var degrees = 180 * (s - 2) / s;
	console.log ("The computer say there are this many degrees " + degrees);
	return degrees;
}

function draw() {
	var s = getSides();

	$('#sides').text( s );
	$('#angle').text( (getAngle(s)).toFixed(1) );
	var dataSet = drawPoly(s);

    $('#table').DataTable( {
    destroy: true,
    paging: false,
  	"ordering": false,
    searching: false,
    retrieve: true,
    data: dataSet,
    columns: [
        { title: "X-points" },
        { title: "Y-points" },
    ]
} );

}

function drawPoly(s) {

	//console.clear()

	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

	var numberOfSides = s,
	    size = 50,
	    Xcenter = 100,
	    Ycenter = 100;

	ctx.beginPath();
	ctx.moveTo (Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));          

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