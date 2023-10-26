const mostrarCarrito = function () {
    const carrito = JSON.parse(localStorage.getItem('carrito'));
    const cart = document.getElementById('cart');

    for (const producto of carrito) {
        const div = document.createElement('div');
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
        const div2 = document.createElement('div');
        const hr = document.createElement('hr');
        hr.style.width = '100vw';
        hr.style.margin = '15px';
        hr.style.border = '1px solid #13250e';
        div2.appendChild(hr);
        cart.appendChild(div);
        cart.appendChild(div2);
    }
}
const mostrarCantidadCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem('carrito'));
    let total = 0;
    for (const producto of carrito) {
        total += producto.cuantity;
    }
    const cart = document.getElementById('cart-value');
    let html = '';
    cart.innerHTML = html;
    html += `
        <span>${total}</span>
        `;
    cart.innerHTML = html;
    document.appendChild(cart);
};
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
const totalCompra = function () {
    const carrito = JSON.parse(localStorage.getItem('carrito'));
    let total = 0;
    for (const producto of carrito) {
        total += producto.price * producto.cuantity;
    }
    const totalCompra = document.getElementById('total');
    if (total === 0) {
        totalCompra.innerHTML = `<h2>Carrito Vacio</h2>
                                <button class=" btn-chico btn"><a href="../index.html">Seguir comprando</a></button>`;
    } else {
        totalCompra.innerHTML = `
        <h2>Total: $${total.toFixed(2)}</h2>
        <button class="btn-finalizar btn">Finalizar Compra</button>
        `;
        finalizarCompra();
    }
}
const finalizarCompra = () => {
    const carrito = JSON.parse(localStorage.getItem('carrito'));
    const btnFinalizar = document.querySelector('.btn-finalizar');
    btnFinalizar.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Gracias por su compra');
        localStorage.clear();
        window.location.href = '../index.html';
    });
};

document.addEventListener('DOMContentLoaded', () => {
    mostrarCarrito();
    totalCompra();
    mostrarCantidadCarrito();
});
