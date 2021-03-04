var textLayer, victim;

$('#write-switcher').click(function(){
    unbindDrawing();
    layerDefaults();
    for (var i = 1; i < 5; ++i) {
        var groupName = 'cardGroup' + i;
        $('canvas').setLayerGroup(groupName, {
            click: function (layer){
                var index = $(this).getLayer(layer).name.replace(/\D+/g,"");
                textLayer = $(this).getLayer("textLayer" + index);
                var usedText = textLayer.text;
                console.log(usedText);
                victim = $("#corrector");

                $("#save-text").removeClass('d-none');
                victim.removeClass('d-none');

                victim.html(usedText);
            },
            draggable: false,
            cursors: {
                mouseover: 'text'
            }
        }).drawLayers();
    }
    console.log('rewritable');
});

$('#save-text').click(function(){
    var userText = victim.html();
    $('canvas').setLayer(textLayer, {
        text: userText
    }).drawLayers();
    console.log('changed!');
});
