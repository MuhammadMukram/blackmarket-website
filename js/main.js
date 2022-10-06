let cartIcon = document.getElementById("cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.getElementById("close-cart");

cartIcon.onclick = () => {
    cart.classList.add("active");
    console.log("cart is active");
}

closeCart.onclick = () => {
    cart.classList.remove("active");
    console.log("cart is not active");
}
