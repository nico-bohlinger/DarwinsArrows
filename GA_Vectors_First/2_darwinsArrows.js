var population;
var count = 0;
var target;

var pops_slider;
var pops_slider_startVal = 25;
var population_size = pops_slider_startVal;

var lifes_slider;
var lifes_slider_startVal = 400;
var lifespan = lifes_slider_startVal;

var mutarate_slider;
var mutarate_slider_startVal = 0.01;
var mutation_rate = mutarate_slider_startVal;

var force_slider;
var force_slider_startVal = 0.5;
var maxforce = force_slider_startVal;

var mvel_slider;
var mvel_slider_startVal = 6;
var maxvel = mvel_slider_startVal;

var objects_crash = [];

var vector_mod = 1;

var fit_ind = 0;

function setup(){
  createCanvas(windowWidth-20,windowHeight-20);

  population = new Population();

  target = createVector(width/2,50);

  pops_slider_label = createP("Population size:")
  pops_slider_label.style("color","white")
  pops_slider_label.style('font-size', "" + width/80 + "px");
  pops_slider_label.position(width-width/7.1, 0+height/13)
  pops_slider = createSlider(1,50,pops_slider_startVal);
  pops_slider.position(width-width/7, 0+height/7);
  pops_slider.style('width', "" + width/10 + "px");

  lifes_slider_label = createP("Lifespan:")
  lifes_slider_label.style("color","white")
  lifes_slider_label.style('font-size', "" + width/80 + "px");
  lifes_slider_label.position(width-width/7.1, 0+height/5)
  lifes_slider = createSlider(100,1000,lifes_slider_startVal,50);
  lifes_slider.position(width-width/7, 0+height/3.7);
  lifes_slider.style('width', "" + width/10 + "px");

  mutarate_slider_label = createP("Mutation rate:")
  mutarate_slider_label.style("color","white")
  mutarate_slider_label.style('font-size', "" + width/80 + "px");
  mutarate_slider_label.position(width-width/7.1, 0+height/3)
  mutarate_slider = createSlider(0.01,1,mutarate_slider_startVal,0.01);
  mutarate_slider.position(width-width/7, 0+height/2.45);
  mutarate_slider.style('width', "" + width/10 + "px");

  force_slider_label = createP("Max. force:")
  force_slider_label.style("color","white")
  force_slider_label.style('font-size', "" + width/80 + "px");
  force_slider_label.position(width-width/7.1, 0+height/2.13)
  force_slider = createSlider(0.1,1,force_slider_startVal,0.1);
  force_slider.position(width-width/7, 0+height/1.85);
  force_slider.style('width', "" + width/10 + "px");

  mvel_slider_label = createP("Max. velocity:")
  mvel_slider_label.style("color","white")
  mvel_slider_label.style('font-size', "" + width/80 + "px");
  mvel_slider_label.position(width-width/7.1, 0+height/1.65)
  mvel_slider = createSlider(1,10,mvel_slider_startVal,0.5);
  mvel_slider.position(width-width/7, 0+height/1.47);
  mvel_slider.style('width', "" + width/10 + "px");

  titleP = createP("by Nico Bohlinger");
  titleP.style("color","#FFC34D");
  titleP.style('font-size', "" + width/35 + "px");
  titleP.position(425,235);

  objects_crash.push([400,240,300,85])
  objects_crash.push([width-(width/5.5),0+(height/20),width/6,height/1.4]);
}

function draw(){
  background("#212121");

  stroke(color("white"));
  strokeWeight(6);
  noFill();
  rect(width-(width/5.5),0+(height/20),width/6,height/1.4);

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
  for(var i = 0; i < population.rockets.length; i++){
    if(population.rockets[i].crashed == false && population.rockets[i].completed == false){
      allCrashed = false;
    }
    if(population.rockets[i].fitness >= max_fit){
      max_fit = population.rockets[i].fitness;
      fit_ind = i;
    }
  }
  population.rockets[fit_ind].thefittest = true;
  population.run();
  population.rockets[fit_ind].thefittest = false;


  if((count >= lifespan) || allCrashed){
    population.evaluate();
    population.selection();
    count = 0;
  }
  count++;

  noFill();
  rect(400,240,300,85);

  noStroke();
  fill("white");
  ellipse(target.x,target.y,width/30,width/30);
  fill("black")
  ellipse(target.x,target.y,width/34,width/34);
  fill("blue")
  ellipse(target.x,target.y,width/40,width/40);
  fill("red")
  ellipse(target.x,target.y,width/55,width/55);
  fill("yellow")
  ellipse(target.x,target.y,width/90,width/90);
}

function Population(){
  this.rockets = [];
  this.popsize = pops_slider_startVal;
  this.matingpool = [];

  for(var i = 0; i < this.popsize; i++){
    this.rockets[i] = new Rocket();
  }

  this.evaluate = function(){
    var maxfit = 0;

    for(var i = 0; i < this.popsize; i++){
      this.rockets[i].calcFitness();
      if(this.rockets[i].fitness > maxfit){
        maxfit = this.rockets[i].fitness;
      }
    }

    for(var i = 0; i < this.popsize; i++){
      this.rockets[i].fitness /= maxfit;
    }


    this.matingpool = [];
    for(var i = 0; i < this.popsize; i++){
      var n = this.rockets[i].fitness*100;
      for(var j = 0; j < n; j++){
        this.matingpool.push(this.rockets[i])
      }
    }
  }

  this.selection = function(){
    this.popsize = population_size;
    var newRockets = []
    for(var i = 0; i < this.popsize; i++){
      var parentA = random(this.matingpool).dna;
      var parentB = random(this.matingpool).dna;
      var child = parentA.crossover(parentB);
      child.mutation();
      newRockets[i] = new Rocket(child);
    }
    this.rockets = newRockets;
  }


  this.run = function(){
    for(var i = 0; i < this.popsize; i++){
      this.rockets[i].update();
      this.rockets[i].show();
    }
  }
}

function DNA(genes){
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
    var newgenes = []
    var mid = floor(random(this.genes.length));
    for(var i = 0; i < this.genes.length; i++){
      if(i > mid){
        newgenes[i] = this.genes[i];
      }
      else{
        newgenes[i] = partner.genes[i];
      }
    }
    for(var j = newgenes.length; j < lifespan; j++){
      newgenes.push();
      newgenes.push(p5.Vector.random2D());
      newgenes[j].setMag(maxforce)
    }
    return new DNA(newgenes);
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

function Rocket(dna){
  this.thefittest = false
  this.completed = false;
  this.crashed = false;
  this.pos = createVector(width/2,height-(height/20));
  this.vel = createVector();
  this.acc = createVector();
  if(dna){
    this.dna = dna;
  }
  else{
    this.dna = new DNA();
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
    translate(this.pos.x,this.pos.y);
    rotate(this.vel.heading());
    rectMode("CENTER");
    beginShape()
    vertex(0,0);
    vertex(10,5);
    vertex(0,10);
    vertex(0,7.5);
    vertex(-20,7.5);
    vertex(-30,13);
    vertex(-27,5);
    vertex(-30,-3);
    vertex(-20,2.5);
    vertex(0,2.5);
    endShape();
    pop();
  }
}
