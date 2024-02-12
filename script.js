$(document).ready(function () {

  //sticky header
  $(window).scroll(function () {
    var maxwidth = 800; // assuming you have defined maxwidth somewhere
    if ($(window).width() > maxwidth && $(this).scrollTop() > 1) {
        $(".header-area").addClass("sticky");
    } else {
        $(".header-area").removeClass("sticky");
    }


    // Update the active section in the header
    updateActiveSection();
  });

  $(".header-area ul li a").click(function (e) {
    e.preventDefault();

    var target = $(this).attr("href");

    if ($(target).hasClass("active-section")) {
      return;
    }

    if (target === "#home") {
      $("html, body").animate(
        {
          scrollTop: 0
        },
        500
      );
    } else {
      var offset = $(target).offset().top - 110;

      $("html, body").animate(
        {
          scrollTop: offset
        },
        500
      );
    }

    $(".header-area ul li a").removeClass("active");
    $(this).addClass("active");
  });


  //Initial content revealing js
  ScrollReveal({
    distance: "100px",
    duration: 2000,
    delay: 200
  });

  ScrollReveal().reveal(" .left-section, .about-content, .edu-left", {
    origin: "left"
  });
  ScrollReveal().reveal(".rightSection, .profile-text, .about-skills, .exp-right", {
    origin: "right"
  });
  ScrollReveal().reveal(".project-title, .contact-title, .service-title", {
    origin: "top"
  });
  ScrollReveal().reveal(".projects, .contact, .services", {
    origin: "bottom"
  });

  //contact form to excel sheet
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwx3DukJERYVDL6bzToKeH42VrumVhcDP9Np-drIdkg0MGRhcz9JEl0mfVAsc2Cxnc/exec';
  const form = document.forms['submitToGoogleSheet']
  const msg = document.getElementById("msg")

  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => {
        msg.innerHTML = "Message sent successfully"
        setTimeout(function () {
          msg.innerHTML = ""
        }, 5000)
        form.reset()
      })
      .catch(error => console.error('Error!', error.message))
  })

});


function updateActiveSection() {
  var scrollPosition = $(window).scrollTop();

  // Checking if scroll position is at the top of the page
  if (scrollPosition === 0) {
    $(".header-area ul li a").removeClass("active");
    $(".header-area ul li a[href='#home']").addClass("active");
    return;
  }

  // Iterate through each section and update the active class in the header
  $("section").each(function () {
    var target = $(this).attr("id");
    var offset = $(this).offset().top;
    var height = $(this).outerHeight();

    if (
      scrollPosition >= offset - 40 &&
      scrollPosition < offset + height - 40
    ) {
      $(".header-area ul li a").removeClass("active");
      $(".header-area ul li a[href='#" + target + "']").addClass("active");
    }
  });
}

//Hamburger 
document.querySelector(".hamburger").addEventListener("click", () => {
  document.querySelector("header").style.top = "0"
  document.querySelector("header").style.width = "100%";
  document.querySelector("header").style.zIndex = "100";
  document.querySelector("header").style.transition = "1s top ease";
})

//close button 
document.querySelector(".close").addEventListener("click", () => {
  document.querySelector("header").style.top = "-550px";
  document.querySelector("header").style.transition = "1s top ease";
})