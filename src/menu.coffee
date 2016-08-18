BULMA.toggleMenu = (el, options) ->
  BULMA.collapseMenu(el, 'hide')
  BULMA.click el, (e) ->
    #Prevent default behaviour
    e.preventDefault()
    e.stopPropagation()

    if options.single
      #Hide all other active menu items
      actives = menu.querySelectorAll('.is-active')
      for active in actives
        if active isnt e.target
          BULMA.removeClass(active, 'is-active')
          if active.nextElementSibling.nodeName is 'UL'
            BULMA.hide(active.nextElementSibling)

    #Toggle the active class and sub menu of the clicked element
    BULMA.collapseMenu(e.target, 'toggle')

    return
  return

BULMA.collapseMenu = (el, status) ->
  smenu = el.nextElementSibling

  if status is 'show'
    BULMA.show smenu

    if BULMA.isVisible smenu
      BULMA.addClass(el, 'is-active')
  else if status is 'hide'
    BULMA.hide smenu

    if !BULMA.isVisible smenu
      BULMA.removeClass(el, 'is-active')
  else if status is 'toggle'
    BULMA.toggle smenu

    if BULMA.isVisible smenu
      BULMA.addClass(el, 'is-active')
    else
      BULMA.removeClass(el, 'is-active')


unless BULMA.isReady

  #Get all bulma menus of the current page
  menuElems = BULMA.getElements('menu')

  if menuElems and menuElems.length > 0
    for menu in menuElems

      options = BULMA.parseOptions(menu)
      lists = menu.querySelectorAll('.menu-list')

      for list in lists
        #Find entries with a sub menu
        subMenu = list.querySelector('ul')

        if subMenu
          BULMA.toggleMenu(subMenu.previousElementSibling, options)
