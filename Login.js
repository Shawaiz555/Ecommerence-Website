
const Loginbtn = document.getElementById('Loginbtn');

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


Loginbtn.onclick = function()
{
    let UserEmail = document.getElementById('Email').value;
    let UserPassword = document.getElementById('Password').value;

    const UserDetails = JSON.parse(localStorage.getItem('UserDetails')) || [];
    let UserConfirm = UserDetails.find(user => user.Email === UserEmail && user.Password === UserPassword);
    if(UserConfirm)
    {
        const UserID = UserConfirm.UserID;
        localStorage.setItem('Current_User_Id', UserID);
        localStorage.setItem('LoggedInUser',UserConfirm.Name);
        alert(`Login Successful, Welcome to MS Store ${UserConfirm.Name}`);
        window.location.href = 'Home.html';
    }
    else
    {
        alert('Login Failed!!!');
    }
}

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