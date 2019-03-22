function PopulationV1(){
	this.arrows = [];
	this.popsize = pops_slider_startVal;
	this.matingpool = [];

	for(var i = 0; i < this.popsize; i++){
		this.arrows[i] = new ArrowV1();
	}

	this.evaluate = function(){
		var maxfit = 0;

		for(var i = 0; i < this.popsize; i++){
			this.arrows[i].calcFitness();
			if(this.arrows[i].fitness > maxfit){
				maxfit = this.arrows[i].fitness;
			}
		}

		for(var i = 0; i < this.popsize; i++){
			this.arrows[i].fitness /= maxfit;
		}


		this.matingpool = [];
		for(var i = 0; i < this.popsize; i++){
			var n = this.arrows[i].fitness*100;
			for(var j = 0; j < n; j++){
				this.matingpool.push(this.arrows[i])
			}
		}
	}

	this.selection = function(){
		this.popsize = population_size;
		var newArrows = [];
		for(var i = 0; i < this.popsize; i++){
			var parentA = random(this.matingpool).dna;
			var parentB = random(this.matingpool).dna;
			var child = parentA.crossover(parentB);
			child.mutation();
			newArrows[i] = new ArrowV1(child);
		}
		this.arrows = newArrows;
	}


	this.run = function(){
		for(var i = 0; i < this.popsize; i++){
			this.arrows[i].update();
			this.arrows[i].show();
		}
	}
}