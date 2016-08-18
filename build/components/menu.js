var i, j, len, len1, list, lists, menu, menuElems, options, subMenu;

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
