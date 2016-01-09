module.exports = {
    
    /* 继承复制 */
    extend: function(target, source, flag) {
        for(var key in source) {
            if(source.hasOwnProperty(key))
                flag ?
                    (target[key] = source[key]) :
                    (target[key] === void 0 && (target[key] = source[key]));
        }
        return target;
    },

    /* 向前台返回JSON方法封装 */
    jsonWrite:function (res, ret) {
        if (typeof ret === undefined) {
            res.json(code.OPERATE_FAIL);
        } else {
            res.json(ret);
        }
    }

}