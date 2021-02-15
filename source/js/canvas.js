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
        width: cardWidth, height: cardHeight,
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
            $(this).removeLayerGroup('arrowSystem')
        },

        dragstop: function() {
            buildArrowSystem()
        },
    }).drawLayers();

}


// *---*----*--DRAWING PRIMARY CARD END--*----*-----

// *---*----*--DRAWING CONNECTING ARROW--*----*-----

// function gettingCoordsParams(layerFrom, layerTo){
//     var rectFrom = $('canvas').getLayer(layerFrom);
//     var rectTo = $('canvas').getLayer(layerTo);
//     var rectFromWidth = rectFrom.width;
//     var rectToWidth = rectTo.width;
//     var xFrom = rectFrom.x;
//     var xTo = rectTo.x;
//     var yFrom = rectFrom.y;
//     var yTo = rectTo.y;
//     return [rectFrom,
//         rectTo,
//         rectFromWidth,
//         rectToWidth,
//         xFrom,
//         xTo,
//         yFrom,
//         yTo];
// }


//ЗАДАНИЕ НА ПОНЕДЕЛЬНИК: ПОНЯТЬ, ПОЧЕМУ МАССИВ СУКА НЕ ВЫЗЫВАЕТСЯ ФУНКЦИЕЙ КУДА НАДО


// function gettingBX(layerFrom, layerTo){
//     gettingCoordsParams(layerFrom, layerTo);
//     if (xFrom < xTo) {
//         x = x + rectWidth + 7;
//     }  else {
//
//     }
// }

function gettingBX(layerFrom){
    var rect = $('canvas').getLayer(layerFrom);
    var x = rect.x;
    var rectWidth = rect.width;
    return x + rectWidth + 7;
}


function gettingBY(layerFrom){
    var rect = $('canvas').getLayer(layerFrom);
    var y = rect.y;
    var rectHeight = rect.height;
    return y + rectHeight/2;
}

function gettingEX(layerTo){
    var rect = $('canvas').getLayer(layerTo);
    var x = rect.x;
    return x - 7;
}

function gettingEY(layerTo){
    var rect = $('canvas').getLayer(layerTo);
    var y = rect.y;
    var rectHeight = rect.height;
    return y + rectHeight/2;
}

function arrow(layerFrom, layerTo) {
    $('canvas').drawLine({
        name: nameArrowLayer(layerFrom, layerTo),
        groups: ['arrowSystem'],
        strokeStyle: '#000',
        strokeWidth: 2,
        endArrow: true,
        arrowRadius: 11,
        arrowAngle: 50,
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

function buildArrowSystem(){
    arrow('cardLayer1', 'cardLayer2');
    arrow('cardLayer3', 'cardLayer4');
}

// *---*----*--DRAWING CONNECTING ARROW END--*----*-----

// *---*----*--DRAWING THE WHOLE CANVAS STRUCTURE--*----*-----
drawWholeCardPrimary(1, 50, 100, 'Hello world');

drawWholeCardPrimary(2, 360, 100, 'How are you buddy? D\'you like ice-cream?');

drawWholeCardPrimary(3, 50, 460, 'Hello there');

drawWholeCardPrimary(4, 360, 460, 'General Kenobi!');

buildArrowSystem();

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
    $('#corrector').addClass('d-none');
    $('canvas').setLayers({
        click: function(){
            return false
        },
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
    for (var i = 1; i < 5; ++i) {
        var groupName = 'cardGroup' + i;
        $('canvas').setLayerGroup(groupName, {
            click: function (layer){
                // Click a star to spin it
                var index = $(this).getLayer(layer).name.replace(/\D+/g,"");
                var textLayer = $(this).getLayer("textLayer" + index);
                var usedText = textLayer.text;
                console.log(usedText);
                var victim = $("#corrector");
                victim.removeClass('d-none');
                victim.html(usedText);
                victim.attr({
                    contenteditable: true
                });
            },
            draggable: false,
            cursors: {
                mouseover: 'text'
            }
        }).drawLayers();
    }
    console.log('rewritable');
});


// *---*----*--NON-CANVAS TOOLS SWITCHERS END--*----*-----
