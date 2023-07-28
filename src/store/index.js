const data = [];
let operation = "sale";

const getOperation = () => {
    return operation;
}

const setOperation = (newval) => {
    operation = newval;
}

const getData = () => {
    return data;
}

const setData = (object) => {
    data.push(object);
}

export {
    getData,
    setData,
    getOperation,
    setOperation,
}