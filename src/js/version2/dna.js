function DNAV2(genes){
	if(genes){
		this.genes = genes;
	}
	else{
		this.genes = [];
		for(var i = 0; i < lifespan; i++){
			this.genes[i] = p5.Vector.random2D();
			this.genes[i].setMag(maxforce);
		}
	}

	this.crossover = function(partner){
		var newgenes = [];
		// var mid = floor(random(this.genes.length));
		// for(var i = 0; i < this.genes.length; i++){
		//   if(i > mid){
		//     newgenes[i] = this.genes[i];
		//   }
		//   else{
		//     newgenes[i] = partner.genes[i];
		//   }
		// }
		for(var i = 0; i < this.genes.length; i++){
			newgenes[i] = random([this.genes[i],partner.genes[i]]);
		}
		for(var j = newgenes.length; j < lifespan; j++){
			newgenes.push();
			newgenes.push(p5.Vector.random2D());
			newgenes[j].setMag(maxforce)
		}
		return new DNAV2(newgenes);
	}

	this.mutation = function(){
		for(var i = 0; i < this.genes.length; i++){
			if(random(1) < mutation_rate){
				this.genes[i] = p5.Vector.random2D();
				this.genes[i].setMag(maxforce);
			}
		}
	}
}
