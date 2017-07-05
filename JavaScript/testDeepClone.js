(function () {

    function deepClone(obj) {
        if (!Array.isArray(obj) && typeof obj !== 'object') {
            return obj;
        }

        if (Array.isArray(obj)) {
            let newArray = obj.slice();

            obj.forEach(function (element, index) {
                newArray[index] = deepClone(element);
            });

            return newArray;
        }

        let newObj = Object.create(obj);

        for (let key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                newObj[key] = deepClone(obj[key]);
            }
        }

        return newObj;
    }

    // ===================================================================

    let newObj = {
        q: 5
    };

    let newNewObj = {
        m: [2, 'qwerty', {
            z: ['ab', 3]
        }],
        n: newObj
    };

    let randomObj = {
        a: 5,
        b: 'Hello',
        c: [2, 'qwerty', {
            z: ['ab', 3]
        }, newObj],
        d: newNewObj
    };

    let copyObj = deepClone(randomObj);

    // copyObj.d.n.q = 7;

    // console.log(randomObj.d);
    // console.log(copyObj.d);

    // copyObj.d.m[2].z[1] = 7;

    // console.log(randomObj.d.m);
    // console.log(copyObj.d.m);

    console.log(randomObj === copyObj);
}());