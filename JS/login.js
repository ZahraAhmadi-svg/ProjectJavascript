const loginForm=document.getElementById(loginForm);
const usernameInput=document.getElementById("username");
const passwordInput=document.getElementById("password");
const passwordIcon=document.getElementByClassName("password-icon");


passwordIcon.addEventListener("click",function(){
    if (passwordInput.type==="password"){
        passwordInput.type="text";
        passwordIcon.classList.remove("bi-eye-slash");
        passwordIcon.classList.add("bi-eye");

    }else{
        passwordInput.type="password";
        passwordIcon.classList.remove("bi-eye");
        passwordIcon.classList.add("bi bi-eye-slash");
    }
});

//Login

loginForm.addEventListener("submit",function(event){
    event.preventDefault();
    
    let username=usernameInput.value.trim();
    let password=passwordInput.value;

    //find user

    let user=users.find(function(user){
        return user.username===username && 
        user.password === password;

    });

    //if dont find user

    if (user===undefined){
        alert("Username or password id incorrect.");

        return;
    }

    // ذخیره کردن اطلاعات

    this.localStorage.setItem(
        "currentUser",
        JSON.stringity(user)
    );

    // بررسی نقش کاربر

    if (user.role==="admin"){
        alert("welcome Admin!");

        window.location.href="admin.html";

    }else{
        alert("Welcome"+user.fulName+"!");

        window.location.href="indix.html"
    }

})