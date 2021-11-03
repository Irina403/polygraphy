$(document).ready(function() {
    $('.popup-open').click(function(e) {
        e.preventDefault()
        target = '#' + $(this).attr('data-id')
        // console.log(target)
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
		if ($(e.target).closest('.popup').length == 0) {
			$(this).fadeOut();					
		}

    });

    $('.buttonMain__modal').click(function(){
        $('.popup-fade').fadeOut();
    })
});