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

function getProducto(id) {
    let data = fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.log(err));
        return data;
        
}


let data = fetch('https://fakestoreapi.com/products')
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
                             <p class="card-text">${producto.description}</p>
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
        
        productoSeleccionado = getProducto(id);
        const producto = new Producto(productoSeleccionado.id, productoSeleccionado.title, productoSeleccionado.description, productoSeleccionado.price, productoSeleccionado.category, productoSeleccionado.image);
        localStorage.setItem('producto', JSON.stringify(producto));
    }
});



    






