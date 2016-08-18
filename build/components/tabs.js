var i, j, len, len1, tab, tabs, target, targets;

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
