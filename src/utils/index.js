var throttle = function(fn, delay) {
    var now, lastExec, timer, context, args;

    var execute = function() {
        fn.apply(context, args);
        lastExec = now;
    };

    return function() {
        context = this;
        args = arguments;
        now = Date.now();
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(() => {
            execute();
        }, delay);
    };
};

export default {
    throttle
}
