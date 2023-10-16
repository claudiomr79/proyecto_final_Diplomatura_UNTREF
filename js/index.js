import { showDetail } from '../js/detail.js';

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
                             <button class="btn" id="btn_view_more_${producto.id}"><a href="../pages/detail.html">Ver mas</a></button>
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
        showDetail(id);
    }
});




