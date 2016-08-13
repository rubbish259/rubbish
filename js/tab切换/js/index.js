var qhtab = function() {
    var tabH = Helper.dom('tabH'),
        tabB = Helper.dom('tabB'),
        tabA = tabH.getElementsByTagName('a'),
        tabD = tabB.getElementsByTagName('div'),
        len = tabA.length;

    if (len != tabD.length) {
        return;
    }

    for (var i=0;i<len;i++) {
        tabA[i].setAttribute('index',i);
        tabA[i].onclick = function() {
            var indexs = this.getAttribute('index');
            for (var j=0;j<len;j++) {
                tabA[j].className = "";
                tabD[j].className = "";
            }
            this.className = "on";
            tabD[indexs].className = "on";
        }
    }
}

qhtab();