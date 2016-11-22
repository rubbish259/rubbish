<?php include "inc/head.php"; ?>

<!-- nav -->
<?php include "inc/nav.html"; ?>
<!-- nav -->

<div ng-app="classifyApp" ng-controller="classifyController" class="container">
	<div class="row" style="margin-bottom: 10px;">
	  <div class="col-lg-6">
	    <ul class="nav nav-pills">
		  <li><a ng-click="onNewBtnClick()" href="javascript:;">新增类别</a></li>
		</ul>
	  </div>
	  <div class="col-lg-3 col-lg-offset-3">
	    <div class="input-group">
	      <input ng-model="searchTxt" type="text" class="form-control">
	      <span class="input-group-btn">
	        <button ng-click="onSearchBtnClick();" class="btn btn-default" type="button">Go!</button>
	      </span>
	    </div>
	  </div>
	</div>

	<table id="cTable" class="table table-bordered table-striped table-hover">
		<tr>
			<th style="width: 30px;"><input type="checkbox"></th>
			<th style="width: 50px;">序号</th>
			<th>类别名称</th>
			<th style="width: 80px; text-align: center;">操作</th>
		</tr>
		<tr ng-repeat="list in lists">
			<td><input type="checkbox"></td>
			<td>{{$index + 1}}</td>
			<td>{{list.name}}</td>
			<td style="text-align: center;"><button ng-click="onDelBtnClick();" class="btn btn-danger btn-xs">删除</button></td>
		</tr>
	</table>

	<nav>
	  <ul id="pagingUl" class="pagination pull-right" style="margin-top: -10px;">
	  	<li><a href="#">&laquo;</a></li>
	  	<li ng-click="jumpPage();" ng-repeat="cpage in pageArr" ng-class="{'active': page==cpage}"><a href="javascript:;">{{$index + 1}}</a></li>
	  	<li><a href="#">&raquo;</a></li>
	  </ul>
	</nav>


	<div id="myDlg" class="modal fade">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
	        <h4 class="modal-title">新增类别</h4>
	      </div>
	      <div class="modal-body">
	        <form class="form-horizontal">
			  <div class="form-group">
			    <label class="col-sm-2 control-label">类别名称</label>
			    <div class="col-sm-6">
			      <input ng-model="classify" type="text" class="form-control" placeholder="">
			    </div>
			  </div>
			</form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	        <button ng-click="saveClassify()" type="button" class="btn btn-primary">保存</button>
	      </div>
	    </div><!-- /.modal-content -->
	  </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
</div>

<script src="../../bower_components/angular/angular.min.js"></script>
<script src="../../bower_components/underscore/underscore-min.js"></script>
<script src="js/classify.js"></script>

<?php include "inc/foot.php"; ?>