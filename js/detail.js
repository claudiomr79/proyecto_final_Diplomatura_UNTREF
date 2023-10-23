class Producto {
    constructor(id, title, description, price, category, image, cuantity) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.category = category;
        this.image = image;
        this.cuantity = cuantity;
    }
}

let cuantity = (JSON.parse(localStorage.getItem('producto'))).cuantity;
//console.log(cuantity);

const productoElegido = JSON.parse(localStorage.getItem('producto'));
//console.log(productoElegido + "estoy en detail");

//console.log(productoElegido);
let detalleProducto = new Producto(productoElegido.id, productoElegido.title, productoElegido.description, productoElegido.price, productoElegido.category, productoElegido.image, productoElegido.cuantity);
let cantidad = detalleProducto.cuantity;      

let mostrarDetalle = (detalleProducto) => {
    const detail = document.getElementById('detail');
    let html = '';
    detail.innerHTML = html;
    html += `
        <div class="card">
            <img src="${detalleProducto.image}" class="card-img-top" alt="producto">
            <div class="card-body">
                <div class="card-detail">
                    <h5 class="card-title">${detalleProducto.title}</h5>
                    <p class="card-text" id="description">${detalleProducto.description}</p>
                    <p class="card-text">$${detalleProducto.price}</p>
                </div>
                <div class="card-cuantity">
                    <button class="btn" id="-">-</button>
                    <p>${ cuantity }</p>
                    <button class="btn" id="+">+</button>
                </div>
                <button class="btn" id="btn_back">Volver</button>
                <button class="btn" id="btn_add_cart_${detalleProducto.id}">Agregar al carrito</button>
            </div>
        </div>
        `;
    detail.innerHTML = html;
    mostrarCantidadCarrito();
    document.appendChild(detail);
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

document.addEventListener('click', (e) => {    
    if (e.target.id.includes('-')) {
        let cuantity = document.querySelector('.card-cuantity p');
        if (cuantity.innerHTML > 1) {
            cuantity.innerHTML--;
            cantidad--;
        }
    }

    if (e.target.id.includes('+')) {
        let cuantity = document.querySelector('.card-cuantity p');
        if (cuantity.innerHTML < 10) {
            cuantity.innerHTML++;
            cantidad++;
        }
    }
    if (e.target.id.includes('btn_back')) {
        window.location.href = '../index.html';
    }
    if (e.target.id.includes('btn_add_cart_')) {
        let id = e.target.id.split('_')[3];
        //console.log(id);
        let producto = JSON.parse(localStorage.getItem('producto'));
        let carrito = JSON.parse(localStorage.getItem('carrito'));
        let productoEnCarrito = carrito.find(producto => producto.id == id);
        if (productoEnCarrito) {
            productoEnCarrito.cuantity += cantidad;
        } else {
            producto.cuantity = cantidad;
            carrito.push(producto);
            console.log(carrito);
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
        //console.log(carrito);
        window.location.href = '../index.html';
    }
});
document.addEventListener('DOMContentLoaded', () => {
mostrarDetalle(detalleProducto);
});