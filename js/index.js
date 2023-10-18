
//detalle de producto
function productDetail(id) {
    let data = fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(producto => {
            //console.log(producto);
            producto.cuantity = 10;
            localStorage.setItem('producto', JSON.stringify(producto));
            //ir a pagina detail.html
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
                             <h5 class="card-title">${producto.title}</h5>
                             <p id="desc" class="card-text">${producto.description}</p>
                             <button class="btn" id="btn_view_more_${producto.id}">Ver mas</button>
                        </div>
                    </div>
                    `
            listado.innerHTML = html;
        });
        document.body.appendChild(listado);
    })
    .catch(err => console.log(err));

document.body.addEventListener('click', (e) => {
    
    if (e.target.id.includes('btn_view_more_')) {
        let id = e.target.id.split('_')[3];
        productDetail(id);
    }
});


const crearCarrito = () => {
    let carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito') == null) {
        crearCarrito();
    }
});    






