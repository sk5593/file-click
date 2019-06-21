export const getQueryString = name => { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); 
    return ''; 
};

export const serialize = data => {
    let list = [];
    Object.keys(data).forEach(ele => {
        list.push(`${ele}=${data[ele]}`)
    })
    return list.join('&');
};
/**
 * 判断是否为空
 */
export const validatenull = val => {
    if (typeof val == 'boolean') {
        return false;
    }
    if (typeof val == 'number') {
        return false;
    }
    if (val instanceof Array) {
        if (val.length == 0) return true;
    } else if (val instanceof Object) {
        if (JSON.stringify(val) === '{}') return true;
    } else {
        if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true;
        return false;
    }
    return false;
};

/**
 * 判断手机号码是否正确
 */
export function isvalidatemobile(phone) {
    let list = [];
    let result = true;
    let msg = '';
    let isPhone = /^1[3456789]\d{9}$/;
    //增加134 减少|1349[0-9]{7}，增加181,增加145，增加17[678]  
    if (!validatenull(phone)) {
        if (phone.length == 11) {
            if (isPhone.test(phone)) {
                result = false;
            } else {
                msg = '手机号码格式不正确';
            }
        } else {
            msg = '手机号码长度不为11位';
        }
    } else {
        msg = '手机号码不能为空';
    }
    list.push(result);
    list.push(msg);
    return list;
}


/**
 * 判断手机号码是否正确
 */
export function isvalidatetel(phone) {
    let list = [];
    let result = true;
    let msg = '';
    let isPhone = /^(0\d{2,3}-?)?\d{7,8}$/;
    if (!validatenull(phone)) {
        if (isPhone.test(phone)) {
            result = false;
        } else {
            msg = '电话号码格式不正确';
        }
    } else {
        msg = '电话号码不能为空';
    }
    list.push(result);
    list.push(msg);
    return list;
}

export function isEmail(s) {
    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}