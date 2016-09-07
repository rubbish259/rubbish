!function () {

    var classifyArray = [
            {"id": 1,name: "历史类"},
            {"id": 2,name: "文学类"},
            {"id": 3,name: "科技类"},
            {"id": 4,name: "军事类"},
            {"id": 5,name: "小说类"},
        ];

    var cache = {},param = {size:5,page:0,total:0};

   // 添加分类

    function renderClassifySel () {
        var data = classifyArray;   // 替代后台请求数据
        data.unshift({"id": 0,name: "请选择"})
        var optsArr = _.map(data,function(obj) {
            return '<<option value="'+ obj.id +'">' + obj.name +'</option>'
        });
        $('#classify').html(optsArr.join(''));
    };
    renderClassifySel();

    // 新增图书
 
    $('#addBooksBtn').on('click',function () {
        resetForm();
        $('#myModal')
        .find('#myModalLabel').html('新增图书').end()
        .find('#bcrkBtn').html('保存并入库').removeClass('update').end()
        .modal('show');

        $('#xiajia').on('click',function () {
                $('input:radio:last').attr('disabled', 'disabled');
        })

        $('#shangjia').on('click',function () {
                $('input:radio:last').removeAttr('disabled');
        })

        $('#yijiechu').on('click',function () {
                $('#xiajia').attr('disabled', 'disabled');
        })

        $('#weijiechu').on('click',function () {
                $('#xiajia').removeAttr('disabled');
        })
    });

    //  新增修改
 
    $('#bcrkBtn').on('click',function () {
        var data = {
            name:$('#name').val(),
            author:$('#author').val(),
            publisher:$('#publisher').val(),
            p_date:$('#p_date').val(),
            price:$('#price').val(),
            classify:$('#classify').val(),
            status:$('input[name = status]:checked').val(),
            borrow_status:$('input[name = b_status]:checked').val()
        };

        var $this = $(this),url;
        if ($this.hasClass('submiting')) {
            return;
        }

        $this.addClass('submiting');

        if ($this.hasClass('update')) {    // 修改
            data["id"] = $('#bookId').val();
            url = '../api/books_update.php';

        } else {    //  新增
            url = '../api/books_add.php';
        }

        if ($.trim(data.name) == "") {
            alert('书名不能为空！')
            $('#bcrkBtn').removeClass('submiting');
            return;
        }

        if ($.trim(data.author) == "") {
            alert('作者不能为空！')
            $('#bcrkBtn').removeClass('submiting');
            return;
        }

        $.get(url, data, function (response){
            if (response.success) {
               // alert('入库成功！')
               resetForm();
            } else {
                alert('操作失败，请刷新重试！');
            }
            $('#myModal').modal('hide');
            initTable();
        },'json');

    });

    //  重置

    function resetForm() {
        $('#booksForm').trigger('reset');
        $('#bcrkBtn').removeClass('submiting');
    }

    //  添加日期

    function initDatePicker () {
        $('#p_date').datetimepicker({
            todayBtn:true,
            format:'yyyy-mm-dd',
            autoclose:true,
            minView:2,
            language:'zh-CN'
        });
    }
    initDatePicker();

    // 把后台列表放到前台
            
    function initTable () {
        $('.masker-wp').show();
        $.extend(param,{query:param.query || ''},{page:param.page})
        $.get('../api/books_list.php',param, function (response){
        if (response.success) {
           renderTable(response.data);
           renderPaging(response);
        } else {
            alert('数据请求失败，请刷新重试！');
        }
        },'json');
    };
    initTable(); 

    //  渲染页数
    function renderPaging (response) {
        var total = response.total,
            size = param.size,
            totalPage = Math.ceil(total / size),
            i,
            paginArr = [];

        param.totalPage = totalPage;

        if (param.page == 0) {
            paginArr.push(
                '<li class="disabled" class="first-page">',
                    '<a href="javascript:;" aria-label="Previous">',
                        '<span aria-hidden="true">&laquo;</span>',
                    '</a>',
                '</li>',
                '<li class="disabled" class="prev">',
                    '<a href="javascript:;">',
                        '<span aria-hidden="true">&lsaquo;</span>',
                    '</a>',
                '</li>'
                )
        } else {
            paginArr.push(
                '<li class="first-page">',
                    '<a href="javascript:;" aria-label="Previous">',
                        '<span aria-hidden="true">&laquo;</span>',
                    '</a>',
                '</li>',
                '<li class="prev">',
                    '<a href="javascript:;">',
                        '<span aria-hidden="true">&lsaquo;</span>',
                    '</a>',
                '</li>'
                )
        }

            for (i=0;i<totalPage;i++) {
                if (i == param.page) {
                    paginArr.push('<li page="', i ,'" class="active"><a href="javascript:;">',(i + 1),'</a></li>');

                } else {
                    paginArr.push('<li page="', i ,'"><a href="javascript:;">',(i + 1),'</a></li>');
                }
            }

            paginArr.push(
                '<li class="next">',
                    '<a href="javascript:;" aria-label="Next">',
                        '<span aria-hidden="true">&rsaquo;</span>',
                    '</a>',
                '</li>',
                '<li class="last-page">',
                    '<a href="javascript:;" aria-label="Next">',
                        '<span aria-hidden="true">&raquo;</span>',
                    '</a>',
                '</li>'
                )
            $('#pagingUl').html(paginArr.join(''))   
        }

    //  点击分页
        
        $('#pagingUl').on('click','li',function () {
            var $this = $(this);
            

                currPage = $this.attr('page');

            if ($this.hasClass('disabled')) {
                return;
            }

            if ($this.hasClass('first-page')) {
                currPage = 0;
            } else if ($this.hasClass('last-page')) {
                currPage = param.totalPage - 1;
            } else if ($this.hasClass('prev')) {
                currPage = --param.page;
            } else if ($this.hasClass('next')) {
                currPage  = ++param.page;
            }  else {
                currPage = $this.attr('page');
            }
            param.page = currPage;
            initTable();

            $('#jumpIpt').val(currPage * 1 + 1); // parseInt(currpage)
        })

    //  跳转页数
      
    $('#jumpBtn').on('click',function () {

        var $jumpIpt = $('#jumpIpt');
            page = $jumpIpt.val()
        if (isNaN($jumpIpt.val())) {
            alert('请输入一个数字！');
            $jumpIpt.val('').select();
            return;
        }

        if (page > param.totalPage) {
            page = param.totalPage;
        }

        if (page < 1) {
            page = 1;
        }
            param.page = --page;
            initTable();
            $('#jumpIpt').val(page * 1 + 1); 
    })
    
    //  渲染表格
   
    function renderTable (data) {
        var trs = [];
        if (data.length == 0) {
            alert('暂无查询结果，请更换关键字重试！');
            $('.masker-wp').hide();
            return;
        }

        $.each(data,function (index,obj) {

            var b_status = obj.borrow_status;

            var b_status_map = {0:'未借出', 1:'已借出'};

            var classify_map = {
                1: "历史类",
                2: "文学类",
                3: "科技类",
                4: "军事类",
                5: "小说类",
                0: "未分类"
            };

            trs.push (
                '<tr>',
                  '<td><input id="',obj.id,'" type="checkbox" class="book-checkbox" /></td>',
                  '<td>',obj.name,'</td>',
                  '<td>',obj.author,'</td>',
                  '<td>',obj.publisher,'</td>',
                  '<td>￥',obj.price,'</td>',
                  '<td>',obj.p_date,'</td>',
                  '<td>',classify_map[obj.classify || 0],'</td>',
                  '<td>',obj.status ? '上架' : '下架','</td>',
                  '<td>',b_status_map[b_status],'</td>',
                '</tr>'
            );
            cache[obj.id] = obj;
        });

        $('#Table tbody').html(trs.join(''));
        $('.masker-wp').hide();
    }

    //  选中的书

    $('#Table').on('click','.book-checkbox',function () {

        var len = $('#Table input.book-checkbox:checked').length;

        var $delBookBtn = $('#delBtn');

        if (len == 0) {
            $delBookBtn.prop('disabled','disabled');
            $('#modiBtn').prop('disabled','disabled');
        } else if (len == 1) {
            $('#modiBtn').removeProp('disabled','disabled');
            $delBookBtn.removeProp('disabled','disabled');
        } else if (len > 1) {
           $('#modiBtn').prop('disabled','disabled'); 
        } 
    });


    //  删除图书

    $('#delBtn').on('click',function () {

        var $select = $('#Table input.book-checkbox:checked'),ids = [];

        if (!confirm('你确认删除该图书吗？')) {
            return;
        }

        $('.masker-wp').show();

        $select.each(function () {
            ids.push(this.id);
        });

        $.get('../api/books_del.php',{ids:ids.join(',')},function (response) {
            if (response.success) {
                initTable();
            } else {
                alert('删除失败，请刷新重试!')
            }
        },'json');
    });

    //  修改图书

    $('#modiBtn').on('click',function () {

        var $select = $('#Table input.book-checkbox:checked'),

            id = $select[0].id,

            currObj = cache[id],

            $myModal = $('#myModal');

            resetForm();

            $myModal.find('#bookId').val(currObj.id);
            $myModal.find('#name').val(currObj.name);
            $myModal.find('#author').val(currObj.author);
            $myModal.find('#publisher').val(currObj.publisher);
            $myModal.find('#price').val(currObj.price);
            $myModal.find('#p_date').val(currObj.p_date);
            $myModal.find('#classify').val(currObj.classify);
            $myModal.find('input[name=status][value = '+currObj.status+']').trigger('click');
            $myModal.find('input[name=b_status][value = '+currObj.borrow_status+']').trigger('click');

            $('#myModal')
            .find('#myModalLabel').html('修改图书').end()
            .find('#bcrkBtn').html('确定修改').addClass('update').end()
            .modal('show');
       })

    //  搜索
    
    $('#searchBtn').on('click',function () {
        var txt = $('#searchIpt').val();
        param.query = txt;
        param.page = 0;
        initTable();
    })

    $('#searchIpt').keydown(function(e) {
        if (e.keyCode == 13)
           $('#searchBtn').trigger('click')
    })

}();