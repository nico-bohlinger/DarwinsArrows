function TrackV3(whichOne){
    this.name = whichOne;
    this.segments = [];

    if(whichOne === "Test"){
        var seg1 = new TrackSegmentV3(new lineS([80,100], [180,100]), new lineS([81,420],[181,340]), new lineS([80,100],[81,420]), new lineS([180,100],[181,340]),"under","over","over","under");
        var seg2 = new TrackSegmentV3(new lineS([81,420],[181,340]), new lineS([130,470],[200,370]), new lineS([81,420],[130,470]), new lineS([181,340],[200,370]),"under","over","over","under");
        var seg3 = new TrackSegmentV3(new lineS([130,470],[200,370]), new lineS([330,470],[270,370]), new lineS([130,470],[330,470]), new lineS([200,370],[270,370]),"under","under","over","under");
        var seg4 = new TrackSegmentV3(new lineS([330,470],[270,370]), new lineS([390,420],[290,340]), new lineS([330,470],[390,420]), new lineS([270,370],[290,340]),"over","under","over","under");
        var seg5 = new TrackSegmentV3(new lineS([390,420],[290,340]), new lineS([391,230],[291,150]), new lineS([390,420],[391,230]), new lineS([290,340],[291,150]),"over","under","over","under");
        var seg6 = new TrackSegmentV3(new lineS([391,230],[291,150]), new lineS([420,200],[350,100]), new lineS([391,230],[420,200]), new lineS([291,150],[350,100]),"over","under","over","under");
        var seg7 = new TrackSegmentV3(new lineS([420,200],[350,100]), new lineS([531,200],[530,100]), new lineS([420,200],[531,200]), new lineS([350,100],[530,100]),"over","under","over","under");
        this.segments.push(seg1);
        this.segments.push(seg2);
        this.segments.push(seg3);
        this.segments.push(seg4);
        this.segments.push(seg5);
        this.segments.push(seg6);
        this.segments.push(seg7);
    }
    else if(whichOne === "Train"){
        var seg1 = new TrackSegmentV3(new lineS([80,200],[81,100]), new lineS([350,200],[351,100]), new lineS([80,200],[350,200]), new lineS([81,100],[351,100]),"under","over", "over", "under");
        var seg2 = new TrackSegmentV3(new lineS([350,200],[351,100]), new lineS([380,230],[480,180]), new lineS([350,200],[380,230]), new lineS([351,100],[480,180]),"under","over", "over", "under");
        var seg3 = new TrackSegmentV3(new lineS([380,230],[480,180]), new lineS([390,290],[490,291]), new lineS([380,230],[390,290]), new lineS([480,180],[490,291]),"under","over", "over", "under");
        var seg4 = new TrackSegmentV3(new lineS([390,290],[490,291]), new lineS([360,300],[401,381]), new lineS([390,290],[360,300]), new lineS([490,291],[401,381]),"under","over", "under", "over");
        var seg5 = new TrackSegmentV3(new lineS([360,300],[401,381]), new lineS([300,240],[301,371]), new lineS([360,300],[300,240]), new lineS([401,381],[301,371]),"under","over", "under", "over");
        var seg6 = new TrackSegmentV3(new lineS([300,240],[301,371]), new lineS([110,260],[201,331]), new lineS([300,240],[110,260]), new lineS([301,371],[201,331]),"under","over", "under", "over");
        var seg7 = new TrackSegmentV3(new lineS([110,260],[201,331]), new lineS([80,400],[190,381]), new lineS([110,260],[80,400]), new lineS([201,331],[190,381]),"under","over", "under", "over");
        var seg8 = new TrackSegmentV3(new lineS([80,400],[190,381]), new lineS([270,500],[250,415]), new lineS([80,400],[270,500]), new lineS([190,381],[250,415]),"under","under", "over", "under");
        var seg9 = new TrackSegmentV3(new lineS([270,500],[250,415]), new lineS([320,450],[290,385]), new lineS([270,500],[320,450]), new lineS([250,415],[290,385]),"over","under", "over", "under");
        var seg10 = new TrackSegmentV3(new lineS([320,450],[290,385]), new lineS([380,500],[400,430]), new lineS([320,450],[380,500]), new lineS([290,385],[400,430]),"over","over", "over", "under");
        var seg11 = new TrackSegmentV3(new lineS([380,500],[400,430]), new lineS([480,510],[481,470]), new lineS([380,500],[480,510]), new lineS([400,430],[481,470]),"under","over", "over", "under");
        this.segments.push(seg1);
        this.segments.push(seg2);
        this.segments.push(seg3);
        this.segments.push(seg4);
        this.segments.push(seg5);
        this.segments.push(seg6);
        this.segments.push(seg7);
        this.segments.push(seg8);
        this.segments.push(seg9);
        this.segments.push(seg10);
        this.segments.push(seg11);
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


function TrackSegmentV3(startFunc,endFunc,lowerFunc,upperFunc,startCheckMethod, endCheckMethod, lowerCheckMethode, upperCheckMethod){
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
        if(this.startBorder.check(p) == startCheckMethod || this.startBorder.check(p) === "on"){
            if(this.endBorder.check(p) === endCheckMethod){
                if(this.lowerBorder.check(p) === lowerCheckMethode){
                    if(this.upperBorder.check(p) === upperCheckMethod){
                        return true;
                    }
                }
            }
        }
        return false;
    }
}


function lineS(p1, p2){
    this.p1 = [(p1[0]) * width/1280, (p1[1]) * height/620];
    this.p2 = [(p2[0]) * width/1280, (p2[1]) * height/620];
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

    this.intersection = function(other_m, other_b){
        if(this.m == other_m){
            return [false];
        }
        var x = (other_b - this.b) / (this.m - other_m);
        var y = (this.m * x) + this.b;
        y*=-1;

        var x1 = this.points[0][0];
        var y1 = this.points[0][1];
        var x2 = this.points[1][0];
        var y2 = this.points[1][1];

        if((-0.0001 < (dist(x1,y1,x,y) + dist(x,y,x2,y2) - dist(x1,y1,x2,y2)) && ((dist(x1,y1,x,y) + dist(x,y,x2,y2) - dist(x1,y1,x2,y2)))) < 0.0001){
            return [true, x, y];
        }
        return [false];
    }
}
