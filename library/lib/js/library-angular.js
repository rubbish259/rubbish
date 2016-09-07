// var app = angular.module('libraryApp', []);
// app.controller('libraryController',function($scope,$http) {
//     $scope.book = {};
//     $scope.updateBook = function() {
//         $scope.bookDlgTitle = '修改图书';
//         $scope.book = this.book;
//         $('#bookDialog').modal('show');
//     };

//     $scope.delBook = function() {
//             var id = this.book.id || $('input[name=chk]:checked').id;
//         $scope.bookDlgTitle = '删除图书';

//         if (confirm('确定要删除本书么？')) {
//             $http({
//                 url:'api/books_del.php',
//                 method:'get',
//                 params:{ids:id}
//             }).success(function(response){
//             if (response.success) {
//                 getBookList();
//             };
//         });
//         }
//     };

//      $scope.saveBooks = function() {
//         //TODO check
        
//         $http({
//             url:'api/books_add.php',
//             method:'get',
//             params:$scope.book

//         }).success(function(response){
//             if (response.success) {
//                 getBookList();
//                 $('#bookDialog').modal('hide');
//                 $scope.book = {};
//             };
//         });

//         console.log($scope.book);
//     };


//     $scope.newBook = function() {
//         $scope.bookDlgTitle = '新增图书';
//         $('#bookDialog').modal('show');
//     };

//     var getBookList = function() {
//         layer.load();
//         $http({
//             url:'api/books_list.php',
//             method:'get',
//             params:{}
//         }).success(function(response){
//             if (response.success) {
//                 $scope.bookList = response.data;
//             }else{
//                 $scope.bookList = [];
//             }
//         layer.closeAll('loading');

//         }).error();
//     };

//     getBookList();

// });
var app = angular.module('libraryApp', []);
app.controller('mainController',function($scope,$http,$timeout) {

    $scope.params = {
        ids:[],
        bs:[]
    };
        console.log($scope.params.bs);
    console.log($scope.params.ids)
    $scope.book = {};

    $scope.pageSize = 5;

    $scope.page = 0;

    $scope.isUpdate = false;

    $scope.lastPage = function() {
        $scope.page = getTotalPage() - 1;
        getBookList();
    };

    $scope.firstPage = function() {
        $scope.page = 0;
        getBookList();
    };

    $scope.clickPagingLi = function() {
        // console.log(this)
        $scope.page = this.tmpPage;
        getBookList();
    };

    $scope.searchBooks = function() {
        var query = $scope.query;

       
        console.log(query);

        getBookList();
    };

    $scope.doUpDateBook = function() {
        // alert('保存成功！')
        $http({
                url:'../api/books_update.php',
                method:'get',
                params:$scope.book
             }).success(function(response){
            if (response.success) {
                getBookList();
            $('#bookDialog').modal('hide');
            };
        });
    };

    $scope.updateBook = function() {
        // $('.btn.btn-warning.tankuang').show();
        $scope.bookDlgTitle = '修改图书';
        $scope.isUpdate = true;
        $scope.book = this.book;
        console.log(this.book);
        $('#bookDialog').modal('show');

            // dis[obj.id] = obj;

    };
    
    $scope.updateTwoBook = function() {
        // $('.btn.btn-warning.tankuang').show();
        $scope.bookDlgTitle = '修改图书';
        $scope.isUpdate = true;
        $scope.book = $scope.params.bs[$scope.params.bs.length-1];
        console.log(this.book);
        $('#bookDialog').modal('show');
        $('#')
            // dis[obj.id] = obj;

    };
        console.log($scope.book.id);
    $scope.delBook = function() {
        $scope.bookDlgTitle = '删除图书';
        var id = this.book.id || $('input[name=chk]:checked').id;
        console.log(id);
        if (confirm('确定要删除本书么？')) {
            $http({
                url:'api/books_del.php',
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

     $scope.saveBooks = function() {
        //TODO check
        
        $http({
            url:'../api/books_add.php',
            method:'get',
            params:$scope.book

        }).success(function(response){
            if (response.success) {
                getBookList();
                $('#bookDialog').modal('hide');
                $scope.book = {};
            };
        });

        console.log($scope.book);
    };

    $scope.newBook = function() {
        // $('.btn.btn-warning.change').hide();
        $scope.bookDlgTitle = '新增图书';
        $scope.isUpdate = false;
        $('#bookDialog').modal('show');
    };

    var getBookList = function() {

        $timeout(function(){
            layer.load();
        });//延迟执行

        // console.log($scope.query);
        $http({
            url:'../api/books_list.php',
            method:'get',
            params:{size:$scope.pageSize,query:$scope.query,page:$scope.page}
        }).success(function(response){
            if (response.success) {
                $scope.bookList = response.data;
            }else{
                $scope.bookList = [];
            }
        $scope.total = response.total;
        $scope.pageArr = _.range(0, getTotalPage());
        layer.closeAll('loading');
        

        }).error();
    };
    
    /*function renderPaging() {
        $scope.pageArr = _.range(0, getTotalPage());
    }*/

    function getTotalPage() {
        return parseInt($scope.total / $scope.pageSize) + 1;
    }
    getBookList();
    //////////////////////////////////////////////////////
    $scope.onCheckboxClick = function($event) {

        var id= this.book.id;
        var bok = this.book;
        console.log(this.book)
        var target= $event.target;

        if (target.checked) {
            $scope.params.ids.push(id);
            $scope.params.bs.push(bok);
        }else{
            var index = getIndex($scope.params.ids,id);
            var oindex = getIndex($scope.params.bs,bok);

            if (index > -1) {
                $scope.params.ids.splice(index,1);
                $scope.params.bs.splice(oindex,1);
            };

        }
        console.log($scope.params.ids);

        function getIndex(arr,item) {

            var i,len;
            len = arr.length;
            for (i = 0; i < len; i++) {
                if (arr[i]===item) {
                    return i;
                };
            };
            return -1;
        }

    };
    
});
