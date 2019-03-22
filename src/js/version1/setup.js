function setupV1(){
	createCanvas(windowWidth,windowHeight);

	loadGlobalUsedVariablesV1();

	population = new PopulationV1();

	target = createVector(width/2,50);

	pops_slider_label = createP("Population size:");
	pops_slider_label.style("color","white");
	pops_slider_label.style('font-size', "" + width/80 + "px");
	pops_slider_label.position(width-width/6.7, height/11);
	pops_slider = createSlider(1,50,pops_slider_startVal);
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
	force_slider = createSlider(0.1,2,force_slider_startVal,0.1);
	force_slider.position(width-width/6.7, height/1.85);
	force_slider.style('width', "" + width/10 + "px");

	mvel_slider_label = createP("Max. velocity:");
	mvel_slider_label.style("color","white");
	mvel_slider_label.style('font-size', "" + width/80 + "px");
	mvel_slider_label.position(width-width/6.7, height/1.60);
	mvel_slider = createSlider(1,20,mvel_slider_startVal,1);
	mvel_slider.position(width-width/6.7, height/1.47);
	mvel_slider.style('width', "" + width/10 + "px");

	titleP = createP("by Nico Bohlinger");
	titleP.style("color","#FFC34D");
	titleP.style('font-size', "" + width/35 + "px");
	titleP.style('font-family', 'Times New Roman');
	titleP.position(width-(width/1.49), height-(height/1.67));

	version1P = createP("v.1");
	version1P.style("color","#FFC34D");
	version1P.style('font-size', "" + width/80 + "px");
	version1P.style('transform', "rotate(-25deg)");
	version1P.position(38*width/1900, 38*height/1100);

	version2P = createP("v.2");
	version2P.style("color","grey");
	version2P.style('font-size', "" + width/80 + "px");
	version2P.style('transform', "rotate(25deg)");
	version2P.position(90*width/1900, 35*height/1100);

	version3P = createP("v.3");
	version3P.style("color","grey");
	version3P.style('font-size', "" + width/80 + "px");
	version3P.style('transform', "rotate(-25deg)");
	version3P.position(138*width/1900, 38*height/1100);

	objects_crash.push([width-(width/1.465), height-(height/1.61), width/4.25, height/7.8]);
	objects_crash.push([width-(width/5.5), height/20, width/6, height/1.4]);
	objects_crash.push([30*width/1900, 20*height/1100, 50*width/1900, 100*height/1100]);
	objects_crash.push([80*width/1900, 20*height/1100, 50*width/1900, 100*height/1100]);
	objects_crash.push([130*width/1900, 20*height/1100, 50*width/1900, 100*height/1100]);
}

function loadGlobalUsedVariablesV1(){
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

	objects_crash = [];

	vector_mod = 1;

	fit_ind = 0;
}