$.extend($.jCanvas.defaults, {
    fromCenter: false,
    draggable: true,
    layer: true,
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

function gettingCoordsParams(layerFrom, layerTo){
    var rectFrom = $('canvas').getLayer(layerFrom);
    var rectTo = $('canvas').getLayer(layerTo);
    var getCoordsParams = new Object();
    getCoordsParams.rectFromWidth = rectFrom.width;
    getCoordsParams.rectToWidth = rectTo.width;
    getCoordsParams.rectFromHeight = rectFrom.height;
    getCoordsParams.rectToHeight = rectTo.height;
    getCoordsParams.xFrom = rectFrom.x;
    getCoordsParams.xTo = rectTo.x;
    getCoordsParams.yFrom = rectFrom.y;
    getCoordsParams.yTo = rectTo.y;
    getCoordsParams.gap = 5; //этот параметр нужен, чтобы стрелка не втыкалась вплотную в рамку
    return getCoordsParams;
}


//ВОПРОС: КАК УБРАТЬ ХРУПКУЮ СИСТЕМУ С ЭЛЕМЕНТАМИ МАССИВА ПО ИНДЕКСУ - ИСПОЛЬЗУЕМ ОБЪЕКТ


function gettingBX(layerFrom, layerTo){
    var coordsParams = gettingCoordsParams(layerFrom, layerTo);

    if (coordsParams.xFrom + coordsParams.rectFromWidth < coordsParams.xTo) {
        var x = coordsParams.xFrom + coordsParams.rectFromWidth + coordsParams.gap;

    }  else if (coordsParams.xFrom < coordsParams.xTo + coordsParams.rectFromWidth) {
        x = coordsParams.xFrom + coordsParams.rectFromWidth/2;

    }  else {
        x = coordsParams.xFrom - coordsParams.gap;
    }
    return x;
}

function gettingBY(layerFrom, layerTo){
    var coordsParams = gettingCoordsParams(layerFrom, layerTo);

    if (coordsParams.yFrom > coordsParams.yTo + coordsParams.rectToHeight) {
        var y = coordsParams.yFrom - coordsParams.gap;

    }  else if (coordsParams.yFrom + coordsParams.rectFromHeight < coordsParams.yTo) {

        y = coordsParams.yFrom + coordsParams.rectFromHeight + coordsParams.gap;

    }  else {
        y = coordsParams.yFrom + coordsParams.rectFromHeight/2;
    }
    return y;
}

function gettingEX(layerFrom, layerTo){
    var coordsParams = gettingCoordsParams(layerFrom, layerTo);

    if (coordsParams.xTo + coordsParams.rectToWidth < coordsParams.xFrom) {
        var x = coordsParams.xTo + coordsParams.rectToWidth + coordsParams.gap;

    }  else if (coordsParams.xTo < coordsParams.xFrom + coordsParams.rectFromWidth) {
        x = coordsParams.xTo + coordsParams.rectToWidth/2;

    }  else {
        x = coordsParams.xTo - coordsParams.gap;
    }
    return x;
}

function gettingEY(layerFrom, layerTo){
    var coordsParams = gettingCoordsParams(layerFrom, layerTo);

    if (coordsParams.yTo > coordsParams.yFrom + coordsParams.rectFromHeight) {
        var y = coordsParams.yTo - coordsParams.gap;

    }  else if (coordsParams.yTo + coordsParams.rectToHeight < coordsParams.yFrom) {

        y = coordsParams.yTo + coordsParams.rectToHeight;

    }  else {
        y = coordsParams.yTo + coordsParams.rectToHeight/2;
    }
    return y;
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
        x1: gettingBX(layerFrom, layerTo),
        y1: gettingBY(layerFrom, layerTo),
        x2: gettingEX(layerFrom, layerTo),
        y2: gettingEY(layerFrom, layerTo)
    })
}

function nameArrowLayer(layerFrom, layerTo) {
    var cipherFrom = (layerFrom).replace(/\D+/g,"");
    var cipherTo = (layerTo).replace(/\D+/g,"");
    return 'arrowFrom' + cipherFrom + 'To' + cipherTo;
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

// *---*----*--CANVAS MOUSE EVENTS END--*----*-----



// *---*----*--NON-CANVAS TOOLS SWITCHERS--*----*-----
//
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
//
// //переключатель редактора текста работает, надо настроить
//
$('#write-switcher').click(function(){
    for (var i = 1; i < 5; ++i) {
        var groupName = 'cardGroup' + i;
        $('canvas').setLayerGroup(groupName, {
            click: function (layer){
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


// //переключатель выделения маркером

$('#draw-switcher').click(function(){
    for (var i = 1; i < 5; ++i) {
        var groupName = 'cardGroup' + i;
        $('canvas').setLayerGroup(groupName, {
            click: function (layer){
                    var startX = event.clientX;
                    var startY = event.clientY;
                    $(this).drawArc({
                        fillStyle: 'yellow',
                        x: startX,
                        y: startY,
                        radius: (20),
                        start: 0,
                        end: 360
                    });
            },
            draggable: false,
            cursors: {
                mouseover: 'crosshair'
            }
        }).drawLayers();
    }
    console.log('paintable');
});


// *---*----*--NON-CANVAS TOOLS SWITCHERS END--*----*-----
