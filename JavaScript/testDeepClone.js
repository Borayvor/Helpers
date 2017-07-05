(function () {

    function deepClone(obj) {
        if (!Array.isArray(obj) && typeof obj !== 'object') {
            return obj;
        }

        if (obj instanceof Date) {
            return new Date(obj);
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

    // ============================================================================================
    // ============================================================================================

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
            'x': new Date(),
            z: ['ab', 3]
        }, newObj],
        d: newNewObj,
        e: new function () {
            this.name = 'Object test';
        }
    };

    let copyObj = deepClone(randomObj);

    // copyObj.d.n.q = 7;

    console.log(randomObj.c[2].x);
    console.log(copyObj.c[2].x);

    // copyObj.d.m[2].z[1] = 7;

    // console.log(randomObj.d.m);
    // console.log(copyObj.d.m);

    console.log(randomObj === copyObj);

    // =========================================================================

    class Product {
        constructor(manufacturer, model, price) {
            this.manufacturer = manufacturer;
            this.model = model;
            this.price = price;
        }

        get manufacturer() {
            return this._manufacturer;
        }

        set manufacturer(value) {
            this._manufacturer = value;
        }

        get model() {
            return this._model;
        }

        set model(value) {
            this._model = value;
        }

        get price() {
            return this._price;
        }

        set price(value) {
            this._price = value;
        }

        getLabel() {
            let product = this.constructor.name;
            const label = product + ' - ' + this.manufacturer + ' ' + this.model + ' - **' + this.price + '**';

            return label;
        }
    }

    let p = new Product('manufacturer', 'model', 10);

    let p1 = deepClone(p);

    console.log('===================================================================');
    console.log(p === p1);
    console.log(p);
    console.log(p1);

 console.log('---------------------------------');    
    p1.manufacturer = 'none';

    console.log(p);
    console.log(p1);
}());