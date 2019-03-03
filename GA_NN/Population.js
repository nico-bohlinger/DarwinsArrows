function Population(){
    this.arrows = [];
    this.popsize = population_size;
    this.pool = [];
    this.show_ind = 0;

    for(var i = 0; i < this.popsize; i++){
        this.arrows[i] = new Arrow();
    }

    this.evaluate = function(){
        var maxfit = 0;
        this.pool = [];

        for(var i = 0; i < this.popsize; i++){
            this.arrows[i].calcFitness();
            this.pool.push([this.arrows[i].fitness, this.arrows[i].dna, i]);
        }
        this.pool.sort(function(a,b){return b[0]-a[0]})
    }

    this.selection = function(){
        var newArrows = []
        // Keep the best 25%
        used_idx = [];
        for(var i = 0; i < int(this.popsize * 0.25); i++){
            newArrows.push(new Arrow(this.pool[i][1]));
            this.pool[i] = null;
        }
        if(newArrows.length == 0){
            newArrows.push(new Arrow(this.pool[0][1]));
        }
        // Keep 10% of the remaining
        if(newArrows.length != this.popsize){
            for(var i = 0; i < int(this.popsize * 0.1); i++){
                while(true){
                    randomOne = random(this.pool);
                    // Check for null (see above)
                    if(randomOne){
                        newArrows.push(new Arrow(randomOne[1]));
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
            newArrows.push(new Arrow(child));
        }
        for(var i = 0; i < this.arrows.length; i++){
            this.arrows[i] = null;
        }
        this.arrows = newArrows;
    }


    this.run = function(){
        for(var i = 0; i < this.popsize; i++){
            if(trainBool || this.pool.length <= 0){
                this.arrows[i].update();
                this.arrows[i].show();
            }
            else{
                if(i >= population_size || this.pool[i] == null){
                    break;
                }
                this.arrows[this.pool[i][2]].update();
                this.arrows[this.pool[i][2]].show();
            }
        }
    }

    this.restart = function(){
        for(var i = 0; i < this.popsize; i++){
            this.arrows[i].restart();
        }
    }

    this.showBestNN = function(info){
        if(info === "new"){
            var maxFit = this.arrows[0].fitness;
            var ind = 0;
            for(var i = 0; i < this.arrows.lentgh; i++){
                if(this.arrows[i].fitness > maxFit){
                    maxFit = this.arrows[i].fitness;
                    ind = i;
                }
            }
            this.show_ind = ind;
        }
        this.arrows[this.show_ind].showNN();
    }
}
