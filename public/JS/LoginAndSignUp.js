import {UserService} from "/src/Service/UserService.js";
// Bên dưới là các xử lý của trang chính đăng nhập và đăng kí
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
$("document").ready(function(){
    var form;
    if(getQueryParam('request') === "login"){
        form = $("#signup");
        console.log("login loaded");
    }else if(getQueryParam('request') === 'signup'){
        form = $("#login");
        console.log("sign up loaded");
    }
    form.addClass("invisible");
})
//Kết thúc xử lý của trang chính

//Xử lý của form đăng nhập
    // Hàm để đăng nhập
function loginChangePage(){
    var username = $("#login-username").val();
    var password = $("#login-password").val();
    // Đăng nhập với tài khoản của admin
    if(username === "admin" && password === "admin@123"){
        window.location.href = "/public/HTML/Admin.html";
        console.log("change to admin");
    }
}
//Kết thúc xử lý form đăng nhập

// Hàm đăng kí
function signUp(){
    let username = document.getElementById("signup-username").value;
    let password = document.getElementById("signup-password").value;
    let phoneNumber = document.getElementById("phone").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    if(password == confirmPassword){
        const user = {id:Math.floor(Math.random() * 9999), name:username, phone:phoneNumber, password:password};
        UserService.saveUser(user);
        alert("Đăng kí thành công");
        localStorage.setItem("user_id", JSON.stringify(user.id));
        window.location.href = "/public/Home.html";
    }else{
        window.alert("Vui lòng nhập đúng mật khẩu!")
    }
}
// Thêm sự kiện khi ấn vào nút đăng kí
document.getElementById("signup-button").addEventListener('click', signUp);

function login(){
    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;
    let user_id = UserService.findUserByNameAndPassword(username,password);
    if(user_id){
        alert("Đăng nhập thành công");
        localStorage.setItem("user_id", JSON.stringify(user_id));
        window.location.href = "/public/Home.html";
    }else{
        window.alert("Vui lòng nhập đúng mật khẩu!")
    }
}
//Thêm sự kiện khi ấn vào nút đăng nhập
document.getElementById("login-loginButton").addEventListener('click', login);