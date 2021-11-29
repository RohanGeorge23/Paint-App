var context,
    canvas,
    dragging = false,
    dragStartLocation,
    snapshot,
    fillBox,
    clear,
    randomRGB = null;
    

function getCanvasCoordinates(event){
    var x = event.clientX - canvas.getBoundingClientRect().left,
        y = event.clientY - canvas.getBoundingClientRect().top;
    
    return { x: x, y: y};
}

function takeSnapshot(){
    snapshot = context.getImageData(0,0, canvas.width, canvas.height);
}
function restoreSnapshot(){
    context.putImageData(snapshot, 0 ,0);
}

Function

function drawLine(position){
    context.beginPath();
    context.moveTo(dragStartLocation.x , dragStartLocation.y);
    context.lineTo(position.x , position.y);
    context.stroke();
}

function drawCircle(position){
    var radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x),2)+ Math.pow((dragStartLocation.y - position.y),2));
    context.beginPath();
    context.arc(dragStartLocation.x, dragStartLocation.y, radius,0,2*Math.PI,false);
    context.fill();
}

function getRandomRgb() {
    var r = Math.ceil(Math.random() * 256);
    var g = Math.ceil(Math.random() * 256);
    var b = Math.ceil(Math.random() * 256);
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}



function drawPolygon(position, sides, angle) {
    var coordinates = [],
        radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2)),
        index = 0;

    for (index = 0; index < sides; index++) {
        coordinates.push({x: dragStartLocation.x + radius * Math.cos(angle), y: dragStartLocation.y - radius * Math.sin(angle)});
        angle += (2 * Math.PI) / sides;
    }

    context.beginPath();
    context.moveTo(coordinates[0].x, coordinates[0].y);
    
    
    for (index = 1; index < sides; index++) {
        context.lineTo(coordinates[index].x, coordinates[index].y);
    }
    context.fillStyle = randomRGB;


    context.closePath();
}


function dragstart(event){ 
    dragging = true;
    dragStartLocation = getCanvasCoordinates(event);
    randomRGB = getRandomRgb();
    takeSnapshot();

}

function drag(event){
    var position;
    if( dragging === true){
        restoreSnapshot();
    position = getCanvasCoordinates(event);
    // drawCircle(position);
    // drawLine(position);
    randomRGB = getRandomRgb();
    drawPolygon(position, 3, Math.PI / 4);
    if (fillBox.checked) {
        context.fill();
    } else {
        context.stroke();
    }
}
}

function dragstop(event){
    dragging = false;
    restoreSnapshot();
    var position = getCanvasCoordinates(event)
    // drawPolygon(position);
    // drawCircle(position);
    randomRGB = getRandomRgb();

    drawPolygon(position, 3, Math.PI / 4);
        if (fillBox.checked) {
            context.fill();
        } else {
            context.stroke();
        }
}

function init(){
    canvas = document.querySelector('canvas');   
    // canvas.height = window.innerHeight;
    // canvas.width = window.innerWidth;
    context = canvas.getContext('2d');
    context.strokeStyle = 'randomRGB';
    context.fillStyle='randomRGB'
    context.lineWidth = 3;
    context.lineCap = 'square';
    fillBox = document.getElementById("fillBox");
    
    document.getElementById('clear').addEventListener('click', function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }, false);

   
    canvas.addEventListener('mousedown',dragstart,false);
    canvas.addEventListener('mousemove',drag,false);
    canvas.addEventListener('mouseup',dragstop,false);




}
window.addEventListener('load',init,false);

