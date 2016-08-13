        var setH1Btn = Helper.dom('setH1Btn');
        var outerH1 = Helper.dom('outerH1');
        var frame1 = Helper.dom('frame1');
//      var innerH1 = Helper.dom('innerH1'); // ?????
        setH1Btn.onclick = function() {
            var cWindow = frame1.contentWindow;

            console.log(cWindow);
            var cDocument = cWindow.document;
            var innerH1 = cDocument.getElementById('innerH1');
            innerH1.innerHTML = "888";
            cWindow.inner();
         console.log(frame1.contentWindow.document);
        };
        function ptest() {
            alert('form outer...');
        }