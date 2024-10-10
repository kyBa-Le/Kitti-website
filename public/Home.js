import { getFromLocalStorage, readFileJson } from "../src/Utils/Storage.js";
import { saveToLocalStorage } from "../src/Utils/Storage.js";
import { UserService } from "../src/Service/UserService.js";
// Lưu tất cả dữ liệu của các đối tượng vào local storage
const arrUsers = await readFileJson("/src/Data/User.json");
const arrOrders = await readFileJson("/src/Data/Order.json");
const arrProduct = await readFileJson("/src/Data/Product.json");
const arrayRecipe = await readFileJson("/src/Data/Recipe.json");
saveToLocalStorage("users", JSON.stringify(arrUsers));
saveToLocalStorage("orders", JSON.stringify(arrOrders));
saveToLocalStorage("products", JSON.stringify(arrProduct));
saveToLocalStorage("recipes", JSON.stringify(arrayRecipe));


// Tạo hiệu ứng chuyển động: phần chữ của quảng cáo
console.log(window.location.href);
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