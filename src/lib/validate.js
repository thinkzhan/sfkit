export default {
    isUrl(str) {
        return /^(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$/i.test(
          str
        )
    },
    isEmpty(txt) {
        if (txt === '' || txt === undefined || txt === null) {
            return true;
        } else {
            return false;
        }
    },
    isIdentity(type, value) {
        var paperReg = "";
        switch (type) {
            case 0:
                //身份证
                paperReg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
                break;
            case 1:
                //护照
                paperReg = /^(P\d{7})$|^(G\d{8})$/;
                break;
            case 2:
                //港澳通行证
                paperReg = /^[a-zA-Z0-9]{5,21}$/;
                break;
            case 3:
                //军官证
                paperReg = /^[a-zA-Z0-9\u4E00-\u9FA5]{7,21}$/;
                break;
            default:
                //nothing
        }

        return paperReg.test(value);
    },
    verifyPhone(value) {
        var reg = /^1[34578]\d{9}$/;
        if (reg.test(value)) {
            return true;
        } else {
            return false;
        }
    },
    isAreaCode(value) {
        var reg = /^\d{3,4}$/;
        if (reg.test(value)) {
            return true;
        } else {
            return false;
        }
    },
    isTel(value) {
        var reg = /^\d{7,8}$/;
        if (reg.test(value)) {
            return true;
        } else {
            return false;
        }
    },

    isMobileAndTel(value) {
        const reg = /^(1)\d{10}$|^((0\d{2}-?\d{8})|(0\d{3}-?\d{7,8}))(\s?[转\-\s]\s?\d{1,4})?$|^((400[\-\s]?\d{3}[\-\s]?\d{4})|(027[0-9]{8}))(\s?[转\-\s]\s?\d{4,6})?$/;
        return reg.test(value);
    },

    verifyOrganizationCode(value) {
        // 校验营业执照注册号 15 18位
        var reg = /^[0-9a-zA-Z]{15}$|^[0-9a-zA-Z]{18}$/;

        return reg.test(value);
    },
    isIntroductionValid(value) {
        var reg = /^[\u4e00-\u9fa5\uFE30-\uFFA0\dA-Za-z\u3002\uff1f\uff01\uff0c\u3001\uff1b\uff1a\u201c\u201d\u2018\u2019\uff08\uff09\u0028\u0029\r\n]+$/;

        return reg.test(value);
    },
    verifyAccountName(value) {
        var reg = /^[\u4e00-\u9fa5\dA-Za-z\uff08\uff09\u0028\u0029]{1,30}$/;
        return reg.test(value);
    },
    validateFullLengthRange(rule, value, callback) {
        if (getFullLength(value) < rule.min || getFullLength(value) > rule.max) {
            callback(new Error(`长度需要在${rule.min}~${rule.max}之间`))
        }
        callback()
    },
    stringVal: { 
        isEmpty: function(val) {
            return !val || !val.trim();
        },
        max: function(val, max) {
            return val.length > max;
        },
        min: function(val, min) {
            return val.length < min;
        }
    },
    numVal: {
        isNum: function(val) {
            return !isNaN(val);
        },
        isEmpty: function(val) {
            return !val;
        },
        max: function(val, max, type) {
            if (!this.isNum(val)) return true;
            val = type === 'int' ? parseInt(val, 10) : parseFloat(val, 10);
            return val > max;
        },
        min: function(val, min, type) {
            if (!this.isNum(val)) return true;
            val = type === 'int' ? parseInt(val, 10) : parseFloat(val, 10);
            return val < min;
        },
        isPositive(val) {
            return /^\d+$/.test(val);
        },
        isPositiveNotZero(val) {
            return /^[1-9][0-9]*$/.test(val);
        },
        isPositiveDecimal(val) {
            return /^[1-9][0-9]*(\.\d{1,2})?$|^[0]\.[0][1-9]$|^[0]\.[1-9][0-9]{0,1}$/.test(val);
        }
    },
    arrayVal: {
        isEmpty: function(val) {
            return !val || !val.length;
        },
        max: function(val, max) {
            if (this.isEmpty(val) || val.length <= max) return false;
            return true;
        }
    }
};

function getFullLength(str) {
    str = String(str)
    if (str.trim() === '') return 0
    return str.split('').reduce((sum, current) => {
      return sum + ((current.charCodeAt(0) > 255 || current.charCodeAt(0) === 215) ? 1 : 0.5)
    }, 0)
}
