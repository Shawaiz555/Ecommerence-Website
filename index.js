const swiper = new Swiper(".swiper", {
    // Optional parameters
    direction: "horizontal",
    loop: true,
    slidesPerView: 4,
    spaceBetween: 40,
    slidesPerGroup: 4,
    slideShadows: true,
    speed:1000,
    breakpoints: {
    320: {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 20
    },
    480: {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 30
    },
    640: {
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 40
    },
    830: {
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 40
    },
    1400: {
    slidesPerView: 4,
    spaceBetween: 40
    },
    2000: {
    slidesPerView: 4,
    spaceBetween: 40
    }
    },
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

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

function addToCart(id,title,image,price){

    const LoggedInUser = localStorage.getItem('LoggedInUser');
     if(!LoggedInUser)
     {
        alert('You Need to Login First To Buy Something!!!');
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
                let ExistingProduct = LoggedUserCart.find(item => item.Id === id);
                if(ExistingProduct)
                {
                    ExistingProduct.Quantity += 1;
                }
                else
                {
                     UserCart = {
                        Id : id,
                        Title : title,
                        Image : image,
                        Price : price,
                        Quantity: 1
                        }
                    LoggedUserCart.push(UserCart);

                }
                localStorage.setItem(`User_${Current_User_Id}_Cart`, JSON.stringify(LoggedUserCart));
                alert('Product added to the Cart successfully');
            }
        }
    }

fetch('https://fakestoreapi.com/products?limit=8')

.then(function (response) 
{
    return response.json();
})

.then(function (products) {
    let Data = document.querySelector('#swiper');
    let output = ""; 
    for(let product of products) 
        {
            output += `
             <div class="swiper-slide">
                <div class="col-lg-12 col-md-12 col-sm-12 p-0">
                    <div class="card">
                        <img src="${product.image}" class="card-img-top" alt="Product image">
                        <div class="Addtocartbtn transition">
                            <button class="btn" onClick="addToCart(${product.id},'${product.title}','${product.image}',${product.price})">Add To Cart</button>
                          </div>
                        <div class="card-body">
                          <h5 class="card-title">${product.title}</h5>
                          <p class="card-text"><b> $ </b> ${product.price}</p>
                        </div>
                      </div>
                </div>
              </div>
            `;
        }

    Data.innerHTML = output;
    swiper.update();
})

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