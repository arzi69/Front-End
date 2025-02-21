document.addEventListener("DOMContentLoaded", function () {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  const checkoutButton = document.getElementById("checkout-btn");
  const paymentMethodOptions = document.querySelectorAll('input[name="payment"]');
  const creditCardFields = document.getElementById("credit-card-fields");
  const paypalFields = document.getElementById("paypal-fields");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalPrice = 0;

  function displayCart() {
    cartItemsContainer.innerHTML = "";
    totalPrice = 0;

    cart.forEach((product, index) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("cart-item");
      itemElement.innerHTML = `
          <img src="${product.image}" width="50" alt="${product.name}">
          <span>${product.name}</span>
          <span>${product.price}</span>
          <button data-index="${index}" class="remove-btn">Remove</button>
        `;
      cartItemsContainer.appendChild(itemElement);
      totalPrice += parseFloat(product.price.replace("$", ""));
    });

    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;

    const cartCountElement = document.getElementById("cart-count");
    cartCountElement.textContent = cart.length; 
  }

  function removeItem(event) {
    if (event.target.classList.contains("remove-btn")) {
      const index = event.target.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
    }
  }

  function checkout() {

    if (cart.length === 0) {
      alert("Your cart is empty. Please add items before proceeding to payment.");
      return;
    }

    const email = emailInput.value;
    const phone = phoneInput.value;
    const paymentMethodElement = document.querySelector('input[name="payment"]:checked');
    if (!paymentMethodElement) {
      alert("Please select a payment method.");
      return;
    }
    const paymentMethod = paymentMethodElement.value;

    if (!email || !phone) {
      alert("Please provide your email and phone number.");
      return;
    }

    let paymentDetails = {};
    if (paymentMethod === "credit-card") {
      const cardNumber = document.getElementById("card-number").value;
      const expDate = document.getElementById("exp-date").value;
      const cvv = document.getElementById("cvv").value;

      if (!cardNumber || !expDate || !cvv) {
        alert("Please fill in all the credit card details.");
        return;
      }

      paymentDetails = {
        cardNumber,
        expDate,
        cvv,
      };
    } else if (paymentMethod === "paypal") {
      const paypalEmail = document.getElementById("paypal-email").value;

      if (!paypalEmail) {
        alert("Please provide your PayPal email.");
        return;
      }

      paymentDetails = {
        paypalEmail,
      };
    }

    alert("Checking details, please wait a moment!");
    localStorage.removeItem("cart");
    window.location.href = "order-confirmation.html";
  }

  function togglePaymentFields() {
    const selectedPaymentMethod = document.querySelector('input[name="payment"]:checked').value;

    if (selectedPaymentMethod === "credit-card") {
      creditCardFields.style.display = "block";
      paypalFields.style.display = "none";
    } else if (selectedPaymentMethod === "paypal") {
      creditCardFields.style.display = "none";
      paypalFields.style.display = "block";
    }
  }


  paymentMethodOptions.forEach((option) => {
    option.addEventListener("change", togglePaymentFields);
  });


  togglePaymentFields();

  cartItemsContainer.addEventListener("click", removeItem);
  checkoutButton.addEventListener("click", checkout);
  displayCart();
});
