document.addEventListener("DOMContentLoaded", function () {
    const cart = [];
    const cartIcon = document.getElementById("cart-icon");
    const cartCount = document.getElementById("cart-count");
  

    function updateCartCount() {
      cartCount.textContent = cart.length;
    }
  
    
    function addToCart(event) {
      event.preventDefault();
      
      const productElement =
        event.target.closest(".product_item") ||
        event.target.closest(".product-card");
  
      if (!productElement) {
        console.error("Product container not found!");
        return;
      }
  
      
      let productNameElement = productElement.querySelector("h5.card-title");
      if (!productNameElement) {
        productNameElement = productElement.querySelector("h3.card-title");
      }
      if (!productNameElement) {
        console.error("Product name element not found!");
        return;
      }
      const productName = productNameElement.textContent;
  
      const productPrice = productElement.querySelector(".price")
      ? productElement.querySelector(".price").textContent
      : "$100"; 

  
      
      const imageElement = productElement.querySelector("img");
      const productImage = imageElement ? imageElement.src : "";
  
      const product = {
        name: productName,
        price: productPrice,
        image: productImage,
      };
  
      cart.push(product);
      updateCartCount();
      saveCartToLocalStorage();
      alert(`${productName} added to cart!`);
    }
  
    
    function saveCartToLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  
    
    function loadCartFromLocalStorage() {
      const savedCart = JSON.parse(localStorage.getItem("cart"));
      if (savedCart) {
        cart.push(...savedCart);
        updateCartCount();
      }
    }
  
    
    document.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", addToCart);
    });
  

    loadCartFromLocalStorage();
  

    cartIcon.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "checkout.html";
    });
  });
  