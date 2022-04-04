	// img = new Image();
	paper.install(window);
	window.onload = function() {
		paper.setup('myCanvas');
		// Create a simple drawing tool:
		var tool = new Tool();
		var path;

		// Define a mousedown and mousedrag handler
		tool.onMouseDown = function(event) {
			path = new Path();
			path.strokeColor = 'black';
			path.add(event.point);
			console.log("mouse down")			
		}

		tool.onMouseDrag = function(event) {
			console.log("mouse drag")
			if (path) {
				path.add(event.point);
			}
		}
		tool.onMouseUp = function(event) {
			console.log("mouse up")
			path.segments.forEach(function(seg) {
				console.log(seg.point.x, seg.point.y);
			});
			project.activeLayer.children.forEach(function(c) {
				c.color = 'red';
			});
			// [0].color = 'red';
		}

		// var raster = new Raster('sky');
		// raster.scale(4,4);
		// raster.rotate(0);

		// const input = document.getElementById("input");
		// input.addEventListener('change', handleFileSelect);

		const backgroundSelector = document.getElementById("upload_image");
		backgroundSelector.addEventListener('click', handleBackgroundSelect);

  function handleBackgroundSelect(evt) {
  	console.log('Inside handleBackgroundSelect');
		  	
      // var imageFile = this.files[0];
      // var reader = new FileReader();
      // reader.onload = function (e) { 
      // 	// img.src = e.target.result; 
      // 	canvas = document.getElementById("input");
      // 	canvas.innerHTML = e.target.result; 
      // 	var svg = canvas.querySelector('svg');
      // 	project.importSVG( svg );
      // 	canvas.innerHTML ="";
      // };
      // reader.readAsDataURL(imageFile);

      // var renderContext = solutionCanvas.getContext("2d");
      // renderContext.drawImage( img, 0.0, 0.0);
      // renderContext.restore();
  }

		function load() {
			raster.remove();
			// raster = new Raster()
		}


	}

  function handleBackgroundSelect(evt) {
  	console.log('Inside handleBackgroundSelect');
      // var imageFile = this.files[0];
      // var reader = new FileReader();
      // reader.onload = function (e) { 
      // 	// img.src = e.target.result; 
      // 	canvas = document.getElementById("input");
      // 	canvas.innerHTML = e.target.result; 
      // 	var svg = canvas.querySelector('svg');
      // 	project.importSVG( svg );
      // 	canvas.innerHTML ="";
      // };
      // reader.readAsDataURL(imageFile);

      // var renderContext = solutionCanvas.getContext("2d");
      // renderContext.drawImage( img, 0.0, 0.0);
      // renderContext.restore();
  }
	// function handleBackgroundSelect() {
	// 	var raster = new Raster(this.files[0]);
	// 	// raster.remove();
	// 	// raster = new Raster()
	// }

	function save() {
		// import { saveAs } from 'file-saver';
		console.log(paper.project.exportJSON());
		var myFile = new File([paper.project.exportJSON()], "demo.txt", {type: "text/plain;charset=utf-8"});
		saveAs(myFile);
	}


	function handleFileSelect() {
		// const selectedFile = document.getElementById('input').files[0];
		console.log(this.files);
		const reader = new FileReader();
    // reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    reader.readAsText(this.files[0]);
    console.log(reader.result);
 		reader.onload = function(e) {
	    console.log(this.result);
	    paper.project.importJSON(this.result);
    }
  }
	function onInitFs(fs) {

	  fs.root.getFile('log.txt', {create: true, exclusive: true}, function(fileEntry) {

	    // fileEntry.isFile === true
	    // fileEntry.name == 'log.txt'
	    // fileEntry.fullPath == '/log.txt'

	  });

	}
