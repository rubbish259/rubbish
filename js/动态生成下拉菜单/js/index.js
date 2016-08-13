    var where = document.getElementById('where');
    var btn = document.getElementById('btn');
    var arr = ['北京','上海','天津','杭州','深圳'];

    btn.onclick = function() {
        var i = 0,len = arr.length,
        arr2 = ['<option value="0">请选择</option>'];
        for (;i<len;i++) {
            arr2.push('<option value="'+(i+1)+'">' + arr[i] + '</option>');
        }
        where.innerHTML = arr2.join('');
    }