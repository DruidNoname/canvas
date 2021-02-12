$.extend($.jCanvas.defaults, {
    fromCenter: false,
    draggable: true,
    layer: true
});

// *---*----*--DRAWING PRIMARY CARD--*----*-----

function card(layer, cluster, coordsX, coordsY, cardWidth, cardHeight){
    $('canvas').drawRect({
        name: layer,
        groups: [cluster],
        dragGroups: [cluster],
        strokeStyle: 'steelblue',
        x: coordsX, y: coordsY,
        width: cardWidth, height: cardHeight
    })
}

function cardContent(layer, cluster, textCoordsX, textCoordsY, textWidth, content){
    $('canvas').drawText({
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
        text: content
    })
}

function drawWholeCardPrimary(i, coordsX, coordsY, content){
    var cardWidth = 260;
    var cardHeight = 200;
    var textCoordsX = coordsX + 20;
    var textCoordsY = coordsY + 20;
    var textWidth = cardWidth - 40;

    card('cardLayer' + i, 'cardGroup' + i, coordsX, coordsY, cardWidth, cardHeight);
    cardContent('textLayer' + i, 'cardGroup' + i, textCoordsX, textCoordsY, textWidth, content);

    var cardGroup = 'cardGroup' + i;
    setCardDefaultOptions(cardGroup)
}

function setCardDefaultOptions(cardGroup){
    $('canvas').setLayerGroup(cardGroup, {
        cursors: {
            mouseover: 'grab',
            mousedown: 'grabbing',
            mouseup: 'grab'
        },

        dragstart: function() {
            $('canvas').removeLayer(nameArrowLayer('cardLayer1', 'cardLayer2'));
            // code to run as layer is being dragged
        },

        dragstop: function() {
            // code to run when dragging stops
            arrow('cardLayer1', 'cardLayer2','cardGroup4');
        },
    })
        .drawLayers();

}


// *---*----*--DRAWING PRIMARY CARD END--*----*-----

// *---*----*--DRAWING CONNECTING ARROW--*----*-----


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

function arrow(layerFrom, layerTo, cluster) {
    $('canvas').drawLine({
        name: nameArrowLayer(layerFrom, layerTo),
        groups: [cluster],
        dragGroups: [cluster],
        strokeStyle: '#000',
        strokeWidth: 2,
        rounded: true,
        x1: gettingBX(layerFrom),
        y1: gettingBY(layerFrom),
        x2: gettingEX(layerTo),
        y2: gettingEY(layerTo)
    })
}

function nameArrowLayer(layerFrom, layerTo) {
    var cypherFrom = (layerFrom).replace(/\D+/g,"");
    var cypherTo = (layerTo).replace(/\D+/g,"");
    var arrowLayer = 'arrowFrom' + cypherFrom + 'To' + cypherTo;
    return arrowLayer;
}


// *---*----*--DRAWING CONNECTING ARROW END--*----*-----

// *---*----*--DRAWING THE WHOLE CANVAS STRUCTURE--*----*-----
drawWholeCardPrimary(1, 50, 100, 'Hello world');

drawWholeCardPrimary(2, 360, 100, 'How are you buddy? D\'you like ice-cream?');


arrow('cardLayer1', 'cardLayer2','cardGroup4');


drawWholeCardPrimary(3, 50, 460, 'Hello there');


// *---*----*--DRAWING THE WHOLE CANVAS STRUCTURE END--*----*-----



// *---*----*--CANVAS MOUSE EVENTS--*----*-----
// function myFunc(){
//     console.log('Hello there!');
//     var group = canvas.getLayerGroup(this);
//     console.log(group[1].text);
// }


// *---*----*--CANVAS MOUSE EVENTS END--*----*-----






// *---*----*--NON-CANVAS TOOLS SWITCHERS--*----*-----

$('#drag-switcher').click(function(){
    $('canvas').setLayers({
        draggable: true,
        cursors: {
            mouseover: 'grab',
            mousedown: 'grabbing',
            mouseup: 'grab'
        }
    }).drawLayers();
    console.log('draggable');
});

//переключатель редактора текста не работает, и как его настроить - хз

$('#write-switcher').click(function(){
    $('canvas').setLayers( [/cardLayer/gi, /textLayer/gi], {
        click: function () {
            var cardGroupElems = $('canvas').getLayerGroup(/cardGroup/gi);
            $.each(cardGroupElems, function (j) {
                if (cardGroupElems[j].text != '') {
                    var usedText = cardGroupElems[j].text;
                    console.log(usedText);
                    var victim = $("#corrector");
                    victim.html(usedText);
                    victim.attr({
                        contenteditable: true
                    });
                }
            })
        }
    }, function(layerGroup) {
        return (layerGroup.name === /cardGroup/gi);
    }).drawLayers();

    $('canvas').setLayers({
        draggable: false,
        cursors: {
            mouseover: 'text'
        }
    }).drawLayers();
    console.log('rewritable');
});


// *---*----*--NON-CANVAS TOOLS SWITCHERS END--*----*-----

