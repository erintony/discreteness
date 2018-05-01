/**
 * Created by Erin on 2018/5/1.
 * 使用Promise的异步处理方式，实现
 * 隔1s打印1，打印1后隔2秒打印2，
 * ....... 隔n秒打印n
 */
(function($) {
    function anim(step = 10) {
        var promise = promiseGenerator(1);
        for(let i = 1; i < step; i++){
            promise = promise.then(function(value) {
                return promiseGenerator(value + 1);
            });
        }
    }

    function promiseGenerator(step) {
        return new Promise(function (resolve, reject) {
            setTimeout(function() {
                console.log('隔' + step*100 + '打印' + step);
                resolve(step);
            }, step*100);
        });
    }

    anim();

})(jQuery);