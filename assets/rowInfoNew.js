var queryNumber = NEW_QUERY_URL + '/api/v1/arrangingCenter/queryNumber';
var getAppMethod = "http://cater.haidilao.com/Cater/wap/getAppMethod.action";

/**
 * 获取url中的参数
 */
function getQueryString(name) {
	var svalue = window.location.href.match(new RegExp("[\?\&]" + name + "=([^\&]*)(\&?)", "i"));
	return svalue ? svalue[1] : "";
}
$(function() {
	if (!isWeiXin2()) {
		$('#footer').hide();
		$("#butn").hide();
	}
	init.getTableName();
	init.loadData();
	init.toDishes();
});
$(document).ready(function() {
	$('#footer').click(function() {
		wx.closeWindow(); //关闭当前窗口;
	});
	$("#bot").on('click', function() {
		window.location.reload();
	})
});
var init = {
	table: [{
		type: 1,
		name: '小桌'
	}, {
		type: 2,
		name: '大桌'
	}, {
		type: 3,
		name: '中桌'
	}],

	getTableName: function(type) {
		var table = this.table;
		for(var i = 0; i < table.length; i++) {
			if(type == table[i].type)
				return table[i].name;
		}
	},
	time: [{
		type: 1,
		name: '午市'
	}, {
		type: 2,
		name: '晚市'
	}, {
		type: 3,
		name: '夜市'
	}],
	getTimeName: function(type) {
		var time = this.time;
		for(var i = 0; i < time.length; i++) {
			if(type == time[i].type)
				return time[i].name;
		}
	},
	loadData: function() {
		$.ajax({
			url: queryNumber,
			data: JSON.stringify({
				id: getQueryString('id')
			}),
			dataType: 'json',
			type: 'post',
			async: false,
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			},
			success: function(data) {
				if(data.code == '0') {
					var queued = data.data;
					sessionStorage.setItem('backtype', 'queued');	
					$('#queueNum').html(queued.numberName + '号');
					$('#storeName').html(queued.storeName);
					$('#ParticipantNumber').html(queued.personNumber + '人');
					$('#tableType').html(init.getTableName(queued.tableType));
					$("#timeType").html(init.getTimeName(queued.timeType))
					if(queued.callNumber=='0'){
						$('#wait').html('当前叫号：待叫号');
					}else{
						$('#wait').html('当前叫号：'+init.getTableName(queued.tableType)+queued.callNumber+'号');
					}
				} else {
					$('#storeName').html('海底捞(西单店)');
					$('#showInfo').show();
					$('#dinging').hide();
				}
			},
			error: function(xhr, textStatus, errorThrown) {
				console.log('获取排号详情失败.......');
				console.log(xhr.status + '   ' + xhr.readyState + '    ' +
					textStatus + '  ' + errorThrown);
			}
		});
	},
	//去点餐
	toDishes: function() {
		$('#dinging').click(function() {
			var orderId = $(this).attr('data-oid');
			var storeId = $(this).attr('data-sid')
			sessionStorage.setItem('backtype', 'queued');
			console.log(sessionStorage.getItem('hasDining'));
			if('1' == sessionStorage.getItem('hasDining')) {
				window.location.href = 'personl/myorder.html';
			} else {
				window.location.href = 'reservation/dishes.html?storeId=' + storeId + '&orderId=' + orderId
			}
		});
	}
}