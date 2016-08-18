# Create a BULMA object only if one does not already exist. We create the
# methods in a closure to avoid creating global variables.

if typeof BULMA isnt "object"
  BULMA = {}

do ->

  BULMA.hide = (el) ->
    display = BULMA.isVisible(el)

    if display
      el.style.display = 'none'

    return

  BULMA.show = (el) ->
    display = BULMA.isVisible(el)

    if !display
      el.style.display = 'block'

    return

  BULMA.toggle = (el) ->
    display = BULMA.isVisible(el)

    if !display
      el.style.display = 'block'
      return
    else
      el.style.display = 'none'
      return

  BULMA.getElements = (name) ->
    document.querySelectorAll('[data-bulma="' + name + '"]')

  BULMA.isVisible = (el) ->
    if window.getComputedStyle
      display = getComputedStyle(el, null).display
    else
      display = el.currentStyle.display

    return display isnt 'none'

  BULMA.hasClass = (el, className) ->
    if el.classList
      el.classList.contains(className)
    else
      new RegExp('\\b' + className + '\\b').test(el.className)

  BULMA.addClass = (el, className) ->
    if el.classList
      el.classList.add(className)
    else if !BULMA.hasClass(el, className)
      el.className += ' ' + className

  BULMA.removeClass = (el, className) ->
    if el.classList
      el.classList.remove(className)
    else
      el.className = el.className
      .replace(new RegExp('\\b'+ className+'\\b', 'g'), '')

  BULMA.parseOptions = (el) ->
    opts = {}
    options = el.getAttribute('data-options')
    options = (options || '').replace(/\s/g,'').split(';')
    for option in options
      if option
        option = option.split(':')
        opts[option[0]] = option[1]

    opts

  BULMA.click = (el, handler) ->
    if !el.eventListener
      el.eventListener = true
      el.addEventListener 'click', handler

  BULMA.unclick = (el, handler) ->
    if el.eventListener
      el.eventListener = false
      el.removeEventListener 'click', handler

  # in case the document is already rendered
  if document.readyState isnt 'loading'
    BULMA.isReady = true
    return
  # modern browsers
  else if document.addEventListener
    document.addEventListener 'DOMContentLoaded', () ->
      BULMA.isReady = true
      return
  # IE <= 8
  else document.attachEvent 'onreadystatechange', () ->
    if document.readyState is 'complete'
      BULMA.isReady = true
      return

  hashCode = (str) ->
    hash = 0
    for s, i in str
      hash = ~~(((hash << 5) - hash) + str.charCodeAt(i))
    hash
