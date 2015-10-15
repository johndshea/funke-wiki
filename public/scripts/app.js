$(function(){
  $('.button-collapse').sideNav();
});

var flash = document.getElementById("flash");
$(document).ready(function(){
  if (flash.innerText !== '') {
    Materialize.toast(flash.innerText, 1000);
  }
});
