const connect = require('connect');
const http = require('http');
const thunk = require("./thunk.js");
const app = connect();
function f(a, b, callback){
    var sum = a + b;
    callback(sum);
    callback(sum);
  }
  
  let ft = thunk(f);
  ft(1, 2)(console.log);
app.use('/foo', function (req, res, next) {
    // req.url starts with "/foo"
    debugger;
    res.end('Hello foo!\n');
    console.log(req)
    next();
});
app.use(function(req, res){
    res.end('Hello from Connect!\n');
});

http.createServer(app).listen(3000);