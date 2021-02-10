var canvas = $("#myCanvas");


$.extend($.jCanvas.defaults, {
    fromCenter: false,
    draggable: true,
    layer: true
});


function card(layer, cluster, coordsX, coordsY, cardWidth, cardHeight){
    canvas.drawRect({
        name: layer,
        groups: [cluster],
        dragGroups: [cluster],
        strokeStyle: 'steelblue',
        x: coordsX, y: coordsY,
        width: cardWidth, height: cardHeight,
        //это заставляет включаться редактор текста
        click: function (layer) {
            var group = $('canvas').getLayerGroup(cluster);
            $.each (group, function(i) {
                if (group[i].text != '') {
                    var usedText = group[i].text;
                    console.log(usedText);
                    var victim = $("#corrector");
                    victim.html(usedText);
                    victim.attr( {
                        contenteditable: true
                    });
                }
            })
        },

        dragstart: function() {
            $('canvas').removeLayer("layer6");
            // code to run as layer is being dragged
        },

        dragstop: function() {
            // code to run when dragging stops
            arrow('layer6','cardGroup4', gettingBX("layer1"), gettingBY("layer1"), gettingEX("layer2"), gettingEY("layer2"));
        },


    })
}


function cardContent(layer, cluster, textCoordsX, textCoordsY, textWidth, content){
    canvas.drawText({
        name: layer,
        groups: [cluster],
        dragGroups: [cluster],
        strokeStyle: 'steelblue',
        x: textCoordsX, y: textCoordsY,
        fillStyle: '#9cf',
        strokeWidth: 2,
        fontSize: 32,
        maxWidth: textWidth,
        fontFamily: 'Arial, sans-serif',
        text: content,
        dragstart: function() {
            $('canvas').removeLayer("layer6");
            // code to run as layer is being dragged
        },

        dragstop: function() {
            // code to run when dragging stops
            arrow('layer6','cardGroup4', gettingBX("layer1"), gettingBY("layer1"), gettingEX("layer2"), gettingEY("layer2"));
        },
    })
}


function gettingBX(layer){
    var rect = $('canvas').getLayer(layer);
    var x = rect.x;
    var rectWidth = rect.width;
    return x + rectWidth;
}

function gettingBY(layer){
    var rect = $('canvas').getLayer(layer);
    var y = rect.y;
    var rectHeight = rect.height;
    return y + rectHeight/2;

}

function gettingEX(layer){
    var rect = $('canvas').getLayer(layer);
    var x = rect.x;
    return x;

}

function gettingEY(layer){
    var rect = $('canvas').getLayer(layer);
    var y = rect.y;
    var rectHeight = rect.height;
    return y + rectHeight/2;
}

function arrow(layer, cluster, CoordsBX, CoordsBY, CoordsEX, CoordsEY) {
    canvas.drawLine({
        name: layer,
        groups: [cluster],
        dragGroups: [cluster],
        strokeStyle: '#000',
        strokeWidth: 2,
        rounded: true,
        x1: CoordsBX, y1: CoordsBY,
        x2: CoordsEX, y2: CoordsEY,
    })
}




card('layer1', 'cardGroup1', 50, 100, 230, 190);

cardContent('layer3','cardGroup1', 60, 120, 170, 'Hello world');


card('layer2','cardGroup2', 360, 100, 230, 190);

cardContent('layer4','cardGroup2', 380, 120, 170, 'How are you buddy? D\'you like ice-cream?');

arrow('layer6','cardGroup4', gettingBX("layer1"), gettingBY("layer1"), gettingEX("layer2"), gettingEY("layer2"));








//
$('#bool-switcher').click(function(){
    // bool = !bool;
    $('canvas').setLayers({
        draggable: true // set to true instead to show the layer again
    }).drawLayers();
    console.log(draggable);
});

