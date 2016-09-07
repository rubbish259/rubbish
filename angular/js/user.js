var app = angular.module('userMng',[]);

app.filter('fmtHobbies',function() {
    return function (hobbies) {
        var h;
        try {
            h = _.filter(_.values($.parseJSON(hobbies)),function(val) {return val != ''}).join('|');
        } catch(e) {
            h = hobbies;
        }
        return h;
    }
});

app.controller('userMngController',function($scope,$http) {

    $scope.pageSize = 5;
    $scope.page = 0;

    $scope.lastPage = function () {
        $scope.page = getTotalPage() - 1;
        renderTable();
    };

    $scope.firstPage = function () {
        $scope.page = 0;
        renderTable();
    };
    
    $scope.clickPagingLi = function () {
        $scope.page = this.tmpPage;
        renderTable();
    };

    $scope.isUpdate = false;

    $scope.seachUser = function() {
        renderTable();
    }

    $scope.doUpdateUser = function () {
        
        $http({
            url:'server/ajaxUpdateUser.php',
            method:'get',
            params:this.user
        }).success(function (response) {
            if (response.success) {
                renderTable();
                $('#userDialog').modal('hide');
            }
        });
    };

    $scope.updateUser = function () {
        $scope.userDlgTitle = "修改用户";
        $scope.isUpdate = true;
        this.user.hobbies = JSON.parse(this.user.hobbies);
        $scope.user = this.user;
        $('#userDialog').modal('show');
    };

    $scope.delUser = function () {
        var id = this.user.id;
        if (confirm('确定要删除该用户吗？')) {
            $http({
            url:'server/ajaxDelUser.php',
            method:'get',
            params:{id:id}
        }).success(function (response) {
            if (response.success) {
                renderTable();
            }
        });
        }
    };

    $scope.saveUser = function () {
        $scope.user.img = 'abc.png';

        // TODO check
         
        $http({
            url:'server/ajaxReg.php',
            method:'get',
            params:$scope.user
        }).success(function (response) {
            if (response.success) {
                renderTable();
                $('#userDialog').modal('hide')
                $scope.user = {};
            }
        })
    };

    $scope.newUser = function() {
        $scope.userDlgTitle = "新增用户"
        $scope.isUpdate = false;
        $('#userDialog').modal('show')
        $scope.user = {};
    }

    function renderTable() {
        $http({
            url:'server/ajaxUserList.php',
            method:'get',
            params:{size:$scope.pageSize,query:$scope.query,page:$scope.page}
        }).success(function (response){
            if (response.success) {
                $scope.users = response.data;
                $scope.total = response.total;
                $scope.pageArr = _.range(0,getTotalPage());
            }
        });
    }

    function getTotalPage () {
        return parseInt($scope.total / $scope.pageSize + 1);
    } 
    renderTable();
});