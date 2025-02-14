
async function fetchProducts() {
    try {
        const response = await(fetch("http://localhost:3000/products"));
        const products = await response.json();
        console.log(products)

        const productList = document.getElementById("productList");
         productList.innerHTML = '';

        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add("product")
            productDiv.innerHTML = `<h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>${product.price}</P>
            <p>${product.category}</p>
            <p>Stock: ${product.stock}</p>`

            productList.appendChild(productDiv)
            
        });
    } catch {
        alert("Cannot fetch data")
    }
}
document.addEventListener('DOMContentLoaded', fetchProducts)