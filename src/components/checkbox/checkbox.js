export default {
    props: {
        keyString: {
            type: String,
            default: 'id'
        },
        valueString: {
            type: String,
            default: 'name'
        },
        value: {
        },
        options: {
            type: Array,
            default: []
        },
        maxSelect: {
            type: String,
            default: "1"
        }
    },
    data: function() {
        return {
            optionsNew: []
        };
    },
    methods: {
        initCheckbox: function(selectId) {
            var _this = this;
            this.optionsNew.forEach(function(ele) {
                if (selectId == ele[_this.keyString]) {
                    ele.check = true;
                } else {
                    if (parseInt(_this.maxSelect) === 1) {
                        ele.check = false;
                    }
                }
            });
        },
        selectItem: function(selectId) {
            var _this = this;
            this.optionsNew.forEach(function(ele) {
                if (selectId == ele[_this.keyString]) {
                    ele.check = !ele.check;
                    if (ele.check) {
                        if (parseInt(_this.maxSelect) > 1) {
                            if (_this.value.indexOf(selectId) <= -1) {
                                _this.value.push(selectId);
                                _this.$emit("change", ele);
                                if (_this.value.length > parseInt(_this.maxSelect)) {
                                    _this.updateSelect();
                                }
                            }
                        } else {
                            _this.$emit("input", selectId);
                            _this.$emit("change", selectId);
                        }
                    } else {
                        if (parseInt(_this.maxSelect) > 1) {
                            _this.valuePop(selectId);
                        } else {
                            _this.$emit("input", "");
                            _this.$emit("change", "");
                        }
                    }
                } else {
                    if (parseInt(_this.maxSelect) === 1) {
                        ele.check = false;
                    }
                }
            });
        },
        valuePop: function(id) {
            var len = this.value.length;
            for(var i = 0; i < len; i++) {
                if(this.value[i] == id) {
                    this.value.splice(i, 1);
                    break;
                }
            }
        },
        updateSelect: function() {
            var deleteValue = this.value[0], _this = this;
            var currentValue = JSON.parse(JSON.stringify(this.value));
            this.optionsNew.forEach(function(ele) {
                if (deleteValue == ele[_this.keyString]) {
                    ele.check = false;
                    currentValue.shift();
                }
            });
            _this.$emit("input", currentValue);
            _this.$emit("change", currentValue);
        },
        init: function() {
            var _this = this;
            this.options.forEach(function(item) {
                item.check = false;
            });
            _this.optionsNew = JSON.parse(JSON.stringify(_this.options));
            if (typeof this.value === "string" || typeof this.value == "number") {
                this.initCheckbox(this.value);
            } else {
                if (this.value.length > parseInt(this.maxSelect)) {
                    console.log("数据格式错误");
                    return;
                } else {
                    this.value.forEach(function(item) {
                        _this.initCheckbox(item);
                    });
                }
            }
        }
    },
    watch: {
        options:{
            handler: function(curVal,oldVal) {
                this.init();
            },
            deep:true
        },
        value: function() {
            this.init();
        }
    },
    beforeMount: function() {
        this.init();
    }
};