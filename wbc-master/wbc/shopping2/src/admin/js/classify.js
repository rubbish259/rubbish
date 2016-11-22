var app = angular.module('classifyApp', []);

app.controller('classifyController', function($scope, $http) {

	var $myDlg = $('#myDlg');
	$scope.searchTxt = '';
	$scope.size = 3;
	$scope.page = 0;
	$scope.totalPage = 0;

	$scope.pageArr = [];

	// 新增按钮点击事件
	$scope.onNewBtnClick = function() {
		$myDlg.modal('show');
	};

	// 保存按钮点击事件
	$scope.saveClassify = function() {
		// TODO 表单验证

		var postCfg = {
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			transformRequest: function (data) {
				return $.param(data);
			}
		};

		/*$http({
			url: '../../api/classify_add.php',
			method: 'post',
			params: {name: $scope.classify},
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			transformRequest: function (data) {
				return jQuery.param(data);
			},
			success: function(response) {

			}
		});*/

		$http.post('../../api/classify_add.php', {name: $scope.classify}, postCfg).success(function(response) {
			if (response.success) {
				getTableData();
				$myDlg.modal('hide');

			} else {
				// ...
			}
		});
	};

	// 删除
	$scope.onDelBtnClick = function() {
		var id;
		if(!confirm('确定要删除该记录吗？')) {
			return;
		}

		id = this.list.id;

		$http({
			url: '../../api/classify_del.php',
			method: 'get',
			params: {id: id}
		}).success(function(response) {
			if (response.success) {
				getTableData();
			} else {
				// ...
			}
		});

	};

	// 搜索
	$scope.onSearchBtnClick = function() {
		getTableData();
	};

	// 分页页面跳转
	$scope.jumpPage = function() {
		$scope.page = this.cpage;
		getTableData();
	};

	// 表格
	var getTableData = function() {

		$http({
			url: '../../api/classify_list.php',
			method: 'get',
			params: {query: $scope.searchTxt, size: $scope.size, page: $scope.page}
		}).success(function(response) {
			if (response.success) {
				$scope.lists = response.data;
				$scope.totalPage = Math.ceil(response.total / $scope.size);
				$scope.pageArr = _.range($scope.totalPage);
			} else {
				// ...
			}
		});

		/*$http.get('../../api/classify_list.php', {query: $scope.searchTxt}).success(function(response) {
			if (response.success) {
				$scope.lists = response.data;
			} else {
				// ...
			}
		});*/
	};

	getTableData();

});