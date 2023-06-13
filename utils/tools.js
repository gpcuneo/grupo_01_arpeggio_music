const keysToString = (obj) => {
    const arrKeys = Object.keys(obj);
    return arrKeys.toString();
}

const valuesToString = (obj) => {
    const arrValues = Object.values(obj);
    return arrValues.toString();
}

const tools = {
    keysToString: keysToString,
    valuesToString: valuesToString,
}

module.exports = tools;