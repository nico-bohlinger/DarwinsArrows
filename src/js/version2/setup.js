function setupV2(){

	// Create canvas and all sliders and their labels
	createCanvas(windowWidth-20,windowHeight-20);

	loadGlobalUsedVariablesV2();

	pops_slider_label = createP("Population size:");
	pops_slider_label.style("color","white");
	pops_slider_label.style('font-size', "" + width/80 + "px");
	pops_slider_label.position(width-width/7.1, 0+height/13);
	pops_slider = createSlider(1,50,pops_slider_startVal);
	pops_slider.position(width-width/7, 0+height/7);
	pops_slider.style('width', "" + width/10 + "px");

	lifes_slider_label = createP("Lifespan:");
	lifes_slider_label.style("color","white");
	lifes_slider_label.style('font-size', "" + width/80 + "px");
	lifes_slider_label.position(width-width/7.1, 0+height/5);
	lifes_slider = createSlider(100,1000,lifes_slider_startVal,50);
	lifes_slider.position(width-width/7, 0+height/3.7);
	lifes_slider.style('width', "" + width/10 + "px");

	mutarate_slider_label = createP("Mutation rate:");
	mutarate_slider_label.style("color","white");
	mutarate_slider_label.style('font-size', "" + width/80 + "px");
	mutarate_slider_label.position(width-width/7.1, 0+height/3);
	mutarate_slider = createSlider(0.01,1,mutarate_slider_startVal,0.01);
	mutarate_slider.position(width-width/7, 0+height/2.45);
	mutarate_slider.style('width', "" + width/10 + "px");

	force_slider_label = createP("Max. force:");
	force_slider_label.style("color","white");
	force_slider_label.style('font-size', "" + width/80 + "px");
	force_slider_label.position(width-width/7.1, 0+height/2.13);
	force_slider = createSlider(0.1,1,force_slider_startVal,0.1);
	force_slider.position(width-width/7, 0+height/1.85);
	force_slider.style('width', "" + width/10 + "px");

	mvel_slider_label = createP("Max. velocity:");
	mvel_slider_label.style("color","white");
	mvel_slider_label.style('font-size', "" + width/80 + "px");
	mvel_slider_label.position(width-width/7.1, 0+height/1.65);
	mvel_slider = createSlider(1,10,mvel_slider_startVal,0.5);
	mvel_slider.position(width-width/7, 0+height/1.47);
	mvel_slider.style('width', "" + width/10 + "px");

	gen_tracker = createP("Generation:");
	gen_tracker.style("color","#FFC34D");
	gen_tracker.style('font-size', "" + width/40 + "px");
	gen_tracker.position(600,300);


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

	force_slider_startVal = 0.5;
	maxforce = force_slider_startVal;

	mvel_slider_startVal = 6;
	maxvel = mvel_slider_startVal;


	vector_mod = 1;

	fit_ind = 0;

	targets = [];

	generation = 1;
}
