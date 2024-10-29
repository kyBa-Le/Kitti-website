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

// Bắt đầu hàm đăng kí
function signUp() {
    let username = document.getElementById("signup-username").value.trim();
    let password = document.getElementById("signup-password").value.trim();
    let phoneNumber = document.getElementById("phone").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();

    // Kiểm tra không cho đăng kí với tên "admin"
    if (username.toLowerCase() === "admin") {
        alert("Không thể sử dụng tên 'admin' để đăng kí.");
        return;
    }

    // Kiểm tra tên người dùng đã tồn tại hay chưa
    let existingUser = UserService.findUserByNameAndPassword(username, password);
    if (existingUser) {
        alert("Tên người dùng đã tồn tại. Vui lòng đăng nhập.");
        return;
    }

    // Kiểm tra tính hợp lệ của mật khẩu và xác nhận mật khẩu
    if (password === "" || confirmPassword === "") {
        alert("Mật khẩu và xác nhận mật khẩu không được để trống.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Mật khẩu và xác nhận mật khẩu không khớp.");
        return;
    }

    // Kiểm tra số điện thoại hợp lệ
    if (phoneNumber === "" || !/^\d{10}$/.test(phoneNumber)) {
        alert("Vui lòng nhập số điện thoại hợp lệ (10 chữ số).");
        return;
    }

    // Tạo đối tượng người dùng và lưu
    const user = {
        id: Math.floor(Math.random() * 9999),
        name: username,
        phone: phoneNumber,
        password: password
    };
    
    UserService.saveUser(user); // Lưu người dùng mới
    alert("Đăng kí thành công");
    localStorage.setItem("user_id", JSON.stringify(user.id));
    window.location.href = "/public/Home.html"; // Chuyển hướng sau khi đăng ký thành công
}
// Kết thúc hàm đăng kí

// Bắt đầu Hàm đăng nhập
function login(){
    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;

    // Kiểm tra nếu là tài khoản admin
    if(username === "admin" && password === "admin@123"){
        alert("Đăng nhập thành công với tài khoản admin");
        window.location.href = "/public/HTML/Admin.html";
        console.log("change to admin");
        return; // Dừng tại đây nếu là admin
    }

    // Nếu không phải admin, kiểm tra thông tin người dùng thông thường
    let user_id = UserService.findUserByNameAndPassword(username, password);
    if(user_id){
        alert("Đăng nhập thành công");
        localStorage.setItem("user_id", JSON.stringify(user_id));
        window.location.href = "/public/Home.html";
    }else{
        window.alert("Vui lòng nhập đúng mật khẩu!");
    }
}
// Kết thúc hàm đăng nhập
 // Thêm sự kiện khi ấn vào nút đăng kí/ nhập
document.getElementById("signup-button").addEventListener('click', signUp);
document.getElementById("login-loginButton").addEventListener('click', login);

// Hàm để thay đổi trạng thái hiển thị mật khẩu
function togglePasswordVisibility(passwordInputId, toggleButtonId) {
    const passwordInput = document.getElementById(passwordInputId);
    const toggleButton = document.getElementById(toggleButtonId);
  
    toggleButton.addEventListener("click", function () {
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);
  
        const icon = toggleButton.querySelector("i");
        if (type === "password") {
            icon.classList.remove("fa-eye"); // Khi mật khẩu ẩn
            icon.classList.add("fa-eye-slash");
        } else {
            icon.classList.remove("fa-eye-slash"); // Khi mật khẩu hiển thị
            icon.classList.add("fa-eye");
        }
    });
}

// Áp dụng cho cả form đăng nhập và đăng ký
togglePasswordVisibility("login-password", "toggle-login-password");
togglePasswordVisibility("signup-password", "toggle-signup-password");
togglePasswordVisibility("confirmPassword", "toggle-confirm-password");
