// Menu Toggle
let toggleButton = document.querySelector('.toggle-menu');
let menu = document.querySelector('.site-nav');

toggleButton.addEventListener('click',function(e){
  toggleButton.classList.toggle('is-pushed');
  menu.classList.toggle('active');
});

// Home Slideshow
let slider = document.querySelector('.slideshow__wrap');
if (slider) {
  let sliderSpeed = document.querySelector('.slideshow__wrap').getAttribute('data-speed');
  let slider = tns({
    container: '.slideshow__wrap',
    mode: 'gallery',
    nav: false,
    controls: false,
    autoplay: true,
    autoplayTimeout: sliderSpeed,
    speed: 800,
    autoplayButtonOutput: false,
    onInit: addAuto(),
  });

  slider.events.on('indexChanged', changeAuto);

  function addAuto() {
    let biggestHeight = 0;
    setTimeout(function () {
      let slides = document.querySelectorAll('.slideshow__wrap .tns-item');
      slides.forEach(function(element, index){
        biggestHeight = element.offsetHeight > biggestHeight ? element.offsetHeight : biggestHeight;
      });
      slides.forEach(function(element, index){
        element.style.height = biggestHeight +'px';
      });
    }, 5);

    let sliderBtn = document.querySelector('.slideshow-nav__item');
    sliderBtn.classList.add('auto');
  }
  function changeAuto() {
    let currentIndex = slider.getInfo().displayIndex - 1;
    let currentButton = document.querySelector(".slideshow-nav__item" + "[data-index = '" + currentIndex + "']");
    Array.prototype.filter.call(currentButton.parentNode.children, function(child){
      child.classList.remove('auto');
    });
    currentButton.classList.add('auto');
  }

  let sliderBtn = document.querySelectorAll('.slideshow-nav__item');
  sliderBtn.forEach(function (element, index) {
    let getIndex = element.getAttribute('data-index');
    element.addEventListener('click',function(e){
      Array.prototype.filter.call(element.parentNode.children, function(child){
        child.classList.remove('active');
      });
      slider.goTo(getIndex);
      slider.pause();
      element.classList.add('active')
    });
  });
}

// Testimonials slider
let testimonialSlider = document.querySelector('.testimonials-slider');
if (testimonialSlider){
  let testimonialSlider = tns({
    container: '.testimonials-slider',
    mode: 'gallery',
    nav: false,
    controls: true,
    autoplay: true,
    autoplayTimeout: 4000,
    speed: 800,
    autoplayButtonOutput: false,
    controlsText: ['<i class="icon icon-arrow icon-flip-y"></i>', '<i class="icon icon-arrow"></i>'],
    onInit: testimonialHeight(),
  });

  function testimonialHeight() {
    let biggestHeight = 0;
    setTimeout(function () {
      let slides = document.querySelectorAll('.testimonials-slider .tns-item');
      slides.forEach(function(element, index){
        biggestHeight = element.offsetHeight > biggestHeight ? element.offsetHeight : biggestHeight;
      });
      slides.forEach(function(element, index){
        element.style.height = biggestHeight +'px';
      });
    }, 5);
  }
}

// FAQ
let faqItem = document.querySelectorAll(".faq-item");
if (faqItem){
  faqItem.forEach(function (element, index) {
    element.addEventListener('click',function(e){
      let faqBody = element.querySelector(".faq-item__body-inner");
      let faqBodyHeight = faqBody.offsetHeight;
      let faqBodyOuter = element.querySelector(".faq-item__body");
      let faqBodyOuterHeight = faqBodyOuter.offsetHeight;
      element.classList.toggle('active');
      if (faqBodyOuterHeight === 0){
        faqBodyOuter.style.height = faqBodyHeight +'px';
      }
      else{
        faqBodyOuter.style.height = '0px';
      }
    });
  });
}

// Scroll to Anchor
const scrollElems = document.querySelectorAll('a[href^="#"]');
for(let i = 0; i < scrollElems.length; i++){
  const elem = scrollElems[i];
  elem.addEventListener('click',function(e) {
   e.preventDefault();

   menu.classList.remove('active');
   toggleButton.classList.remove('is-pushed');

   const scrollElemId = e.target.href.split('#')[1];

   const scrollEndElem = document.getElementById(scrollElemId);

   const anim = requestAnimationFrame((timestamp) => {
     const stamp = timestamp || new Date().getTime();
     const duration = 500;
     const start = stamp;

     const startScrollOffset = window.pageYOffset;
     const scrollEndElemTop = scrollEndElem.getBoundingClientRect().top;

     scrollToElem(start, stamp, duration, scrollEndElemTop, startScrollOffset);
   })
})
}
const easeInCubic = function (t) { return t*t*t }

const scrollToElem = (startTime, currentTime, duration, scrollEndElemTop, startScrollOffset) => {
   const runtime = currentTime - startTime;
   let progress = runtime / duration;

   progress = Math.min(progress, 1);

   const ease = easeInCubic(progress);

   window.scroll(0, startScrollOffset + (scrollEndElemTop * ease));if(runtime < duration){
     requestAnimationFrame((timestamp) => {
       const currentTime = timestamp || new Date().getTime();
       scrollToElem(startTime, currentTime, duration, scrollEndElemTop, startScrollOffset);
     })
   }
 }
