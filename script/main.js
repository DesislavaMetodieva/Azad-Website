window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("header").classList.add('sticky');
  } else {
    document.getElementById("header").classList.remove('sticky');
  }
}





