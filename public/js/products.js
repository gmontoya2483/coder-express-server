const socket = io();

socket.on('from-server-request-socket-handler', ()=> {
    socket.emit('from-client-products');
});


socket.on('from-sever-new-product', (product) => {
    console.log({product});
    renderNewProduct(product);
});



function saveProduct() {
    const inputTitle = document.querySelector('#title');
    const inputPrice = document.querySelector('#price');
    const inputThumbnail = document.querySelector('#thumbnail');

    if(!inputTitle.value ||  !inputPrice.value || !inputThumbnail.value) {
        alert("Se deben completar todos los campos");
        return;
    }

    const newProduct = {
        title: inputTitle.value,
        price: inputPrice.value,
        thumbnail: inputThumbnail.value
    }

    socket.emit('from-client-new-product', newProduct);

    inputTitle.value = "";
    inputPrice.value = ""
    inputThumbnail.value = ""
    inputTitle.focus();

}

function renderNewProduct(product) {

    if(!document.querySelector('#productTable')){
        createTable();
    }

    const tableBody = document.querySelector('#productsContent')
    const newRow = `
                    <tr>
                        <td>${ product.title }</td>
                        <td>${ product.price }</td>
                        <td>
                            <img width="30px" src="${ product.thumbnail}" alt="${ product.title }">
                        </td>
                    </tr>
    `;

    const newRowHtml = document.createElement("TR");
    newRowHtml.innerHTML = newRow;
    tableBody.appendChild(newRowHtml);
}



function createTable() {
    const container = document.querySelector("#productsContainer");
    container.innerHTML = `
        <div id="productTable" class="table table-responsive">
            <table class="table table-dark">
                <thead>
                <tr style="color: yellow;">
                    <th>Título</th>
                    <th>Precio</th>
                    <th>Imagen</th>
                </tr>
                </thead>
                <tbody id="productsContent">
                </tbody>
            </table>
        </div>`;
}
