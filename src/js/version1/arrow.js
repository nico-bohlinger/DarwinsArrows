function ArrowV1(dna){
	this.thefittest = false;
	this.completed = false;
	this.crashed = false;
	this.pos = createVector(width/2,height-(height/20));
	this.vel = createVector();
	this.acc = createVector();
	if(dna){
		this.dna = dna;
	}
	else{
		this.dna = new DNAV1();
	}
	this.fitness = 0;

	this.calcFitness = function(){
		var d = dist(this.pos.x,this.pos.y,target.x,target.y);
		this.fitness = 1 / (d*d);
		if(this.crashed){
			this.fitness = this.fitness / 2;
		}
	}

	this.applyForce = function(force){
		this.acc.add(force);
	}

	this.update = function(){
		var d = dist(this.pos.x,this.pos.y,target.x,target.y);
		if(d < width/50){
			this.completed = true;
		}

		for(var i = 0; i < objects_crash.length; i++){
			if((this.pos.x > objects_crash[i][0]) && (this.pos.x < objects_crash[i][0] + objects_crash[i][2]) && (this.pos.y > objects_crash[i][1]) && (this.pos.y < objects_crash[i][1] + objects_crash[i][3])){
				this.crashed = true;
				break;
			}
		}
		if(this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0){
			this.crashed = true;
		}
		this.calcFitness();

		if(!this.completed && !this.crashed && (count % vector_mod == 0)){
			if(this.dna.genes[count]){
				this.dna.genes[count].setMag(maxforce) // apply max force slider changes to existing genes
			}
			this.applyForce(this.dna.genes[count]);
			this.vel.add(this.acc);
			this.vel.limit(maxvel);
			this.pos.add(this.vel);
			this.acc.mult(0);
		}
	}

	this.show = function(){
		push();
		noStroke();
		if(this.thefittest){
			fill("#A6E22E")
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