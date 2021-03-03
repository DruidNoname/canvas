// (function($) {
//     $(document).ready(function () {
//
// // Set globals
//         var painter = {
//             $canvas: $('#myCanvas'),
//             color: 'blue medium',
//             press: false,
//             last: new Image(),
//             hist: [],
//             undoHist: [],
//             clicks: 0,
//             start: false
//         };
//
//         // function updateCanvasSize() {
//         //
//         //     var image = painter.$canvas.getCanvasImage('image/png');
//         //     painter.canvasW = window.innerWidth;
//         //     painter.canvasH = window.innerHeight;
//         //
//         //     painter.$canvas.prop({
//         //         width: painter.canvasW,
//         //         height: painter.canvasH
//         //     });
//         //
//         //     painter.$canvas.detectPixelRatio();
//         //
//         //     if (image.length > 10) {
//         //
//         //         painter.$canvas.drawImage({
//         //             source: image,
//         //             x: 0, y: 0,
//         //             width: painter.canvasW, height: painter.canvasH,
//         //             fromCenter: false
//         //         });
//         //
//         //     }
//         //
//         //
//         // }
//
//         var $$ = {
//             stroke: $('#stroke'),
//             strokeContainer: $('#stroke-container'),
//             brush: $('#brush'),
//         };
//
// // Map standard mouse events to touch events
//         var mouseEventMap = {
//             'mousedown': 'touchstart',
//             'mouseup': 'touchend',
//             'mousemove': 'touchmove'
//         };
//
// // Convert mouse event name to a corresponding touch event name (if possible)
//         function getTouchEventName(eventName) {
//             // Detect touch event support
//             if (window.ontouchstart !== undefined) {
//                 if (mouseEventMap[eventName]) {
//                     eventName = mouseEventMap[eventName];
//                 }
//             }
//             console.log(eventName);
//             return eventName;
//
//         }
//
//         painter.getTouchEventName = getTouchEventName;
//
//         function getPageCoords(event) {
//     if (event.originalEvent.changedTouches) {
//         return {
//             pageX: event.originalEvent.changedTouches[0].pageX,
//             pageY: event.originalEvent.changedTouches[0].pageY
//         };
//     } else {
//         return {
//             pageX: event.pageX,
//             pageY: event.pageY
//         };
//     }
// }
//
//         painter.getPageCoords = getPageCoords;
//
// // Clear canvas and set background
//
// // UPDATE STROKE
// //         function updateStroke() {
// //             $$.stroke.width(painter.stroke);
// //             $$.stroke.height(painter.stroke);
// //             $$.stroke.css({
// //                 marginLeft: ($$.box.width() - $$.stroke.width()) / 2,
// //                 marginTop: ($$.box.height() - $$.stroke.height()) / 2
// //             });
// //             if (painter.start === false) {
// //                 $$.stroke.css({backgroundColor: painter.color});
// //                 painter.start += 1;
// //             } else if (painter.start === true) {
// //                 $$.stroke.stop().animate({backgroundColor: painter.color}, duration);
// //             }
// //             painter.start = true;
// //         }
//
//         $$.brush.click();
//
//
//
//
//         $.fn.brushTool = function (painter) {
//
// // SET ESSENTIALS
//             var $canvas = this;
//             $canvas.unbind();
//             painter.clicks = 0;
//             var startX, startY, endX, endY;
//
//             var drawLine = function () {
//                 $canvas.drawLine({
//                     strokeWidth: painter.stroke,
//                     strokeStyle: painter.color,
//                     strokeCap: 'round',
//                     strokeJoin: 'round',
//                     x1: startX, y1: startY,
//                     x2: endX, y2: endY
//                 });
//             };
//
//             $canvas.on(painter.getTouchEventName('mousedown'), function (event) {
//                 painter.hist.push(painter.last.src = $canvas[0].toDataURL('image/png'));
//                 painter.undoHist.length = 0;
//                 if (painter.press === true) {
//                     painter.clicks = 0;
//                 }
//                 if (painter.clicks === 0) {
//                     painter.drag = true;
//                     var pageCoords = painter.getPageCoords(event);
//                     startX = pageCoords.pageX;
//                     startY = pageCoords.pageY;
//                     endX = startX;
//                     endY = startY;
//                     $canvas.drawArc({
//                         fillStyle: painter.color,
//                         x: startX, y: startY,
//                         radius: (painter.stroke / 2),
//                         start: 0,
//                         end: 360
//                     });
//                     painter.clicks += 1;
//                 }
//                 event.preventDefault();
//             });
//
//             $canvas.on(painter.getTouchEventName('mouseup'), function (event) {
//                 painter.drag = false;
//                 painter.last.src = $canvas[0].toDataURL('image/png');
//                 painter.clicks = 0;
//                 event.preventDefault();
//             });
//
//             $canvas.on(painter.getTouchEventName('mousemove'), function (event) {
//                 if (painter.drag === true && painter.clicks >= 1) {
//                     startX = endX;
//                     startY = endY;
//                     var pageCoords = painter.getPageCoords(event);
//                     endX = pageCoords.pageX;
//                     endY = pageCoords.pageY;
//                     drawLine();
//                 }
//                 event.preventDefault();
//             });
//
//         };
//
//     })(jQuery, {})
// )
//



var painter = {
    lineColor: 'rgb(255,240,0)',
    radius: 4,
    unknownCoefficient: 2.5,
    brushDrag: false,
};


var marker = {
    lineColor: 'rgba(255,240,0,0.46)',
    radius: 10,
    unknownCoefficient: 2.5,
    brushDrag: false,
};

var startX, startY, endX, endY;

var pointing = function(){
    painter.brushDrag = true;
    var bounding = $(this)[0].getBoundingClientRect();
    startX = event.clientX - bounding.left - painter.radius - painter.unknownCoefficient; //почему такая цифра, если радиус определенное число, откуда взялся коэффициэнт в 2.5?
    startY = event.clientY - bounding.top - painter.radius - painter.unknownCoefficient;
    endX = startX + painter.radius + painter.unknownCoefficient;
    endY = startY + painter.radius + painter.unknownCoefficient;
    console.log(painter.brushDrag);
    $(this).drawArc({
        fillStyle: 'transparent',
        groups: 'drawingLines',
        dragGroups: 'drawingLines',
        draggable: false,
        intangible: true,
        x: startX,
        y: startY,
        radius: painter.radius,
        start: 0,
        end: 360,
    });
    event.preventDefault();
};

var drawing = function() {
    $(this).css("cursor", "crosshair");

    if ( painter.brushDrag === true) {
        bounding = $(this)[0].getBoundingClientRect();
        startX = endX;
        startY = endY;
        endX = event.pageX - bounding.left;
        endY = event.pageY - bounding.top;

        $(this).drawLine({
            groups: 'drawingLines',
            dragGroups: 'drawingLines',
            draggable: false,
            intangible: true,
            strokeWidth: painter.radius*2,
            strokeStyle: painter.lineColor,
            strokeCap: 'round',
            strokeJoin: 'round',
            x1: startX, y1: startY,
            x2: endX, y2: endY,
        });
    } else {
        event.preventDefault();
    }
};

var aborting = function(){
    painter.brushDrag = false;
    console.log( painter.brushDrag);
    event.preventDefault();
};

// //переключатель выделения маркером
//nb должно быть условие, что если слоя нет - элемент рисуется отдельно.

$('#draw-switcher').click(function(){
    correctorOff();
    $('canvas')
        .mousedown(pointing)
        .mouseup(aborting)
        .mouseover(aborting)
        .mousemove(drawing)
        .setLayers({
        draggable: false,
        cursors: {
            mouseover: 'crosshair'
        }
    }).drawLayers();
    console.log('paintable');
});


$('#mark-switcher').click(function() {
    correctorOff();
    $('canvas').setLayers({
        intangible: true,
    }, function (layer) {
        var d = /\d+/;
        return (/^textLayer/.test(layer.name));
    }).drawLayers();

    $('canvas').setLayers({
        mousedown: function (layer){
            brushDrag = true;
            var groupName = layer.dragGroups;
            var bounding = $(this)[0].getBoundingClientRect();
            startX = event.clientX - bounding.left - marker.radius - marker.unknownCoefficient; //почему такая цифра, если радиус определенное число, откуда взялся коэффициэнт в 2.5?
            startY = event.clientY - bounding.top - marker.radius - marker.unknownCoefficient;
            endX = startX + marker.radius + marker.unknownCoefficient;
            endY = startY + marker.radius + marker.unknownCoefficient;
            console.log(brushDrag);
            $(this).drawArc({
                fillStyle: 'transparent',
                groups: [groupName],
                dragGroups: [groupName],
                draggable: false,
                intangible: true,
                x: startX,
                y: startY,
                radius: marker.radius,
                start: 0,
                end: 360,
            });
            event.preventDefault();
        },

        //надо добавлять рисунок и выводить рисунок, а потом его делать прозрачным

        mouseup: function (){
            brushDrag = false;
            console.log(brushDrag);
            // $('canvas').setLayerGroup('obvodka', {
            //     // opacity: 0.3
            // });
            event.preventDefault();
        },

        mouseover: function (){
            brushDrag = false;
            console.log(brushDrag);
            event.preventDefault();
        },


        mousemove: function (layer) {
            if (brushDrag === true) {
                bounding = $(this)[0].getBoundingClientRect();
                startX = endX;
                startY = endY;
                endX = event.pageX - bounding.left;
                endY = event.pageY - bounding.top;
                groupName = layer.dragGroups;

                $(this).drawLine({
                    groups: [groupName],
                    dragGroups: [groupName],
                    draggable: false,
                    intangible: true,
                    strokeWidth: marker.radius*2,
                    strokeStyle: marker.lineColor,
                    x1: startX, y1: startY,
                    x2: endX, y2: endY,
                });
            } else {
                event.preventDefault();
            }
        },


        draggable: false,
        cursors: {
            mouseover: 'crosshair'
        }
    }).drawLayers();
    console.log('markable');
});

