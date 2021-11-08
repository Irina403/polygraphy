/*global $, jQuery, alert, console, history*/


// POPUP
/* 
var appPopup = (function () {
  'use strict';

  var $popup = $(".popup");

  var popupOpen = function () {
    $popup.fadeIn();
  };

  var popupClose = function () {
    $popup.fadeOut();
    $('body').removeClass('hidden');
  };

  var events = function () {
    $('.jsOpenPopup').on('touchstart click', function() {
      var $this = $(this);
      var formTitle = $this.data("form-title") ? $this.data("form-title") : $this.text() ;
      var formType = $this.data("form-type") ? $this.data("form-type") : "";

      $(".jsFormTitle", $popup).text(formTitle);
      $("input[name=type]", $popup).val(formType);

      popupOpen();

      return false;
    });

     $('.popup__layer, .jsClosePopup').on('touchstart click', function() {
      popupClose();

      return false;
    });
  };

  return {
    init: function() {
      events();
    },
    close: function() {
      popupClose();
    }
  }
}());

 */

// HEADER

var appHeader = (function () {
  'use strict';

  var events = function() {
    
    $(".jsHeaderLinkToggle").on("click", function() {
      $(this).toggleClass("open");
      $(".jsHeaderToggle").toggleClass("open");

      return false;
    });

    // смещение экрана при клике на меню
/*     $(".jsNavLink").on("click", function() {
      var sectionName = $(this).attr("href");

      var scrollPosition = $(sectionName).offset().top - 10;

      $("html, body").animate({
        scrollTop: scrollPosition 
      }, 400);

      if ( $(".jsNav").hasClass("open") ) {
        $(".jsNav, .jsHeaderToggle").removeClass("open");
      }

      return false;
    }); */
  };

  return {
    init: function() {
      events();
    }
  }
}());



// validate and send FORM actions

var appForms = (function() {
  'use strict';

  var classNamePhone = "jsRequirePhone";
  var classNameText = "jsRequireText";
  var classNameEmail = "jsRequireEmail";
  var classNameSelect = "jsRequireSelect";
  var timerKeyup;
  var timerStart = Date.now();
  var $body = $('body');

  var condPhone = function(f) {
    var condition;
    var count = -1;
    var digits = f.val().replace(/[^0-9]/g,"");

    if (digits[0] == "7" || digits[0] == "8") {
      count = 11;
    } else if (digits[0] == "9") {
      count = 10;
    }

    condition = digits.length != count;

    return (f.val() == '' || condition);
  };

  var condEmail = function(f) {
    var condition;
    var re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    condition = f.val() == '' || (f.val().length > 0 && !re.test(f.val().toLowerCase()));
    return ( condition );
  };
  
  var condText = function(f) {
    var minlenght = f.attr("minlength") * 1;
    return (f.val() == '' || f.val().length < minlenght);
  };

  var condSelect = function(f) {
    return (f.val() == null);
  };

  var validateForm = function($form) {
    var triggerForm = 1;

    var fieldsCond = function(selector, condition) {
      if (triggerForm === 0) {
        return;
      }

      $(selector, $form).each(function(i, de) {
        var $field = $(de);

        if ($field.is(":visible") == true && condition($field)) {
          triggerForm = 0;
        }
      });
    };

    fieldsCond('.' + classNamePhone, condPhone);
    fieldsCond('.' + classNameText, condText);
    fieldsCond('.' + classNameEmail, condEmail);
    fieldsCond('.' + classNameSelect, condSelect);

    if (triggerForm == 1) {
      $('button[type=submit]', $form)
        .removeClass("disabled")
        .removeAttr('disabled');
    } else {
      $('button[type=submit]', $form)
        .addClass("disabled")
        .attr({"disabled": "disabled"});
    }
  };

  var setErrors = function(selectorName, evnt, cond) {
    $(document).on(evnt, selectorName, function() {
      var $field = $(this);

      if ($field.val() != "") {
        $field.toggleClass('error', cond($field));
      }
    });
  };

  var events = function() {
    $(document).on('change', '.form select', function() {
      var $form = $(this).parents('.form');
      validateForm($form);
    });

    $(document).on('keyup', '.form input,.form textarea', function() {
      var $form = $(this).parents('.form');

      clearTimeout(timerKeyup);
      timerKeyup = setTimeout(function() {
        validateForm($form);
      }, 100);
    });

    setErrors('.' + classNamePhone, 'blur', condPhone);
    setErrors('.' + classNameText, 'blur', condText);
    setErrors('.' + classNameEmail, 'blur', condEmail);
    setErrors('.' + classNameSelect, 'change', condSelect);

    $(document).on('focus', '.form input,.form textarea', function() {
      $(this).removeClass('error');
    });

    //submit forms
    $(document).on("submit", ".form", function() {
      var $form = $(this);
      var $loader = $form.siblings(".jsformLoader");
      
      var dataForm = $form.serialize();
      dataForm +=  '&action=post_form_contact';

      $body.addClass('cursor-wait');
      $form.hide();
      $loader.fadeIn();

      $.ajax({
        url : "/wp-admin/admin-ajax.php",
        type : 'post',
        data : dataForm,
        timeout: 9999,
        success: function(data) {
          var $formAnswer = $form.siblings(".jsFormAnswerSend");

          //$('.form input,.form textarea').val("");
          $body.removeClass('cursor-wait');
          $loader.hide();
          $formAnswer.fadeIn();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          var $formAnswer =  $form.siblings(".jsFormAnswerError");

          $body.removeClass('cursor-wait');
          $loader.hide();
          $formAnswer.fadeIn();

          setTimeout(function() {
            $formAnswer.hide();
            $form.show();
          }, 4500);
        }
      });

      return false;
    });
  }

  return {
    init: function() {
      events();
    }
  }
}());



// CONTENT

var appContent = (function() {
  'use strict';

  //add Slider

  var sliders = function() {

  };

  //content events
  var events = function() {

    $('.jsClientsBtn').on('click', function(){
        $(this).parent().hide();
        $(".clients__items").addClass('show');
    });

  };

  return {
    init: function() {
      events();
      sliders();
      //variator();
    }
  }
}());



// MAIN

(function ($) {
  'use strict';

  document.addEventListener("DOMContentLoaded", function(event) { 
    appHeader.init();
    appContent.init();
    appForms.init();
    //appPopup.init();
  });
}(jQuery));


$('.popup-open').click(function(e) {
  e.preventDefault()
  target = '#' + $(this).attr('data-id')
  console.log(target)
$(target).fadeIn(function () {
      // $(this).children( ".popup" ).css("display", "block").animate({ opacity: 1 }, 198);
// return false;
  })
});	

// Клик по ссылке "Закрыть".
$('.popup-close').click(function() {
$(this).parents('.popup-fade').fadeOut();
return false;
});        

// Закрытие по клавише Esc.
$(document).keydown(function(e) {
if (e.keyCode === 27) {
e.stopPropagation();
$('.popup-fade').fadeOut();
}
});

// Клик по фону, но не по окну.
$('.popup-fade').click(function(e) {
if ($('.popup').length == 0)  {
$(this).fadeOut();					
}
});

// Клик по фону, но не по окну.
$('.popup-fade').click(function(e) {
  if ($('.popup-ContactForm').length == 0)  {
  $(this).fadeOut();					
  }
  
  });
  

$('.popupForm__close').click(function() {
  $(this).parents('.popup-fade').fadeOut();
  return false;
  });

$(function () {
  $(".submenu").hide();
  $(".parent").click(function (e) {
      // e.preventDefault();
      if (!$(e.target).closest("ul").is(".submenu")) {
          $(".submenu", this).toggle();
          $(this).siblings(".parent").find(".submenu").hide();
      }
  });
  $(".parent").click(function () {
    $('.mobile-wrapper-nav').toggleClass("arrow-next arrow-down");

  });
});