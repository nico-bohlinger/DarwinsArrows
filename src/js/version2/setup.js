function setupV2(){

	// Create canvas and all sliders and their labels
	createCanvas(windowWidth,windowHeight);

	loadGlobalUsedVariablesV2();

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
	gen_tracker.position(width-(width/2.3), height-(height/2));

	version1P = createP("v.1");
	version1P.style("color","grey");
	version1P.style('font-size', "" + width/80 + "px");
	version1P.style('transform', "rotate(-25deg)");
	version1P.position(38*width/1900, 38*height/1100);

	version2P = createP("v.2");
	version2P.style("color","#FFC34D");
	version2P.style('font-size', "" + width/80 + "px");
	version2P.style('transform', "rotate(25deg)");
	version2P.position(90*width/1900, 35*height/1100);

	version3P = createP("v.3");
	version3P.style("color","grey");
	version3P.style('font-size', "" + width/80 + "px");
	version3P.style('transform', "rotate(-25deg)");
	version3P.position(138*width/1900, 38*height/1100);

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
	track = new TrackV2("A");
	population = new PopulationV2();

	for(var i = 0; i < track.segments.length; i++){
		targets.push(track.segments[i].targets);
	}
}

function loadGlobalUsedVariablesV2(){
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


	vector_mod = 1;

	fit_ind = 0;

	targets = [];

	generation = 1;
}
