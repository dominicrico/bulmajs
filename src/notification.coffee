BULMA.notification = (el, status, options) ->
  if options.deletable is undefined or options.deletable isnt false
    deleteBtn = el.querySelector('.delete')

    deleteNotification = (e) ->
      #Prevent default behaviour
      e.preventDefault()
      e.stopPropagation()
      el.parentNode.removeChild(el)
      return

  #Toggle the notification by given status
  if status is 'show'
    BULMA.removeClass el, 'is-hidden'
    BULMA.click deleteBtn, deleteNotification
  else if status is 'hide'
    BULMA.addClass el, 'is-hidden'
  else if status is 'toggle'
    if BULMA.isVisible(el)
      BULMA.notification(el, 'hide', options)
    else
      BULMA.notification(el, 'show', options)

    return
  return

unless BULMA.isReady

  #Get all bulma menus of the current page
  notifications = BULMA.getElements('notification')

  if notifications and notifications.length > 0
    for notification in notifications

      options = BULMA.parseOptions(notification)
      BULMA.notification(notification, 'hide', options)
