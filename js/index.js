
//detalle de producto
function productDetail(id) {
    let data = fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(producto => {
            producto.cuantity = 1;
            localStorage.setItem('producto', JSON.stringify(producto));
            window.location.href = './pages/detail.html';
        })
        .catch(err => console.log(err));
        
}
//listado de productos
    fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(productos => {
        let listado = document.getElementById('product-list');
        let html = '';
        listado.innerHTML = html;
        productos.forEach(producto => {
            html += `
                    <div class="card">
                        <img src="${producto.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                             <h5 class="card-title">${producto.title.lenght < 20 ? producto.title : (producto.title.slice(0,20) + "...")}</h5>
                             <button class="btn" id="btn_view_more_${producto.id}">Ver mas</button>
                        </div>
                    </div>
                    `
            listado.innerHTML = html;
        });
        document.appendChild(listado);
    })
    .catch(err => console.log(err));

document.addEventListener('click', (e) => {
    
    if (e.target.id.includes('btn_view_more_')) {
        let id = e.target.id.split('_')[3];
        productDetail(id);
    }
});


const crearCarrito = () => {
    let carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
};
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

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito') == null) {
        crearCarrito();
    }
    mostrarCantidadCarrito();
});    






