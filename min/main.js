var appHeader=function(){"use strict";var t=function(){$(".jsHeaderLinkToggle").on("click",function(){return $(this).toggleClass("open"),$(".jsHeaderToggle").toggleClass("open"),!1})};return{init:function(){t()}}}(),appForms=function(){"use strict";var t,e=(Date.now(),$("body")),n=function(t){var e,n=-1,i=t.val().replace(/[^0-9]/g,"");return"7"==i[0]||"8"==i[0]?n=11:"9"==i[0]&&(n=10),e=i.length!=n,""==t.val()||e},i=function(t){var e=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;return""==t.val()||t.val().length>0&&!e.test(t.val().toLowerCase())},o=function(t){var e=1*t.attr("minlength");return""==t.val()||t.val().length<e},r=function(t){return null==t.val()},s=function(t){var e=1,s=function(n,i){0!==e&&$(n,t).each(function(t,n){var o=$(n);1==o.is(":visible")&&i(o)&&(e=0)})};s(".jsRequirePhone",n),s(".jsRequireText",o),s(".jsRequireEmail",i),s(".jsRequireSelect",r),1==e?$("button[type=submit]",t).removeClass("disabled").removeAttr("disabled"):$("button[type=submit]",t).addClass("disabled").attr({disabled:"disabled"})},a=function(t,e,n){$(document).on(e,t,function(){var t=$(this);""!=t.val()&&t.toggleClass("error",n(t))})},u=function(){$(document).on("change",".form select",function(){var t=$(this).parents(".form");s(t)}),$(document).on("keyup",".form input,.form textarea",function(){var e=$(this).parents(".form");clearTimeout(t),t=setTimeout(function(){s(e)},100)}),a(".jsRequirePhone","blur",n),a(".jsRequireText","blur",o),a(".jsRequireEmail","blur",i),a(".jsRequireSelect","change",r),$(document).on("focus",".form input,.form textarea",function(){$(this).removeClass("error")}),$(document).on("submit",".form",function(){var t=$(this),n=t.siblings(".jsformLoader"),i=t.serialize();return i+="&action=post_form_contact",e.addClass("cursor-wait"),t.hide(),n.fadeIn(),$.ajax({url:"/wp-admin/admin-ajax.php",type:"post",data:i,timeout:9999,success:function(i){var o=t.siblings(".jsFormAnswerSend");e.removeClass("cursor-wait"),n.hide(),o.fadeIn()},error:function(i,o,r){var s=t.siblings(".jsFormAnswerError");e.removeClass("cursor-wait"),n.hide(),s.fadeIn(),setTimeout(function(){s.hide(),t.show()},4500)}}),!1})};return{init:function(){u()}}}(),appContent=function(){"use strict";var t=function(){$(".jsClientsBtn").on("click",function(){$(this).parent().hide(),$(".clients__items").addClass("show")})};return{init:function(){t()}}}();!function(t){"use strict";document.addEventListener("DOMContentLoaded",function(t){appHeader.init(),appContent.init(),appForms.init()})}(jQuery),$(".popup-open").click(function(t){t.preventDefault(),target="#"+$(this).attr("data-id"),$(target).fadeIn(function(){})}),$(".popup-close").click(function(){return $(this).parents(".popup-fade").fadeOut(),!1}),$(document).keydown(function(t){27===t.keyCode&&(t.stopPropagation(),$(".popup-fade").fadeOut())}),$(".popup-fade").click(function(t){0==$(t.target).closest(".popup").length&&$(this).fadeOut()}),$(function(){$(".submenu").hide(),$(".parent").click(function(t){t.preventDefault(),$(t.target).closest("ul").is(".submenu")||($(".submenu",this).toggle(),$(this).siblings(".parent").find(".submenu").hide())})});