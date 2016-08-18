/**
* bulmajs - version 0.0.1 - 18-08-2016
* JavaScript Library for the Bulma CSS Framework.
* © 2016 Dominic Rico Gómez <hello@coderocket.me> 
*/

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
;var i, j, len, len1, list, lists, menu, menuElems, options, subMenu;

BULMA.toggleMenu = function(el, options) {
  BULMA.collapseMenu(el, 'hide');
  BULMA.click(el, function(e) {
    var active, actives, i, len;
    e.preventDefault();
    e.stopPropagation();
    if (options.single) {
      actives = menu.querySelectorAll('.is-active');
      for (i = 0, len = actives.length; i < len; i++) {
        active = actives[i];
        if (active !== e.target) {
          BULMA.removeClass(active, 'is-active');
          if (active.nextElementSibling.nodeName === 'UL') {
            BULMA.hide(active.nextElementSibling);
          }
        }
      }
    }
    BULMA.collapseMenu(e.target, 'toggle');
  });
};

BULMA.collapseMenu = function(el, status) {
  var smenu;
  smenu = el.nextElementSibling;
  if (status === 'show') {
    BULMA.show(smenu);
    if (BULMA.isVisible(smenu)) {
      return BULMA.addClass(el, 'is-active');
    }
  } else if (status === 'hide') {
    BULMA.hide(smenu);
    if (!BULMA.isVisible(smenu)) {
      return BULMA.removeClass(el, 'is-active');
    }
  } else if (status === 'toggle') {
    BULMA.toggle(smenu);
    if (BULMA.isVisible(smenu)) {
      return BULMA.addClass(el, 'is-active');
    } else {
      return BULMA.removeClass(el, 'is-active');
    }
  }
};

if (!BULMA.isReady) {
  menuElems = BULMA.getElements('menu');
  if (menuElems && menuElems.length > 0) {
    for (i = 0, len = menuElems.length; i < len; i++) {
      menu = menuElems[i];
      options = BULMA.parseOptions(menu);
      lists = menu.querySelectorAll('.menu-list');
      for (j = 0, len1 = lists.length; j < len1; j++) {
        list = lists[j];
        subMenu = list.querySelector('ul');
        if (subMenu) {
          BULMA.toggleMenu(subMenu.previousElementSibling, options);
        }
      }
    }
  }
}
;var i, len, modal, modals, options;

BULMA.toggleModal = function(el, options) {
  if (!options.target) {
    throw new Error('Found [BULMA-MODAL] but there is no target defined!');
  }
  el.addEventListener('click', function(e) {
    var backdrop, closeBtn, closeModal, modal;
    e.preventDefault();
    e.stopPropagation();
    modal = document.getElementById(options.target);
    backdrop = modal.querySelector('.modal-background');
    closeBtn = modal.querySelector('.modal-close');
    closeModal = function() {
      if (BULMA.hasClass(modal, 'is-active')) {
        BULMA.removeClass(modal, 'is-active');
        return BULMA.unclick(this, closeModal);
      }
    };
    if (options.closeByBackdrop === void 0 || options.closeByBackdrop) {
      BULMA.click(backdrop, closeModal);
    }
    if (options.closeByButton === void 0 || options.closeByButton) {
      BULMA.click(closeBtn, closeModal);
    }
    BULMA.addClass(modal, 'is-active');
  });
};

if (!BULMA.isReady) {
  modals = BULMA.getElements('modal');
  if (modals && modals.length > 0) {
    for (i = 0, len = modals.length; i < len; i++) {
      modal = modals[i];
      options = BULMA.parseOptions(modal);
      BULMA.toggleModal(modal, options);
    }
  }
}
;var i, len, notification, notifications, options;

BULMA.notification = function(el, status, options) {
  var deleteBtn, deleteNotification;
  if (options.deletable === void 0 || options.deletable !== false) {
    deleteBtn = el.querySelector('.delete');
    deleteNotification = function(e) {
      e.preventDefault();
      e.stopPropagation();
      el.parentNode.removeChild(el);
    };
  }
  if (status === 'show') {
    BULMA.removeClass(el, 'is-hidden');
    BULMA.click(deleteBtn, deleteNotification);
  } else if (status === 'hide') {
    BULMA.addClass(el, 'is-hidden');
  } else if (status === 'toggle') {
    if (BULMA.isVisible(el)) {
      BULMA.notification(el, 'hide', options);
    } else {
      BULMA.notification(el, 'show', options);
    }
    return;
  }
};

if (!BULMA.isReady) {
  notifications = BULMA.getElements('notification');
  if (notifications && notifications.length > 0) {
    for (i = 0, len = notifications.length; i < len; i++) {
      notification = notifications[i];
      options = BULMA.parseOptions(notification);
      BULMA.notification(notification, 'hide', options);
    }
  }
}
;var i, j, len, len1, tab, tabs, target, targets;

BULMA.toggleTab = function(el) {
  var i, l, len, links;
  links = el.target.parentNode.parentNode;
  links = links.querySelectorAll('li');
  for (i = 0, len = links.length; i < len; i++) {
    l = links[i];
    BULMA.removeClass(l, 'is-active');
    BULMA.hide(document.querySelector(l.firstChild.getAttribute('data-tab')));
  }
  BULMA.addClass(el.target.parentNode, 'is-active');
  BULMA.show(document.querySelector(el.target.getAttribute('data-tab')));
};

if (!BULMA.isReady) {
  tabs = BULMA.getElements('tabs');
  if (tabs && tabs.length > 0) {
    for (i = 0, len = tabs.length; i < len; i++) {
      tab = tabs[i];
      targets = tab.querySelectorAll('[data-tab]');
      for (j = 0, len1 = targets.length; j < len1; j++) {
        target = targets[j];
        tab = document.querySelector(target.getAttribute('data-tab'));
        if (BULMA.hasClass(target.parentNode, 'is-active') === false) {
          BULMA.hide(tab);
        }
        BULMA.click(target, BULMA.toggleTab);
      }
    }
  }
}
