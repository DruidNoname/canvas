! function(a) {
    a(document).ready((function() {
        var o = {
            $canvas: a("#canvas"),
            color: "blue medium",
            press: !1,
            last: new Image,
            hist: [],
            undoHist: [],
            clicks: 0,
            start: !1
        };
        var e = {
                stroke: a("#stroke"),
                strokeContainer: a("#stroke-container"),
                box: a("#box"),
                tools: a("#tools"),
                clear: a("#clear"),
                slider: a("#slider"),
                colors: a("#colors"),
                brush: a("#brush"),
                path: a("#path"),
                rect: a("#rect"),
                ellipse: a("#ellipse"),
                undo: a("#undo"),
                redo: a("#redo"),
                save: a("#save")
            },
            n = {
                mousedown: "touchstart",
                mouseup: "touchend",
                mousemove: "touchmove"
            };

        function s() {
            o.$canvas.drawRect({
                fillStyle: "#fff",
                x: 0,
                y: 0,
                width: o.canvasW,
                height: o.canvasH,
                fromCenter: !1
            })
        }

        function t(a) {
            o.$canvas.clearCanvas(), o.$canvas.drawImage({
                source: a,
                x: 0,
                y: 0,
                width: o.canvasW,
                height: o.canvasH,
                fromCenter: !1
            })
        }

        function c() {
            e.stroke.width(o.stroke), e.stroke.height(o.stroke), e.stroke.css({
                marginLeft: (e.box.width() - e.stroke.width()) / 2,
                marginTop: (e.box.height() - e.stroke.height()) / 2
            }), !1 === o.start ? (e.stroke.css({
                backgroundColor: o.color
            }), o.start += 1) : !0 === o.start && e.stroke.stop().animate({
                backgroundColor: o.color
            }, void 0), o.start = !0
        }
        o.getTouchEventName = function(a) {
            return void 0 !== window.ontouchstart && n[a] && (a = n[a]), a
        }, o.getPageCoords = function(a) {
            return a.originalEvent.changedTouches ? {
                pageX: a.originalEvent.changedTouches[0].pageX,
                pageY: a.originalEvent.changedTouches[0].pageY
            } : {
                pageX: a.pageX,
                pageY: a.pageY
            }
        }, o.clearCanvas = s;
        var r = {
                red: {
                    dark: "#a11",
                    medium: "#c33",
                    light: "#e55"
                },
                green: {
                    dark: "#4b1",
                    medium: "#6d2",
                    light: "#8f4"
                },
                blue: {
                    dark: "#14b",
                    medium: "#36d",
                    light: "#58f"
                },
                orange: {
                    dark: "#d51",
                    medium: "#f73",
                    light: "#f95"
                },
                yellow: {
                    dark: "#ed2",
                    medium: "#fe3",
                    light: "#ff5"
                },
                purple: {
                    dark: "#75d",
                    medium: "#96f",
                    light: "#b8f"
                },
                black: {
                    dark: "#000",
                    medium: "#999",
                    light: "#fff"
                }
            },
            i = ["red", "green", "blue", "orange", "yellow", "purple", "brown", "white", "black"],
            l = ["light", "medium", "dark"];

        function d(e) {
            var n = e.split(" ");
            (e = a("." + n[0] + "." + n[1])).addClass("chosen"), o.color = e.css("backgroundColor"), c()
        }

        function u(a) {
            var o = e.slider.width();
            e.slider.children("#filler").width(o * (a / 100))
        }
        e.tools.on("click", ".tool", (function() {
            e.tools.find(".chosen").removeClass("chosen"), a(this).addClass("chosen")
        })), e.clear.on("click", (function() {
            o.$canvas.trigger("mouseup"), o.last.src = o.$canvas[0].toDataURL("image/png"), o.hist.push(o.last.src), s(), o.clicks = 0
        })), e.save.on("click", (function() {
            var a = o.$canvas[0].toDataURL("image/png");
            o.$canvas.mouseup(), window.open(a)
        })), e.undo.on("click", (function() {
            (o.$canvas.mouseup(), o.hist.length > 0) && (o.clicks = 0, o.undoHist.push(o.$canvas[0].toDataURL("image/png")), t(o.hist.pop()))
        })), e.redo.on("click", (function() {
            if (o.$canvas.mouseup(), o.undoHist.length > 0) {
                o.clicks = 0;
                var a = o.undoHist.pop();
                o.hist.push(o.$canvas[0].toDataURL("image/png")), t(a)
            }
        })), e.brush.on("click", (function() {
            o.$canvas.brushTool(o)
        })), e.path.on("click", (function() {
            o.last.src = o.$canvas[0].toDataURL("image/png"), o.$canvas.pathTool(o)
        })), e.rect.on("click", (function() {
            o.last.src = o.$canvas[0].toDataURL("image/png"), o.$canvas.rectTool(o)
        })), e.ellipse.on("click", (function() {
            o.last.src = o.$canvas[0].toDataURL("image/png"), o.$canvas.ellipseTool(o)
        })), e.brush.click(),
            function() {
                var o, e;

                function n(o, e) {
                    r[o] && r[o][e] && a('<div class="color ' + o + " " + e + '" />').css({
                        backgroundColor: r[o][e]
                    }).appendTo("#colors")
                }
                for (e = 0; e < l.length; e += 1)
                    for (o = 0; o < i.length; o += 1) n(i[o], l[e])
            }(), d(o.color), e.colors.on("click", ".color", (function() {
            var e = a(this);
            return a(".color.chosen").removeClass("chosen"), d(e.prop("class").replace(/(color|chosen) /gi, "")), e.addClass("chosen"), o.clicks = 0, !1
        })), e.slider.slider({
            min: 1,
            value: 20
        });
        var h, g = e.slider.slider("option", "value");
        u(g), o.stroke = Math.round(g / 2), c(), e.slider.bind("slide", (function(a, e) {
            var n = e.value;
            o.stroke = Math.round(n / 2), c(), u(n)
        })), h = o.$canvas.getCanvasImage("image/png"), o.canvasW = window.innerWidth, o.canvasH = window.innerHeight, o.$canvas.prop({
            width: o.canvasW,
            height: o.canvasH
        }), o.$canvas.detectPixelRatio(), h.length > 10 && o.$canvas.drawImage({
            source: h,
            x: 0,
            y: 0,
            width: o.canvasW,
            height: o.canvasH,
            fromCenter: !1
        }), s()
    }))
}(jQuery);


(function($) {
    $.fn.brushTool = function(painter) {

// SET ESSENTIALS
        var $canvas = this;
        $canvas.unbind();
        painter.clicks = 0;
        var startX, startY, endX, endY;

        var drawLine = function() {
            $canvas.drawLine({
                strokeWidth: painter.stroke,
                strokeStyle: painter.color,
                strokeCap: 'round',
                strokeJoin: 'round',
                x1: startX, y1: startY,
                x2: endX, y2: endY
            });
        };

        $canvas.on(painter.getTouchEventName('mousedown'), function(event) {
            painter.hist.push(painter.last.src=$canvas[0].toDataURL('image/png'));
            painter.undoHist.length = 0;
            if (painter.press === true) {painter.clicks = 0;}
            if (painter.clicks === 0) {
                painter.drag = true;
                var pageCoords = painter.getPageCoords(event);
                startX = pageCoords.pageX;
                startY = pageCoords.pageY;
                endX = startX;
                endY = startY;
                $canvas.drawArc({
                    fillStyle: painter.color,
                    x: startX, y: startY,
                    radius: (painter.stroke / 2),
                    start: 0,
                    end: 360
                });
                painter.clicks += 1;
            }
            event.preventDefault();
        });

        $canvas.on(painter.getTouchEventName('mouseup'), function(event) {
            painter.drag = false;
            painter.last.src = $canvas[0].toDataURL('image/png');
            painter.clicks = 0;
            event.preventDefault();
        });

        $canvas.on(painter.getTouchEventName('mousemove'), function(event) {
            if (painter.drag === true && painter.clicks >= 1) {
                startX = endX;
                startY = endY;
                var pageCoords = painter.getPageCoords(event);
                endX = pageCoords.pageX;
                endY = pageCoords.pageY;
                drawLine();
            }
            event.preventDefault();
        });

    };
})(jQuery);