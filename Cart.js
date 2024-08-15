document.addEventListener("DOMContentLoaded", function() {
    let LoginedUserName = document.querySelector('#LoginedUserName');
    const LoggedInUser = localStorage.getItem('LoggedInUser');
    if (LoggedInUser == null) {
        LoginedUserName.innerHTML = `
            <a href="#"
                        ><img
                          class="shoppingicon"
                          src="./shoppingicon.png"
                          alt="Shopping icon"
                          width="30"
                          height="30"
                      /></a>
        `;
    } else {
        LoginedUserName.innerHTML = LoggedInUser;
        let LogOutbtn = document.querySelector('#LogOutbtn');
        LogOutbtn.innerHTML = `
            <button class="LogOutbtn">LOG OUT</button>
        `;
        let Signuplink = document.getElementById('Signuplink');
        let Loginlink = document.getElementById('Loginlink');
        Signuplink.style.display = 'none';
        Loginlink.style.display = 'none';
    }

    let Current_User_Id = localStorage.getItem('Current_User_Id');
    Current_User_Id = parseInt(Current_User_Id, 10);
    if (isNaN(Current_User_Id)) {
        Current_User_Id = 1;
    }

    // Load cart for the current user
    const cart = JSON.parse(localStorage.getItem(`User_${Current_User_Id}_Cart`)) || [];
    if (cart.length > 0) {
        let cartitems = document.querySelector("#cart-table tbody");

        let output = "";

        for (let product of cart) {
            output += `
                   <tr class="cart-item">
                       <td class="productimg" style="width: 20%;"><img src="${product.Image}" alt="Product Image" width="70" height="100"></td>
                       <td class="producttitle" style="width: 30%;">${product.Title}</td>
                       <td style="width: 20%;"><button class="decrementbtn" onclick="manageQuantity(${product.Id},'-')">-</button> <span class="quantity">${product.Quantity}</span> <button class="incrementbtn" onclick="manageQuantity(${product.Id},'+')">+</button></td>
                       <td style="width: 30%;">
                                 <h4 class="productprice"><b>${product.Price} $</b></h4>
                                 <button class="removebtn" onclick="manageQuantity(${product.Id},'remove')">|Remove|</button>
                        </td>
                   </tr>
            `;
        }

        cartitems.innerHTML = output;
        calculatetotal();
    } else {
        let cartitems = document.querySelector("#cart-table tbody");
        cartitems.innerHTML = `
            <tr>
            <td colspan="6"><h2>No Products Found in LocalStorage</h2></td>
            </tr>
        `;
    }
});

function manageQuantity(id, type) {
    let Current_User_Id = localStorage.getItem('Current_User_Id');
    Current_User_Id = parseInt(Current_User_Id, 10);
    if (isNaN(Current_User_Id)) {
        Current_User_Id = 1;
    }

    const cart = JSON.parse(localStorage.getItem(`User_${Current_User_Id}_Cart`)) || [];

    if (cart.length > 0) {
        let productIndex = cart.findIndex((product) => product.Id === id);
        let product = cart[productIndex];

        if (type === 'remove') {
            cart.splice(productIndex, 1);
            document.querySelectorAll(".cart-item")[productIndex].remove();
            calculatetotal();
        } else {
            if (type === "+") {
                product.Quantity = product.Quantity + 1;
            } else {
                product.Quantity = product.Quantity - 1;
            }

            if (product.Quantity <= 0) {
                cart.splice(productIndex, 1);
                document.querySelectorAll(".cart-item")[productIndex].remove();
                calculatetotal();
            } else {
                cart[productIndex] = product;
            }

            const quantities = document.querySelectorAll(".quantity");
            quantities[productIndex].innerHTML = product.Quantity;
        }

        localStorage.setItem(`User_${Current_User_Id}_Cart`, JSON.stringify(cart));
        calculatetotal();
    }
}

function calculatetotal() {
    let Current_User_Id = localStorage.getItem('Current_User_Id');
    Current_User_Id = parseInt(Current_User_Id, 10);
    if (isNaN(Current_User_Id)) {
        Current_User_Id = 1;
    }

    const totalprice = document.getElementById('total');
    const Cart = JSON.parse(localStorage.getItem(`User_${Current_User_Id}_Cart`)) || [];

    let total = 0;
    for (let product of Cart) {
        total += product.Price * product.Quantity;
    }
    total = total.toFixed(2)
    totalprice.innerText = " $ " + total;
    localStorage.setItem('TotalPrice',total);
}

const Removeallbtn = document.getElementById('removeall');

Removeallbtn.addEventListener('click', () => {
    let Current_User_Id = localStorage.getItem('Current_User_Id');
    Current_User_Id = parseInt(Current_User_Id, 10);
    if (isNaN(Current_User_Id)) {
        Current_User_Id = 1;
    }

    localStorage.removeItem(`User_${Current_User_Id}_Cart`);

    const cartitems = document.querySelector("#cart-table tbody");
    cartitems.innerHTML = `
            <tr>
            <td colspan="6"><h2>No Products Found in LocalStorage</h2></td>
            </tr>
        `;

    calculatetotal();
});

function checkout() {
    const LoggedInUser = localStorage.getItem('LoggedInUser');
    if (!LoggedInUser) {
        alert('You Need to Login First To Buy Something!!!');
    }

    let Current_User_Id = localStorage.getItem('Current_User_Id');
    Current_User_Id = parseInt(Current_User_Id, 10);
    if (isNaN(Current_User_Id)) {
        Current_User_Id = 1;
    }

    const LoggedUserCart = JSON.parse(localStorage.getItem(`User_${Current_User_Id}_Cart`)) || [];
    if (LoggedUserCart.length === 0) {
        console.error('Cart is empty');
        return;
    }

    const LoggedUserOrders = JSON.parse(localStorage.getItem('Orders')) || [];
    calculatetotal();
    let TotalPrice = localStorage.getItem('TotalPrice');
    TotalPrice = parseFloat(TotalPrice, 10);
    if (isNaN(TotalPrice)) {
        TotalPrice = 0.0;
    }
    const newOrder = {
        UserID: Current_User_Id,
        OrderId: new Date().getTime(),
        Items: LoggedUserCart,
        Date: new Date(),
        TotalPrice: TotalPrice
    };

    LoggedUserOrders.push(newOrder);
    localStorage.setItem('Orders', JSON.stringify(LoggedUserOrders));
    localStorage.removeItem(`User_${Current_User_Id}_Cart`);
    alert('Order Placed Successfully');
    const totalprice = document.getElementById('total');
    totalprice.innerText = " $ " + 0.0;
    let cartitems = document.querySelector("#cart-table tbody");
    cartitems.innerHTML = `
          <tr>
          <td colspan="6"><h2>No Products Found in LocalStorage</h2></td>
          </tr>
      `;
    
}

const LogOutbtn = document.getElementById('LogOutbtn');
LogOutbtn.onclick = function() {
    localStorage.removeItem('LoggedInUser');
    alert('Logged Out Successfully');
    let Signuplink = document.getElementById('Signuplink');
    let Loginlink = document.getElementById('Loginlink');
    Signuplink.style.display = 'block';
    Loginlink.style.display = 'block';
    let LoginedUserName = document.querySelector('#LoginedUserName');
    LoginedUserName.innerHTML = `
        <a href="#"
                    ><img
                      class="shoppingicon"
                      src="./shoppingicon.png"
                      alt="Shopping icon"
                      width="30"
                      height="30"
                  /></a>
    `;
    LogOutbtn.innerHTML = `
            <a href="#"
                    ><img
                      class="contacticon"
                      src="./contacticon.png"
                      alt="Contact icon"
                      width="30"
                      height="30"
                  /></a>
        `;
};
