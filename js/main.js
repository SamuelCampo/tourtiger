"use strict";function checkDisplay(){var e=$(".header-bar-wrapper").height(),i=$(".header-bar-wrapper").find(".hidden-xs");i.is(":visible")?$(".banner-wrapper-inner").css("margin-top",e+"px"):i.is(":hidden")&&$(".banner-wrapper-inner").css("margin-top","0px")}function checkSticky(){var e=$(".header-bar-wrapper").height();"fixed"===$(".sticky").css("position")?$(".under-header .overlay-slider-content").css("margin-top",e+"px"):$(".under-header .overlay-slider-content").css("margin-top","0px")}$(window).resize(function(){$(".sticky").length>0&&($(".below-header").length>0||$(".no-banner").length>0)&&checkDisplay(),$(".sticky").length>0&&$(".under-header").length>0&&checkSticky()}),$(document).ready(function(){if($("input:text").length>0&&($("input:text").addClass("inputDefault"),$("input:text").focus(function(){this.value===this.defaultValue&&(this.value="")}).blur(function(){""===this.value&&(this.value=this.defaultValue)})),$(".banner-top .c-editor ul").length>0&&$(".banner-top .c-editor").find("li").wrapInner("<span></span>"),$(".banner-top .c-editor p").length>0&&$(".banner-top .c-editor").find("p").wrapInner("<span></span>"),$(".banner-top").length>0&&$(".banner-top .c-editor li").find("span").prepend('<i class="fa fa-chevron-right"></i> '),$(".single-tour").length>0&&$(".section-item").length>0&&$(".section-item .c-editor>ul").find("li").prepend('<i class="fa fa-chevron-right"></i> '),$(".page-template-default").length>0&&$(".section-item").length>0&&$(".section-item .c-editor>ul").find("li").prepend('<i class="fa fa-chevron-right"></i> '),$(".single-tour").length>0&&$(".right-col").length>0&&$(".right-col .why-list").find("li").prepend('<i class="fa fa-check"></i> '),$('.main-nav li:contains("search")').replaceWith('<li class="search-wrapper"><a><span class="glyphicon glyphicon-search"></span></a></li>'),$(".search-wrapper a").click(function(){var e=$(this).parents(".site-header").siblings(".above-header");$(e).is(":hidden")?($(this).find("span").removeClass("glyphicon-search").addClass("glyphicon-remove"),$(e).slideDown("slow")):($(this).find("span").removeClass("glyphicon-remove").addClass("glyphicon-search"),$(e).slideUp("slow"))}),$(".front-page-section, .tour-nav, .featured-tours, .featured-tours-2").length>0&&$.scrollIt({upKey:38,downKey:40,easing:"linear",scrollTime:600,activeClass:"active",onPageChange:null}),$(".image-gallery").length>0&&$(".image-gallery").magnificPopup({delegate:"a",type:"image",gallery:{enabled:!0}}),$(".page").length>0&&$(".photo-gallery").length>0&&$(".photo-gallery").magnificPopup({delegate:"a",type:"image",gallery:{enabled:!0}}),$(".single-tour").length>0&&$(".photo-gallery").length>0&&($(".photo-gallery").hasClass("gallery-one")&&$(".photo-gallery").each(function(e){$(".gallery-"+e).magnificPopup({delegate:"a",type:"image",gallery:{enabled:!0}})}),$(".photo-gallery").hasClass("gallery-two")&&$(".photo-gallery").each(function(e){$(".gallery2-"+e).magnificPopup({delegate:"a",type:"image",gallery:{enabled:!0}})})),$(".flexslider").length>0&&$(".flexslider").flexslider({animation:"fade",controlNav:!1}),$(".testimonials-slider").length>0&&$(".testimonials-slider").flexslider({animation:"fade",controlNav:!1}),$("#booking").length>0&&($(".bear-banner").length>0&&$("#booking").affix({offset:{top:409}}),$(".skip-banner").length>0&&$("#booking").affix({offset:{top:$(".site-header").height()}}),$("#booking").on("affixed-top.bs.affix",function(){$("#booking").css("top","0px")}),$("#booking").on("affix.bs.affix",function(){if($(".sticky").length>0){var e=$(".header-bar-wrapper").height();$("#booking").css("top",e+10+"px")}})),$("#booking2").length>0&&($("#booking2").on("affixed-top.bs.affix",function(){$("#booking2").css("top","0px")}),$("#booking2").on("affix.bs.affix",function(){if($(".sticky").length>0&&"fixed"===$(".sticky").css("position")){var e=$(".header-bar-wrapper").height();$("#booking2").css("top",e+10+"px")}})),$("#booking2").length>0&&$(".bear-banner").length>0&&$("#booking2").affix({offset:{top:409}}),$("#booking2").length>0&&$(".skip-banner").length>0){var e=$(".header-bar-wrapper").height();$("#booking2").affix({offset:{top:e+10}})}if($(".sticky").length>0&&($(".below-header").length>0||$(".no-banner").length>0)&&checkDisplay(),$(".sticky").length>0&&$(".under-header").length>0&&checkSticky(),$(".c-editor iframe[src*=youtube]").length>0&&$(".c-editor iframe[src*=youtube]").wrap('<div class="row video-row"><div class="col-xs-10 col-xs-offset-1"><div class="video-responsive"></div></div></div>'),$(".subcontent iframe[src*=youtube]").length>0&&$(".subcontent iframe[src*=youtube]").wrap('<div class="row video-row"><div class="col-xs-10 col-xs-offset-1"><div class="video-responsive"></div></div></div>'),$(".menu-item-has-children").length>0&&($(".mobile-nav > .menu-item-has-children > a, .mobile-nav > .menu-item-has-children .menu-item-has-children > a, .main-nav > .menu-item-has-children > a").append('<i class="fa fa-angle-down"></i>'),$(".main-nav > .menu-item-has-children > ul > .menu-item-has-children > a").append('<i class="fa fa-angle-right"></i>'),$(".main-nav .menu-item-has-children > a").each(function(){var e=$(this);e.length>0&&"#"===e.attr("href")&&(console.log(e),$(this).click(function(e){e.preventDefault()}))}),$(".main-nav .menu-item-has-children > a").click(function(){var e=$(this).attr("href");return"#"!==e?(console.log(e),window.location.href=e,!1):void 0})),$(".megamenu").length>0&&$(".megamenu.menu-item-has-children > .megalink-wrap > a").append('<i class="fa fa-angle-down"></i>'),$(".mobile-nav")&&($(".mobile-nav .menu-item-has-children").addClass("dropdown"),$(".mobile-nav .menu-item-has-children > a").addClass("dropdown-toggle").attr("data-toggle","dropdown"),$(".mobile-nav .menu-item-has-children > ul").addClass("dropdown-menu"),$(".mobile-nav a.dropdown-toggle").each(function(){var e=$(this);e.length>0&&"#"!==e.attr("href")&&($(this).addClass("disabled"),$(this).siblings("ul").addClass("stay-open"))}),$(".sub-menu > .menu-item-has-children > a").on("click",function(e){var i=$(this).next();$(this).parent().parent().find(".sub-menu:visible").not(i).hide(),i.toggle(),$(this).parent().hasClass("menu-item-has-children")&&!$(this).hasClass("disabled")&&e.preventDefault(),e.stopPropagation()}),$(".sub-menu > li > a:not(.dropdown-toggle)").on("click",function(){$(this).closest(".dropdown").find(".sub-menu:visible").hide()})),$(".split-menu").length>0){var i=$(".split-menu .mnws>.menu-languages-container");$(i).clone().appendTo(".split-menu .right-menu-part")}$(".even-grid").length>0&&$(".s-item").matchHeight(),$(".gfield_select").length>0&&!($(".keep-dropdown-unstyled").length>0)&&$(".gfield_select").selectpicker({style:"",width:"150px"}),$(".popup-video").length>0&&$(".popup-video").magnificPopup({disableOn:700,type:"iframe",mainClass:"mfp-fade",removalDelay:160,preloader:!1,fixedContentPos:!1}),$(".rpwe-ul").length>0&&($(".rpwe-title").find("a").append(" &gt;&gt;"),$(".rpwe-time").append('<i class="fa fa-calendar"></i>'))}),function(e){function i(){e("[data-iframe-popup]").on("click",function(i){i.preventDefault();var n=e(this).attr("data-iframe-popup");return"hawaiifun"==n&&1==global_vars.hawaiifun?(0==e(".iframe-popup__close").length&&e("body").append('<a href="javascript:" class="iframe-popup__close" style="opacity:0;pointer-events:none;"></a>'),e("#hawaiifun").addClass("is-active"),e("body").css({overflow:"hidden"}),e(".iframe-popup__close").css({position:"fixed",top:"0",left:"0",width:"100%",height:"100%","z-index":"998","background-color":"rgba(0,0,0,.8)",opacity:1,"pointer-events":"all"}),e(".iframe-popup__close, .close-popup").on("click",function(){return e(".iframe-popup__close").detach(),e("#hawaiifun").removeClass("is-active"),e("body").css({overflow:"auto"}),!1}),!1):(e(window).width()>768?(e("body").append('<iframe src="'+n+'" id="iframe-popup" style="opacity:0;pointer-events:none;" class="iframe-popup"></iframe>'),e("#iframe-popup").load(function(){e("body").css({overflow:"hidden"}),e(".iframe-popup__close").css({position:"fixed",top:"0",left:"0",width:"100%",height:"100%","z-index":"19999998","background-color":"rgba(0,0,0,.8)",opacity:1,"pointer-events":"all"}),e("#iframe-popup").css({position:"fixed",left:"5vw",width:"90vw",top:"5vh",height:"80vh","max-height":"80vh","z-index":"19999999","background-color":"#fff","overflow-x":"auto",opacity:1,"pointer-events":"all"}),e(".iframe-popup__close, .close-popup").on("click",function(){return e(".iframe-popup__close").detach(),e(".iframe-popup").detach(),e("body").css({overflow:"auto"}),!1})})):document.location.href=n,!1)})}var n=function(){var i=e(".site-header").find(".sticky"),n=e("body").hasClass("home"),t=e("body").hasClass("tour-template-default"),a=e("body").hasClass("logged-in"),o=(e("body").hasClass("single-product"),e("body").hasClass("error404")),r=(e("body").hasClass("page-template-rezdy_search"),e(".banner-wrapper-inner > .banner").length>0);if(!t&&!n&&1===i.length&&e(window).width()>=768){var s=e(".banner-wrapper-inner"),l=(i.height()||0)-(e(".secondary-menu-wrapper").height()||0);a||(l+=32),r||(e(".site-inner").css("margin-top",l),s.css("margin-top",0))}else if(o){l=e(".header-bar-wrapper").height();e(".site-inner").css("margin-top",l)}else e(".banner-wrapper-inner").css("margin-top",0)},t=e(".header-bar").find(".open-iframe").find("a"),a=t.attr("href");t.attr("href","javascript:").attr("data-iframe-popup",a),i(),e(function(){if(e(".pc_featured-products-carousel").slick({arrows:!1,adaptiveHeight:!0}),n(),i(),e(window).resize(n),e("body").hasClass("show-motto-mobile")&&e(window).width()<768){var t=e(".motto"),a=t.length>0,o=e(".secondary-menu-wrapper").css("background-color");"rgba(0, 0, 0, 0)"==o&&(o=e(".header-bar").css("background-color")),a&&t.prependTo(e(".site-header")).css({color:"#fff","background-color":o,display:"block",padding:"3px","font-size":"13px"})}if(e("body").hasClass("single-product")){e(".custom-header").css("padding",0);var r=e(".single-product .site-inner .content").css("background-color");if(e(".header-bar").css("background-color",r),e(window).on("scroll",function(){e(this).scrollTop()>0?e(".header-bar").css("background-color","#fff"):e(".header-bar").css("background-color",r)}),e("body").width()<1140){var s=function(){e(".book-tour-wrapper_product").width(e(".col-sm-4").width())};s(),e(window).on("scroll",function(){s()}),e(window).resize(function(){s()})}e("body").width()<768&&(e("#fixed-on-mobile-productpage").wrap('<div id="js-mob-wrap-buttons"></div>'),e(".js-show-certificate-mob").appendTo(e("#js-mob-wrap-buttons")),e(".js-show-certificate-mob").css({display:"block","margin-bottom":"16px"}),e(".js-show-certificate-mob a").addClass("book-btn2-product-title").css({"margin-left":"0px",display:"block",color:"#fff"}),e(".js-show-certificate-mob span").css({"margin-left":"0"}))}e("body").hasClass("page-template-rezdy_search")&&e(".header-bar").css("background-color",e(".page-template-rezdy_search .site-inner .content").css("background-color")),e(".js-navigated-gallery__front").slick({infinite:!0,arrows:!0,dots:!1,adaptiveHeight:!0,speed:1e3,prevArrow:'<button type="button" class="slick-arrow slick-prev"><i class="fa fa-angle-left"></i></button>',nextArrow:'<button type="button" class="slick-arrow slick-next"><i class="fa fa-angle-right"></i></button>'}),e(".js-navigated-gallery__navigation").slick({infinite:!0,arrows:!1,dots:!1,speed:1e3,slidesToShow:5,variableWidth:!0,focusOnSelect:!0})})}(jQuery),function(e){e(function(){e(".slider-pro--preview").on("click",function(){e(this).tourismTiger("initGallery")}),e(".slider-pro__close-link").on("click",function(){e(this).tourismTiger("destroyGallery")})})}(jQuery),function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"undefined"!=typeof exports?module.exports=e(require("jquery")):e(jQuery)}(function(e){var i={initGallery:function(){var i=e(this),n=i.closest(".slider-pro"),t=n.find(".slider-pro--preview__image"),a=i.closest(".pc--r"),o=t.width(),r=t.height(),s=n.find(".slider-pro__carousel"),l=n.find(".slider-pro__cover"),d=n.find(".slider-pro--panel"),p=e(window).width(),c=e(window).height();l.width(o).height(r).find("img").width(o).height(r),d.hide();var h=l.offset().top-e(window).scrollTop(),f=l.offset().left;t.css({position:"fixed","z-index":"9999",top:h,left:f}).animate({top:c/2-r/2,left:p/2-o/2},300),t.fadeOut(500),a.length>0&&a.css("z-index",6),s.css({display:"flex"}).animate({opacity:"1"},300).find(".slider-pro__slider").slick({prevArrow:'<button type="button" class="slider-pro__prev slider-pro__arrow"></button>',nextArrow:'<button type="button" class="slider-pro__next slider-pro__arrow"></button>',adaptiveHeight:!0,lazyLoad:"progressive"}).slick("setOption","height",null,!0),e("#js-mob-wrap-buttons").fadeOut()},destroyGallery:function(){var i=e(this),n=i.closest(".slider-pro"),t=n.find(".slider-pro--preview__image"),a=n.find(".slider-pro__carousel"),o=n.find(".slider-pro__cover"),r=n.find(".slider-pro--panel"),s=i.closest(".pc--r"),l=o.offset().top-e(window).scrollTop(),d=o.offset().left;t.css({top:l,left:d,position:"static"}).show(),r.fadeIn(300),s.length>0&&s.css("z-index",5),a.hide().animate({opacity:"0"},300).find(".slider-pro__slider").slick("unslick"),e("#js-mob-wrap-buttons").fadeIn()}};e.fn.tourismTiger=function(n){return i[n]?i[n].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof n&&n?void e.error("Method named "+n+" isn't exist within jQuery.tourismTiger"):i.init.apply(this,arguments)},e(function(){e(".slider-pro--preview").not("[data-inited]")&&e(".slider-pro--preview").not("[data-inited]").on("click",function(){e(this).tourismTiger("initGallery")}),e(".slider-pro__close-link").not("[data-inited]")&&e(".slider-pro__close-link").not("[data-inited]").on("click",function(){e(this).tourismTiger("destroyGallery")}),e(".slider-pro--preview, .slider-pro__close-link").attr("data-inited",1)})});