var arr = [
            {
                name: 'aaa',
                age: 20,
                gender: '男',
                address: '北京市海淀区'
            },
            {
                name: 'bbb',
                age: 22,
                gender: '男',
                address: '北京市海淀区'
            },
            {
                name: 'ccc',
                age: 21,
                gender: '男',
                address: '北京市海淀区'
            },
            {
                name: 'ddd',
                age: 20,
                gender: '男',
                address: '北京市海淀区'
            },
            {
                name: 'eee',
                age: 25,
                gender: '男',
                address: '北京市海淀区'
            },
            {
                name: 'fff',
                age: 30,
                gender: '男',
                address: '北京市海淀区'
            },
            {
                name: '郭德纲',
                age: 40,
                gender: '男',
                address: '天津市红桥区'
            }
        ];

var tbody = document.getElementById('tbody');

function xrtable () {
    var i = 0, len = arr.length, arr2 = [];
    for (;i<len;i++) {
        arr2.push(
            '<tr>',
                '<td>', arr[i].name, '</td>',
                '<td>', arr[i].age, '</td>',
                '<td>', arr[i].gender, '</td>',
                '<td>', arr[i].address, '</td>',
            '</tr>'
            );
    }
    tbody.innerHTML = arr2.join('');
}
 xrtable();