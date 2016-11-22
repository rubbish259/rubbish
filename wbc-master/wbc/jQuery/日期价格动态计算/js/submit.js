function message() {
	var $messageBtn = $('#messageBtn');

	$messageBtn.on("click",function() {
		$messageBtn.toggleClass("red");

		if($messageBtn.hasClass("red")) {
			$("section").show();
			$(".detail").css("height","2.2rem");
		} else {
		    $("section").hide();
			$(".detail").css("height","11.5rem");
		}
	});



}

message();

function month() {
	var $jian,$add,$month,$start,$stop,i=1;

	$jian = $("#jian");
	$add = $("#add");
	$month = $("#month");
	$start = $("#start");
	$stop = $("#stop");

	$jian.on("click",function() {
		$month.innerHTML = i--;
	});

	$add.on("click",function() {
		$month.innerHTML = i++;
	});

	console.log($start);
	$start.innerHTML = date();
}

month();

function date() {
	var myDate = new Date(),$start = $("#start");
    
    $start.innerHTML = myDate.getFullYear() +"-"+ (myDate.getMonth()+1) +"-"+ myDate.getDate();




var now = new Date();
now.setDate(now.getMonth()+1);  
}

date()

//////////////////////////////////////////////////////

!function(window, document, $, undefined) {
	"use strict";

	var $btns = $('.add'),
		ppMonth = 360,
		$totalPrice = $('#totalPrice'),
		$start = $('#start'),
		$stop = $('#stop'),
		startDateStr;

	startDateStr = getToday();

	$start.html(startDateStr);
	$stop.html(getStopDate(startDateStr));

	$btns.on('click', function() {

		var $this = $(this),
			$month = $('#month'),
			month = $month.html() * 1;

		if ($this.attr('id') == 'add') { // 加
			month++;
		} else { // 减
			if (month > 1) {
				month--;
			}
		}

		// month = month == 0 ? 1 : month;

		$month.html(month);
		$totalPrice.html(month * ppMonth);
		$stop.html(getStopDate(startDateStr, month));

	});

	///////////////////////////////////////////////

	function getToday() {
		var date = new Date();
		return date.getFullYear() + '-' + fill0((date.getMonth() + 1 )) + '-' + fill0(date.getDate());
	};

	function fill0(num) {
		return num < 10 ? '0' + num : num;
	}

	function getStopDate(start, month) { // start日期 + 30 天
		var date = new Date(start);
		month = month || 1;
		date.setDate(date.getDate() + 30 * month);
		return date.getFullYear() + '-' + fill0((date.getMonth() + 1 )) + '-' + fill0(date.getDate());
	}

}(window, document, jQuery);
