// const buf1  = Buffer.alloc(10);
// const buf2 = Buffer.from("hello");

// console.log(buf2.toJSON())
// buf2.write("jinxin");
// console.log(buf2.toJSON())
// console.log(buf2)

// const buf = new Buffer([101,110]);
// console.log(buf.toString()) //en
// var array = 'buffer'.split('').map(function(v){
//     return v.charCodeAt(0).toString(16)
// });
// console.log(array)


// var buf1 = Buffer.alloc(10);  // 长度为10的buffer，初始值为0x0
// var buf2 = Buffer.alloc(10, 1);  // 长度为10的buffer，初始值为0x1
// var buf3 = Buffer.allocUnsafe(10);  // 长度为10的buffer，初始值不确定
// var buf4 = Buffer.from([1, 2, 3])  // 长度为3的buffer，初始值为 0x01, 0x02, 0x03

// Buffer.from(array)
// // [0x62, 0x75, 0x66, 0x66, 0x65, 0x72] 为字符串 "buffer" 
// // 0x62 为16进制，转成十进制就是 98，代表的就是字母 b
// var buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
// console.log(buf.toString());
// Buffer.from(string[, encoding]) //默认utf-8


// 创建新的Buffer实例，并将buffer的数据拷贝到新的实例子中去。


// var buff = Buffer.from('buffer');
// var buff2 = Buffer.from(buff);

// console.log(buff.toString());  // 输出：buffer
// console.log(buff2.toString());  // 输出：buffer

// buff2[0] = 0x61;

// console.log(buff.toString());  // 输出：buffer
// console.log(buff2.toString());  // 输出：auffer


// 比较

// var buf1 = Buffer.from('A');
// var buf2 = Buffer.from('A');
// console.log( buf1.equals(buf2) ); 


const buf1 = Buffer.from('ABC');
const buf2 = Buffer.from('A');
const buf3 = Buffer.from('ABCD');
Buffer.compare(buf1, buf2)
// Prints: 0
console.log(Buffer.compare(buf1, buf2));