export function validateNumber(testVal) {
    var numRegx = /^[1-9]*$/
    return numRegx.test(testVal)
}