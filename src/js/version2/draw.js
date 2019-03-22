function drawV2(){
	background("#212121");

	// Draw the track
	stroke(255);
	line(80,100,180,100);
	line(531,200,530,100);
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
	strokeWeight(6);
	noFill();
	rect(width-(width/5.5),0+(height/20),width/6,height/1.4);

	// Around generation counter
	stroke(color("white"));
	strokeWeight(6);
	noFill();
	rect(572,302,240,80);

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
