function tabGroup () {
  $('.tabs').tabs()
  $('.collapsible').collapsible()

  // fixes materialize slider tumb react/vue bug
  let arrayOfSliders = document.querySelectorAll('input[type=range]')
  M.Range.init(arrayOfSliders)

  $('#picker').spectrum({
    showButtons: false
  })

  $('#picker').on("move.spectrum", function (e, color) {
    color.toHexString(); // #ff0000
    console.log(color.toHexString());
    })
}
