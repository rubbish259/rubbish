/*
var num = document.getElementById('num');
var i = 1;
    var s = setInterval(function() {
        if (i <=100) {
            num.style.color ='green';
            num.innerHTML =num.innerHTML+i +" ";
            i++;
        } else {
           clearInterval(s);
            return; 
        }
    },1000);


*/

function foo(x) { 
var tmp = 3; 
return function (y) { 
alert(x + y + tmp); 
x.memb = x.memb ? x.memb + 1 : 1; 
alert(x.memb); 
} 
} 
var age = new Number(2); 
var bar = foo(age); // bar 现在是一个引用了age的闭包 
bar(10); 