const Orders = JSON.parse(localStorage.getItem("Orders")) || [];
let OrderItems = document.querySelector(".OrdersTable tbody");
let output = "";

for (let order of Orders) {
  let AllItems = '';

  for (let items of order.Items) {
    AllItems += `
      <div class="ProductTitle">
        <p>${items.Title}</p>
      </div>
    `;
  }

  output += `
    <tr class="TableBody">
      <td style="width: 10%;">
        <div class="UserID">
          <p>${order.UserID}</p>
        </div>
      </td>
      <td style="width: 20%;">
        <div class="OrderID">
          <p>${order.OrderId}</p>
        </div>
      </td>
      <td style="width: 30%;">
        ${AllItems}                                                               
      </td>
      <td style="width: 20%;">
        <div class="TotalPrice">
            <p>$${order.TotalPrice}</p>
        </div>
      </td>
      <td style="width: 20%;">
        <div class="OrderDate">
          <p>${order.Date}</p>
        </div>
      </td>
      
    </tr>
  `;
}

OrderItems.innerHTML = output;
