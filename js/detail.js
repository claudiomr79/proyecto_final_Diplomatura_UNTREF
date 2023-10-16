//recibe un id de producto y lo muestra en detail.html

export function showDetail(id) {
    let data = fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(json => console.log(json))
        .then(producto => {
            document.addEventListener('DOMContentLoaded', () => {
                let detalle = document.getElementById('detail');
                let html = '';
                detalle.innerHTML = html;
                html += `
                        <div class="card">
                            <img src="${producto.image}" class="card-img-top" alt="...">
                            <div class="card-body">
                                 <h5 class="card-title">${producto.title}</h5>
                                 <h6 class="card-title">${producto.category}</h6>
                                 <p class="card-text">${producto.description}</p>
                                 <p class="card-text">$${producto.price}</p>
                                 <button class="btn" id="btn_view_more_${producto.id}">Ver más</button>
                            </div>
                        </div>
                        `
                detalle.innerHTML = html;
                document.body.appendChild(detalle);
            })
        })
        .catch(err => console.log(err));
}

