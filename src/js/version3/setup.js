function setupV3(){

	// Create canvas and all sliders and their labels
	createCanvas(windowWidth,windowHeight);

	loadGlobalUsedVariablesV3();

	pops_slider_label = createP("Population size:");
	pops_slider_label.style("color","white");
	pops_slider_label.style('font-size', "" + width/80 + "px");
	pops_slider_label.position(width-width/6.7, height/11);
	pops_slider = createSlider(1,1000,pops_slider_startVal);
	pops_slider.position(width-width/6.7, height/7);
	pops_slider.style('width', "" + width/10 + "px");

	lifes_slider_label = createP("Lifespan:");
	lifes_slider_label.style("color","white");
	lifes_slider_label.style('font-size', "" + width/80 + "px");
	lifes_slider_label.position(width-width/6.7, height/4.6);
	lifes_slider = createSlider(100,1000,lifes_slider_startVal,50);
	lifes_slider.position(width-width/6.7, height/3.7);
	lifes_slider.style('width', "" + width/10 + "px");

	mutarate_slider_label = createP("Mutation rate:");
	mutarate_slider_label.style("color","white");
	mutarate_slider_label.style('font-size', "" + width/80 + "px");
	mutarate_slider_label.position(width-width/6.7, height/2.83);
	mutarate_slider = createSlider(0.01,1,mutarate_slider_startVal,0.01);
	mutarate_slider.position(width-width/6.7, height/2.45);
	mutarate_slider.style('width', "" + width/10 + "px");

	force_slider_label = createP("Max. force:");
	force_slider_label.style("color","white");
	force_slider_label.style('font-size', "" + width/80 + "px");
	force_slider_label.position(width-width/6.7, height/2.06);
	force_slider = createSlider(0.1,3,force_slider_startVal,0.1);
	force_slider.position(width-width/6.7, height/1.85);
	force_slider.style('width', "" + width/10 + "px");

	mvel_slider_label = createP("Max. velocity:");
	mvel_slider_label.style("color","white");
	mvel_slider_label.style('font-size', "" + width/80 + "px");
	mvel_slider_label.position(width-width/6.7, height/1.60);
	mvel_slider = createSlider(1,30,mvel_slider_startVal,1);
	mvel_slider.position(width-width/6.7, height/1.47);
	mvel_slider.style('width', "" + width/10 + "px");

	gen_tracker = createP("Generation:");
	gen_tracker.style("color","#FFC34D");
	gen_tracker.style('font-size', "" + width/40 + "px");
	gen_tracker.position(width-(width/1.89), height-(height/1.095));

	version1P = createP("v.1");
	version1P.style("color","grey");
	version1P.style('font-size', "" + width/80 + "px");
	version1P.style('transform', "rotate(-25deg)");
	version1P.position(38*width/1900, 38*height/1100);

	version2P = createP("v.2");
	version2P.style("color","grey");
	version2P.style('font-size', "" + width/80 + "px");
	version2P.style('transform', "rotate(25deg)");
	version2P.position(90*width/1900, 35*height/1100);

	version3P = createP("v.3");
	version3P.style("color","#FFC34D");
	version3P.style('font-size', "" + width/80 + "px");
	version3P.style('transform', "rotate(-25deg)");
	version3P.position(138*width/1900, 38*height/1100);

	best_NN_label = createP("Best NN");
	best_NN_label.style("color","white");
	best_NN_label.style('font-size', "" + width/55 + "px");
	best_NN_label.position(1220*width/1900, 355*height/1100);
	best_NN_label.addClass("underline");

	showSensorsBtn = createButton("Sensors");
	showSensorsBtn.style('font-size', "" + width/60 + "px");
	showSensorsBtn.addClass("btn");
	showSensorsBtn.position(247*width/1280, 30*height/620);
	showSensorsBtn.mousePressed(toggleSensors);
	function toggleSensors(){
		showSensors = !showSensors;
		if(showSensors){
			showSensorsBtn.addClass("active");
		}
		else{
			showSensorsBtn.removeClass("active");
		}
	}

	pauseBtn = createButton("Pause");
	pauseBtn.style('font-size', "" + width/60 + "px");
	pauseBtn.addClass("btn");
	pauseBtn.position(150*width/1280, 30*height/620);
	pauseBtn.mousePressed(togglePause);
	function togglePause(){
		draw_toggle = !draw_toggle;
		if(!draw_toggle){
			pauseBtn.addClass("active");
		}
		else{
			pauseBtn.removeClass("active");
		}
	}

	targetlinesBtn = createButton("Targets");
	targetlinesBtn.style('font-size', "" + width/60 + "px");
	targetlinesBtn.addClass("btn");
	targetlinesBtn.position(363*width/1280, 30*height/620);
	targetlinesBtn.mousePressed(toggleTargets);
	function toggleTargets(){
		targetlines_toggle = !targetlines_toggle;
		if(targetlines_toggle){
			targetlinesBtn.addClass("active");
		}
		else{
			targetlinesBtn.removeClass("active");
		}
	}



	testBtn = createButton("Test");
	testBtn.style('font-size', "" + width/60 + "px");
	testBtn.addClass("btn");
	testBtn.addClass("active");
	testBtn.position(580*width/1280, 470*height/620);
	testBtn.mousePressed(testmodeF);
	function testmodeF(){
		if(trainBool){
			trainBoolByBtn = false;
			testBtn.addClass("active");
			trainBtn.removeClass("active");
		}
	}

	trainBtn = createButton("Train");
	trainBtn.style('font-size', "" + width/60 + "px");
	trainBtn.addClass("btn");
	trainBtn.position(580*width/1280, 530*height/620);
	trainBtn.mousePressed(trainmodeF);
	function trainmodeF(){
		if(!trainBool){
			trainBoolByBtn = true;
			trainBtn.addClass("active");
			testBtn.removeClass("active");
		}
	}

	newMBtn = createButton("New");
	newMBtn.style('font-size', "" + width/60 + "px");
	newMBtn.addClass("btn");
	newMBtn.position(700*width/1280, 470*height/620);
	newMBtn.mousePressed(newmodelF);
	function newmodelF(){
		newModelByBtn = true;
		newMBtn.addClass("active");
		loadModelByBtn = false;
		loadMBtn.removeClass("active");
	}

	saveMBtn = createButton("Save");
	saveMBtn.style('font-size', "" + width/60 + "px");
	saveMBtn.addClass("btn");
	saveMBtn.position(700*width/1280, 530*height/620);
	saveMBtn.mousePressed(savedModelF);
	function savedModelF(){
		saveMBtn.addClass("active");
		// Deep copy doesn't Work
		// -> Load Model (v1) -> Train (Model v2) -> Load again -> Model is v2
		// This means when you train a loaded model and load it again it is trained
		// but the generation counter is still the old one
		savedModel = [population, generation];
	}

	loadMBtn = createButton("Load");
	loadMBtn.style('font-size', "" + width/60 + "px");
	loadMBtn.addClass("btn");
	loadMBtn.position(790*width/1280, 530*height/620);
	loadMBtn.mousePressed(loadModelF);
	function loadModelF(){
		if(savedModel){
			loadModelByBtn = true;
			loadMBtn.addClass("active");
			newModelByBtn = false;
			newMBtn.removeClass("active");
		}
	}



	trainTrackBtn = createButton("Train track");
	trainTrackBtn.style('font-size', "" + width/60 + "px");
	trainTrackBtn.addClass("btn");
	trainTrackBtn.addClass("active");
	trainTrackBtn.position(110*width/1280, 530*height/620);
	trainTrackBtn.mousePressed(trainTrackF);
	function trainTrackF(){
		if(!trainTrackActive){
			trackSwitched = true;
			trainTrackBtn.addClass("active");
			testTrackBtn.removeClass("active");
		}
	}

	testTrackBtn = createButton("Test track");
	testTrackBtn.style('font-size', "" + width/60 + "px");
	testTrackBtn.addClass("btn");
	testTrackBtn.position(260*width/1280, 530*height/620);
	testTrackBtn.mousePressed(testTrackF);
	function testTrackF(){
		if(trainTrackActive){
			trackSwitched = true;
			testTrackBtn.addClass("active");
			trainTrackBtn.removeClass("active");
		}
	}



	// framestuff = createP();
	// framestuff.position(500,50);
	// framestuff.style("color","white");


	switchTo1Btn = createButton();
	switchTo1Btn.addClass("transparent_btn");
	switchTo1Btn.position(35*width/1900, 38*height/1100);
	switchTo1Btn.mousePressed(switchTo1);
	function switchTo1(){
		active_version = version_enum.VERSION_1;
		setup();
	}

	switchTo2Btn = createButton();
	switchTo2Btn.addClass("transparent_btn");
	switchTo2Btn.position(86*width/1900, 35*height/1100);
	switchTo2Btn.mousePressed(switchTo2);
	function switchTo2(){
		active_version = version_enum.VERSION_2;
		setup();
	}

	switchTo3Btn = createButton();
	switchTo3Btn.addClass("transparent_btn");
	switchTo3Btn.position(135*width/1900, 38*height/1100);
	switchTo3Btn.mousePressed(switchTo3);
	function switchTo3(){
		active_version = version_enum.VERSION_3;
		setup();
	}


	// Create track, targets and population
	track = new TrackV3("Train");
	population = new PopulationV3();

	for(var i = 0; i < track.segments.length; i++){
		targets.push(track.segments[i].targets);
	}
}

function loadGlobalUsedVariablesV3(){
	count = 0;

	pops_slider_startVal = 25;
	population_size = pops_slider_startVal;

	lifes_slider_startVal = 400;
	lifespan = lifes_slider_startVal;

	mutarate_slider_startVal = 0.01;
	mutation_rate = mutarate_slider_startVal;

	force_slider_startVal = 0.8;
	maxforce = force_slider_startVal;

	mvel_slider_startVal = 12;
	maxvel = mvel_slider_startVal;

	showSensors = false;
	draw_toggle = true;
	targetlines_toggle = false;
	whatisthis_toggle = false;

	all_points_NN = [];

	trainBoolByBtn = false;
	trainBool = trainBoolByBtn;
	newModelByBtn = false;
	loadModelByBtn = false;
	savedModel = null;
	trainTrackActive = true;
	trackSwitched = false;

	vector_mod = 1;

	fit_ind = 0;

	targets = [];

	generation = 1;

	sensor_length = 100;
}
