// DONE хочу для массива указывать формат элемента, вот так:
// checkOff(req.body, {mailList: [{from: [], stamp: '', subject: '', title: ''}], folder: ''})
// TODO не проверяется что все элементы массива(если заданы) - объекты
// DONE если указано несколько объектов в массиве - значит элемент массива может быть одним из указанных типов
// every на пустом массиве дает true
// some на пустом массиве дает false но проверка length не дает его взвать на пустом массиве
export const checkOff = function(target: Object, pattern: Object): boolean{

    return Object.keys(pattern).every((key: string) => {
        const T = typeof(pattern[key]);
        // console.log('TARGET!!!', target, pattern);
        return (target.hasOwnProperty(key) &&
            (pattern[key] === null ||
                (T === typeof(target[key]) &&
                    (Array.isArray(pattern[key])
                        ? Array.isArray(target[key])
                            && (!pattern[key].length || target[key].every((entry: Object) => {return pattern[key].some((pattern: Object) => { return checkOff(entry, pattern);});}))
                        : (T === 'object'
                            ? checkOff(target[key], pattern[key])
                            : true /* не массив, не объект, типы совпадают */
                        ) 
                    )
                )
            )
        );
    });
};
