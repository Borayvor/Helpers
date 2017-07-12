(function () {

    function deepCloneOld(obj) {
        if (!Array.isArray(obj) && typeof obj !== 'object') {
            return obj;
        }

        if (obj instanceof Date) {
            return new Date(obj);
        }

        if (Array.isArray(obj)) {
            let newArray = [];

            obj.forEach(function (element, index) {
                newArray[index] = deepCloneOld(element);
            });

            return newArray;
        }

        let newObj = Object.create(obj);

        for (let key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                newObj[key] = deepCloneOld(obj[key]);
            }
        }

        return newObj;
    }

    // -------------------------------------------------------------------------------------------

    function deepClone(value, cloned = new Map) {
        const isObject = Object.prototype.toString.call(value) === '[object Object]';
        const isArray = Array.isArray(value);

        if (!isArray && !isObject) {
            return value;
        }

        const previouslyClone = cloned.get(value);

        if (previouslyClone) {
            return previouslyClone;
        }

        const clonedObject = isObject ? Object.create(value) : [];

        // nobody likes stackoverflow exceptions and buggy references
        cloned.set(value, clonedObject);

        for (const key in value) {
            if (value.hasOwnProperty(key)) {
                clonedObject[key] = deepClone(value[key], cloned);
            }
        }

        return clonedObject;
    }

    // ============================================================================================
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

    copyObj.d.n.q = 7;

    console.log(randomObj.c[2].x);
    console.log(copyObj.c[2].x);

    copyObj.d.m[2].z[1] = 7;

    console.log(randomObj.d.m);
    console.log(copyObj.d.m);

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

    console.log('===================================================================');
    const circ = {};
    circ.circ = circ;
    console.log(deepClone(circ));

    const circArr = [];
    circArr.push(circArr);
    console.log(deepClone(circArr));

    circ.arr = circArr;
    circArr.push(circ);
    console.log(deepClone(circArr));

    console.log('===================================================================');
    const messyStuff = [1, 2, 3];

    const person = {
        messyStuff,
        name: 'zdr',
        birthDate: new Date('11/11/1993'),
        toString() {
            return `${this.name} is born on ${this.birthDate}`;
        }
    };

    person.self = person;
    messyStuff.push([person]);

    const p2 = deepClone(person);
    console.log(p2);
    console.log(p2.birthDate);
    console.log(p2.birthDate.getDate());
    console.log(p2 === p2.self);
    console.log(p2.self === p2.messyStuff[3][0]);

    const arr2 = [1, 2, 3];
    arr2.push(arr2);

    const cl2 = deepClone(arr2);
    console.log(cl2);
    console.log(cl2 === cl2[3]);

    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }

        toString() {
            const {
                x,
                y
            } = this;
            return `(${x}, ${y})`;
        }
    }

    const point = deepClone(new Point(3, 4));
    console.log(point);
    console.log(point.toString());
}());