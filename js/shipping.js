$(document).ready(function () {
  // LOGOS

  async function displayLogos() {
    const sponsorContainer = document.querySelector("#companies .row");
    let sponsorLogosData = await getData('logos')
    if(sponsorLogosData.msg) {
      sponsorContainer.innerHTML = '<h4 class="py-5 text-center">There was an error loading sponsors</h4>'
      return
    } 
    let sponsorLogos = sponsorLogosData.data
   
    sponsorLogos.forEach((logo) => {
      sponsorContainer.innerHTML += `<div class="col-lg-2 col-md-4 col-9 d-flex justify-content-center align-items-center py-5 mx-auto">
                                        <img src=${logo.src} class="card-img-top" alt="${logo.alt}">
                                      </div>`;  
    });
  }

  displayLogos()

  // SHOW MORE/LESS PAYMENT

  const paymentBtn = $("#payment a");
  paymentBtn.text("Learn More");
  console.log(paymentBtn);
  const terms = $(".terms");
  terms.hide();

  paymentBtn.click(() => {
    terms.slideToggle();
    if (paymentBtn.text() == "Learn More") {
      paymentBtn.text("Show Less");
    } else {
      paymentBtn.text("Learn More");
    }
  });
});
