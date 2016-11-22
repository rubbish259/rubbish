!function(window, document, $, undefined) {

	var $myModal = $('#myModal');
	var $gTable = $('#gTable');
	var $myModalLabel = $('#myModalLabel');
	var cacheData = {};
	var params = {
		query: '',
		size: 3,
		page: 0
	};
	var cacheClassify;

	// 分页
	$('#pagingUl').on('click', 'li', function() {
		var $this = $(this),
			page = $this.attr('data-page');

		params.page = page;
		getGoodsList();

	});

	// TODO 上一页，下一页，首页，尾页，或者分页插件

	// 搜索商品
	$('#searchBtn').on('click', function() {
		var $searchIpt = $('#searchIpt'),
			val = $searchIpt.val();

		params.query = val;
		getGoodsList();

	});

	// 新增商品
	$('#newBtn').on('click', function() {
		$myModal.find('form').trigger('reset').find('#gid').val('');
		$myModalLabel.html('新增商品');
		getClassify(function() {
			$myModal.modal('show');
		});
	});

	// 删除商品
	$('#delBtn').on('click', function() {
		var $checkboxs = $gTable.find('tbody input[type=checkbox]:checked');
		var len = $checkboxs.length;
		var ids = [];
		if (len == 0) {
			layer.msg('没有选中任何商品，请重新选择', {
				offset: 't',
				anim: 6
			});
			return;
		}

		layer.confirm('确定要删除该商品吗？', {
			btn: ['确定', '取消'] //按钮
		}, function(index){
			layer.close(index);
			
		  	$checkboxs.each(function() {
				ids.push(this.id);
			});

			layer.load(2);
			$.post('../../api/goods_del.php', {ids: ids.join('|')}, function(response) {
				if (response.success) {
					getGoodsList();
				} else {
					layer.msg('删除失败，请重试！', {
						offset: 't',
						anim: 6
					});
				}
			}, 'json');
		});

	});

	// 保存
	$('#saveBtn').on('click', function() {
		var data = {
			id: $('#gid').val(),
			name: $('#name').val(),
			price: $('#price').val(),
			detail: $('#detail').val(),
			classify: $('#classify').val()
		};

		var url;

		// 表单验证 TODO
		if ($.trim(data.name) == '') {
			layer.msg('商品名称不能为空', {
				offset: 't',
				anim: 6
			});
			return;
		}

		if (data.id) { // 修改
			url = '../../api/goods_update.php';
		} else { // 新增
			url = '../../api/goods_add.php';
		}

		layer.load(2);
		// ajax 提交表单
		$.post(url, data, function(response) {
			if (response.success) {
				$myModal.modal('hide');
				$myModal.find('form').trigger('reset');
				getGoodsList();
			} else {
				layer.msg('保存失败，请重试！', {
					offset: 't',
					anim: 6
				});
			}
			layer.closeAll('loading');
		}, 'json');

	});

	// 修改商品
	$('#updateBtn').on('click', function() {
		var $checkboxs = $gTable.find('tbody input[type=checkbox]:checked');
		var len = $checkboxs.length;
		var id, obj;

		if (len != 1) {
			layer.msg('只能一次修改一个商品，请重新选择', {
				offset: 't',
				anim: 6
			});
			return;
		}

		id = $checkboxs[0].id;
		obj = cacheData[id];

		$myModalLabel.html('修改商品');

		$('#gid').val(obj.id);
		$('#name').val(obj.name);
		$('#price').val(obj.price);
		$('#detail').val(obj.detail);
		
		getClassify(function() {
			$('#classify').val(obj.classify);
			$myModal.modal('show');
		});

	});

	// 得到商品类别
	var getClassify = function(callback) {
		var url = '../../api/classify_list.php';

		if (cacheClassify) {
			renderClassifyOpts(cacheClassify);
			callback();
			return;
		}

		$.get(url, function(response) {
			if (response.success) {
				renderClassifyOpts(response.data);
				cacheClassify = response.data;
				callback();
			} else {
				// ...
			}
		}, 'json');
	};

	var renderClassifyOpts = function(data) {
		var optArr = [];
		$.each(data, function(index, obj) {
			optArr.push('<option>', obj.name, '</option>');
		});
		$('#classify').html(optArr.join(''));
	};

	// 商品列表
	var getGoodsList = function() {
		setTimeout(function() {
			layer.load(2);
		}, 0);
		$.get('../../api/goods_list.php', params, function(response) {
			renderTable(response.data);
			renderPaging(response.total);
			layer.closeAll('loading');
		}, 'json');
	};

	var renderTable = function(data) {
		var trs = [];
		$.each(data, function(index, obj) {
			trs.push('<tr>',
				'<td><input id="', obj.id, '" type="checkbox" /></td>',
				'<td>', index + 1, '</td>',
				'<td>', obj.name, '</td>',
				'<td>&yen;', obj.price, '</td>',
				'<td>', obj.detail, '</td>',
				'<td>', obj.classify, '</td>',
			'</tr>');

			cacheData[obj.id] = obj;
		});
		$gTable.find('tbody').html(trs.join(''));
	};

	var renderPaging = function(total) {
		var totalPage = Math.ceil(total / params.size);
		var pArr = ['<li><a href="#">&laquo;</a></li>'];

		for (var i=0; i<totalPage; i++) {
			if (params.page == i) {
				pArr.push('<li data-page="', i, '" class="active"><a href="javascript:;">', i + 1, '</a></li>');
			} else {
				pArr.push('<li data-page="', i, '"><a href="javascript:;">', i + 1, '</a></li>');
			}
		}

		pArr.push('<li><a href="#">&raquo;</a></li>');

		$('#pagingUl').html(pArr.join(''));

		// console.log(totalPage)

	};


	getGoodsList();

}(window, document, jQuery);