// var canvas = $("#myCanvas");
// var context = canvas.getContext("2d");
//
// $('#bool-switcher').click(function(){
//     $.jCanvas.defaults.draggable = !$.jCanvas.defaults.draggable;
//     console.log($.jCanvas.defaults.draggable);
// });
//
// $.jCanvas.defaults.fromCenter = false;
// $.jCanvas.defaults.draggable = true;
//
// canvas.drawArc({
//     fillStyle: 'black',
//     x: 100, y: 100,
//     radius: 50
// });
//
// context.moveTo(50, 50);
// context.lineTo(450, 300);
//
// context.strokeStyle = "steelblue";
// context.strokeRect(50, 50, 270, 200);
//
// context.font="30px Arial";
// context.fillText('Hello world', 60, 120, 240);


//перемещаемые элементы на jCanvas.js, которые в гробу хотели видеть мои попытки что-то скриптово изменить в них
//
// function card(cluster, coordsX, coordsY, cardWidth, cardHeight ){
//     canvas.drawRect({
//         layer: true,
//         groups: [cluster],
//         dragGroups: [cluster],
//         strokeStyle: 'steelblue',
//         x: coordsX, y: coordsY,
//         width: cardWidth, height: cardHeight,
//     })
// }
//
//
// function cardContent(cluster, textCoordsX, textCoordsY, textWidth, content){
//     canvas.drawText({
//         layer: true,
//         groups: [cluster],
//         dragGroups: [cluster],
//         strokeStyle: 'steelblue',
//         x: textCoordsX, y: textCoordsY,
//         fillStyle: '#9cf',
//         strokeWidth: 2,
//         fontSize: 16,
//         maxWidth: textWidth,
//         fontFamily: 'Arial, sans-serif',
//         text: content,
//     })
// }
//
// card('cardGroup1', 10, 20, 130, 90);
//
// cardContent('cardGroup1', 20, 30, 110, 'Hello world');
//
//
// card('cardGroup2', 160, 20, 130, 90);
//
// cardContent('cardGroup2', 170, 30, 110, 'How are you buddy? D\'you like ice-cream?');

var canvas = document.getElementById("myCanvas");

var app = new PIXI.Application({
    view: canvas,
    width: window.innerWidth,
    height: 600,
    backgroundColor: 0x1099bb,
    resolution: window.devicePixelRatio || 1,
    antialias: true
});

var container = new PIXI.Container();
app.stage.addChild(container);
// var app = new PIXI.Application({ antialias: true });
// document.body.appendChild(app.view);
var graphics = new PIXI.Graphics();


function createRect(coordsX, coordsY) {
    graphics.lineStyle(4, 0xFF3300, 1);
    graphics.beginFill(0x66CCFF);
    graphics.drawRect(0, 0, 200, 264);
    graphics.endFill();
    graphics.x = coordsX;
    graphics.y = coordsY;

    graphics.interactive = true;
    graphics.buttonMode = true;

    graphics
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove);

    app.stage.addChild(graphics);
}

function onDragStart(event) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.dragging = true;
}

function onDragEnd() {
    this.dragging = false;
    // set the interaction data to null
    this.data = null;
}

function onDragMove() {
    if (this.dragging) {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x;
        this.y = newPosition.y;
    }
}


$('#bool-switcher').click(function(){
    graphics.interactive = !graphics.interactive;
    console.log(graphics.interactive);
});

createRect(120, 170);