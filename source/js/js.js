// stupid scroll
/*document.body.style.overflow='hidden';
var swidth=document.body.clientWidth;
document.body.style.overflow='scroll';
swidth-=document.body.clientWidth;
if(!swidth) swidth=document.body.offsetWidth-document.body.clientWidth;
document.body.style.overflow='';*/

// Validation & send

function ajax1(){
    var msg=$("#form-1").serialize();
    $.ajax({type:"POST", url:"./js/smartAjax.php", data:msg,
        success:function(data){
            $(".modal").modal("hide");
            $("#successModal .modal-content").html(data);
            setTimeout(function(){
                $('#successModal').modal('show');
                },300);
            setTimeout(function(){
                $(".modal").modal("hide");
                $('.form_input').val('');
            },3700);
        },error:function(xhr,str){alert("Возникла ошибка!")}
    });
}

function ajax2(){
    var msg=$("#form-2").serialize();
    $.ajax({type:"POST", url:"./js/smartAjax.php", data:msg,
        success:function(data){
            $("#successModal .modal-content").html(data);
            setTimeout(function(){
                $('#successModal').modal('show');
            },300);
            setTimeout(function(){
                $(".modal").modal("hide");
                $('.form_input').val('');
            },3700);
        },error:function(xhr,str){alert("Возникла ошибка!")}
    });
}


function ajax3(){
    var msg=$("#form-3").serialize();
    $.ajax({type:"POST", url:"./js/smartAjax.php", data:msg,
        success:function(data){
            $("#successModal .modal-content").html(data);
            setTimeout(function(){
                $('#successModal').modal('show');
            },300);
            setTimeout(function(){
                $(".modal").modal("hide");
                $('.form_input').val('');
            },3700);
        },error:function(xhr,str){alert("Возникла ошибка!")}
    });
}

//эта маска работает в данный момент, но пока нет возможности как следует разобраться с настройками и протестировать...

$(document).ready(function(){
    $('.form_input-tel').inputmask("+7(999) 999-9999"); //specifying options
});


// $(function(){$('.form_input-tel').mask('+7(999) 999-99-99')});



// GetUtm
var namekey = ['utm_source','utm_medium','utm_campaign','type','source','added','block','pos','key','campaign','ad','phrase','utm_term','utm_content','network','placement','keyword'];
function parseGET(url){
    if(!url || url == '') url = decodeURI(document.location.search);
    if(url.indexOf('?') < 0) return Array();
    url = url.split('?');
    url = url[1];
    var GET = [], params = [], key = [];
    if(url.indexOf('#')!=-1){ url = url.substr(0,url.indexOf('#'))}
    if(url.indexOf('&') > -1){ params = url.split('&');} else {params[0] = url}
    for (r=0; r<params.length; r++){
        for (z=0; z<namekey.length; z++){
            if(params[r].indexOf(namekey[z]+'=') > -1){
                if(params[r].indexOf('=') > -1){
                    key = params[r].split('=');
                    GET[key[0]]=key[1];
                }
            }
        }
    }
    return (GET);
};

// AddUtm
function addUtm(){
    var $_GET = parseGET();
    for(z=0; z<namekey.length; z++){
        if($_GET[namekey[z]]){
            $('#form-1').append('<input name="'+namekey[z]+'" type="hidden" value="'+$_GET[namekey[z]]+'">');
            $('#form-2').append('<input name="'+namekey[z]+'" type="hidden" value="'+$_GET[namekey[z]]+'">');
        }
    }
}

// if mobile devices function
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

// Modernizr - svg
!function(e,n,s){function o(e,n){return typeof e===n}function a(){var e,n,s,a,t,f,r;for(var c in l)if(l.hasOwnProperty(c)){if(e=[],n=l[c],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(s=0;s<n.options.aliases.length;s++)e.push(n.options.aliases[s].toLowerCase());for(a=o(n.fn,"function")?n.fn():n.fn,t=0;t<e.length;t++)f=e[t],r=f.split("."),1===r.length?Modernizr[r[0]]=a:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=a),i.push((a?"":"no-")+r.join("-"))}}function t(e){var n=r.className,s=Modernizr._config.classPrefix||"";if(c&&(n=n.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+s+"no-js(\\s|$)");n=n.replace(o,"$1"+s+"js$2")}Modernizr._config.enableClasses&&(n+=" "+s+e.join(" "+s),c?r.className.baseVal=n:r.className=n)}var i=[],l=[],f={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var s=this;setTimeout(function(){n(s[e])},0)},addTest:function(e,n,s){l.push({name:e,fn:n,options:s})},addAsyncTest:function(e){l.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=f,Modernizr=new Modernizr;var r=n.documentElement,c="svg"===r.nodeName.toLowerCase();Modernizr.addTest("svg",!!n.createElementNS&&!!n.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect),a(),t(i),delete f.addTest,delete f.addAsyncTest;for(var u=0;u<Modernizr._q.length;u++)Modernizr._q[u]();e.Modernizr=Modernizr}(window,document);


// Function equalheight
!function(a){a.fn.innerEqualHeights=function(){var b=0,c=a(this);return c.each(function(){var c=a(this).innerHeight();c>b&&(b=c)}),c.innerHeight(b)},a("[data-equal]").each(function(){var b=a(this),c=b.data("equal");b.find(c).innerEqualHeights()})}(jQuery);
!function(a){a.fn.equalHeights=function(){var b=0,c=a(this);return c.each(function(){var c=a(this).height();c>b&&(b=c)}),c.height(b)},a("[data-equal]").each(function(){var b=a(this),c=b.data("equal");b.find(c).equalHeights()})}(jQuery);
// $('.about_ideology_item').innerEqualHeights();

/****   Document ready   ****/
$(document).ready(function(){

// Глобальные переменные
    var winH = $(window).height();


// modal здесь присвоение названий формы в модальном окне через переменные вида "дата-мсенд" для бутстраповской формы
    $('.path-2-form').on('click',function(){
        // $.openModal();
        // $('.modal-1').addClass('active');
        $('.modal-title').html($(this).attr('data-mHeader'));
        //в строке ниже если элемент submit, вместо .html используется .val
        $('.send-values').val($(this).attr('data-mSend'));
        // строка ниже для названия формы в письме - мы к этому ещё вернёмся...
        $('.formName').val($(this).attr('data-mFormName'));
        //строка ниже вообще непонятно зачем была нужна, наверное, для опен модал в изначальной модели скрипта
        // return false;
    });


// modal здесь присвоение названий формы в модальном окне через переменные вида "дата-мсенд" + открытие модального окна (если не бутстрап)
    $('.order').on('click',function(){
        $.openModal();
        $('.modal-1').addClass('active');
        $('.modal-1_header').html($(this).attr('data-mHeader'));
        $('#send-1').val($(this).attr('data-mSend'));
        $('#formName').val($(this).attr('data-mFormName'));
        return false;
    });

    $('.order-instruction').on('click',function(){
        $.openModal();
        $('.modal-3').addClass('active');
        $('.modal-3_header').html($(this).attr('data-mHeader'));
        $('.modal-3_post-header').html($(this).attr('data-mpostHeader'));
        $('.modal-3_link').attr("value", $(this).attr('data-mSave'));
        $('#send-3').val($(this).attr('data-mSend'));
        $('#formName').val($(this).attr('data-mFormName'));
        return false;
    });


// modal in example
    $('.order-example').on('click',function(){
        $.openModal();
        $('.modal-' + $(this).attr('data-modal')).addClass('active');
        return false;
    });


// функция закрытия модального окна по клику на фон
    $('.modal').on('click',function(e){
        if($(e.target).hasClass('modal')){
            $.closeModal();
            return false;
        }
    });
// функция закрытия модального окна по клику на крестик
    $('.modal_close').on('click',function(){
        $.closeModal();
        return false;
    });

// функция открытия модального окна
    $.openModal = function(){
        $('.modal').removeClass('active');
        $('body').addClass('bodyModal blur');
        // $('html').css({'overflow':'hidden','padding-right':0});
        return false;
    };

// функция закрытия модального окна
    $.closeModal = function(){
        $('.modal').removeClass('active');
        $('body').removeClass('bodyModal blur');
        // $('html').css({'overflow':'auto'});
        setTimeout(function(){
            $('html').css({'overflow':'auto','padding-right':0});
        },180);
        return false;
    };

});// </ Document ready>
