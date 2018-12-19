module.exports=function* (){
    const a = yield new Promise(function(resolve,reject){
        setTimeout(()=>{
            resolve("哦我我")
        },2000)
    })
    console.log(a)
}