const productsContainer = document.getElementById("products");


// Fetch products from Fake Store API

fetch("https://fakestoreapi.com/products")

    .then(function (response) {

        if (!response.ok) {
            throw new Error("Unable to fetch products.");
        }

        return response.json();

    })

    .then(function (products) {

        // Display the products

        if (productsContainer) {

            productsContainer.innerHTML = "";

            products.forEach(function (product) {

                productsContainer.innerHTML += `
                    <div class="product">

                        <img
                            src="${product.image}"
                            alt="${product.title}"
                        >

                        <h3>${product.title}</h3>

                        <p>Price: $${product.price.toFixed(2)}</p>

                        <p>Category: ${product.category}</p>

                        <p>⭐ ${product.rating.rate}</p>

                        <button
                            class="add-btn"
                            data-id="${product.id}"
                        >
                            Add to Cart
                        </button>

                    </div>
                `;

            });


            // Select all Add to Cart buttons

            const addToCartButtons = document.querySelectorAll(".add-btn");

            // Add a click event to each button

            addToCartButtons.forEach(function (button) {

                button.addEventListener("click", function () {

                    const productId = Number(button.dataset.id);


                    // Find the selected product

                    const selectedProduct = products.find(function (product) {

                        return product.id === productId;

                    });


                    if (selectedProduct) {

                        // Get the existing cart

                        let cart = JSON.parse(
                            localStorage.getItem("shoppingCart")
                        ) || [];

                        // Add the selected product

                        cart.push(selectedProduct);

                        // Save the updated cart

                        localStorage.setItem(
                            "shoppingCart",
                            JSON.stringify(cart)
                        );

                        // Update the cart count

                        updateCartCount();

                        alert("Product added to cart!");

                    }

                });

            });

        }

    })

    .catch(function (error) {

        console.error("Error loading products:", error);

        if (productsContainer) {

            productsContainer.innerHTML = `
                <p>Sorry, we could not load the products.</p>
                <p>Please check your internet connection and try again.</p>
            `;

        }

    });