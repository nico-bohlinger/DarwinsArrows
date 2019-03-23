function drawV2(){
	background("#212121");

	// Draw the track
	stroke(255);
	line(160*width/977, 40*height/466, 260*width/977, 40*height/466);
	line(611*width/977, 140*height/466, 610*width/977, 40*height/466);
	for(var i = 0; i < track.segments.length; i++){
		if(track.segments[i].lowerBorder.name === "line"){
			p1 = track.segments[i].lowerBorder.points[0];
			p2 = track.segments[i].lowerBorder.points[1];
			line(p1[0],p1[1],p2[0],p2[1]);
		}
		if(track.segments[i].upperBorder.name === "line"){
			p1 = track.segments[i].upperBorder.points[0];
			p2 = track.segments[i].upperBorder.points[1];
			line(p1[0],p1[1],p2[0],p2[1]);
		}
	}

	for(var i = 0; i < targets.length-1; i++){
		for(var j = 0; j < targets[i].length; j++){
			stroke(color("#89DDF3"));
			point(targets[i][j][0], targets[i][j][1]);
		}
	}

	// Around controlls
	stroke(color("white"));
	strokeWeight(11 * width/2200);
	noFill();
	rect(width-(width/5.5), 0+(height/20), width/6, height/1.4);

	// Around generation counter
	stroke(color("white"));
	rect(width-(width/2.15), height-(height/1.9), width/4.25, height/7.8);

	// Version switch
	strokeWeight(3 * width/2200);
	quad(30*width/1900, 100*height/1100, 30*width/1900, 40*height/1100, 80*width/1900, 20*height/1100, 80*width/1900, 70*height/1100);
	quad(80*width/1900, 70*height/1100, 80*width/1900, 20*height/1100, 130*width/1900, 40*height/1100, 130*width/1900, 100*height/1100);
	quad(130*width/1900, 100*height/1100, 130*width/1900, 40*height/1100, 180*width/1900, 20*height/1100, 180*width/1900, 70*height/1100);

	strokeWeight(11 * width/2200);

	// Controlls slider update and label update
	lifespan = lifes_slider.value();
	population_size = pops_slider.value();
	mutation_rate = mutarate_slider.value();
	maxforce = force_slider.value();
	maxvel = mvel_slider.value();
	pops_slider_label.html("Population size: " + population_size);
	lifes_slider_label.html("Lifespan: " + lifespan);
	mutarate_slider_label.html("Mutation rate:  " + mutation_rate);
	force_slider_label.html("Max. force:  " + maxforce);
	mvel_slider_label.html("Max. velocity:  " + maxvel);
	gen_tracker.html("Generation: " + generation);

	// Calculate if all crashed and find the fittest arrow
	var allCrashed = true;
	var max_fit = -10;
	for(var i = 0; i < population.arrows.length; i++){
		if(population.arrows[i].crashed == false && population.arrows[i].completed == false){
			allCrashed = false;
		}
		if(population.arrows[i].fitness >= max_fit){
			max_fit = population.arrows[i].fitness;
			fit_ind = i;
		}
	}

	// Give the fittest for one action the green color and run the whole population
	population.arrows[fit_ind].thefittest = true;
	population.run();
	population.arrows[fit_ind].thefittest = false;

	// Check if it should generate a new population
	if((count >= lifespan) || allCrashed){
		population.evaluate();
		population.selection();
		count = 0;
		generation += 1;
	}
	else{
		count++;
	}

}
