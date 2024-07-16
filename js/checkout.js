document.addEventListener('DOMContentLoaded', function() {
    // Function to load items from local storage and populate the cart table
    function loadCartItems() {
        var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        var table = document.getElementById('cart-items');
        var total = 0;
  
        // Clear existing rows
        table.innerHTML = '';
  
        // Create table header
        var thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Product Total</th>
            </tr>
        `;
        table.appendChild(thead);
  
        // Create table body
        var tbody = document.createElement('tbody');
  
        cartItems.forEach(function(item) {
            var row = document.createElement('tr');
  
            var productImage = document.createElement('td');
            var imageHtml = document.createElement('img');
            imageHtml.classList.add('cart-img')
            productImage.classList.add('cart-img-box')
            productImage.appendChild(imageHtml)
            imageHtml.src = item.imgSrc;
  
            var productName = document.createElement('td');
            productName.textContent = item.name;
  
            var price = document.createElement('td');
            price.textContent = '$' + item.price.toFixed(2);
  
            var quantity = document.createElement('td');
            quantity.innerHTML = `
                <div class="cart-btn-container">
                    <span>${item.quantity}</span>
                </div>
            `;
  
            var totalCell = document.createElement('td');
            var itemTotal = item.price * item.quantity;
            totalCell.textContent = '$' + itemTotal.toFixed(2);
  
            row.appendChild(productImage);
            row.appendChild(productName);
            row.appendChild(price);
            row.appendChild(quantity);
            row.appendChild(totalCell);
  
            tbody.appendChild(row);
  
            total += itemTotal;
        });
  
        table.appendChild(tbody);
  
        // Create table footer
        var tfoot = document.createElement('tfoot');
        tfoot.innerHTML = `
            <tr>
                <td colspan="4" class="text-right">Total:</td>
                <td id="totalPrice">$${total.toFixed(2)}</td>
            </tr>
        `;
        table.appendChild(tfoot);
  
        // Event listeners for plus and minus buttons
        document.querySelectorAll('.cart-btn').forEach(function(button) {
            button.addEventListener('click', function(event) {
                var action = event.target.getAttribute('data-action');
                var index = parseInt(event.target.getAttribute('data-index'));
  
                if (action === 'increase') {
                    cartItems[index].quantity++;
                } else if (action === 'decrease') {
                    if (cartItems[index].quantity > 1) {
                        cartItems[index].quantity--;
                    } else {
                        // Remove item if quantity is 1 or less
                        cartItems.splice(index, 1);
                    }
                }
  
                // Update local storage
                localStorage.setItem('cart', JSON.stringify(cartItems));
  
                // Reload cart items after updating quantity
                loadCartItems();
            });
        });
    }
  
    // Call the function to load items when the page is loaded
    loadCartItems();
  
  
  
  
  
      // Form Validation
    const form = document.querySelector("#form");
    const fName = document.querySelector("#inputFName");
    const lName = document.querySelector("#inputLName");
    const email = document.querySelector("#inputEmail");
    const phone = document.querySelector("#inputPhone");
    const address = document.querySelector("#inputAddress");
    const terms = document.querySelector('[name="checkTerms"]');
    const countrySelect = document.querySelector("#inputCountry");
    const successMsg = $(".success-msg");
    const inputs = document.querySelectorAll("input");
    successMsg.hide();
  
    // terms.addEventListener('click', () => {
    //   console.log(terms)
    //   if(terms.checked) {
    //     console.log('cekirano')
    //   }
    // })
  
    // Zanimljiv nacin, vredi pogledati
    const functionLookup = {
      checkFName: checkFName,
      checkLName,
      checkEmail,
      checkPhone,
      checkAddress,
    };
  
    // Po izlasku iz svakog elementa prikazi greske ako postoje
    inputs.forEach((input) =>
      input.addEventListener("blur", () => {
        let greske = [];
        const inputName = input.id.substring(5);
        const errorMsgName =
          input.id.substring(5).substring(0, 1).toLowerCase() +
          input.id.substring(6) +
          "Field";
        const checkFuncName = "check" + inputName;
        console.log(checkFuncName);
  
        if (functionLookup[checkFuncName]) {
          greske = functionLookup[checkFuncName]();
          if (greske.length > 0) {
            $("." + errorMsgName)
              .text(greske[0])
              .fadeIn();
            $(`#` + input.id).css("border", "1px solid red");
          } else {
            $("." + errorMsgName)
              .text("")
              .fadeIn();
            $(`#` + input.id).css("border", "1px solid transparent");
          }
        } else {
          console.error(`Function ${checkFuncName} not found`);
        }
  
        console.log($`#${input.id}`);
        console.log(input.id);
        console.log(errorMsgName);
        console.log(inputName);
        console.log(input);
      })
    );
  
    function checkFName() {
      const nameErrors = [];
      const patt = `^[A-ZČĆĐŠŽ][a-zčćđšž]+$`;
      const fNameValue = fName.value.trim();
      const regex = new RegExp(patt);
  
      if (fNameValue.length < 3 || !regex.test(fNameValue)) {
        nameErrors.push(
          "Name must start with capital letter follower by lowercase letters. Minimum 3 characters."
        );
      }
  
      return nameErrors;
    }
  
    function checkLName() {
      const lNameErrors = [];
      const patt = `^[A-ZČĆĐŠŽ][a-zčćđšž]+$`;
      const lNameValue = lName.value.trim();
      const regex = new RegExp(patt);
  
      if (lNameValue.length < 3 || !regex.test(lNameValue)) {
        lNameErrors.push(
          "Last Name must start with capital letter follower by lowercase letters. Minimum 3 characters."
        );
      }
  
      return lNameErrors;
    }
  
    function checkEmail() {
      const emailErrors = [];
  
      emailValue = email.value.trim();
      emailLength = emailValue.length;
      const patt = `^[a-z]((\.|-|_)?[a-z0-9]){2,}@[a-z]{2,}\\.[a-z]{2,6}$`;
      const regEx = new RegExp(patt);
  
      if (
        emailLength < 10 ||
        !regEx.test(emailValue)
      ) {
        emailErrors.push(
          "Email must contain @ and be more than 10 characters long. Valid format: example@gmail.com"
        );
      }
  
      return emailErrors;
    }
  
    function checkPhone() {
      const phoneErrors = [];
  
      phoneValue = phone.value.trim();
      phoneLength = phoneValue.length;
      const pattern = /^\d+$/;
      const regEx = new RegExp(pattern);
  
      if (!regEx.test(phoneValue) || phoneLength < 9) {
        phoneErrors.push(
          "Phone must have at least 9 numbers. Characters are not allowed."
        );
      }
  
      return phoneErrors;
    }
  
    function checkCountry() {
      const countryErrors = [];
  
      console.log(countrySelect.selectedIndex == 0);
  
      if (countrySelect.selectedIndex == 0) {
        countryErrors.push("You must select a country.");
      }
  
      return countryErrors;
    }
  
    function checkAddress() {
      const addressErrors = [];
      const patt = `[!#$%^&*()./\`~+_=-]`;
      const addressValue = address.value.trim();
      const regex = new RegExp(patt);
  
      if (addressValue.length < 5 || regex.test(addressValue)) {
        addressErrors.push("Address must be at least 7 characters long.");
      }
  
      return addressErrors;
    }
  
    function checkTerms() {
      const termsErrors = [];
  
      if (!terms.checked) {
        termsErrors.push("You must agree to our terms and conditions.");
      }
  
      return termsErrors;
    }
  
    let timer;
    function checkFrom(e) {
      successMsg.text("");
      successMsg.hide();
      clearTimeout(timer);
      e.preventDefault();
      let isValid = true;
      let greskeObj = {
        fName: checkFName(),
        lName: checkLName(),
        email: checkEmail(),
        phone: checkPhone(),
        address: checkAddress(),
        terms: checkTerms(),
        country: checkCountry(),
    };
  
    for (greska in greskeObj) {
    console.log(greska.length);
    if (greskeObj[greska].length == 0) {
        $("." + greska + "Field")
        .text("")
        .fadeIn();
        $("#input" + greska.charAt(0).toUpperCase() + greska.slice(1)).css(
        "border",
        "1px solid transparent"
        );
    } else {
        $("." + greska + "Field")
        .text(greskeObj[greska][0])
        .hide()
        .fadeIn();
        $("#input" + greska.charAt(0).toUpperCase() + greska.slice(1)).css(
        "border",
        "1px solid red"
        );
        if (greska == "country") {
        $("#input" + greska.charAt(0).toUpperCase() + greska.slice(1)).val(
            "--Choose--"
        );
        } else {
        $("#input" + greska.charAt(0).toUpperCase() + greska.slice(1)).val(
            ""
        );
        }
    }
    }

    for (greska in greskeObj) {
    if (greskeObj[greska].length > 0) {
        isValid = false;
    }
    }

    timer = setTimeout(() => {
    for (greska in greskeObj) {
        $("." + greska + "Field").fadeOut();
        $("#input" + greska.charAt(0).toUpperCase() + greska.slice(1)).css(
        "border",
        "1px solid transparent"
        );
    }

    successMsg.fadeOut().text("");
    }, 3000);

    if (!isValid) {
    return;
    } 

    for (greska in greskeObj) {
        if (greska == "country") {
        $("#input" + greska.charAt(0).toUpperCase() + greska.slice(1)).val(
            "--Choose--"
        );
        } else {
        $("#input" + greska.charAt(0).toUpperCase() + greska.slice(1)).val(
            ""
        );
        }
    }
    successMsg.text("You successfully submited the form!");
    successMsg.fadeIn();

    //Kod za slanje na backend i upis u bazu podataka
    form.submit();
    }
  
    $(".form-submit").click(checkFrom);
  });
  
  