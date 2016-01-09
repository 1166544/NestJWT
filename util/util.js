module.exports = {
    
    /* �̳и��� */
    extend: function(target, source, flag) {
        for(var key in source) {
            if(source.hasOwnProperty(key))
                flag ?
                    (target[key] = source[key]) :
                    (target[key] === void 0 && (target[key] = source[key]));
        }
        return target;
    },

    /* ��ǰ̨����JSON������װ */
    jsonWrite:function (res, ret) {
        if (typeof ret === undefined) {
            res.json(code.OPERATE_FAIL);
        } else {
            res.json(ret);
        }
    }

}