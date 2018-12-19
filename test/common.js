function Module (id,parent){
    this.id = id;
    this.exports = {};
    this.parent = parent;
    if(parent&&parent.children){
        this.parent.children.push(this)
    }
    this.filename = null;
    this.loaded = false;
    this.children=[]
}
Module.prototype.require = function(id){
    // 检查模块标识符
  if (typeof id !== "string") {
    throw new ERR_INVALID_ARG_TYPE("id", "string", id);
  }
  if (id === "") {
    throw new ERR_INVALID_ARG_VALUE("id", id, "must be a non-empty string");
  }
  // 调用模块加载方法
  return Module._load(id, this, /* isMain */ false);

}

Module._load = function(request, parent, isMain) {
    if (parent) {
      debug("Module._load REQUEST %s parent: %s", request, parent.id);
    }
    // 解析文件名
  var filename = Module._resolveFilename(request,parent,isMain);
  var cachedModule = Module._cache[filename];
  // 判断是否有缓存，有的话返回缓存对象的 exports
  if(cachedModule){
    updateChildren(parent, cachedModule, true);
    return cachedModule.exports;
  }
  // 判断是否为原生核心模块，是的话从内存加载
  if (NativeModule.nonInternalExists(filename)) {
    debug("load native module %s", request);
    return NativeModule.require(filename);
  }
    // 生成模块对象
    var module = new Module(filename, parent);
    if (isMain) {
        process.mainModule = module;
        module.id = ".";
      }
      // 缓存模块对象
  Module._cache[filename] = module;
  // 加载模块
  tryModuleLoad(module, filename);
  return module.exports;
}

function tryModuleLoad(module, filename) {
    var threw = true;
    try {
      // 调用模块实例load方法
      module.load(filename);
      threw = false;
    } finally {
      if (threw) {
        // 如果加载出错，则删除缓存
        delete Module._cache[filename];
      }
    }
  }

  Module.prototype.load = function(filename) {
    debug("load %j for module %j", filename, this.id);
  
    assert(!this.loaded);
    this.filename = filename;
  
    // 解析路径
    this.paths = Module._nodeModulePaths(path.dirname(filename));
  
    // 判断扩展名，并且默认为 .js 扩展
    var extension = path.extname(filename) || ".js";
  
    // 判断是否有对应格式文件的处理函数， 没有的话，扩展名改为 .js
    if (!Module._extensions[extension]) extension = ".js";
  
    // 调用相应的文件处理方法，并传入模块对象
    Module._extensions[extension](this, filename);
    this.loaded = true;
  
    // 处理 ES Module
    if (experimentalModules) {
      if (asyncESM === undefined) lazyLoadESM();
      const ESMLoader = asyncESM.ESMLoader;
      const url = pathToFileURL(filename);
      const urlString = `${url}`;
      const exports = this.exports;
      if (ESMLoader.moduleMap.has(urlString) !== true) {
        ESMLoader.moduleMap.set(
          urlString,
          new ModuleJob(ESMLoader, url, async () => {
            const ctx = createDynamicModule(["default"], url);
            ctx.reflect.exports.default.set(exports);
            return ctx;
          })
        );
      } else {
        const job = ESMLoader.moduleMap.get(urlString);
        if (job.reflect) job.reflect.exports.default.set(exports);
      }
    }
  };
  
  