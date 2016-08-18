var i, len, notification, notifications, options;

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
