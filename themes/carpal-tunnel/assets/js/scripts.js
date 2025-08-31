objectFitImages();
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
  slider = tns({
    container: '.slideshow__wrap',
    mode: 'gallery',
    nav: false,
    controls: false,
    autoplay: true,
    autoplayTimeout: sliderSpeed,
    speed: 800,
    autoplayButtonOutput: false,
    touch: false,
  });

  slider.events.on('indexChanged', changeAuto);
  function addAuto() {
    let biggestHeight = 0;
    let slides = document.querySelectorAll('.slideshow__wrap .slideshow__item');
    slides.forEach(function(element, index){
      biggestHeight = element.offsetHeight > biggestHeight ? element.offsetHeight : biggestHeight;
    });
    slides.forEach(function(element, index){
      element.style.height = biggestHeight +'px';
    });

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
  testimonialSlider = tns({
    container: '.testimonials-slider',
    mode: 'gallery',
    nav: false,
    controls: true,
    autoplay: true,
    autoplayTimeout: 4000,
    speed: 800,
    autoplayButtonOutput: false,
    controlsText: ['<i class="icon icon-arrow icon-flip-y"></i>', '<i class="icon icon-arrow"></i>'],
  });

  function testimonialHeight() {
    let tBiggestHeight = 0;
    let tSlides = document.querySelectorAll('.testimonials-slider .testimonials-slider__item');
    tSlides.forEach(function(element, index){
      tBiggestHeight = element.offsetHeight > tBiggestHeight ? element.offsetHeight : tBiggestHeight;
    });
    tSlides.forEach(function(element, index){
      element.style.height = tBiggestHeight +'px';
    });
  }
}

if (slider || testimonialSlider){
  window.onload = function(){
    addAuto();
    testimonialHeight();
  };
}


// FAQ
let faqItem = document.querySelectorAll(".faq-item");
function faq_open() {
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
if (faqItem){
  faq_open();
  let pageHash = window.location.hash.substr(1);
  faqItem.forEach(function (element, index) {
    let faqItemId = element.getAttribute("id");
    if (pageHash === faqItemId){
      element.click()
    }
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

// Form Validation

let formHandle = document.querySelector('form[name="contact-form"]');
let options = {
    eventsList: ['change', 'blur'],
    rules: {
      phone_number: function (value, params) {
        return this.min(value.replace(/\s{2,}/g, ' ').length, params);
      },
      date: function (value, params) {
        return this.min(value.replace(/\s{2,}/g, ' ').length, params);
      },
    },
    messages: {
      en: {
        phone_number: {
          empty: 'This field is required',
          incorrect: 'Please enter correct phone number'
        },
        date: {
          empty: 'This field is required',
          incorrect: 'Please enter correct date'
        }
      }
    }
  };

// Got to validation
new Validator(formHandle, function (err, res) {
  if (res){
    var form = document.querySelector('form[name="contact-form"]');
    var btn = form.querySelector('button[type=submit]');
    var successContainer = document.querySelector('.contact__result');

    // Simple anti-spam checks: honeypot and minimum time on page
    var hp = form.querySelector('input[name="company"]');
    var tsInput = form.querySelector('input[name="form_loaded_at"]');
    var loadedAt = tsInput && parseInt(tsInput.value || '0', 10);
    var now = Date.now();
    if ((hp && hp.value && hp.value.trim() !== '') || (loadedAt && (now - loadedAt) < 3000)) {
      successContainer.style.display = 'block';
      successContainer.classList.add('error');
      successContainer.innerHTML = '<i class="icon icon-email"></i><span>Please try again. Your submission was flagged as automated.</span>';
      return false;
    }

    btn.innerHTML = 'Sending...';
    btn.disabled = true;
    grecaptcha.ready(function() {
      grecaptcha.execute('6LdVncAUAAAAAPHpUu5pG4USDM31dffdj6c8oGUA', {action: 'homepage'}).then(function(token) {
        var data = new FormData(form);
        data.append('g-recaptcha-response', token);
        var request = new XMLHttpRequest();
        request.onload = function() {
          btn.innerHTML = 'Send Message';
          var response = {};
          try {
            response = JSON.parse(this.responseText);
          } catch(err) {}
          if (this.status === 200 && response.success) {
            form.reset();
            if (response.message) {
              successContainer.style.display = 'block';
              successContainer.classList.remove('error');
              successContainer.classList.add('success');
              successContainer.innerHTML = '<i class="icon icon-email"></i><span>' + response.message + '</span>';
              btn.innerHTML = 'Thank you';
              btn.classList.add('success');

              setTimeout(function () {
                successContainer.classList.remove('success');
                successContainer.style.display = 'none';
                btn.innerHTML = 'Send Message';
                btn.classList.remove('success');
                btn.disabled = false;
              }, 10000);
            }
            return true;
          }
          else if (this.status === 200 && response.success === false) {
            successContainer.style.display = 'block';
            successContainer.classList.add('error');
            successContainer.innerHTML = '<i class="icon icon-email"></i><span>' + response.message + '</span>';
            btn.disabled = false;
          }
          else {
            successContainer.style.display = 'block';
            successContainer.classList.add('error');
            successContainer.innerHTML = '<i class="icon icon-email"></i><span>Something went wrong. Please, try again later.</span>';
          }
        }
        request.onerror = function(err) {
          btn.innerHTML = 'Send Message';
          btn.disabled = false;
        }
        request.open(form.method, form.action);
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
         var requestData = {};
         data.forEach(function(value, key) {
           requestData[key] = value;
         });
         request.send(JSON.stringify(requestData));
    });
  });
  }
  return false;
}, options);

VMasker(document.querySelector('[name="phone"]')).maskPattern("(999) 999-9999");
VMasker(document.querySelector('[name="date"]')).maskPattern("99/99/9999");

// Current Year
document.getElementById("year").innerHTML = new Date().getFullYear();
