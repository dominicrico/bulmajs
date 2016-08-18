BULMA.toggleModal = (el, options) ->
  if !options.target
    #Throw error if no target is passed
    throw new Error 'Found [BULMA-MODAL] but there is no target defined!'

  el.addEventListener 'click', (e) ->
    #Prevent default behaviour
    e.preventDefault()
    e.stopPropagation()

    #Find the modal to toggle
    modal = document.getElementById(options.target)

    #Find the elements to close the modal
    backdrop = modal.querySelector('.modal-background')
    closeBtn = modal.querySelector('.modal-close')

    #Modal close event
    closeModal = () ->
      if BULMA.hasClass(modal, 'is-active')
        BULMA.removeClass(modal, 'is-active')

        #Detach the close event listeners to prevent multiple calls
        BULMA.unclick this, closeModal

    #Attach the close events
    if options.closeByBackdrop is undefined or options.closeByBackdrop
      BULMA.click backdrop, closeModal

    if options.closeByButton is undefined or options.closeByButton
      BULMA.click closeBtn, closeModal

    #Open the modal by adding the 'is-active' class
    BULMA.addClass modal, 'is-active'

    return
  return

unless BULMA.isReady

  #Get all bulma menus of the current page
  modals = BULMA.getElements('modal')

  if modals and modals.length > 0
    for modal in modals

      options = BULMA.parseOptions(modal)
      BULMA.toggleModal(modal, options)
