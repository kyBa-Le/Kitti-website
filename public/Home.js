import { readFileJson } from "../src/Utils/Storage";
import { getFromLocalStorage } from "../src/Utils/Storage";
import { saveToLocalStorage } from "../src/Utils/Storage";
saveToLocalStorage("users", readFileJson("/src/Data/User.json"));
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