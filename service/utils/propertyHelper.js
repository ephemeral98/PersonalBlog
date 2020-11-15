exports.pick = (obj, ...props) => {
    if(!obj || typeof(obj) !== 'object') { // 如果这不是个对象，或者啥值也没有
        return obj;
    }

    // 否则如果是正常有值的对象
    const newObj = {};
    for (const key in obj) {
        if(props.includes(key)) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
