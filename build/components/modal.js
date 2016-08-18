var i, len, modal, modals, options;

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
