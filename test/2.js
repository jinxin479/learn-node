var fs = require("fs");
const getKeys = (json,key)=>{
    let region = {};
    
    json.map(item=>{
        if(!region[item[key]]){
            region[item[key]] = item[key];
        }
        
    })
    return region
}
fs.readFile("./area.json","utf-8",function(err,data){
    if (err) throw err;
    const json   = JSON.parse(data);
    const region = getKeys(json,"region");
    const keys = Object.keys(region);
    let result=[];
    result = keys.map((key,index)=>{
        let a={children:[],level:2,};
        json.map(js=>{
            if(js.region===key){
                a.label=js.region;
                a.value=js.region;
                // a.parent = 
                a.children.push(js);

            }
        })
        let provinceKeysMap = getKeys(a.children,"provinceCode");
       
        let provinceKeys = Object.keys(provinceKeysMap);
       let b =  provinceKeys.map(province=>{
            let provinceData ={};
            
            a.children.map(child=>{

                if(child.provinceCode===province&&child.code.indexOf("000")>-1){
                    provinceData.value = child.code;
                    provinceData.label=child.province;
                    provinceData.parentLabel=child.region;
                    provinceData.parentCode=child.provinceCode;
                    provinceData.level=3;

                }
                if(child.provinceCode===province&&child.code.indexOf("000")<0){
                    let city = {label:child.city,value:child.code,parentLabel:child.province,parentCode:child.provinceCode,level:4}
                    if(!!provinceData.children){
                        provinceData.children.push(city)
                    }else{
                        provinceData.children=[city]
                    }
                    
                }
            })
            return provinceData;
        })
        
        a.children=b;
        return a;
    })
    let ret = [
        {label:"中国",value:"中国",children:result},
        {label:"国外",value:"国外",children:[
            {label:"日本",value:"200000",parentCode:"901",parentLabel:"国外"},
            {label:"其他国家（除日本外）",value:"300000",parentCode:"1001",parentLabel:"国外"}
        ]},

    ]
    // console.log(result)

    let Str_ans = JSON.stringify(ret,null, 4);
        fs.writeFile('ret.json', Str_ans, 'utf8', (err) => {
            if (err) throw err;
            // console.log('done');
        });
})