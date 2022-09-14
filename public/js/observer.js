const nav = document.querySelector("nav");
const sectionOne = document.querySelector(".header-graphic");
var imageId = document.getElementById('logo');

const sectionOneOptions = {
  rootMargin: "-85% 0px 0px 0px"
};

const sectionOneObserver = new IntersectionObserver(function(
  entries,
  sectionOneObserver
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      nav.classList.add("nav-scrolled");
      imageId.src = "img/CensusLogo2.png";
    } else {
      nav.classList.remove("nav-scrolled");
      imageId.src = "img/CensusLogoWhite.png";
    }
  });
},
sectionOneOptions);

sectionOneObserver.observe(sectionOne);