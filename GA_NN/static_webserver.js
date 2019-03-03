var http = require('http');
var url = require('url');
var fs = require('fs');

fs.readFile('./DarwinsArrows.html', function (err, data) {
    if (err) {
        console.log(err);
    }
    bodyHTML = data;
});

fs.readFile('./Arrow.js', function (err, data) {
    if (err) {
        console.log(err);
    }
    arrowJS = data;
});

fs.readFile('./DNA.js', function (err, data) {
    if (err) {
        console.log(err);
    }
    DNAJS = data;
});

fs.readFile('./Draw.js', function (err, data) {
    if (err) {
        console.log(err);
    }
    DrawJS = data;
});

fs.readFile('./GlobalVariables.js', function (err, data) {
    if (err) {
        console.log(err);
    }
    GlobalVariablesJS = data;
});

fs.readFile('./Population.js', function (err, data) {
    if (err) {
        console.log(err);
    }
    PopulationJS = data;
});

fs.readFile('./Sensor.js', function (err, data) {
    if (err) {
        console.log(err);
    }
    SensorJS = data;
});

fs.readFile('./Setup.js', function (err, data) {
    if (err) {
        console.log(err);
    }
    SetupJS = data;
});

fs.readFile('./Track.js', function (err, data) {
    if (err) {
        console.log(err);
    }
    TrackJS = data;
});

fs.readFile('./p5.dom.js', function (err, data) {
    if (err) {
        console.log(err);
    }
    p5DomJS = data;
});

fs.readFile('./p5.min.js', function (err, data) {
    if (err) {
        console.log(err);
    }
    p5MinJS = data;
});

fs.readFile('./mycss.css', function (err, data) {
    if (err) {
        console.log(err);
    }
    myCss = data;
});

var myIPAdress = "192.168.178.51";
http.createServer(function(req, res) {
    var pathname = url.parse(req.url).pathname;
    switch (pathname) {
        case '/DarwinsArrows.html':
        res.writeHead(200, {
            'Content-Type' : 'text/html'
        });
        res.end(bodyHTML);
        break;
        case '/Arrow.js':
        res.writeHead(200, {
            'Content-Type' : 'application/js'
        });
        res.end(arrowJS);
        break;
        case '/DNA.js':
        res.writeHead(200, {
            'Content-Type' : 'application/js'
        });
        res.end(DNAJS);
        break;
        case '/Draw.js':
        res.writeHead(200, {
            'Content-Type' : 'application/js'
        });
        res.end(DrawJS);
        break;
        case '/Population.js':
        res.writeHead(200, {
            'Content-Type' : 'application/js'
        });
        res.end(PopulationJS);
        break;
        case '/GlobalVariables.js':
        res.writeHead(200, {
            'Content-Type' : 'application/js'
        });
        res.end(GlobalVariablesJS);
        break;
        case '/Sensor.js':
        res.writeHead(200, {
            'Content-Type' : 'application/js'
        });
        res.end(SensorJS);
        break;
        case '/Setup.js':
        res.writeHead(200, {
            'Content-Type' : 'application/js'
        });
        res.end(SetupJS);
        break;
        case '/Track.js':
        res.writeHead(200, {
            'Content-Type' : 'application/js'
        });
        res.end(TrackJS);
        break;
        case '/p5.dom.js':
        res.writeHead(200, {
            'Content-Type' : 'application/js'
        });
        res.end(p5DomJS);
        break;
        case '/p5.min.js':
        res.writeHead(200, {
            'Content-Type' : 'application/js'
        });
        res.end(p5MinJS);
        break;
        case '/mycss.css':
        res.writeHead(200, {
            'Content-Type' : 'text/css'
        });
        res.end(myCss);
        break;
        default:
        res.writeHead(404, {
            'Content-Type' : 'text/plain'
        });
        res.end("Not found");
        break;
    }
}).listen(8082, myIPAdress);
