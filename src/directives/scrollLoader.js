
var throttle = function (fn, delay) {
  var now, lastExec, timer, context, args;

  var execute = function () {
    fn.apply(context, args);
    lastExec = now;
  };

  return function () {
    context = this;
    args = arguments;

    now = Date.now();

    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    if (lastExec) {
      var diff = delay - (now - lastExec);
      if (diff < 0) {
        execute();
      } else {
        timer = setTimeout(() => {
          execute();
        }, diff);
      }
    } else {
      execute();
    }
  };
};
var bindScroll = function() {
	var ctx = this;
	ctx.vm.scrollListener = throttle(check.bind(ctx),200)
	window.addEventListener('scroll', ctx.vm.scrollListener)
}

var check = function() {
	var ctx = this;
	var el = ctx.el;
	if (ctx.vm.isLoading||ctx.vm.isScrollNoMore) {
		return
	}
	var viewportScrollTop = getScrollTop(window);
	var viewportBottom = viewportScrollTop + getVisibleHeight(window);
	var elementBottom = getElementTop(el) - getElementTop(window) + el.offsetHeight + viewportScrollTop;
    var shouldTrigger = viewportBottom + 10 >= elementBottom;
	if (shouldTrigger) {
		ctx.vm.isScrollLoading = true;
		ctx.doLoad();
	}
}


var getVisibleHeight = function(element) {
	if (element === window) {
		return document.documentElement.clientHeight;
	}
	return element.clientHeight;
};
var getScrollTop = function(element) {
	if (element === window) {
		return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
	}

	return element.scrollTop;
}
var getElementTop = function(element) {
	if (element === window) {
		return getScrollTop(window);
	}
	return element.getBoundingClientRect().top + getScrollTop(window);
};

export default {
	bind(el, binding, vnode) {
			var ctx = {
				el: el,
				vm: vnode.context,
				doLoad: binding.value
			}
			ctx.vm.$on('hook:mounted', function() {
				bindScroll.call(ctx);
			});
		},
		unbind(el, binding, vnode) {
			if (vnode.context.scrollListener)
				window.removeEventListener('scroll', vnode.context.scrollListener);
		}
}