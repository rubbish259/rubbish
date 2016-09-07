
var app = angular.module('libraryApp', []);

app.controller('mainController', function($scope, $http) {

    $scope.params = {
        ids: [],
    };

    $scope.book = {};

    $scope.isUpdate = false;      //用来确定是修改还是添加

    $scope.book.classify = "0";    //用来让下拉列表第一项显示请选择

    $scope.pageSize = 5;           //用来定义一页显示多少行

    $scope.page = 0;

    $scope.lastPage = function () {
        $scope.page = getTotalPage() - 1;
        getBookList();
    };

    $scope.firstPage = function () {
        $scope.page = 0;
        getBookList();
    };
    
    $scope.clickPagingLi = function () {
        $scope.page = this.tmpPage;
        getBookList();
    };

    //   列表

    var getBookList = function() {
        layer.load();
        $http({
            url: '../api/books_list.php',
            method: 'get',
            params: {size:$scope.pageSize,query:$scope.query,page:$scope.page}
        }).success(function(response) {
            if (response.success) {
                $scope.bookList = response.data;
            } else {
                $scope.bookList = {};
            };
            layer.closeAll();
            $scope.total = response.total;
            $scope.pageArr = _.range(0,getTotalPage());
        }).error();
    };
    getBookList();

    ////////////////////////////////////////////

    $scope.onCheckboxClick = function($event) {

        var id = this.book.id,
            target = $event.target;

        if (target.checked) {
            $scope.params.ids.push(id);
        } else {
            var index = getIndex($scope.params.ids, id);
            if (index > -1) {
                $scope.params.ids.splice(index, 1);
            }
        }

        console.log($scope.params.ids);

    };

    function getIndex(arr, item) {

        var i, len;
        len = arr.length;
        for (i=0; i<len; i++) {
            if (arr[i] === item) {
                return i;
            }
        }
        return -1;
    };

    $scope.addBook = function () {
        $scope.bookDlgTitle = '新增图书';
        $('#bookDialog').modal('show');
    };

    //   保存

    $scope.saveBookClick =function () {
        $http({
            url: '../api/books_add.php',
            method: 'get',
            params: $scope.book
        }).success(function(response) {
            if (response.success) {
               alert('图书保存成功！')
               getBookList();
            } else {
               alert('咦，你的网络有问题，请刷新重试！')
            }
            $('#bookDialog').modal('hide');
            $scope.book = {};
        }).error();
    };

    //   删除

    $scope.delBookClick = function() {
        /*$scope.bookDlgTitle = '删除图书';*/
        /*var id = this.book.id || $('input[name=chk]:checked').id;
        console.log(id);*/
        if (confirm('确定要删除本书么？')) {
            $http({
                url:'../api/books_del.php',
                method:'get',
                params:{ids:($scope.params.ids.join(',')||id)}
            }).success(function(response){
                if (response.success) {
                    getBookList();
                    $scope.params.ids.length = 0;
                };
            });
        }
    };

    //   修改   
    
    $scope.doModiBookClick = function() {
        // alert('保存成功！')
        $http({
                url:'../api/books_update.php',
                method:'get',
                params:$scope.book
             }).success(function(response){
            if (response.success) {
                alert('图书修改成功！')
                getBookList();
            $('#bookDialog').modal('hide');
            };
        });
    };

    $scope.modiBookClick = function() {
        var id = $scope.params.ids[0];
        console.log($scope.params)
        var bookList = this.bookList;
        var book = getObjById(bookList,id);

        $scope.bookDlgTitle = '修改图书';
        $scope.isUpdate = true;
        $scope.book = book;
        $('#bookDialog').modal('show');
    };

    function getObjById(arr,id) {
        var i, len = arr.length;
        for (i=0;i<len;i++) {
            if(arr[i].id == id) {
                return arr[i];
            }
        }
        return null;
    };

    function getTotalPage () {
        return parseInt($scope.total / $scope.pageSize + 1);
    };
    
    /*搜索*/

    $scope.seachBook = function () {
        $scope.page = 0;
        getBookList();
    };

console.log(angular.identity)
});