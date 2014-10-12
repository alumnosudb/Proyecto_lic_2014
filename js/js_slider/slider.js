$(function(){
		$('#slider div:gt(0)').hide();
			setInterval(function(){
				$('#slider div:first-child').fadeOut(1000)
					.next('div').fadeIn(900)
					.end().appendTo('#slider');
			},3000);
	})

$(function(){
		$('#txt_slider div:gt(0)').hide();
			setInterval(function(){
				$('#txt_slider div:first-child').fadeOut(1000)
					.next('div').fadeIn(900)
					.end().appendTo('#txt_slider');
			},3000);
	})