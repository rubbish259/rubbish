var getDiv = require('./greeters.js');
var fill0 = require('./test.js');

document.getElementById('root').appendChild(getDiv());

document.getElementById('test').innerHTML = fill0(27);