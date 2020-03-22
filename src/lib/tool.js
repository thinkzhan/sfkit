
export function getMainDomain() {
    const hostArr = location.hostname.split('.');
    if (/focus\-/.test(hostArr[hostArr.length - 2])) {
        return '.focus-test.cn';
    }
    return `.${hostArr[hostArr.length - 2]}.${hostArr[hostArr.length - 1]}`;
}

export function getUrlParams(params) {
    let urlParams = '';
    for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
            urlParams += `${key}=${params[key]}`;
            urlParams += '&';
        }
    }
    urlParams = urlParams.substring(0, urlParams.length - 1);
    return urlParams;
}

export function formatDate(val, format, type) {
    const t = new Date(val);
    const date = {
        'M+': t.getMonth() + 1,
        'd+': t.getDate(),
        'h+': t.getHours(),
        'm+': t.getMinutes(),
        's+': t.getSeconds(),
        'q+': Math.floor((t.getMonth() + 3) / 3),
        'S+': t.getMilliseconds()
    };

    if (!format) {
        format = 'yyyy-MM-dd hh:mm:ss';
    }

    if (/(y+)/i.test(format)) {
        format = format.replace(
            RegExp.$1,
            `${t.getFullYear()}`.substr(4 - RegExp.$1.length)
        );
    }

    for (const k in date) {
        if (type && k === 'h+') {
            const ohour = date[k];
            const desc = +ohour >= 12 ? '下午 ' : '上午 ';
            const nhour = ohour > 12 ? ohour - 12 : ohour;

            if (new RegExp(`(${k})`).test(format)) {
                format = format.replace(
                    RegExp.$1,
                    RegExp.$1.length == 1 ?
                        desc + nhour :
                        desc + `00${nhour}`.substr(`${date[k]}`.length)
                );
            }
        } else if (new RegExp(`(${k})`).test(format)) {
            format = format.replace(
                RegExp.$1,
                RegExp.$1.length == 1 ?
                    date[k] :
                    `00${date[k]}`.substr(`${date[k]}`.length)
            );
        }
    }

    return format;
}

export function toLogin() {
    console.log('未登录');
    if (!/(\d+\.\d+\.\d+\.\d+)/.test(location.hostname)) {
        window.location.href = `//common-ldap${getMainDomain()}/tologin?ru=${encodeURI(
            location.href
        )}`;
    } else {
        window.loading && window.loading.close && window.loading.close();
        alert('未登录！去common-ldap登录');
    }
}
