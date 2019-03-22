function PopulationV2(){
	this.arrows = [];
	this.popsize = population_size;
	this.matingpool = [];

	for(var i = 0; i < this.popsize; i++){
		this.arrows[i] = new ArrowV2();
	}

	this.evaluate = function(){
		var maxfit = 0;
		this.pool = [];

		for(var i = 0; i < this.popsize; i++){
			this.arrows[i].calcFitness();
			this.pool.push([this.arrows[i].fitness, this.arrows[i].dna]);
		}
		this.pool.sort(function(a,b){return b[0]-a[0]})
	}

	this.selection = function(){
		var newArrows = [];
		// Keep the best 25%
		used_idx = [];
		for(var i = 0; i < int(this.popsize * 0.25); i++){
			newArrows.push(new ArrowV2(this.pool[i][1]));
			this.pool[i] = null;
		}
		if(newArrows.length == 0){
			newArrows.push(new ArrowV2(this.pool[0][1]));
		}
		// Keep 15% of the remaining
		if(newArrows.length != this.popsize){
			for(var i = 0; i < int(this.popsize * 0.15); i++){
				while(true){
					randomOne = random(this.pool);
					// Check for null (see above)
					if(randomOne){
						newArrows.push(new ArrowV2(randomOne[1]));
						break;
					}
				}
			}
		}
		// Update for new population size
		this.popsize = population_size;
		// Breeding
		for(var i = newArrows.length; i < this.popsize; i++){
			// Check if different parents
			if(newArrows.length > 1){
				while(true){
					var parentA = random(newArrows).dna;
					var parentB = random(newArrows).dna;
					if(parentA !== parentB){
						break;
					}
				}
			}
			else{
				var parentA = newArrows[0].dna;
				var parentB = newArrows[0].dna;
			}
			var child = parentA.crossover(parentB);
			child.mutation();
			newArrows.push(new ArrowV2(child));
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
