function draw(){
	background("#212121");

	stroke(color("white"));
	strokeWeight(11 * width/2200);
	noFill();
	rect(width-(width/5.5), 0+(height/20), width/6, height/1.4);
	rect(width-(width/1.465), height-(height/1.61), width/4.25, height/7.8);
	strokeWeight(3 * width/2200);
	quad(30*width/1900, 100*height/1100, 30*width/1900, 40*height/1100, 80*width/1900, 20*height/1100, 80*width/1900, 70*height/1100);
	quad(80*width/1900, 70*height/1100, 80*width/1900, 20*height/1100, 130*width/1900, 40*height/1100, 130*width/1900, 100*height/1100);
	quad(130*width/1900, 100*height/1100, 130*width/1900, 40*height/1100, 180*width/1900, 20*height/1100, 180*width/1900, 70*height/1100);

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
	population.arrows[fit_ind].thefittest = true;
	population.run();
	population.arrows[fit_ind].thefittest = false;


	if((count >= lifespan) || allCrashed){
		population.evaluate();
		population.selection();
		count = 0;
	}
	count++;


	noStroke();
	fill("white");
	ellipse(target.x, target.y, width/30, width/30);
	fill("black");
	ellipse(target.x, target.y, width/34, width/34);
	fill("blue");
	ellipse(target.x, target.y, width/40, width/40);
	fill("red");
	ellipse(target.x, target.y, width/55, width/55);
	fill("yellow");
	ellipse(target.x, target.y, width/90, width/90);
}