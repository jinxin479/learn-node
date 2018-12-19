

const fs  = require('fs');
const zlib = require("zlib");

// 压缩
// const gzip = zlib.createGzip();
// const inFile = fs.createReadStream("./area.json");
// const outFile = fs.createWriteStream("./area.json.gz");
// inFile.pipe(gzip).pipe(outFile);


// 解压

// const gunzip = zlib.createGunzip();
// const inFile1= fs.createReadStream("./area.json.gz");
// const outFile1 = fs.createWriteStream("./area1.json");

// inFile1.pipe(gunzip).pipe(outFile1)


// 服务端gzip压缩

var http = require('http');
var zlib = require('zlib');
var fs = require('fs');
var filepath = './extra/fileForGzip.html';

var server = http.createServer(function(req, res){
    var acceptEncoding = req.headers['accept-encoding'];
    var gzip;
    
    if(acceptEncoding.indexOf('gzip')!=-1){ // 判断是否需要gzip压缩
        
        gzip = zlib.createGzip();
        
        // 记得响应 Content-Encoding，告诉浏览器：文件被 gzip 压缩过
        res.writeHead(200, {
            'Content-Encoding': 'gzip'
        });
        fs.createReadStream(filepath).pipe(gzip).pipe(res);
    
    }else{

        fs.createReadStream(filepath).pipe(res);
    }

});

server.listen('3000');

