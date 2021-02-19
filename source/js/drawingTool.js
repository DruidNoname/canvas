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
//             if (event.originalEvent.changedTouches) {
//                 return {
//                     pageX: event.originalEvent.changedTouches[0].pageX,
//                     pageY: event.originalEvent.changedTouches[0].pageY
//                 };
//             } else {
//                 return {
//                     pageX: event.pageX,
//                     pageY: event.pageY
//                 };
//             }
//         }
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
