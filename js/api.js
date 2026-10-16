const productsContainer = document.getElementById("products");
const cartCount = document.getElementById("cart-count");

let cart = [];

fetch("https://fakestoreapi.com/products")
    .then(function(response) {
        return response.json();
    })
    .then(function(products) {

        products.forEach(function(product) {

            productsContainer.innerHTML += `
                <div class="product">
                    <img src="${product.image}" alt="${product.title}">
                    <h2>${product.title}</h2>
                    <p>$${product.price}</p>
                    <p>${product.category}</p>
                    <p>⭐ ${product.rating.rate}</p>
                    <button class="add-btn" data-id="${product.id}">Add to Cart</button>
                </div>
            `;

        });

        const buttons = document.querySelectorAll(".add-btn");

        buttons.forEach(function(button) {
            button.addEventListener("click", function() {
                const id = button.dataset.id;
                cart.push(id);
                cartCount.textContent = cart.length;
                console.log("Cart:", cart);
            });
        });

    })
    .catch(function(error) {
        console.log(error);
    });