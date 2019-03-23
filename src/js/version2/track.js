function TrackV2(whichOne){
	this.segments = [];

	if(whichOne === "A"){
		var seg1 = new TrackSegmentV2(new lineSV2([80,100],[180,100]), new lineSV2([81,420],[181,340]), new lineSV2([80,100],[81,420]), new lineSV2([180,100],[181,340]),"under","over");
		var seg2 = new TrackSegmentV2(new lineSV2([81,420],[181,340]), new lineSV2([130,470],[200,370]), new lineSV2([81,420],[130,470]), new lineSV2([181,340],[200,370]),"under","over");
		var seg3 = new TrackSegmentV2(new lineSV2([130,470],[200,370]), new lineSV2([330,470],[270,370]), new lineSV2([130,470],[330,470]), new lineSV2([200,370],[270,370]),"under","under");
		var seg4 = new TrackSegmentV2(new lineSV2([330,470],[270,370]), new lineSV2([390,420],[290,340]), new lineSV2([330,470],[390,420]), new lineSV2([270,370],[290,340]),"over","under");
		var seg5 = new TrackSegmentV2(new lineSV2([390,420],[290,340]), new lineSV2([391,230],[291,150]), new lineSV2([390,420],[391,230]), new lineSV2([290,340],[291,150]),"over","under");
		var seg6 = new TrackSegmentV2(new lineSV2([391,230],[291,150]), new lineSV2([420,200],[350,100]), new lineSV2([391,230],[420,200]), new lineSV2([291,150],[350,100]),"over","under");
		var seg7 = new TrackSegmentV2(new lineSV2([420,200],[350,100]), new lineSV2([531,200],[530,100]), new lineSV2([420,200],[531,200]), new lineSV2([350,100],[530,100]),"over","under");
		this.segments.push(seg1);
		this.segments.push(seg2);
		this.segments.push(seg3);
		this.segments.push(seg4);
		this.segments.push(seg5);
		this.segments.push(seg6);
		this.segments.push(seg7);
	}

	this.inTrack = function(p){
		for(var i = 0; i < this.segments.length; i++){
			if(this.segments[i].check(p) == true){
				return [true, i];
			}
		}
		return [false, null];
	}
}


function TrackSegmentV2(startFunc,endFunc,lowerFunc,upperFunc,startCheckMethod, endCheckMethod){
	this.startBorder = startFunc;
	this.endBorder = endFunc;
	this.lowerBorder = lowerFunc;
	this.upperBorder = upperFunc;
	this.targets = [];
	var targ_div = 6;
	for(var i = 1; i < targ_div; i++){
		this.targets.push([this.endBorder.points[0][0] - ((this.endBorder.points[0][0] - this.endBorder.points[1][0]) * (i / targ_div)),
			this.endBorder.points[0][1] - ((this.endBorder.points[0][1] - this.endBorder.points[1][1]) * (i / targ_div))]);
	}

	this.check = function(p){
		if(this.startBorder.check(p) == startCheckMethod || this.startBorder.check(p) == "on"){
			if(this.endBorder.check(p) === endCheckMethod){
				if(this.lowerBorder.check(p) === "over"){
					if(this.upperBorder.check(p) === "under"){
						return true;
					}
				}
			}
		}
		return false;
	}
}


function lineSV2(p1, p2){
	this.p1 = [(p1[0]+80) * width/977, (p1[1]-60) * height/466];
	this.p2 = [(p2[0]+80) * width/977, (p2[1]-60) * height/466];
	this.name = "line";
	this.points = [this.p1, this.p2];
	this.m = ((this.p2[1] - this.p1[1]) * -1) / (this.p2[0] - this.p1[0]);
	this.b = ((this.p1[1] * -1) - (this.m * this.p1[0]));

	this.check = function(p3){
		if(((this.m * p3[0]) + this.b) > (p3[1] * -1)){
			return "under";
		}
		else if(((this.m * p3[0]) + this.b) < (p3[1] * -1)){
			return "over";
		}
		else{
			return "on";
		}
	}
}
