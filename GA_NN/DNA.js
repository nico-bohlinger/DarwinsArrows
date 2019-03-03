function DNA(){

    var model = tf.sequential();
    var dense1 = tf.layers.dense({units: 6, activation: "relu", inputShape: 5, useBias: true, biasInitializer: "truncatedNormal"});
    // tf.layers.dropout({input: dense1, rate:0.1});
    var dense2 = tf.layers.dense({units: 4, activation: "relu", useBias: true, biasInitializer: "truncatedNormal"});
    // tf.layers.dropout({input: dense2, rate:0.1});
    var dense3 = tf.layers.dense({units: 2, activation: "tanh", useBias: true, biasInitializer: "truncatedNormal"});
    // bias use: , useBias: true, biasInitializer: "randomNormal"
    model.add(dense1);
    model.add(dense2);
    model.add(dense3);
    this.layer_length = 3;
    this.genes = model;
    this.dict = [[5,6],[6,4],[4,2]];
    this.result_action;


    this.action = function(measured_distances){
        var to_predict = [];
        for(var i = 0; i < measured_distances.length; i++){
            to_predict.push(measured_distances[i]);
        }
        var max_vec = sqrt((pow(maxforce,2)) / 2);
        const s0 = tf.tidy(() =>{
            var pred_vec = this.genes.predict(tf.tensor([to_predict])).dataSync();
            this.result_action = [pred_vec[0] * max_vec, pred_vec[1] * max_vec];
        });
        return this.result_action;
    }

    this.crossover = function(partner){
        // Uniform crossover
        new_dna = new DNA();
        const s1 = tf.tidy(() => {
            for(var i = 0; i < this.layer_length; i++){
                var weights = this.genes.layers[i].getWeights()[0].dataSync();
                var biases = this.genes.layers[i].getWeights()[1].dataSync();
                var weightsP = partner.genes.layers[i].getWeights()[0].dataSync();
                var biasesP = partner.genes.layers[i].getWeights()[1].dataSync();
                var new_weights = [];
                for(var j = 0; j < weights.length; j++){
                    new_weights.push(random([weights[j], weightsP[j]]));
                    // new_weights.push((weights[j] + weightsP[j]) / 2);
                }
                var new_biases = [];
                for(var j = 0; j < biases.length; j++){
                    new_biases.push(random([biases[j], biasesP[j]]));
                    // new_biases.push((biases[j] + biasesP[j]) / 2);
                }
                new_dna.genes.layers[i].setWeights([tf.tensor([new_weights]).reshape(this.dict[i]), tf.tensor(new_biases)]);
            }
        });
        return new_dna;
    }

    this.mutation = function(){
        const s2 = tf.tidy(() => {
            for(var i = 0; i < this.layer_length; i++){
                var weights = this.genes.layers[i].getWeights()[0].dataSync();
                var biases = this.genes.layers[i].getWeights()[1].dataSync();
                var new_weights = [];
                for(var j = 0; j < weights.length; j++){
                    if(random(1) < mutation_rate){
                        new_weights.push(weights[j] * random(-2,2));
                        // new_weights.push(random(-1,1));
                    }
                    else{
                        new_weights.push(weights[j]);
                    }
                }
                var new_biases = [];
                for(var j = 0; j < biases.length; j++){
                    if(random(1) < mutation_rate){
                        new_biases.push(biases[j] * random(-2,2));
                        // new_biases.push(random(-1,1));
                    }
                    else{
                        new_biases.push(biases[j]);
                    }
                }
                this.genes.layers[i].setWeights([tf.tensor([new_weights]).reshape(this.dict[i]), tf.tensor(new_biases)]);
            }
        });
    }
}
