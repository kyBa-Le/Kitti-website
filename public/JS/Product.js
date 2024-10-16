var swiper = new Swiper(".mySwiper", {
slidesPerView: 3,
spaceBetween: 30,
loop: true,
navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
},
autoplay: {
    delay: 2500,
    disableOnInteraction: false,
},
});



// Lấy sản phẩm từ local
import { ProductService } from "../../src/Service/ProductService.js";

const products = ProductService.getAllProducts();

function createMenuItem(product) {
    return `<a href="/public/HTML/ProductDetail.html?product_id=${product.id}" class="box">
        <img src="${product.image_link}" alt="">
        <div class="title">${product.name}</div>
    </a>`;
}

function renderProducts(startIndex) {
    const galleryContainer = document.getElementById("gallery-container");
    galleryContainer.innerHTML = ''; // Xóa sản phẩm hiện có

    const limit = 6; // Số lượng sản phẩm hiển thị
    for (let i = startIndex; i < startIndex + limit && i < products.length; i++) {
        const product = products[i];
        const item = createMenuItem(product);
        galleryContainer.innerHTML += item; // Thêm sản phẩm vào bộ sưu tập
    }
}

// Hiển thị lần đầu: hiển thị 6 sản phẩm đầu tiên
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(0); // Bắt đầu bằng cách hiển thị bộ sản phẩm đầu tiên

    // Xử lý sự kiện nhấp chuột vào các nút để hiển thị sản phẩm tương ứng
    const pageButtons = document.querySelectorAll('.page-number');
    pageButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const page = parseInt(event.target.getAttribute('data-page')) - 1; // Lấy số nút (0-4)
            const startIndex = page * 6; // Tính chỉ số bắt đầu cho sản phẩm
            renderProducts(startIndex); // Hiển thị sản phẩm cho trang đã chọn
        });
    });
});


// Đoạn mã chạy slide cho 3 sản phẩm
const productsForSlideShow = ProductService.getAllProducts(); // Lấy sản phẩm từ Service
const slideLimit = 3; // Số lượng sản phẩm hiển thị cho slide

function createSlideItem(product) {
    return `<div class="swiper-slide">
        <a href="/public/HTML/ProductDetail.html?product_id=${product.id}" class="box">
            <img src="${product.image_link}" alt="">
        </a>
    </div>`;
}

function renderSlideProducts(startIndex) {
    const slideGalleryContainer = document.querySelector('.swiper-wrapper');
    slideGalleryContainer.innerHTML = ''; // Xóa sản phẩm hiện có

    for (let i = startIndex; i < startIndex + slideLimit && i < productsForSlideShow.length; i++) {
        const product = productsForSlideShow[i];
        const item = createSlideItem(product);
        slideGalleryContainer.innerHTML += item; // Thêm sản phẩm vào bộ sưu tập
    }
}

// Tự động chạy slide
let currentSlideIndex = 0;

function startSlideShow() {
    renderSlideProducts(currentSlideIndex); // Hiển thị sản phẩm hiện tại

    currentSlideIndex += slideLimit; // Cập nhật chỉ số
    if (currentSlideIndex >= productsForSlideShow.length) {
        currentSlideIndex = 0; // Quay lại đầu danh sách
    }
}

// Hiển thị lần đầu: hiển thị 3 sản phẩm đầu tiên
document.addEventListener('DOMContentLoaded', () => {
    startSlideShow(); // Bắt đầu chạy slide

    // Đặt thời gian thay đổi sản phẩm (ví dụ: 3 giây)
    setInterval(startSlideShow, 3000);
});