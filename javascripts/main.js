var sectionHeight = function() {
  var total    = $(window).height(),
      $section = $('section').css('height','auto');

  if ($section.outerHeight(true) < total) {
    var margin = $section.outerHeight(true) - $section.height();
    $section.height(total - margin - 20);
  } else {
    $section.css('height','auto');
  }
}

$(window).resize(sectionHeight);

$(document).ready(function(){
  $('#restore-btn').hide();
  $('section').cutter('init').cutter('stop');
  $("section h1, section h2").each(function(){
    $("nav ul").append("<li class='tag-" + this.nodeName.toLowerCase() + "'><a href='#" + $(this).text().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,'') + "'>" + $(this).text() + "</a></li>");
    $(this).attr("id",$(this).text().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,''));
    $("nav ul li:first-child a").parent().addClass("active");
  });
  
  $("nav ul li").on("click", "a", function(event) {
    var position = $($(this).attr("href")).offset().top - 190;
    $("html, body").animate({scrollTop: position}, 400);
    $("nav ul li a").parent().removeClass("active");
    $(this).parent().addClass("active");
    event.preventDefault();    
  });
  
  sectionHeight();
  
  $('img').load(sectionHeight);
  $('#restore-btn').on('click', function(e){
      e.preventDefault();
      $('section').cutter('restore');
  });
  $('#cut-btn').on('click', function(e){
      e.preventDefault();
      var $this = $(this),
          clicked = $this.data('clicked'),
          $restoreBtn = $('#restore-btn');
      if (!clicked) {
          $('section').cutter('start');
          $this.data('clicked', true).text('Stop cut!');
          $restoreBtn.show();
      }
      else {
          $this.data('clicked', false).text('Start to cut!');
          $('section').cutter('stop');
          $restoreBtn.hide();
      }
  });
});

fixScale = function(doc) {

  var addEvent = 'addEventListener',
      type = 'gesturestart',
      qsa = 'querySelectorAll',
      scales = [1, 1],
      meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];

  function fix() {
    meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
    doc.removeEventListener(type, fix, true);
  }

  if ((meta = meta[meta.length - 1]) && addEvent in doc) {
    fix();
    scales = [.25, 1.6];
    doc[addEvent](type, fix, true);
  }
};