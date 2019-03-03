function setup(){

    // Create canvas and all sliders and their labels
    createCanvas(windowWidth,windowHeight);

    pops_slider_label = createP("Population size:");
    pops_slider_label.style("color","white");
    pops_slider_label.style('font-size', "" + 1280/80 + "px");
    pops_slider_label.position(1280-1280/7, 0+628/13);
    pops_slider = createSlider(1,50,pops_slider_startVal);
    pops_slider.position(1280-1280/7, 0+628/7);
    pops_slider.style('width', "" + 1280/10 + "px");

    lifes_slider_label = createP("Lifespan:");
    lifes_slider_label.style("color","white");
    lifes_slider_label.style('font-size', "" + 1280/80 + "px");
    lifes_slider_label.position(1280-1280/7.1, 0+628/5);
    lifes_slider = createSlider(100,1000,lifes_slider_startVal,50);
    lifes_slider.position(1280-1280/7, 0+628/3.7);
    lifes_slider.style('width', "" + 1280/10 + "px");

    mutarate_slider_label = createP("Mutation rate:");
    mutarate_slider_label.style("color","white");
    mutarate_slider_label.style('font-size', "" + 1280/80 + "px");
    mutarate_slider_label.position(1280-1280/7.1, 0+628/3)
    mutarate_slider = createSlider(0,0.05,mutarate_slider_startVal,0.001);
    mutarate_slider.position(1280-1280/7, 0+628/2.45);
    mutarate_slider.style('width', "" + 1280/10 + "px");

    force_slider_label = createP("Max. force:")
    force_slider_label.style("color","white")
    force_slider_label.style('font-size', "" + 1280/80 + "px");
    force_slider_label.position(1280-1280/7.1, 0+628/2.13)
    force_slider = createSlider(0.1,1,force_slider_startVal,0.1);
    force_slider.position(1280-1280/7, 0+628/1.85);
    force_slider.style('width', "" + 1280/10 + "px");

    mvel_slider_label = createP("Max. velocity:");
    mvel_slider_label.style("color","white");
    mvel_slider_label.style('font-size', "" + 1280/80 + "px");
    mvel_slider_label.position(1280-1280/7.1, 0+628/1.65);
    mvel_slider = createSlider(1,10,mvel_slider_startVal,0.5);
    mvel_slider.position(1280-1280/7, 0+628/1.47);
    mvel_slider.style('width', "" + 1280/10 + "px");

    gen_tracker = createP("Generation:");
    gen_tracker.style("color","#FFC34D");
    gen_tracker.style('font-size', "" + 1280/40 + "px");
    gen_tracker.position(600,50);

    best_NN_label = createP("Best NN");
    best_NN_label.style("color","white");
    best_NN_label.style('font-size', "" + 1280/55 + "px");
    best_NN_label.position(825,200);
    best_NN_label.addClass("underline");

    showSensorsBtn = createButton("Sensors");
    showSensorsBtn.addClass("btn");
    showSensorsBtn.position(200, 30);
    showSensorsBtn.mousePressed(toggleSensors);
    function toggleSensors(){
        showSensors = !showSensors;
        if(showSensors){
            showSensorsBtn.addClass("active");
        }
        else{
            showSensorsBtn.removeClass("active");
        }
    }

    pauseBtn = createButton("Pause");
    pauseBtn.addClass("btn");
    pauseBtn.position(100, 30);
    pauseBtn.mousePressed(togglePause);
    function togglePause(){
        draw_toggle = !draw_toggle;
        if(!draw_toggle){
            pauseBtn.addClass("active");
        }
        else{
            pauseBtn.removeClass("active");
        }
    }

    targetlinesBtn = createButton("Targets");
    targetlinesBtn.addClass("btn");
    targetlinesBtn.position(313, 30);
    targetlinesBtn.mousePressed(toggleTargets);
    function toggleTargets(){
        targetlines_toggle = !targetlines_toggle;
        if(targetlines_toggle){
            targetlinesBtn.addClass("active");
        }
        else{
            targetlinesBtn.removeClass("active");
        }
    }



    testBtn = createButton("Test");
    testBtn.addClass("btn");
    testBtn.addClass("active");
    testBtn.position(580, 470);
    testBtn.mousePressed(testmodeF);
    function testmodeF(){
        if(trainBool){
            trainBoolByBtn = false;
            testBtn.addClass("active");
            trainBtn.removeClass("active");
        }
    }
    trainBtn = createButton("Train");
    trainBtn.addClass("btn");
    trainBtn.position(580, 530);
    trainBtn.mousePressed(trainmodeF);
    function trainmodeF(){
        if(!trainBool){
            trainBoolByBtn = true;
            trainBtn.addClass("active");
            testBtn.removeClass("active");
        }
    }
    newMBtn = createButton("New");
    newMBtn.addClass("btn");
    newMBtn.position(700, 470);
    newMBtn.mousePressed(newmodelF);
    function newmodelF(){
        newModelByBtn = true;
        newMBtn.addClass("active");
        loadModelByBtn = false;
        loadMBtn.removeClass("active");
    }
    saveMBtn = createButton("Save");
    saveMBtn.addClass("btn");
    saveMBtn.position(700, 530);
    saveMBtn.mousePressed(savedModelF);
    function savedModelF(){
        saveMBtn.addClass("active");
        // Deep copy doesn't Work
        // -> Load Model (v1) -> Train (Model v2) -> Load again -> Model is v2
        // This means when you train a loaded model and load it again it is trained
        // but the generation counter is still the old one
        savedModel = [population, generation];
    }
    loadMBtn = createButton("Load");
    loadMBtn.addClass("btn");
    loadMBtn.position(790, 530);
    loadMBtn.mousePressed(loadModelF);
    function loadModelF(){
        if(savedModel){
            loadModelByBtn = true;
            loadMBtn.addClass("active");
            newModelByBtn = false;
            newMBtn.removeClass("active");
        }
    }



    trainTrackBtn = createButton("Train track");
    trainTrackBtn.addClass("btn");
    trainTrackBtn.addClass("active");
    trainTrackBtn.position(110, 530);
    trainTrackBtn.mousePressed(trainTrackF);
    function trainTrackF(){
        if(!trainTrackActive){
            trackSwitched = true;
            trainTrackBtn.addClass("active");
            testTrackBtn.removeClass("active");
        }
    }

    testTrackBtn = createButton("Test track");
    testTrackBtn.addClass("btn");
    testTrackBtn.position(240, 530);
    testTrackBtn.mousePressed(testTrackF);
    function testTrackF(){
        if(trainTrackActive){
            trackSwitched = true;
            testTrackBtn.addClass("active");
            trainTrackBtn.removeClass("active");
        }
    }


    whatisthis_text = createP("Work in progress!");
    whatisthis_text.position(1098,50);
    whatisthis_text.hide();
    whatisthis_text.style("color","white");

    whatisthisBtn = createButton("?");
    whatisthisBtn.addClass("btn");
    whatisthisBtn.position(1000, 24);
    whatisthisBtn.mousePressed(toggleWhatisthis);
    function toggleWhatisthis(){
        whatisthis_toggle = !whatisthis_toggle;
        if(whatisthis_toggle){
            whatisthisBtn.addClass("active");
            pops_slider.hide(); pops_slider_label.hide();
            lifes_slider.hide(); lifes_slider_label.hide();
            mutarate_slider.hide(); mutarate_slider_label.hide();
            force_slider.hide(); force_slider_label.hide();
            mvel_slider.hide(); mvel_slider_label.hide();
            whatisthis_text.show();
        }
        else{
            whatisthisBtn.removeClass("active");
            pops_slider.show(); pops_slider_label.show();
            lifes_slider.show(); lifes_slider_label.show();
            mutarate_slider.show(); mutarate_slider_label.show();
            force_slider.show(); force_slider_label.show();
            mvel_slider.show(); mvel_slider_label.show();
            whatisthis_text.hide();
        }
    }

    // framestuff = createP();
    // framestuff.position(500,50);
    // framestuff.style("color","white");



    // Create track, targets and population
    track = new Track("Train");
    population = new Population();

    for(var i = 0; i < track.segments.length; i++){
        targets.push(track.segments[i].targets);
    }
}
