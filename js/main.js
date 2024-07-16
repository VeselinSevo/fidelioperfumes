async function getData(path) {
  let msg; // Define msg variable here
  try {
    let rawData = await fetch(`../json/${path}.json`);
    let data = await rawData.json();
    return {
      data: data,
      msg: msg // Include msg in the return object
    };
  } catch (error) {
    msg = `We couldn't get ${path}. Please try again later.`; // Assign a value to msg in the catch block
    return {
      data: [],
      msg: msg // Include msg in the return object
    };
  }
}


$(document).ready(function () {
 
  // MAIN MENU
  async function displayMenu() {
    let menuData = await getData('menu')
    let menu = menuData.data
    let menuUl = $(".navbar-nav");
    menu.forEach((menuItem) => {
      let menuItemElement = `<li class="nav-item p-1"><a href=${menuItem.link} class="nav-link link">${menuItem.text}</a></li>`;
      if (menuItem.text == "Dokumentacija") {
        menuItemElement = `<li class="nav-item p-1"><a href=${menuItem.link} class="nav-link link" target="_blank">${menuItem.text}</a></li>`;
      }
      menuUl.append(menuItemElement);
    });
  }
  displayMenu()

  // SCROLL ARROW
  $(window).scroll(function() {
    const scrollPercentage = (($(window).scrollTop() / ($(document).height() - $(window).height())) * 100);
    if (scrollPercentage > 10) {
      $('#scrollToTop').fadeIn();
    } else {
      $('#scrollToTop').fadeOut();
    }
  });

  $('#scrollToTop').click(function() {
    $('html, body').scrollTo(0, 10);
  });
});

