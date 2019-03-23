function drawV3(){
    if(draw_toggle){
        // framestuff.html(int(getFrameRate()))
        background("#212121");

        // Draw the track
        stroke(255);
        var b1 = track.segments[0].startBorder.points[0];
        var b2 = track.segments[0].startBorder.points[1];
        var e1 = track.segments[track.segments.length-1].endBorder.points[0];
        var e2 = track.segments[track.segments.length-1].endBorder.points[1];
        line(b1[0],b1[1],b2[0],b2[1]);
        line(e1[0],e1[1],e2[0],e2[1]);
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

        // Draw targetlines
        if(targetlines_toggle){
            for(var i = 0; i < targets.length-1; i++){
                for(var j = 0; j < targets[i].length; j++){
                    stroke(color("#89DDF3"));
                    point(targets[i][j][0], targets[i][j][1]);
                }
            }
        }

        // Around controlls
        stroke(color("white"));
        strokeWeight(6);
        noFill();
        rect(1280-(1280/5.6),0+(628/25),1280/6,628/1.4);

        // Around generation counter
        stroke(color("white"));
        strokeWeight(6);
        noFill();
        rect(580,38,255,80);

        // Version switch
        strokeWeight(3 * width/2200);
        quad(30*width/1900, 100*height/1100, 30*width/1900, 40*height/1100, 80*width/1900, 20*height/1100, 80*width/1900, 70*height/1100);
        quad(80*width/1900, 70*height/1100, 80*width/1900, 20*height/1100, 130*width/1900, 40*height/1100, 130*width/1900, 100*height/1100);
        quad(130*width/1900, 100*height/1100, 130*width/1900, 40*height/1100, 180*width/1900, 20*height/1100, 180*width/1900, 70*height/1100);

        // Base for NN block
        stroke(color("white"));
        strokeWeight(6);
        noFill();
        rect(580,190,350,220);
        strokeWeight(0,001);
        all_points_NN = []; // not good style to do it everytime
        var some = [];
        for(var i = 0; i < 5; i++){
            some.push([640,240 + (i * 30)]);
            point(640,240 + (i * 30));
        }
        all_points_NN.push(some);
        some = [];
        for(var i = 0; i < 6; i++){
            some.push([720,225 + (i * 30)]);
            point(720,225 + (i * 30));
        }
        all_points_NN.push(some);
        some = [];
        for(var i = 0; i < 4; i++){
            some.push([800,255 + (i * 30)]);
            point(800,255 + (i * 30));
        }
        all_points_NN.push(some);
        some = [];
        for(var i = 0; i < 2; i++){
            some.push([880,285 + (i * 30)]);
            point(880,285 + (i * 30));
        }
        all_points_NN.push(some);
        strokeWeight(6);

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
            saveMBtn.removeClass("active");
            if(trackSwitched){
                trainTrackActive = !trainTrackActive;
                if(trainTrackActive){
                    track = new TrackV3("Train");
                }
                else{
                    track = new TrackV3("Test");
                }
                if(trainBool){
                    testBtn.addClass("active");
                    trainBtn.removeClass("active");
                }
                trainBoolByBtn = false;
            }
            if(loadModelByBtn){
                loadModelByBtn = false;
                loadMBtn.removeClass("active");
                population = savedModel[0];
                generation = savedModel[1];
                if(trainBoolByBtn){
                    testBtn.addClass("active");
                    trainBtn.removeClass("active");
                }
                trainBoolByBtn = false;
            }
            if(newModelByBtn){
                newModelByBtn = false;
                newMBtn.removeClass("active");
                population = new PopulationV3();
                if(trainBoolByBtn){
                    testBtn.addClass("active");
                    trainBtn.removeClass("active");
                }
                trainBoolByBtn = false;
                generation = 0;
            }
            if(trainBoolByBtn){
                trainBool = true;
                population.evaluate();
                population.selection();
            }
            else {
                trainBool = false;
                population.evaluate();
                population.restart();
                generation -=1;
                if(trackSwitched){
                    trackSwitched = false;
                    targets = [];
                    for(var i = 0; i < track.segments.length; i++){
                        targets.push(track.segments[i].targets);
                    }
                }
            }
            count = 0;
            generation += 1;
            population.showBestNN("new");
        }
        else{
            count++;
            population.showBestNN("old");
        }
    }
}
