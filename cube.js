var c=document.getElementById("canv");
var ctx=c.getContext("2d");
var canvasWidth = 600;
var canvasHeight = 600;
var vX, vY;
ctx.translate(canvasWidth/2, canvasWidth/2);

var previousX = 0,
    currX = 0,
    previousY = 0,
    prevX = 40,
    prevY = 40,
    currY = 0,
    moveX = 0,
    moveY = 0,
    currentXRotation = 0,
    currentYRotation = 0;

//define coordinates
var node0 = [-100, -100, -100];
var node1 = [-100, -100,  100];
var node2 = [-100,  100, -100];
var node3 = [-100,  100,  100];
var node4 = [ 100, -100, -100];
var node5 = [ 100, -100,  100];
var node6 = [ 100,  100, -100];
var node7 = [ 100,  100,  100];
var nodes = [node0, node1, node2, node3, node4, node5, node6, node7];

//defining edges
var edge0  = [0, 1];
var edge1  = [1, 3];
var edge2  = [3, 2];
var edge3  = [2, 0];
var edge4  = [4, 5];
var edge5  = [5, 7];
var edge6  = [7, 6];
var edge7  = [6, 4];
var edge8  = [0, 4];
var edge9  = [1, 5];
var edge10 = [2, 6];
var edge11 = [3, 7];
var edges = [edge0, edge1, edge2, edge3, edge4, edge5, edge6, edge7, edge8, edge9, edge10, edge11];

// Rotate shape around the z-axis
var rotateZ3D = function(theta) {
    var sin_t = Math.sin(theta);
    var cos_t = Math.cos(theta);
    
    for (var n=0; n<nodes.length; n++) {
        var node = nodes[n];
        var x = node[0];
        var y = node[1];
        node[0] = x * cos_t - y * sin_t;
        node[1] = y * cos_t + x * sin_t;
    }
};

var rotateY3D = function(theta) {
    var sin_t = Math.sin(theta);
    var cos_t = Math.cos(theta);
    
    for (var n=0; n<nodes.length; n++) {
        var node = nodes[n];
        var x = node[0];
        var z = node[2];
        node[0] = x * cos_t - z * sin_t;
        node[2] = z * cos_t + x * sin_t;
    }
};

var rotateX3D = function(theta) {
    var sin_t = Math.sin(theta);
    var cos_t = Math.cos(theta);
    
    for (var n=0; n<nodes.length; n++) {
        var node = nodes[n];
        var y = node[1];
        var z = node[2];
        node[1] = y * cos_t - z * sin_t;
        node[2] = z * cos_t + y * sin_t;
    }
};

rotateZ3D(40);
rotateY3D(40);
rotateX3D(40);

var draw= function() {
    
    // Draw edges
    for (var e=0; e<edges.length; e++) {
        var n0 = edges[e][0];
        var n1 = edges[e][1];
        var node0 = nodes[n0]; //picking node 0 x & y coords
        var node1 = nodes[n1]; //picking node 1 x & y coords
        ctx.beginPath();
        ctx.moveTo(node0[0],node0[1]);
        ctx.lineTo(node1[0],node1[1]);
        ctx.stroke();
    }

    // Draw nodes
    for (var n=0; n<nodes.length; n++) {
        var node = nodes[n];
        ctx.beginPath();
        ctx.arc(node[0], node[1], 5, 0, 2 * Math.PI);
        ctx.stroke();
    }
};
draw();

var render = function(x,y) {
    
    rotateY3D(x/100);
    rotateX3D(y/100);

    //clearing all the quadrants of the canvas
    ctx.clearRect(-400,-400,400,400);
    ctx.clearRect(400,400,-400,-400);
    ctx.clearRect(400,-400,-400,400);
    ctx.clearRect(-400,400,400,-400);
    draw();
}

var mouseDragged = function(event) {
    currX = event.clientX;
    currY = event.clientY;
    //console.log(currX,currY);
    moveX = currX - prevX;
    moveY = currY - prevY;
    //console.log(moveX, moveY);
    render(moveX, moveY);
    prevY = currY;
    prevX = currX;
    if(currX == 0 && currY == 0) {
        onDragEnd();
    }
};
var count = 0;
var damp = 1;
var onDragEnd = function() {
    var interval = setInterval(function() {
        console.log(prevX,prevY);
        render(prevX-damp, prevY-damp);
        damp = damp/1.001;
        count = count + 10;
        console.log(damp);
        if(count == 2000) {
            clearInterval(interval);
            count = 0;
        }
    }, 10);
    console.log("Execution Complete!");
}