var population;
var count = 0;

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

var showSensors = false;
var draw_toggle = true;
var targetlines_toggle = false;
var whatisthis_toggle = false;

var gen_tracker;

var all_points_NN = [];

var trainBoolByBtn = false;
var trainBool = trainBoolByBtn;
var newModelByBtn = false;
var loadModelByBtn = false;
var savedModel = null;
var trainTrackActive = true;
var trackSwitched = false;

var vector_mod = 1;

var fit_ind = 0;

var targets = [];

var track;

var generation = 1;

var sensor_length = 100;
