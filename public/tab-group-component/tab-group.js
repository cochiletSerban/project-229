function tabGroup () {
  $('.tabs').tabs()
  $('.collapsible').collapsible()
  $('select').formSelect()
  // fixes materialize slider tumb react/vue bug
  let arrayOfSliders = document.querySelectorAll('input[type=range]')
  M.Range.init(arrayOfSliders)
  

  $('#moodRoofPicker').on('move.spectrum', function (e, color) {
    color.toHexString() // #ff0000
    console.log(color.toHexString())
  })

  $('#picker1').on('move.spectrum', function (e, color) {
    color.toHexString() // #ff0000
    console.log(color.toHexString())
  })
  $('#picker2').on('move.spectrum', function (e, color) {
    color.toHexString() // #ff0000
    console.log(color.toHexString())
  })
  $('#picker3').on('move.spectrum', function (e, color) {
    color.toHexString() // #ff0000
    console.log(color.toHexString())
  })
  $('#picker4').on('move.spectrum', function (e, color) {
    color.toHexString() // #ff0000
    console.log(color.toHexString())
  })
  $('#picker5').on('move.spectrum', function (e, color) {
    color.toHexString() // #ff0000
    console.log(color.toHexString())
  })
}
