document.addEventListener('DOMContentLoaded', function() {
    const Products = JSON.parse(localStorage.getItem('Products')) || [];
    const Data = document.querySelector(".ProductItemsTable table tbody");
    let output = "";

    for (let product of Products) {
        output += `
            <tr class="TableData">
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
            </tr>
        `;
    }
    Data.innerHTML = output;
});
