function Sensor(angle, max_length){
    this.angle = angle;
    this.max_length = max_length;

    this.update = function(old_pos, current_pos, segment_ind){
        var base = Math.atan2(current_pos[1] - old_pos[1], current_pos[0] - old_pos[0]) * (180 / Math.PI);
        var angle_adjusted = base + this.angle;
        if(angle_adjusted >= 360){
            angle_adjusted = angle_adjusted - 360;
        }
        var sensor_x = current_pos[0] + this.max_length * cos(angle_adjusted * (Math.PI / 180));
        var sensor_y = (current_pos[1] + this.max_length * sin(angle_adjusted * (Math.PI / 180)) * 1);
        var m = ((sensor_y - current_pos[1]) * -1) / (sensor_x - current_pos[0]);
        var b = ((current_pos[1] * -1) - (m * current_pos[0]));


        var best_old = dist(targets[segment_ind][0][0], targets[segment_ind][0][1], old_pos[0], old_pos[1]);
        for(var i = 0; i < targets[segment_ind].length; i++){
            var disti = dist(targets[segment_ind][i][0], targets[segment_ind][i][1], old_pos[0], old_pos[1]);
            if(best_old > disti){
                best_old = disti;
            }
        }
        var best_current = dist(targets[segment_ind][0][0], targets[segment_ind][0][1], current_pos[0], current_pos[1]);
        for(var i = 0; i < targets[segment_ind].length; i++){
            var disti = dist(targets[segment_ind][i][0], targets[segment_ind][i][1], current_pos[0], current_pos[1]);
            if(best_current > disti){
                best_current = disti;
            }
        }

        // If the arrow is heading forwards
        if(best_current <= best_old){
            for(var i = segment_ind-1; i < segment_ind+3; i++){
                if(i < track.segments.length && i >= 0){
                    // check
                    var temp = track.segments[i].upperBorder.intersection(m, b);
                    if(temp[0] && mag(current_pos[0] - temp[1], current_pos[1] - temp[2]) <= this.max_length && mag(temp[1] - sensor_x, temp[2] - sensor_y) <= this.max_length){
                        return [temp[1],temp[2]];
                    }
                    var temp = track.segments[i].lowerBorder.intersection(m, b);
                    if(temp[0] && mag(current_pos[0] - temp[1], current_pos[1] - temp[2]) <= this.max_length && mag(temp[1] - sensor_x, temp[2] - sensor_y) <= this.max_length){
                        return [temp[1],temp[2]];
                    }
                }
            }
        }
        else{
            for(var i = segment_ind+1; i > segment_ind-3; i--){
                if(i < track.segments.length && i >= 0){
                    // check
                    var temp = track.segments[i].upperBorder.intersection(m, b);
                    if(temp[0] && mag(current_pos[0] - temp[1], current_pos[1] - temp[2]) <= this.max_length && mag(temp[1] - sensor_x, temp[2] - sensor_y) <= this.max_length){
                        return [temp[1],temp[2]];
                    }
                    var temp = track.segments[i].lowerBorder.intersection(m, b);
                    if(temp[0] && mag(current_pos[0] - temp[1], current_pos[1] - temp[2]) <= this.max_length && mag(temp[1] - sensor_x, temp[2] - sensor_y) <= this.max_length){
                        return [temp[1],temp[2]];
                    }
                }
            }
        }
        var temp = track.segments[0].startBorder.intersection(m,b);
        if(temp[0] && mag(current_pos[0] - temp[1], current_pos[1] - temp[2]) <= this.max_length && mag(temp[1] - sensor_x, temp[2] - sensor_y) <= this.max_length){
            return [temp[1],temp[2]];
        }
        var temp = track.segments[track.segments.length-1].endBorder.intersection(m,b);
        if(temp[0] && mag(current_pos[0] - temp[1], current_pos[1] - temp[2]) <= this.max_length && mag(temp[1] - sensor_x, temp[2] - sensor_y) <= this.max_length){
            return [temp[1],temp[2]];
        }

        return [sensor_x, sensor_y];
    }
}
