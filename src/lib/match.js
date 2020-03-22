/**
 *
 * @desc 提供非常简单的转化：输入源对象和映射规则，输出映射后的对象
 * @param {Object | Array} src 源对象
 * @param {Object} rules  映射规则
 * @param {Boolean} nomore  额外配置
 * @example
             ```
       const data = {
          projectID: 1,
        name: '小明',
        table: [
          {value: 'a'},
          {value: 'b'}
        ],
        info: 'test'
       }
       const res = match(data, {
         'pid': '{{projectID}}', // 字段映射
         'name': '...', // 普通值
         'isXiaoming': function($scope) { // 自定义函数
           return $scope.name === '小明';
          },
          'isXiaohong': '{{name}} == "小红"', // 简单表达式
         'list': match(data.table, { // 数组中每个item字段映射
           '_ids': [1, 2, 3], // data.table无，新增
           'val': '{{value}}'
         }),
         'arr': match(data.table, ['value']) // 取字段组成新数组['a', 'b']
       }, {fill: true, filter:[null, '']}); // 自动填充所有值，过滤为null和‘’的值
             ```
 * @author thinkzhan
 * @recentUpdate 2018-07-13
 */
function match(
    src = {},
    rules,
    config = { fill: false, filter: [] }
) {
    let out = [];
    if (!_validConfig(config)) {
        return;
    }

    if (_isArr(rules)) {
    // match(data, ['id'])
        if (!_isArr(src)) {
            src = [src];
        }
        src.forEach(skey => {
            if (config.filter.indexOf(skey[rules[0]]) < 0) {
                out.push(skey[rules[0]]);
            }
        });
        return out;
    }

    if (_isArr(src)) {
    // match(data, {pid: '{{id}}'})
        src.forEach(function(s, index) {
            out.push(_map(s, rules, config, index));
        });
    } else {
        out = {};
        out = _map(src, rules, config);
    }
    return out;
}

function _map(src, rules, config, _index) {
    const out = config.fill ? Object.assign({}, src) : {};
    // 如需过滤，先过滤原对象
    if (config.filter) {
        for (const skey in src) {
            if (config.filter.indexOf(src[skey]) >= 0) {
                delete out[skey];
            }
        }
    }
    // 根据规则转化
    for (const rkey in rules) {
        const rule = rules[rkey];

        try {
            if (_isFunc(rule)) {
                out[rkey] = rule.call({}, src, _index); // 注入参数$scope为当前对象
            } else if (_isTpl(rule)) {
                const exp = rule.replace(/\{\{/g, 'src.').replace(/\}\}/g, '');
                out[rkey] = eval('' + exp + ''); // eval！！简单表达式
                // if (src[rule.replace(/\{\{/g, '').replace(/\}\}/g, '')] === '') { // 处理aval('')不为''的情况
                //     out[rkey] = '';
                // }
            } else if (_isObj(rule)) {
                out[rkey] = _map({}, rule, config); // 对象递归转换
            } else {
                out[rkey] = rule; // 默认不转换
            }
            // if (!out[rkey] && out[rkey]!= 0) {
            //     out[rkey] = '-'
            // }
            // // 便于后续区分填0和没填
            // if (out[rkey] === 0) {
            //     out[rkey] = '0';
            // }

            // 如需过滤，转化完后再过滤
            if (config.filter && config.filter.indexOf(out[rkey]) >= 0) {
                delete out[rkey];
            }
        } catch (e) {
            console.error(e);
            // 这种异常开发阶段规避不了，所以需要确保异常数据OK
            if (config.filter.indexOf(null) >= 0) {
                delete out[rkey];
            } else {
                out[rkey] = null;
            }
        }
    }
    return out;
}

function _validConfig(config) {
    if (!_isObj(config)) {
        throw new Error(
            '第三个参数-配置必须为object类型, {fill: false, filter:[null]}'
        );
    }
    if (config.filter && !_isArr(config.filter)) {
        throw new Error(
            '第三个参数-配置filter项必须为Array类型, {fill: false, filter:[null]}'
        );
    }
    return true;
}

function _isTpl(object) {
    return typeof object === 'string' && /\{\{([^\}]+)\}}/.test(object);
}

function _isObj(object) {
    return object && typeof object === 'object' && Object == object.constructor;
}

function _isArr(object) {
    return object && typeof object === 'object' && Array == object.constructor;
}

function _isFunc(object) {
    return (
        object && typeof object === 'function' && Function == object.constructor
    );
}

export default match;
