/*var json = {
    "name": "zhangsan",
    "age": 29,
    "gender": "男",
    "married": true,
    "children": ['a', 'b'],
    "parents": {
        "father": {
            "name": "old zhang",
            "age": 60
        },
        "mother": {
            "name": "lily",
            "age": 63
        }
    }
};*/

/*var json = [
    30,
    "吃饭",
    true,
    {"name": "aaa"},
    [1, 2, 3],
    null
];*/

//console.log(json);

/*var school = {
    "name": "***学校",
    "address": "***",
    "xy": [{
        "name": "***学院"
    }]
};*/

// var str = '{"name": "zhangsan", "age": 20, "married": false}';

// str = eval('(' + str + ')');
// str = JSON.parse(str);

// str = $.parseJSON(str);

// console.log(str);

////////////////////////////////////////////////////////////////////////

//var json = {"name": "abc"};

//var json = '{"name": "abc"}';



// 数组

//var json = [];

//var json = [1, 2, 3];

//var json = [1, "a", 2, "b"];

//var json = [1, "a", true, {"name": "abc"}, null, [1,2,3]];

// 对象

//var json = {};

//var json = {"name": "test"};

//var json = {"name": "test", "age": 20};

//var json = {
//    "name": "test",
//    "age": 20,
//    "friends": [
//        {"name": "aaa"},
//        {"name": "bbb"},
//        {"name": "ccc"}
//    ],
//    isMarried: false,
//    wife: null,
//    parents: {
//        father: "jim",
//        mother: "lily"
//    }
//};
//
//var json2 = {
//    "name": "test2",
//    "age": 20,
//    "friends": [
//        {"name": "aaa"},
//        {"name": "bbb"},
//        {"name": "ccc"}
//    ],
//    isMarried: false,
//    wife: null,
//    parents: {
//        father: "jim2",
//        mother: "lily"
//    }
//};
//
//var json3 = {
//    "name": "test3",
//    "age": 20,
//    "friends": [
//        {"name": "aaa"},
//        {"name": "bbb"},
//        {"name": "ccc"}
//    ],
//    isMarried: false,
//    wife: null,
//    parents: {
//        father: "jim",
//        mother: "lily"
//    }
//};
//
//var persons = [json, json2, json3];
//
//console.log(persons);

///////////////////////////////////////////////////////////////////////

// 值的有序列表，数组
// []

// ['a']

// var str = "['a', 'b', 3, true, null, undefined, {\"name\": \"张三\"}, ['a']]";

// str = ['a', 'b', 3, true, null, undefined, {name: "张三"}, ['a']];

// console.log(str[6]);

/*
 * json对象
 * json字符串
 */

// 键值对的集合，对象
// {}

// {age: 20}

// var p = {
// 	age: 20, 
// 	name: '张三', 
// 	firends: ['李四', '王五'], 
// 	wife: null, 
// 	computer: {
// 		cpu: 'i5', 
// 		memory: '4g'
// 	}
// }

/*
 * 
 */

// var company = {
// 	name: "百度",
// 	boss: "李彦宏",
// 	address: {
// 		"address1": "上地五街",
// 		"address2": "上地九街",
// 		"address3": "上地十街",
// 		"address4": "软件园2期（后厂村路）"
// 	},
// 	stuff_num: 200000
// };

// console.log(company.address.address1)

// var obj = {
// 	name: 'aaa',
// 	age: 20,
// 	say: function() {
// 		alert(this.age);
// 	}
// };

// gson.jar    fastjson.jar

// var p = '{"age":20,"name":"张三","firends":["李四","王五"],"wife":null,"computer":{"cpu":"i5","memory":"4g"}}';

// // p = eval('(' + p + ')');

// p = JSON.parse(p);

// console.log(p);

// p = JSON.stringify(p);

// console.log(p);

// console.log(typeof p)

////////////////////////////////////////////////////////////////////

// {}
// {"age":20}
// {"name": "zhangsan","age":20,"hobbies":["a", "b", "c"]}

// []
// [20]
// [20, 'test', 23, false]

//var json = '{"name": "test", "age": 20, "hobbies": ["a","b","c"]}';
//
//json = $.parseJSON(json);
//
//// json = JSON.parse(json);
//
//// json = eval('(' + json + ')');
//
//console.log(json.hobbies);

/////////////////////////////////////////////////////////////////////

/*
    json有两种形式
    1. 键值对（对象）
    2. 值的有序列表（数组）

    json对象 vs json字符串
*/

/*var json = {"name": "abc", "age": 20, "gender": "男"};

var jsonStr = '{"name": "abc", "age": 20, "gender": "男"}';*/

/*var json = [1, 2, 3, "a", "b", "c"];
var jsonStr = '[1, 2, 3, "a", "b", "c"]';*/

// var obj = eval('(' + jsonStr + ')');
// var obj = JSON.parse(jsonStr);
// var obj = $.parseJSON(jsonStr);

// console.log(obj);