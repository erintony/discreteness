/**
 * Created by Erin on 2018/4/12.
 */
var bidirectionBinding = (function($) {
    function Input(data, field) {
        this.data = data;
        this['_' + field] = data[field];
        this.callbacks = [];
    }

    Input.prototype = {
        constructor: Input,
        register: function (key, fn) {
            this.callbacks.push({
                key: key,
                callack: fn
            });
        },
        logout: function (key) {
            var i = 0, item;
            for (i = 0; i < this.callbacks.length; i++) {
                item = this.callbacks[i];
                if(item.key == key){
                    this.callbacks.splice(i, 1);
                    return;
                }
            }
        },
        doAction: function(value) {
            for(item in this.callbacks) {
                this.callbacks[item].callback(calue);
            }
        },
        bindData: function (field) {
            Object.defineProperty(this, field, {
                configurable: true,
                get: function () {
                    return this['_' + field];
                },
                set: function (v) {
                    if(v !== this['_' + field]) {
                        this['_' + field] = v;
                        this.doAction(v);
                    }
                }
            });
        }

    }

    return function (data, field) {
        var boundData = new Input(data, field);
        boundData.bindData(field);
        return boundData;
    }
})(jQuery);

(function($) {
    console.log('eees');
})(jQuery);