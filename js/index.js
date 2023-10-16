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
                             <button id="btn_view_more">Ver más</button>
                        </div>
                    </div>
                    `
            listado.innerHTML = html;
        });
        document.body.appendChild(listado);
    })
    .catch(err => console.log(err));

