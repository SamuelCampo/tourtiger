jQuery(document).ready(function($){$("#check_availability").click(function(){var datepicker_from=$("#datepicker-from-input").val();var datepicker_to=$("#datepicker-to-input").val();var tour_cat_arr=$(".checkbox_term:checked").map(function(){return $(this).val();}).get();var product_id=$('#product_id:checked').val();$('#mainContent').animate({opacity:0.5},500);$('#ajax_preLoading').animate({opacity:0.5},500);jQuery.ajax({url:localize_var.ajaxurl,type:"POST",dataType:'json',data:{'action':'check_availability','datepicker_from':datepicker_from,'datepicker_to':datepicker_to,'tour_cat_arr':tour_cat_arr,'product_id':product_id},success:function(response){console.log(response);$('#ajax_preLoading').animate({opacity:0},500);$('#mainContent').html(response.get_check_availiability).animate({opacity:1},500);}});});})