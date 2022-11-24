// apend all your componets here
// call their js functions here as well
// that will make sure jQ will find the
// referenced elements in the DOM
// similar with angular's afterViewInit() :)

$(function () {
  $.get("header-component/header.html", function (data) {
    $("#header-component").html(data);
  });

  $.get("tab-group-component/tab-group.html", function (data) {
    $("#tab-group-component").html(data);
    tabGroup(); // executes tab-group-component js code
    componentsLoaded(); // callback after all the components
    // are loaded last component calls it
  });
});
