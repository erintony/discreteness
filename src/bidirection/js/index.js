/**
 * Created by Erin on 2018/4/12.
 * 双向绑定方法
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
                callback: fn
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
        doAction: function (value) {
            for(item in this.callbacks) {
                this.callbacks[item].callback(value);
            }
        },

        //通过defineProperty实现数据绑定
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
    //用于实现双向绑定的数据
    var data = {
        value: 0,
        name: 'input'
    };

    //注册回掉函数
    var binding = bidirectionBinding(data, "value");
    binding.register('exampleInputEmail1', function(value) {
        $('#exampleInputEmail1').val(value);
    });
    binding.register('exampleInputPassword1', function(value) {
        $('#exampleInputPassword1').val(value);
    });

    //页面事件触发数据改变
    $('#exampleInputEmail1').keyup(function() {
        binding.value = $(this).val();
    });
    $('#exampleInputPassword1').keyup(function() {
        binding.value = $(this).val();
    });

})(jQuery);