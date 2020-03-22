export function getMainDomain() {
    const hostArr = location.hostname.split('.');
    if (/focus\-/.test(hostArr[hostArr.length - 2])) {
        return '.focus-test.cn';
    }
    return `.${hostArr[hostArr.length - 2]}.${hostArr[hostArr.length - 1]}`;
}
