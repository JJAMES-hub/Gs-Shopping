const productsContainer = document.getElementById("products");
let cart = [];
fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(products => {

        products.forEach(product => {

            productsContainer.innerHTML += `
                <div class="product">

                    <img src="${product.image}" alt="${product.title}">

                    <h2>${product.title}</h2>

                    <p>$${product.price}</p>

                    <p>${product.category}</p>
                    <p>${product.rating.rate}</p>
                     <button>Add to Cart</button>

                </div>
            `;

        });

    })
    .catch(error => {
        console.log("Error:", error);
    });