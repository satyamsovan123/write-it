var flag = 0;
$(".navbar-toggler").on("click", function(){
  flag = flag + 1
  if(flag % 2 != 0){
    /* padding-top: 40vh; */
    $(".navbar-nav").css("padding-top", "40vh");
    $("section").css("opacity", "0.2");
    $("section").css("filter", "blur(10px)");
    $("body").css("overflow", "hidden");
  }
  else{
    $(".navbar-nav").css("padding-top", "0vh");
    $("section").css("filter", "blur(0px)");
    $("section").css("opacity", "1");
    $("body").css("overflow", "auto");
  }

});

// const regex = /write-it\/([a-zA-Z0-9-]*)/gm;
// let pageName = $("title")[0].baseURI;
// pageName = regex.exec(pageName);

let pageName = $("title")[0].innerText;

if(pageName == "write.it"){
  var typed = new Typed(".change-landingpage", {
      strings: ["Write it!", "Read it!", "Share it!"],
      typeSpeed: 40,
      smartBackspace: true,
      loop: false,
      // loopCount: 2,
      showCursor: false,
      bindInputFocusEvents: false,
      autoInsertCss: true,
      fadeOut: true,
      fadeOutClass: 'typed-fade-out',
      fadeOutDelay: 100
    });
}
