var fs = require('fs');
var thunkify = require('thunkify');
var readFile = thunkify(fs.readFile);

var gen = function* (){
  var r1 = yield readFile('./co.js',"utf-8");
  console.log("r1",r1);

  var r2 = yield readFile('./filter.js',"utf-8");
  console.log("r2",r2);
};
function run(fn) {
    var gen = fn();
  
    function next(err, data) {
        debugger;
      var result = gen.next(data);
      debugger;
      if (result.done) return;
      result.value(next);
    }
  
    next();
  }
  run(gen);