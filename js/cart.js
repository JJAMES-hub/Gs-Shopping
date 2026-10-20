// Get the cart elements from the HTML

const cartItemsContainer = document.getElementById("cart-items");

const cartCount = document.getElementById("cart-count");

const cartTotal = document.getElementById("cart-total");

const clearCartButton = document.getElementById("clear-cart");


// Update the cart count

function updateCartCount() {

    const cart = JSON.parse(
        localStorage.getItem("shoppingCart")
    ) || [];

    if (cartCount) {

        cartCount.textContent = cart.length;

    }

}


// Display the products in the cart

function displayCart() {

    if (!cartItemsContainer) {
        return;
    }


    // Get the saved cart

    const cart = JSON.parse(
        localStorage.getItem("shoppingCart")
    ) || [];


    cartItemsContainer.innerHTML = "";

    let totalPrice = 0;


    // Check whether the cart is empty

    if (cart.length === 0) {

        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";

        if (cartTotal) {

            cartTotal.textContent = "0.00";

        }

        return;

    }


    // Display each product

    cart.forEach(function (product, index) {

        totalPrice += product.price;

        cartItemsContainer.innerHTML += `
            <div class="product">

                <img
                    src="${product.image}"
                    alt="${product.title}"
                >

                <h3>${product.title}</h3>

                <p>Price: $${product.price.toFixed(2)}</p>

                <button
                    class="remove-btn"
                    data-index="${index}"
                >
                    Remove
                </button>

            </div>
        `;

    });


    // Display the total price

    if (cartTotal) {

        cartTotal.textContent = totalPrice.toFixed(2);

    }


    // Select all Remove buttons

    const removeButtons = document.querySelectorAll(".remove-btn");


    // Remove a product when its button is clicked

    removeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const productIndex = Number(button.dataset.index);


            // Get the latest cart

            const cart = JSON.parse(
                localStorage.getItem("shoppingCart")
            ) || [];


            // Remove one product

            cart.splice(productIndex, 1);


            // Save the updated cart

            localStorage.setItem(
                "shoppingCart",
                JSON.stringify(cart)
            );


            // Refresh the cart display

            displayCart();

            updateCartCount();

        });

    });

}


// Clear all products from the cart

function clearCart() {

    localStorage.setItem("shoppingCart", JSON.stringify([]));

    displayCart();

    updateCartCount();

}


// Listen for clicks on the Clear Cart button

if (clearCartButton) {

    clearCartButton.addEventListener("click", function () {

        clearCart();

    });

}


// Update the cart when the page loads

updateCartCount();

displayCart();