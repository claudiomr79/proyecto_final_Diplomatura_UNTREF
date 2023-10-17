class Producto {
    constructor(id, title, description, price, category, image) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.category = category;
        this.image = image;
    }
}

var cantidad = (JSON.parse(localStorage.getItem('producto'))).cantidad;
console.log(cantidad);
const productoElegido = JSON.parse(localStorage.getItem('producto'));
//console.log(productoElegido + "estoy en detail");

//console.log(productoElegido);
let detalleProducto = new Producto(productoElegido.id, productoElegido.title, productoElegido.description, productoElegido.price, productoElegido.category, productoElegido.image);

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
                    <p>${ cantidad }</p>
                    <button class="btn" id="+">+</button>
                </div>
                <button class="btn" id="btn_back">Volver</button>
                <button class="btn" id="btn_add_cart_${detalleProducto.id}">Agregar al carrito</button>
            </div>
        </div>
        `;
    detail.innerHTML = html;
    document.body.appendChild(detail);


}

document.body.addEventListener('click', (e) => {    
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
            productoEnCarrito.cantidad += cantidad;
        } else {
            producto.cantidad = cantidad;
            carrito.push(producto);
            console.log(carrito);
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
        //console.log(carrito);
        window.location.href = '../index.html';
    }
});

document.body.addEventListener('click', (e) => {
    if (e.target.id.includes('-')) {
        let cantidad = document.querySelector('.card-cuantity p');
        if (cantidad.innerHTML > 1) {
            cantidad.innerHTML--;
            cantidad--;
        }
    }
});

document.body.addEventListener('click', (e) => {
    if (e.target.id.includes('+')) {
        let cantidad = document.querySelector('.card-cuantity p');
        if (cantidad.innerHTML < 10) {
            cantidad.innerHTML++;
            cantidad++;
        }
    }

});

mostrarDetalle(detalleProducto);