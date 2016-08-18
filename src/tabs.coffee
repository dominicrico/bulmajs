BULMA.toggleTab = (el) ->
  links = el.target.parentNode.parentNode
  links = links.querySelectorAll('li')
  for l in links
    BULMA.removeClass(l, 'is-active')
    BULMA.hide(document.querySelector(l.firstChild.getAttribute('data-tab')))

  BULMA.addClass(el.target.parentNode, 'is-active')
  BULMA.show(document.querySelector(el.target.getAttribute('data-tab')))

  return

unless BULMA.isReady

  #Get all bulma menus of the current page
  tabs = BULMA.getElements('tabs')

  if tabs and tabs.length > 0
    for tab in tabs

      targets = tab.querySelectorAll('[data-tab]')

      for target in targets
        tab = document.querySelector(target.getAttribute('data-tab'))

        if BULMA.hasClass(target.parentNode, 'is-active') is false
          BULMA.hide(tab)

        BULMA.click target, BULMA.toggleTab
