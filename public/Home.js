import { getFromLocalStorage, readFileJson } from "../src/Utils/Storage.js";
import { saveToLocalStorage } from "../src/Utils/Storage.js";
let confirmDelete = confirm("Bạn có muốn xóa dữ liệu trong local?");
if (confirmDelete) {
    // Thực hiện hành động xóa
    console.log("Xóa mục");
    localStorage.clear();
} else {
    // Hủy bỏ hành động xóa
    console.log("Hủy bỏ xóa");
}

// Lưu tất cả dữ liệu của các đối tượng vào local storage
if(["users","orders","products","recipes"].every(item => !Object.keys(localStorage).includes(item))){
    const arrUsers = await readFileJson("/src/Data/User.json");
    const arrOrders = await readFileJson("/src/Data/Order.json");
    const arrProduct = await readFileJson("/src/Data/Product.json");
    const arrayRecipe = await readFileJson("/src/Data/Recipe.json");

    saveToLocalStorage("users",await JSON.stringify(arrUsers));
    saveToLocalStorage("orders",await JSON.stringify(arrOrders));
    saveToLocalStorage("products",await JSON.stringify(arrProduct));
    saveToLocalStorage("recipes",await JSON.stringify(arrayRecipe));
} 
console.log( (await localStorage.getItem("users")));  
// Tạo hiệu ứng chuyển động: phần chữ của quảng cáo
const animateSection = document.querySelector('.animate-section');
const triggerPoint = window.innerHeight * 0.5;
let isShown = false; // Biến cờ để theo dõi trạng thái

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition >= triggerPoint && !isShown) {
        animateSection.classList.add('show');
        isShown = true;
    }else if(scrollPosition<window.innerHeight*0.2){
        animateSection.classList.remove("show");
        isShown = false;
    }
});
// Kết thúc phần hiệu ứng chuyển động.

// Khi ấn vào ảnh của sản phẩm sẽ hiển thị chi tiết sản phẩm ở trang sản phẩm
function openDetail(id){
    window.location.href = ("Product/ProductDetail.html");
}