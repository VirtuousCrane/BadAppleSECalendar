// How to use:
// 1) Go to the SE website
// 2) Paste this script into the console
// 3) init()
// 4) run()

var canvas = new Array(7);
var frameIndex = 0;

function insertArrayScript() {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "https://cdn.jsdelivr.net/gh/VirtuousCrane/BadAppleSECalendar@2b52136588e5cd6dcf3b93e0eefc000edbc88588/bad_apple_array.js";
	document.head.appendChild(script);
}

function insertCSS() {
	var style = document.createElement("style");
	style.appendChild(document.createTextNode(""));

	
	let CSS = `div.blackwhite {
			width: 100%;
			position: relative;
		}
		
		.black {
			content: "-----|";
			background-color: black;
			color: black;
		}
		
		.black::before, .black::after {
			content: "-----|";
		}
		
		.white {
			content: "-----|";
			background-color: white;
			color: white;
		}
		
		.blackwhite::before, .blackwhite::after {
			content: "-----|";
			top: 0;
			width: 50%;
		}

		.blackwhite::after {
			right: 0;
			background-color: white;
			color: white;
		}

		.blackwhite::before {
			left: 0;
			background-color: black;
			color: black;
		}
		
		.whiteblack::before, .whiteblack::after {
			content: "-----|";
			top: 0;
			width: 50%;
		}

		.whiteblack::after {
			right: 0;
			background-color: black;
			color: black;
		}

		.whiteblack::before {
			left: 0;
			background-color: white;
			color: white;
		}`;
	
	style.innerHTML += CSS;
	document.head.appendChild(style);
}

function draw(frame) {
	for (let i = 0; i < 12; i++) {
		for (let j = 0; j < 7; j++) {
			let l_pixel = frame[i][(j * 2)];
			let r_pixel = frame[i][(j * 2) + 1];
			
			canvas[j][i].classList.remove("black", "white", "whiteblack", "blackwhite");
			// I accidentally inverted the colours when I converted it from Video format lol
      if (l_pixel == r_pixel) {
				if (l_pixel == "w") {
					canvas[j][i].classList.add("black");
				} else {
					canvas[j][i].classList.add("white");
				}
			} else if (l_pixel == "w") {
				canvas[j][i].classList.add("blackwhite");
			} else {
				canvas[j][i].classList.add("whiteblack");
			}
		}
	}
}

function init() {
	insertArrayScript();
	insertCSS();
}

function recurseDraw() {
	draw(data[frameIndex]);
	frameIndex += 1;
	setTimeout(recurseDraw, 32);
}

function run() {
	var columns = document.querySelectorAll(".rbc-day-slot");

	// Painting the calendar black
	//let calendar = document.querySelector(".rbc-calendar");
	//calendar.classList.add("black");
	
	// Initializing the array
	for (let i = 0; i < 7; i++) {
		canvas[i] = new Array(12);
	}

	// Populating the Array
	for (let i = 0; i < 7; i++) {
		let boxes = Array.from(columns[i].children).slice(0, 6);
		for (let j = 0; j < 6; j++) {
			let slabs = Array.from(boxes[j].children);
			canvas[i][(j * 2)] = slabs[0];
			canvas[i][(j * 2) + 1] = slabs[1];
			
			slabs[0].classList.add("black");
			slabs[1].classList.add("black");
		}
	}
	
	// Running bad apple
	//data.forEach(function(f) {
	//	setTimeout(draw, 33, f);
	//});
	
	recurseDraw();
}
