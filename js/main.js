(function ($) {
  "use strict";

  // loader
  var loader = function () {
    setTimeout(function () {
      if ($("#loader").length > 0) {
        $("#loader").removeClass("show");
      }
    }, 1);
  };
  loader();

  // Initiate the wowjs
  new WOW().init();

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
      $(".navbar").addClass("nav-sticky");
    } else {
      $(".navbar").removeClass("nav-sticky");
    }
  });

  // Smooth scrolling on the navbar links
  $(".navbar-nav a").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();

      $("html, body").animate(
        {
          scrollTop: $(this.hash).offset().top - 45,
        },
        1500,
        "easeInOutExpo"
      );

      if ($(this).parents(".navbar-nav").length) {
        $(".navbar-nav .active").removeClass("active");
        $(this).closest("a").addClass("active");
      }
    }
  });

  // Typed Initiate
  if ($(".hero .hero-text h2").length == 1) {
    var typed_strings = $(".hero .hero-text .typed-text").text();
    var typed = new Typed(".hero .hero-text h2", {
      strings: typed_strings.split(", "),
      typeSpeed: 100,
      backSpeed: 20,
      smartBackspace: false,
      loop: true,
    });
  }

  // Skills
  $(".skills").waypoint(
    function () {
      $(".progress .progress-bar").each(function () {
        $(this).css("width", $(this).attr("aria-valuenow") + "%");
      });
    },
    { offset: "80%" }
  );

  // Testimonials carousel
  $(".testimonials-carousel").owlCarousel({
    center: true,
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
    },
  });

  // Portfolio filter
  var portfolioIsotope = $(".portfolio-container").isotope({
    itemSelector: ".portfolio-item",
    layoutMode: "fitRows",
  });

  $("#portfolio-filter li").on("click", function () {
    $("#portfolio-filter li").removeClass("filter-active");
    $(this).addClass("filter-active");
    portfolioIsotope.isotope({ filter: $(this).data("filter") });
  });
})(jQuery);

//-----------------------------------------Rubiks Cube Part 2----------------------------------//
// //Rubiks Cube Part 2
// Get the cube element
const cube = document.getElementById("cube");

// Variables to store mouse position and cube rotation
let isDragging = false;
let previousMousePosition = {
  x: 0,
  y: 0,
};
let cubeRotation = {
  x: -35,
  y: -135,
};

// Object to store original element colors
const originalColors = {};

// Function to handle mouse down event
function handleMouseDown(event) {
  isDragging = true;
  previousMousePosition = {
    x: event.clientX,
    y: event.clientY,
  };

  // Apply transition to the cube element
  cube.style.transition = "transform 0.3s ease";
}

// Function to handle mouse move event
function handleMouseMove(event) {
  if (!isDragging) return;

  const deltaMousePosition = {
    x: event.clientX - previousMousePosition.x,
    y: event.clientY - previousMousePosition.y,
  };

  cubeRotation.x += deltaMousePosition.y * 0.5;
  cubeRotation.y += deltaMousePosition.x * 0.5;

  cube.style.transform = `rotateX(${cubeRotation.x}deg) rotateY(${cubeRotation.y}deg)`;

  previousMousePosition = {
    x: event.clientX,
    y: event.clientY,
  };
}

// Function to handle mouse up event
function handleMouseUp() {
  isDragging = false;

  // Remove transition from the cube element
  cube.style.transition = "";
}

// Function to handle click event on a specific element
function handleElementClick(event) {
  // Get the clicked element
  const clickedElement = event.target;

  // Perform actions based on the clicked element
  if (clickedElement.classList.contains("specific-element")) {
    // Check if the original color is already stored
    if (originalColors[clickedElement.id]) {
      // Restore the original color of the clicked element
      clickedElement.style.backgroundColor = originalColors[clickedElement.id];
    } else {
      // Store the original color of the clicked element
      originalColors[clickedElement.id] = clickedElement.style.backgroundColor;

      // Change the color of the clicked element
      clickedElement.style.backgroundColor = "red";
    }
  }
}

// Add event listeners to enable mouse interaction
cube.addEventListener("mousedown", handleMouseDown);
document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("mouseup", handleMouseUp);

// Add event listener for click event on the cube element
cube.addEventListener("click", handleElementClick);

document.querySelectorAll(".feedback li").forEach((entry) =>
  entry.addEventListener("click", (e) => {
    if (!entry.classList.contains("active")) {
      document.querySelector(".feedback li.active").classList.remove("active");
      entry.classList.add("active");
    }
    e.preventDefault();
  })
);
// Get all the elements of the Rubik's Cube
const elements = document.querySelectorAll(".rubiks-element");

// Function to change the background color of each element
function changeBackgroundColor() {
  elements.forEach((element) => {
    // Generate random background color
    const randomColor = getRandomColor();

    // Apply the random background color to each element
    element.style.backgroundColor = randomColor;
  });
}

// Function to generate a random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Call the changeBackgroundColor function to change the background color of each element
changeBackgroundColor();
