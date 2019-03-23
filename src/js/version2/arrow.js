function ArrowV2(dna){
	this.thefittest = false;
	this.completed = false;
	this.crashed = false;
	this.targ_ind = 0;
	this.pos = createVector(210*width/977, 90*height/466);
	this.vel = createVector();
	this.acc = createVector();
	if(dna){
		this.dna = dna;
	}
	else{
		this.dna = new DNAV2();
	}
	this.fitness = 0;

	this.calcFitness = function(){
		var d = dist(this.pos.x,this.pos.y,targets[this.targ_ind][2][0],targets[this.targ_ind][2][1]);
		this.fitness = 1 / (d*d);
		this.fitness += this.targ_ind;
		if(this.completed){
			this.fitness += 1;
		}
	}

	this.applyForce = function(force){
		this.acc.add(force);
	}

	this.update = function(){
		if(!this.crashed || this.completed){
			for(var i = 0; i < targets[targets.length-1].length; i++){
				var d = dist(this.pos.x,this.pos.y,targets[targets.length-1][i][0],targets[targets.length-1][i][1]);
				if(d < (width/50)){
					this.completed = true;
					break;
				}
			}
			var track_status = track.inTrack([this.pos.x, this.pos.y])
			if(!this.completed){
				var old_targ_ind = this.targ_ind;
				this.targ_ind = track_status[1];
				if(!this.targ_ind){
					this.targ_ind = old_targ_ind;
				}
			}
			if(!track_status[0]){
				this.crashed = true;
			}

			if(this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0){
				this.crashed = true;
			}

			this.calcFitness();
			if(!this.completed && !this.crashed && (count % vector_mod == 0)){
				this.applyForce(this.dna.genes[count]);
				this.vel.add(this.acc);
				this.vel.limit(maxvel);
				this.pos.add(this.vel);
				this.acc.mult(0);
			}
		}
	}

	this.show = function(){
		push();
		noStroke();
		if(this.thefittest){
			fill("#A6E22E");
		}
		else{
			fill(255,150);
		}
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading());
		rectMode("CENTER");
		beginShape();
		vertex(0, 0);
		vertex(10*width/1466, 5*height/700);
		vertex(0, 10*height/700);
		vertex(0, 7.5*height/700);
		vertex(-20*width/1466, 7.5*height/700);
		vertex(-30*width/1466, 13*height/700);
		vertex(-27*width/1466, 5*height/700);
		vertex(-30*width/1466, -3*height/700);
		vertex(-20*width/1466, 2.5*height/700);
		vertex(0, 2.5*height/700);
		endShape();
		pop();
	}
}
