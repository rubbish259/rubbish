<?php include "inc/head.php"; ?>
    
	<!-- nav -->
	<?php include "inc/nav.html"; ?>
	<!-- nav -->

	<div class="container">

		<div class="row" style="margin-bottom: 10px;">
		  <div class="col-lg-6">
		    <ul class="nav nav-pills">
			  <li><a id="newBtn" href="javascript:;">新增商品</a></li>
			  <li><a id="updateBtn" href="javascript:;">修改商品</a></li>
			  <li><a id="delBtn" href="javascript:;">删除商品</a></li>
			</ul>
		  </div>
		  <div class="col-lg-3 col-lg-offset-3">
		    <div class="input-group">
		      <input id="searchIpt" type="text" class="form-control">
		      <span class="input-group-btn">
		        <button id="searchBtn" class="btn btn-default" type="button">Go!</button>
		      </span>
		    </div>
		  </div>
		</div>

		<table id="gTable" class="table table-bordered table-striped table-hover">
			<thead>
				<tr>
					<th style="width: 30px;"><input type="checkbox"></th>
					<th style="width: 50px;">序号</th>
					<th>商品名称</th>
					<th>价格</th>
					<th>介绍</th>
					<th style="width: 120px;">类别</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>

		<nav>
		  <ul id="pagingUl" class="pagination pull-right" style="margin-top: -10px;">
		  </ul>
		</nav>

	</div>

	<!-- Modal -->
	<div class="modal fade" id="myModal">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
	        <h4 class="modal-title" id="myModalLabel">新增商品</h4>
	      </div>
	      <div class="modal-body">
	        <form class="form-horizontal">
			  <div class="form-group">
			    <label class="col-sm-2 control-label">商品名称</label>
			    <div class="col-sm-10">
			      <input type="text" class="form-control" id="name" placeholder="请输入商品名称">
			      <input type="hidden" id="gid">
			    </div>
			  </div>
			  <div class="form-group">
			    <label class="col-sm-2 control-label">商品价格</label>
			    <div class="col-sm-3">
			      <input type="text" class="form-control" id="price" placeholder="">
			    </div>
			  </div>
			  <div class="form-group">
			    <label class="col-sm-2 control-label">商品介绍</label>
			    <div class="col-sm-10">
			      <textarea id="detail" class="form-control" rows="3"></textarea>
			    </div>
			  </div>
			  <div class="form-group">
			    <label class="col-sm-2 control-label">商品类别</label>
			    <div class="col-sm-3">
					<select id="classify" class="form-control">
					</select>
			    </div>
			  </div>
			</form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	        <button id="saveBtn" type="button" class="btn btn-primary">保存</button>
	      </div>
	    </div>
	  </div>
	</div>

	<script src="../../bower_components/layer/build/layer.js"></script>
	<script src="js/goods.js"></script>
<?php include "inc/foot.php"; ?>