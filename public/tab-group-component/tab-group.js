function tabGroup() {
  $('.tabs').tabs()
  $('.collapsible').collapsible()

  // fixes materialize slider tumb react/vue bug
  let arrayOfSliders = document.querySelectorAll('input[type=range]')
  M.Range.init(arrayOfSliders)
}
