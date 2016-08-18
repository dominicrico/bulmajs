var BULMA;

if (typeof BULMA !== "object") {
  BULMA = {};
}

(function() {
  var hashCode;
  BULMA.hide = function(el) {
    var display;
    display = BULMA.isVisible(el);
    if (display) {
      el.style.display = 'none';
    }
  };
  BULMA.show = function(el) {
    var display;
    display = BULMA.isVisible(el);
    if (!display) {
      el.style.display = 'block';
    }
  };
  BULMA.toggle = function(el) {
    var display;
    display = BULMA.isVisible(el);
    if (!display) {
      el.style.display = 'block';
    } else {
      el.style.display = 'none';
    }
  };
  BULMA.getElements = function(name) {
    return document.querySelectorAll('[data-bulma="' + name + '"]');
  };
  BULMA.isVisible = function(el) {
    var display;
    if (window.getComputedStyle) {
      display = getComputedStyle(el, null).display;
    } else {
      display = el.currentStyle.display;
    }
    return display !== 'none';
  };
  BULMA.hasClass = function(el, className) {
    if (el.classList) {
      return el.classList.contains(className);
    } else {
      return new RegExp('\\b' + className + '\\b').test(el.className);
    }
  };
  BULMA.addClass = function(el, className) {
    if (el.classList) {
      return el.classList.add(className);
    } else if (!BULMA.hasClass(el, className)) {
      return el.className += ' ' + className;
    }
  };
  BULMA.removeClass = function(el, className) {
    if (el.classList) {
      return el.classList.remove(className);
    } else {
      return el.className = el.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
    }
  };
  BULMA.parseOptions = function(el) {
    var j, len, option, options, opts;
    opts = {};
    options = el.getAttribute('data-options');
    options = (options || '').replace(/\s/g, '').split(';');
    for (j = 0, len = options.length; j < len; j++) {
      option = options[j];
      if (option) {
        option = option.split(':');
        opts[option[0]] = option[1];
      }
    }
    return opts;
  };
  BULMA.click = function(el, handler) {
    if (!el.eventListener) {
      el.eventListener = true;
      return el.addEventListener('click', handler);
    }
  };
  BULMA.unclick = function(el, handler) {
    if (el.eventListener) {
      el.eventListener = false;
      return el.removeEventListener('click', handler);
    }
  };
  if (document.readyState !== 'loading') {
    BULMA.isReady = true;
    return;
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', function() {
      BULMA.isReady = true;
    });
  } else {
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState === 'complete') {
        BULMA.isReady = true;
      }
    });
  }
  return hashCode = function(str) {
    var hash, i, j, len, s;
    hash = 0;
    for (i = j = 0, len = str.length; j < len; i = ++j) {
      s = str[i];
      hash = ~~(((hash << 5) - hash) + str.charCodeAt(i));
    }
    return hash;
  };
})();
