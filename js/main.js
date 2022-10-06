let cartIcon = document.getElementById("cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.getElementById("close-cart");
// let removeItem = document.getElementById("cart-remove");

cartIcon.onclick = () => {
  cart.classList.add("active");
  console.log("cart is active");
};

closeCart.onclick = () => {
  cart.classList.remove("active");
  console.log("cart is not active");
};

// Working Cart
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// Making Function Ready
function ready() {
  var removeCartItemButtons = document.getElementsByClassName("cart-remove");

//   console.log(removeCartItemButtons);

//   console.log("ready");
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addToCartClicked);
  }

  var purchaseButton = document.getElementsByClassName("order-now");
  for (var i = 0; i < purchaseButton.length; i++) {
    var button = purchaseButton[i];
    button.addEventListener("click", purchaseClicked);
  }
}

// INI-REMOVE
function removeCartItem(event) {
  var buttonClicked = event.target;
  var itemRemoved = buttonClicked.parentElement.parentElement;
  var priceRemoved = itemRemoved.getElementsByClassName("cart-price");
  var quantityRemoved = itemRemoved.getElementsByClassName("cart-quantity");
  var totalPrice = document.getElementsByClassName("total-price")[0];
  totalPrice = parseFloat(totalPrice.innerText.replace(" ", "BTC"));
  var priceTemp = parseFloat(priceRemoved[0].innerText.replace(" ", "BTC"));
  var quantityTemp = quantityRemoved[0].value;
  var totalTemp = priceTemp * quantityTemp;
  var priceRemoved = totalPrice - totalTemp;
  console.log(priceRemoved);

  document.getElementsByClassName("total-price")[0].innerText =
    priceRemoved + " BTC";

  buttonClicked.parentElement.parentElement.remove();
  //   if (typeof cartContent != "undefined" && cartContent != null) {
  //     updateTotal();
  //   }
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  console.log("quantity changed");
  updateTotal();
}

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;

  console.log(button.parentElement.parentElement);

  var title = shopItem.getElementsByClassName("card-title")[0].innerText;
  var price = shopItem.getElementsByClassName("price")[0].innerText;
  var itemImg = shopItem.getElementsByClassName("card-img-top")[0].src;
  addProductToCart(title, price, itemImg, shopItem);

  var totalPrice = document.getElementsByClassName("total-price")[0];
  totalPrice = parseFloat(totalPrice.innerText.replace(" ", "BTC"));

  price = parseFloat(price.replace("BTC", " "));

  var newTotalPrice = totalPrice + price;
  console.log(price);
  document.getElementsByClassName("total-price")[0].innerText =
    newTotalPrice + " BTC";

  //   updateTotal();

  // var addedIntoCart = (function () {
  //   var isThere = false;
  //   return function() {
  //       if (!isThere) {
  //           isThere = true;
  //           addProductToCart(title, price, itemImg, shopItem);
  //           updateTotal();
  //       }
  //   }
  // })
}

function addProductToCart(title, price, itemImg, shopItem) {
  var arrayOfCartItems = [];
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  cartShopBox.classList.add("d-flex");
  cartShopBox.classList.add("flex-column");

  var cartItems = document.getElementsByClassName("card-body")[0];
  var cartItemsNames = cartItems.getElementsByClassName("card-title");

  for (let i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert("Maaf, item yang anda tambahkan sudah ada di keranjang!");
      return;
    }
  }

  // Templateji
  var cartBoxContent = `<div class="row">
                        <div class="col my-auto">
                            <img src="${itemImg}" alt="" class="cart-img">
                        </div>
                        <div class="col my-auto">
                        <div class="cart-product-title">${title}</div>
                        <div class="cart-price">${price}</div>
                        <input type="number" value="1" class="cart-quantity">
                        </div>
                        <div class="col my-auto">
                        <i class='bx bxs-trash-alt cart-remove'></i> 
                        </div>
                    </div>`;

  var cartContent = document.getElementsByClassName("cart-content")[0];
  cartShopBox.innerHTML = cartBoxContent;

  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);

  cartContent.append(cartShopBox);
}

function updateTotal() {
  console.log("update total");
  let total = 0;
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");

  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    console.log(priceElement);
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    console.log(quantityElement);
    var price = parseFloat(priceElement.innerText.replace(" ", "BTC"));
    var quantity = quantityElement.value;
    console.log(price);
    console.log(quantity);
    total += price * quantity;
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("total-price")[0].innerText =
      total + " BTC";
  }
}

async function purchaseClicked() {
  var orderList = document.getElementsByClassName("cart-content")[0];
  var orderListTitle = orderList.getElementsByClassName("cart-product-title");
  var orderListQuantity = orderList.getElementsByClassName("cart-quantity");
  let orderListTitleArray = [];
  let orderListQuantityArray = [];

  for (let index = 0; index < orderListTitle.length; index++) {
    orderListTitleArray[index] = orderListTitle[index].innerText;
  }

  for (let index = 0; index < orderListQuantity.length; index++) {
    orderListQuantityArray[index] = orderListQuantity[index].value;
  }

  var orderListArray = [];
  for (let index = 0; index < orderListTitleArray.length; index++) {
    orderListArray[index] = [
      orderListTitleArray[index],
      orderListQuantityArray[index],
    ];
  }

  console.log(orderListArray);

  let csvContent = "data:text/csv;charset=utf-8,";

  orderListArray.forEach(function (rowArray) {
    let row = rowArray.join(",");
    csvContent += row + "\r\n";
  });

  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "my_data.csv");
  document.body.appendChild(link);
  link.click();
}
