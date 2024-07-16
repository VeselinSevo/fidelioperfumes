
// COVER IMAGES (AUTOMATIC SWITCHING)

async function displayCoverImages() {
  const cover = $(".cover");
  let coverImgsData = await getData('home-cover-images')
  // if(coverImgsData.msg) {
  //   cover.html('<h4>There was an error loading home cover images.</h4>')
  //   return 
  // } 
  let coverImgs = coverImgsData.data
  let br = 1;
  setInterval(() => {
    if (br === coverImgs.length) {
      br = 0;
    }
    cover.css("background-image", `url(${coverImgs[br].link})`);
    br++;
  }, 3000);
}

displayCoverImages()

// ADVANTAGES

async function displayAdvantages() {

  let advantagesContentContainer = $(".advantages");
  let advantageImg;

  let advantagesData = await getData('advantages')
  if(advantagesData.msg) {
    console.log(advantagesContentContainer)
    advantagesContentContainer.html('<h4 class="py-5 text-center">There was an error loading our advantages.</h4>')
    return 
  } 

  let advantages = advantagesData.data
  advantages.forEach((advantage) => {
    // Create advantage container
    const advantageContainer = $("<div>").addClass(
      "col-lg-3 col-md-6 col-sm-6 py-lg-3"
    );
  
    // Create advantage element
    const advantageElement = $("<div>").addClass(
      "advantage align-items-center"
    );
  
    // Create advantage image
    advantageImg = $("<img>").addClass("advantage-img card-img-top w-25").attr({
      src: advantage.src,
      alt: advantage.alt,
    });
  
    advantageImg.hide().fadeIn("slow");
  
    // Create advantage body
    const advantageBody = $("<div>").addClass("card-body");
  
    // Create advantage body title
    const advantageBodyTitle = $("<h5>")
      .addClass("py-3 card-title")
      .text(advantage.title);
  
    // Create advantage body text
    const advantageBodyText = $("<p>")
      .addClass("card-text")
      .text(advantage.text);
    advantageBody.append(advantageBodyTitle, advantageBodyText);
    advantageElement.append(advantageImg, advantageBody);
    advantageContainer.append(advantageElement);
  
    // Append advantage container to your container element
    advantagesContentContainer.append(advantageContainer);
  });
}

displayAdvantages()

// EXPLORE PERFUMES SLIDER

async function displaySlider() {
  let slidesData = await getData('home-slides');
  let slider = document.querySelector(".slides");
  let sliderContainer = document.querySelector("#explore .container");

  if(slidesData.msg) {
    sliderContainer.innerHTML = ('<h4 class="py-5 text-center">There was an error loading slider content.</h4>')
    return 
  } 
  let slides = slidesData.data;

  let slideInterval = setInterval(nextSlide, 3000);
  let sliderBrojac = 0;


  function nextSlide() {
    sliderBrojac++;
    if (sliderBrojac === slides.length) {
      sliderBrojac = 0;
    }
    slider.innerHTML = `<div class="slide">
                          <div class="row align-items-center justify-content-between">
                            <div class="slika col-lg">
                              <img src=${slides[sliderBrojac].src} class="img-fluid d-none d-lg-block w-75" alt=${slides[sliderBrojac].alt}>
                            </div>
                            <div class="col-lg py-5 py-md-5">
                              <h2>${slides[sliderBrojac].title}</h2>
                              <p class="lead">
                              ${slides[sliderBrojac].text}
                              </p>
                              <p>
                              ${slides[sliderBrojac].subtext}
                              </p>
                              <a href="../store.html" class="btn btn-grey btn-light mt-3">
                                <i class="bi bi-chevron-right"></i> Buy Now
                              </a>
                            </div>
                          </div>
                        </div>`;
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 3000);
  }

  function prevSlide() {
    sliderBrojac--;
    if (sliderBrojac < 0) {
      sliderBrojac = slides.length - 1;
    }
    slider.innerHTML = `<div class="slide">
                          <div class="row align-items-center justify-content-between">
                            <div class="slika col-lg">
                              <img src=${slides[sliderBrojac].src} class="img-fluid d-none d-lg-block w-75" alt=${slides[sliderBrojac].alt}>
                            </div>
                            <div class="col-lg py-5 py-md-5">
                              <h2>${slides[sliderBrojac].title}</h2>
                              <p class="lead">
                              ${slides[sliderBrojac].text}
                              </p>
                              <p>
                              ${slides[sliderBrojac].subtext}
                              </p>
                              <a href="../store.html" class="btn btn-grey btn-light mt-3">
                                <i class="bi bi-chevron-right"></i> Buy Now
                              </a>
                            </div>
                          </div>
                        </div>`;
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 3000);
  }

  slider.innerHTML = `<div class="slide">
                        <div class="row align-items-center justify-content-between">
                          <div class="slika col-lg">
                            <img src=${slides[0].src} class="img-fluid d-none d-lg-block w-75" alt=${slides[0].alt}>
                          </div>
                          <div class="col-lg py-5 py-md-5">
                            <h2>${slides[0].title}</h2>
                            <p class="lead">
                            ${slides[0].text}
                            </p>
                            <p>
                            ${slides[0].subtext}
                            </p>
                            <a href="../store.html" class="btn btn-grey btn-light mt-3">
                              <i class="bi bi-chevron-right"></i> Buy Now
                            </a>
                          </div>
                        </div>
                      </div>`;


  let prevBtn = document.querySelector("#prev");
  let nextBtn = document.querySelector("#next");

  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

}

displaySlider()

// OUR GOAL (SHOW MORE/LESS)

const goalBtn = $(".our-goal-btn");

$(".goal-read-more-content").hide();
goalBtn.text("Read More");

goalBtn.click(() => {
  $(".goal-read-more-content").slideToggle();

  if (goalBtn.text() == "Read More") {
    goalBtn.text("Read Less");
  } else {
    goalBtn.text("Read More");
  }
});

// TOP PERFUME PICKS

async function displayRecommendedPerfumes() {
  const topPicksContainer = document.querySelector(".top-picks");
  let itemsData = await getData('perfumes')
  let items = itemsData.data

  if(itemsData.msg) {
    topPicksContainer.innerHTML = '<h4 class="py-5 text-center">There was an error loading top picks perfumes</h4>'
    return
  } 
  let topItems = items.filter((item) => item.isTopPick);

  topItems.forEach((item) => {
    let topItem = `<div class="col-lg-3 col-md-6 col-sm-6 py-4">
    <div class="card align-items-center g-4">
      <img
        src=${item.src}
        class="card-img-top"
        alt="Prefume"
      />
      <div class="card-body">
        <h5 class="card-title">${item.name}®</h5>
        <p class="card-text">
        ${item.description}
        </p>
        <a href="#" class="btn btn-primary btn-item">Get it NOW</a>
      </div>
    </div>
  </div>`;
    topPicksContainer.innerHTML += topItem;
  });
}

displayRecommendedPerfumes()

// Q AND A

async function displayQA() { 

  let questionsData = await getData('questions')
  let questions = questionsData.data


  let answersData = await getData('answers')
  let answers = answersData.data
  
  let accordion = document.querySelector(".accordion");
  if(questionsData.msg && answersData.msg) {
    accordion.innerHTML = '<h4 class="py-5 text-center">There was an error loading Q and A.</h4>'
    return 
  } 


  questions.forEach((question) => {
    let questionEl = `<div class="accordion-item">
    <h2 class="accordion-header">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#question-${question.id}"
      >
      ${question.text}"
      </button>
    </h2>
    <div
      id="question-${question.id}"
      class="accordion-collapse collapse"
      data-bs-parent="#questions"
    >
      <div class="accordion-body">
        ${answers.filter((answer) => answer.id == question.id)[0].text}"
      </div>
    </div>
  </div>`;

    accordion.innerHTML += questionEl;
  });
}

displayQA()

// COUNTER

document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".countup");

  counters.forEach((counter) => {
    const targetCount = +counter.getAttribute("data-count");
    const increment = Math.ceil(targetCount / 100);

    let currentCount = 0;
    const updateCounter = () => {
      console.log("updating");
      counter.style.transition = "all 0s ease-in-out";
      counter.style.scale = "1";
      if (currentCount < targetCount) {
        currentCount += increment;
        counter.textContent = currentCount;
        setTimeout(updateCounter, 15);
      } else {
        counter.textContent = targetCount;
        counter.style.transition = "all .5s ease-in-out";
        counter.style.scale = "1.4";
      }
    };

    document.addEventListener("scroll", () => {
      // Za svaki element se kaci po callback funkcija na
      // scroll documenta, koja ima podatke odgovarajuceg countera
      // *Sve ce se firovati on scroll, sve 3, cekirati sta treba i uraditi logiku*
      const rect = document
        .querySelector(".counters")
        .getBoundingClientRect();
      const hasStartedCounting =
        counter.getAttribute("data-counting") === "true"; // false na pocetku

      if (
        hasStartedCounting &&
        (rect.top >= window.innerHeight || rect.bottom < 0)
      ) {
        counter.setAttribute("data-counting", "false"); // vraca se na false ako si van kocke vidika
        currentCount = 10; // takodje, resetuje currentCount na
      }
      if (
        !hasStartedCounting &&
        rect.top < window.innerHeight &&
        rect.bottom >= 0
      ) {
        counter.setAttribute("data-counting", "true");
        // true ako si u kocki vidika, to sprecava dalje pozivanje sve dok ne izadjes
        updateCounter();
      }
    });
  });
});


// EMAIL NEWSLETTER SUBSCRIPTION

const emailInput = document.querySelector("#newsletter input");
const errorMsg = document.querySelector("#newsletter .error-msg");
const submitBtn = document.querySelector("#newsletter button");
let isTouched = false;
let timeout;

submitBtn.addEventListener("click", () => {
  clearTimeout(timeout);
  const errors = checkEmail();
  errorMsg.textContent = "";

  if (errors.length > 0) {
    errorMsg.textContent = errors[0];
    emailInput.style.border = "2px solid red";
    console.log(emailInput.style.border);
    timeout = setTimeout(() => {
      emailInput.style.border = "none";
      errorMsg.textContent = "";
    }, 2000);
  } else {
    emailInput.style.border = "none";
    errorMsg.textContent = "Great! You successfully submited your email!";
  }
  emailInput.value = "";
});

function checkEmail() {
  const emailErrors = [];

  emailValue = emailInput.value.trim();
  emailLength = emailValue.length;

  const pattern = `^[a-z]((\.|-|_)?[a-z0-9]){2,}@[a-z]{2,}\\.[a-z]{2,6}$`;
  const regEx = new RegExp(pattern);
  console.log(!regEx.test(emailValue) || emailLength < 10);
  console.log(emailLength < 10);
  console.log(!regEx.test(emailValue));
  if (!regEx.test(emailValue) || emailLength < 10) {
    emailErrors.push(
      "Email must contain @ and be more than 10 characters long. Valid format: example@gmail.com"
    );
  }
  return emailErrors;
}

// BUG FIX ON IOS
// I needed this bcs Ios doesnt support background-attchment: fixed and thus img is not loading well
// Check if user is using iOS device

function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

// Apply class ios class to cover if iOS device is detected
if (isIOS()) {
  cover.classList.add("ios");
}

