#### UMD, 同时支持 CommonJS 和 AMD

    核心：通过判断环境，module是node环境，define是AMD环境，如果两个都不存在，则直接挂载到umdModule
