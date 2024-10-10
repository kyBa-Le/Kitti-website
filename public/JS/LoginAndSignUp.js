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
<<<<<<< HEAD
        window.location.href = "/public/Admin/Admin.html";
=======
        window.location.href = "/public/HTML/Admin.html";
>>>>>>> d5c9e465e044f9b722f9b0c35fff771632ed5dd0
        console.log("change to admin");
    }
}
//Kết thúc xử lý form đăng nhập

//Xử lý form đăng ký

//Kết thúc xử lý form đăng kí