let LoginedUserName = document.querySelector('#LoginedUserName');
let Username = localStorage.getItem('LoggedInUser');
if(Username == null)
{
    LoginedUserName.innerHTML = `
        <a href="#"
                    ><img
                      class="shoppingicon"
                      src="./shoppingicon.png"
                      alt="Shopping icon"
                      width="30"
                      height="30"
                  /></a>
    `
}
else
{
    LoginedUserName.innerHTML = Username;
    let LogOutbtn = document.querySelector('#LogOutbtn');
        LogOutbtn.innerHTML = `
            <button class="LogOutbtn">LOG OUT</button>
        `;
        let Signuplink = document.getElementById('Signuplink');
        let Loginlink = document.getElementById('Loginlink');
        Signuplink.style.display = 'none';
        Loginlink.style.display = 'none';
}

let allProducts = [];
let displayedProducts = 12;
let currentProducts = [];

const Currentitems = document.getElementById('Currentitems');
const Totalitems = document.getElementById('Totalitems');
const priceRangeInput = document.getElementById('priceRangeInput');
const MinRange = document.getElementById('MinRange');
const MaxRange = document.getElementById('MaxRange');
priceRangeInput.min = 0;
priceRangeInput.max = 1000;

priceRangeInput.addEventListener('input', () => {
    MaxRange.textContent = '$' + priceRangeInput.value;
});


const priceRangeButtons = document.querySelectorAll('.priceRange');
priceRangeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const min = parseFloat(button.getAttribute('data-min'));
        const max = parseFloat(button.getAttribute('data-max'));
        filterProductsByPriceRange(min, max);
    });
});


const lowtohighprice = document.getElementById('lowtohighprice');
const hightolowprice = document.getElementById('hightolowprice');

lowtohighprice.addEventListener('click', () => {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            products.sort((a, b) => a.price - b.price);
            allProducts = products;
            currentProducts = allProducts.slice(0, displayedProducts);
            displayProducts(currentProducts);
        });
});

hightolowprice.addEventListener('click', () => {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            products.sort((a, b) => b.price - a.price);
            allProducts = products;
            displayProducts(allProducts.slice(0, displayedProducts));
        });
});

fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(products => {
        allProducts = products;
        displayProducts(allProducts.slice(0, displayedProducts));
        Currentitems.innerHTML = displayedProducts;
        Totalitems.innerHTML = allProducts.length;
    });

function displayProducts(products) {
    let data = document.querySelector("#AllProducts");
    let output = "";

    for (let product of products) {
        output += `
            <div class="ProductCard">
                <div class="card" style="width: 100%;">
                    <img src="${product.image}" class="card-img-top" alt="Product image">
                    <div class="Addtocartbtn transition">
                        <button class="btn" onclick="addToCart(${product.id},'${product.title}','${product.image}',${product.price})">Add To Cart</button>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text"><b>$</b> ${product.price}</p>
                    </div>
                </div><br>
            </div>
        `;
    }
    data.innerHTML = output;
}

function addToCart(id, title, image, price) {

     const LoggedInUser = localStorage.getItem('LoggedInUser');
     
     if(!LoggedInUser)
     {
        console.error('No user logged in');
        return ;
     }

     else
     {
      let Current_User_Id = localStorage.getItem('Current_User_Id');
      Current_User_Id = parseInt(Current_User_Id, 10);
      if (isNaN(Current_User_Id)) 
      {
        Current_User_Id = 1;
      } 
      else 
      {
        let LoggedUserCart = JSON.parse(localStorage.getItem(`User_${Current_User_Id}_Cart`)) || [];

         UserCart = {
                Id : id,
                Title : title,
                Image : image,
                Price : price,
                Quantity: 1
         }
         LoggedUserCart.push(UserCart);

         localStorage.setItem(`User_${Current_User_Id}_Cart`, JSON.stringify(LoggedUserCart));
         alert('Product added to the Cart successfully');
      }
         
     }

}

const loadmorebtn = document.getElementById('Loadbtn');
loadmorebtn.addEventListener('click', () => {
    displayedProducts += 8;
    displayProducts(allProducts.slice(0, displayedProducts));
    if (displayedProducts >= allProducts.length)
    {
        loadmorebtn.style.display = 'none';
    }
    else
    {
        loadmorebtn.style.display = 'block';
    }
    Currentitems.innerHTML = displayedProducts;
    Totalitems.innerHTML = allProducts.length;
});

function filterProductsByPriceRange(min, max) {
    const filteredProducts = allProducts.filter(product => product.price >= min && product.price <= max);
    displayedProducts = Math.min(filteredProducts.length, 12); // Reseting displayed products count
    currentProducts = filteredProducts.slice(0, displayedProducts);
    displayProducts(currentProducts);

    Currentitems.innerHTML = displayedProducts;
    Totalitems.innerHTML = filteredProducts.length;

    if (filteredProducts.length > displayedProducts)
    {
        loadmorebtn.style.display = 'block';
    }
    else
    {
        loadmorebtn.style.display = 'none';
    }
}

function filterProductsByTitle(value) {
    const filteredProducts = allProducts.filter(product => product.title.toLowerCase().includes(value.toLowerCase()));
    displayedProducts = Math.min(filteredProducts.length, 12); // Reseting displayed products count
    currentProducts = filteredProducts.slice(0, displayedProducts);
    displayProducts(currentProducts);

    Currentitems.innerHTML = displayedProducts;
    Totalitems.innerHTML = filteredProducts.length;

    if (filteredProducts.length > displayedProducts)
    {
        loadmorebtn.style.display = 'block';
    }
    else
    {
        loadmorebtn.style.display = 'none';
    }
}

const Filterbutton = document.getElementById('Filterbutton');
Filterbutton.addEventListener('click', () => {
    const max = parseFloat(priceRangeInput.value);
    filterProductsByPriceRange(0, max);
});

const Searchinput = document.getElementById('Searchinput');
Searchinput.addEventListener('input', () => {
    if (Searchinput.value != "") 
    {
        const searchValue = Searchinput.value;
        filterProductsByTitle(searchValue);
    }
    else
    {
        currentProducts = allProducts.slice(0, 12);
        displayProducts(currentProducts);
        loadmorebtn.style.display = 'block';
        Currentitems.innerHTML = currentProducts.length;
        Totalitems.innerHTML = allProducts.length;
    }
});

const LogOutbtn = document.getElementById('LogOutbtn');
LogOutbtn.onclick = function()
{
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
    let LogOutbtn = document.querySelector('#LogOutbtn');
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
}