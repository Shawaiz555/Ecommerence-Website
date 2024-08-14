const productImage = document.querySelector('.Productimg2');
const fileInput = document.getElementById('myFile');

fileInput.addEventListener('change', function() {
    const file = fileInput.files[0];
    if (file) {
        productImage.src = URL.createObjectURL(file);
    } else {
        alert('Please Select a File!!!');
    }
});

const AddProductbtn = document.getElementById('AddProductbtn');

AddProductbtn.addEventListener('click', function(event) {
    event.preventDefault();
    
    const ProductName = document.getElementById('ProductName').value;
    const ProductQuantity = document.getElementById('ProductQuantity').value;
    const ProductPrice = document.getElementById('ProductPrice').value;
    
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const Image = e.target.result; // Used this syntax  "e.target.result" for extracting the full url data from specified file

            const Products = JSON.parse(localStorage.getItem('Products')) || [];
            const nextId = Products.length > 0 ? Products[Products.length - 1].id + 1 : 1;

            const product = {
                id: nextId, 
                title: ProductName,
                quantity: ProductQuantity,
                price: ProductPrice,
                image: Image 
            };

            Products.push(product);
            localStorage.setItem('Products', JSON.stringify(Products));
            alert('Product Added Successfully');

            addProductToTable(product);
        };

        reader.readAsDataURL(file);
    } else {
        alert('Please select an image to upload.');
    }
});

function addProductToTable(product) {
    const Data = document.querySelector(".ProductItemsTable table tbody");

    const newRow = document.createElement('tr');
    newRow.classList.add('TableData');
    newRow.innerHTML = `
        <td style="width: 10%;">
            <div class="ItemId">
                <p>${product.id}</p>
            </div>
        </td>
        <td style="width: 10%;">
            <div class="Productimg">
                <img src="${product.image}" alt="Product image" width="50" height="50">
            </div>
        </td>
        <td style="width: 25%;">
            <div class="ItemName">
                <div class="ProductName">
                    <a href="#">${product.title}</a>
                </div>
            </div>
        </td>
        <td style="width: 10%;">
            <div class="ItemPrice">
                <p><b> $ </b> ${product.price}</p>
            </div>
        </td>
        <td style="width: 10%;" class="ItemQuantity">
            <p>${product.quantity}</p>
        </td>
        <td style="width: 5%;" class="ItemSale">
            <p>20</p>
        </td>
        <td style="width: 10%;" class="ItemStock">
            <p><span>Out of stock</span></p>
        </td>
        <td style="width: 20%;">
            <div class="Action">
                <button><img src="./Visibilitylogo.png" alt="Visibilitylogo" width="25" height="25"></button>
                <button><img src="./Editlogo.png" alt="Editlogo" width="25" height="25"></button>
                <button><img src="Deletelogo.png" alt="Deletelogo" width="25" height="25"></button>
            </div>
        </td>
    `;

    Data.appendChild(newRow);
}
