let perfumes;
let maxPrice; 
let currentPerfumes;
let allPerfumes;
let currentPage = 1;
const itemsPerPage = 9;
const brandNames = ['Calvin Klein', 'Davidoff', 'Hugo Boss']
rangeInput = document.getElementById('priceRange')
$(document).ready(function () {
  async function init() {
    await displayPerfumes()
    displaySlides()

    maxPrice = allPerfumes.reduce((max, perfume) => {
      return Math.ceil(Math.max(max, perfume.salePrice));
    }, 0);
    rangeInput.max = maxPrice;
    rangeInput.value = maxPrice;
  }

  init()
  async function displayPerfumes() {
    // Dynamicly add items

    const storeRow = document.querySelector(".store-row");
    storeRow.innerHTML = ''
    let perfumesData
    if(currentPerfumes == null) {
        perfumesData = await getData('perfumes');
        currentPerfumes = perfumesData.data
        allPerfumes = [...currentPerfumes];
    }      
    

    if(currentPerfumes.length < 1) {
      storeRow.innerHTML = '<h4 class="py-5 text-center">There are no perfumes that satisfy your filers</h4>'
    }
    if(perfumesData?.msg) {
      storeRow.innerHTML = '<h4 class="py-5 text-center">There was an error loading perfumes</h4>'
      return
    }

      currentPerfumes.forEach((perfume) => {
        itemCard = `<div class="perfume-card col-lg-3 col-md-6 col-sm-6 py-4">
                      <div class="card align-items-center g-4">
                        <div class="card-id hide">${perfume.id}</div>
                        <img src=${perfume.src} class="card-img-top card-image" alt=${perfume.alt}>
                        <div class="card-body">
                          <div class="card-heading">
                            <p class="">${perfume.gender}</p>
                            <p class="">${perfume.milliliters}mil.</p>
                          </div>
                          <h5 class="card-title">${perfume.name}®</h5>
                          <p class="card-text">${perfume.description}</p>
                          <p class="card-text">${brandNames[perfume.brand -1]}</p>
                          ${
                            perfume.salePrice != perfume.price
                              ? `<p><span class='old-price'>$${perfume.price}</span>
                              <span class="card-price">$${perfume.salePrice}</span></p>`
                              : `<p class="card-price">$${perfume.price}</p>`
                          }    
                          <a href="#" class="btn btn-primary btn-item" data-bs-toggle="modal" data-bs-target="#storeModal">Buy Now</a>
                      </div>
                    </div>
                  </div>`;

        storeRow.innerHTML += itemCard;
      });

      addModalDataOnBtnClick();
  }


   // Gathering filter information and submiting filters

   function gatherFilterInformation() {
    const milliliters = document.getElementById('milliliters').value;
    const gender = document.getElementById('gender').value;
    const brand = document.getElementById('brand').value;
    const priceRange = document.getElementById('priceRange').value;
    const onSale = document.getElementById('onSale').checked;

    return {
      milliliters: milliliters,
      gender: gender,
      brand: brand,
      priceRange: priceRange,
      onSale: onSale
    };
  }

  function filterByMilliliters(perfumes, milliliters) {
    return perfumes.filter(perfume => perfume.milliliters === milliliters);
  }
  
  function filterByBrand(perfumes, brand) {
    return perfumes.filter(perfume => perfume.brand === brand);
  }
  
  function filterByPriceRange(perfumes, priceRange) {
    return perfumes.filter(perfume => {
      const perfumePrice = perfume.salePrice !== perfume.price ? perfume.salePrice : perfume.price;
      return perfumePrice <= priceRange;
    });
  }
  
  function filterByOnSale(perfumes) {
    return perfumes.filter(perfume => perfume.isOnSale);
  }
  
  function filterByGender(perfumes, gender) {
    return perfumes.filter(perfume => perfume.gender === gender || perfume.gender === 'unisex');
  }
  
  function filterPerfumes(filters) {
    if (!currentPerfumes) {
      console.error('Perfumes data is undefined or null.');
      return [];
    }
    console.log(filters)
  

    let filteredPerfumes = [...allPerfumes];
  
    if (filters.milliliters) {
      filteredPerfumes = filterByMilliliters(filteredPerfumes, filters.milliliters);
    }
    if (filters.brand) {
      filteredPerfumes = filterByBrand(filteredPerfumes, filters.brand);
    }
    if (filters.priceRange > 0) {
      filteredPerfumes = filterByPriceRange(filteredPerfumes, parseInt(filters.priceRange));
    }
    if (filters.onSale) {
      filteredPerfumes = filterByOnSale(filteredPerfumes);
    }
    if (filters.gender) {
      filteredPerfumes = filterByGender(filteredPerfumes, filters.gender);
    }
  
    console.log(filteredPerfumes)
    return filteredPerfumes;
  }
  
  function applyFilters() {
    const filters = gatherFilterInformation();
    currentPerfumes = filterPerfumes(filters);
    console.log(currentPerfumes)
    displayPerfumes();
  }

  function resetFilters() {
    console.log(maxPrice)
    const milliliters = document.getElementById('milliliters').value = '';
    const gender = document.getElementById('gender').value = '';
    const brand = document.getElementById('brand').value = '';
    const priceRange = document.getElementById('priceRange').value = maxPrice;
    const onSale = document.getElementById('onSale').checked = false;
    rangeInputValue = document.getElementById('priceRangeValue'); 
    rangeInputValue.innerText = "Not Selected";

    return {
      milliliters: milliliters,
      gender: gender,
      brand: brand,
      priceRange: priceRange,
      onSale: onSale
    };
  }

      // Attach event listener to apply filters button
      document.getElementById('applyFiltersBtn').addEventListener('click', applyFilters);
      document.getElementById('resetFiltersBtn').addEventListener('click', () => {
        let emptyFilter =  resetFilters()
        currentPerfumes = filterPerfumes(emptyFilter)
        displayPerfumes()
      });

    // Add price under Price Range
    rangeInput.addEventListener('input', function() {
      // Set default value
      rangeInputValue = document.getElementById('priceRangeValue'); 
      rangeInputValue.innerText = this.value > 0 ? this.value + "$" : "Not Selected";
    });

    document.getElementById('sort').addEventListener('change', function() {
      console.log(this)
      if(this.value === 'price') {
        currentPerfumes = sortByPrice(currentPerfumes)
        console.log("sorting by price")
        console.log(perfumes)
      } else if (this.value === 'milliliters') {
        currentPerfumes = sortByMilliliters(currentPerfumes)
      } else if (this.value === 'name') {
        currentPerfumes = sortByName(currentPerfumes)
      } else {
        currentPerfumes = resetOrder(currentPerfumes)
      }
      displayPerfumes(currentPerfumes)
    })

    // Sorting function by price
    function sortByPrice(perfumes) {
      return perfumes.slice().sort((a, b) => {
          return a.salePrice - b.salePrice;
      });
    }

    // Sorting function by milliliters
    function sortByMilliliters(perfumes) {
      return perfumes.slice().sort((a, b) => {
          return a.milliliters - b.milliliters;
      });
    }

    // Sorting function by name
    function sortByName(perfumes) {
      return perfumes.slice().sort((a, b) => {
          return a.name.localeCompare(b.name);
      });
    }

    function resetOrder(perfumes) {
      return perfumes.sort((a, b) => a.id - b.id);
  }


  async function displaySlides() {
    // Dynamicly add slides

    let slidesData = await getData('store-slides');
    let slides = slidesData.data
    const carouselIndicators = document.querySelector(".carousel-indicators");

    const carousel = document.querySelector(".carousel-inner");

    let brojac = 0;
    slides.forEach((slide) => {
      if (brojac == 0) {
        slideHtml = `<div class="carousel-item active">
                      <img src=${slide.src} class="d-block w-100" alt=${slide.alt}>
                      <div class="carousel-caption">
                        <h1 class="display-2">${slide.title}</h1>
                        <p class="lead">${slide.description}</p>
                      </div>
                    </div>`;

      carouselIndicators.innerHTML += `<li data-bs-target="#carouselExample" data-bs-slide-to=${brojac} class="active"></li>`;

      } else {
        slideHtml = `<div class="carousel-item">
                        <img src=${slide.src} class="d-block w-100" alt=${slide.alt}>
                        <div class="carousel-caption">
                          <h1 class="display-2">${slide.title}</h1>
                          <p class="lead">${slide.description}</p>
                        </div>
                      </div>`;

        carouselIndicators.innerHTML += `<li data-bs-target="#carouselExample" data-bs-slide-to=${brojac}></li>`;
    }

    brojac++;

    carousel.innerHTML += slideHtml;
    });
  }

  // Add item details to modal after Buy Now is clicked and show modal.
  function addModalDataOnBtnClick() {
    const buttons = document.querySelectorAll(".store-container .btn-item");

    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        console.log(button);
        console.log(e.target);
        const modalId = document.querySelector(".modal-id");
        const modalImg = document.querySelector(".modal-image");
        const modalTitle = document.querySelector(".modal-title");
        const modalDescription = document.querySelector(".modal-description");
        const modalOldPrice = document.querySelector(".modal-old-price");
        const modalPrice = document.querySelector(".modal-price");

        console.log(e.target.closest('.perfume-card').querySelector(".card-id").textContent)
        const itemId= 
          e.target.closest('.perfume-card').querySelector(".card-id").textContent;
        const itemImage = 
          e.target.closest('.perfume-card').querySelector(".card-image");
        const itemTitle =
          e.target.parentElement.querySelector(".card-title").textContent;
        const itemDescription =
          e.target.parentElement.querySelector(".card-text").textContent;
        const itemPrice =
          e.target.parentElement.querySelector(".card-price").textContent;
        const itemOldPrice =
          e.target.parentElement.querySelector(".old-price")?.textContent;
      
        modalId.textContent = itemId 
        console.log(itemId)
        modalImg.src = itemImage.src

        console.log(modalId)

        modalTitle.textContent = itemTitle;

        modalDescription.textContent = itemDescription;

        if (modalOldPrice) {
          modalOldPrice.textContent = itemOldPrice;
        }

        modalPrice.textContent = itemPrice;
      });
    });
  }



  const addToCartBtn = document.querySelector('#addToCartBtn')

  addToCartBtn.addEventListener('click', addItemToLocalstorage)

  function addItemToLocalstorage(e) {

    let productId = e.target.closest(".modal-dialog").querySelector('.modal-id').innerHTML
    let productImg = e.target.closest(".modal-dialog").querySelector('.modal-image').src
    let productName = e.target.closest(".modal-dialog").querySelector('.modal-title').innerHTML
    let productPrice = e.target.closest(".modal-dialog").querySelector('.modal-price').innerHTML
    //Get rid of $ sign
    productPrice = Number(productPrice.substring(1))
    console.log(productId)
    console.log(productPrice)
    var sampleItem = {
      id: productId,
      imgSrc: productImg,
      name: productName,
      price: productPrice,
      quantity: 1
    };

    let found = false;
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.forEach(function(item) {
      if (item.name === sampleItem.name) {
        item.quantity++;
        found = true;
      }
    });

    if (!found) {
      cartItems.push(sampleItem);
    }
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Reload the cart items after adding the sample item

    Toastify({
      text: "Successfully added to cart",
      duration: 2000,
      destination: "../cart.html",
      newWindow: true,
  
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "rgba(9, 133, 133)",
      },
      onClick: function(){} // Callback after click
    }).showToast();
  }










  













































  // async function submitFilters() {
  //   // Gather filter information
  //   const filterInfo = gatherFilterInformation();
  
  //   // Send fetch request to PHP server
  //   fetch('your_php_script.php', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(filterInfo)
  //   })
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     return response.json();
  //   })
  //   .then(data => {
  //     // Handle the response (perfumes)
  //     displayPerfumes(data);
  //   })
  //   .catch(error => {
  //     // Handle fetch error
  //     console.error('Fetch error:', error);
  //   });
  // }
  
  // // Sorting function
  // function sortPerfumes(perfumes, sortBy) {
  //   if (sortBy === 'price') {
  //     return perfumes.sort((a, b) => a.price - b.price);
  //   } else if (sortBy === 'milliliters') {
  //     return perfumes.sort((a, b) => a.milliliters - b.milliliters);
  //   } else if (sortBy === 'name') {
  //     return perfumes.sort((a, b) => a.name.localeCompare(b.name));
  //   } else {
  //     return perfumes; // No sorting
  //   }
  // }
  
  // // Function to handle filter changes
  // function handleFilterChange() {
  //   submitFilters(); // Submit filters on change
  // }
  
  // // Function to handle sort changes
  // function handleSortChange() {
  //   const sortBy = document.getElementById('sortSelect').value;
  //   const filteredPerfumes = gatherFilterInformation(); // Get current filtered perfumes
  //   const sortedPerfumes = sortPerfumes(filteredPerfumes, sortBy); // Sort the filtered perfumes
  //   displayPerfumes(sortedPerfumes); // Display the sorted perfumes
  // }
  
  // // Attach event listeners to filter and sort elements
  // document.getElementById('milliliters').addEventListener('change', handleFilterChange);
  // document.getElementById('gender').addEventListener('change', handleFilterChange);
  // document.getElementById('brand').addEventListener('change', handleFilterChange);
  // document.getElementById('priceRange').addEventListener('input', handleFilterChange);
  // document.getElementById('onSale').addEventListener('change', handleFilterChange);
  // document.getElementById('sortSelect').addEventListener('change', handleSortChange);
  
});
