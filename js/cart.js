const mostrarCarrito = function () {
    const carrito = JSON.parse(localStorage.getItem('carrito'));
    const cart = document.getElementById('cart');


    let color = 1;
    for (const producto of carrito) {
        const div = document.createElement('div');
        div.style.backgroundColor = (color % 2 === 0) ? "#e9f5e3" : '#f6faf3';
        div.classList.add('producto');
        div.innerHTML = `
        <div class="cart-image">
            <img src="${producto.image}" alt="${producto.title}">
        </div>
        <div class="cart-info">
            <h3>${producto.title.lenght < 25 ? producto.title : (producto.title.slice(0, 25) + "...")}</h3>
            <p>Precio: $${producto.price}</p>
            <p>Cantidad: ${producto.cuantity}</p>
           <strong><span class="remove" id="remove_${producto.id}">❌</span></strong> 
        </div>
    `;
        cart.appendChild(div);
        color++;
    }
}
const removeProduct = function (id) {
    const carrito = JSON.parse(localStorage.getItem('carrito'));
    const newCarrito = carrito.filter(producto => producto.id != id);
    localStorage.setItem('carrito', JSON.stringify(newCarrito));
    window.location.reload();
}
document.addEventListener('click', (e) => {
    if (e.target.id.includes('remove_')) {
        let id = e.target.id.split('_')[1];
        removeProduct(id);
    }    
});
const totalCompra = function (){
    const carrito = JSON.parse(localStorage.getItem('carrito'));
    let total = 0;
    for (const producto of carrito) {
        total += producto.price * producto.cuantity;
    }
    const totalCompra = document.getElementById('total');
    totalCompra.innerHTML = `<h2>Total: $${total.toFixed(2)}</h2>`;
}
document.addEventListener('DOMContentLoaded', () => {
    mostrarCarrito();
    totalCompra();
});
