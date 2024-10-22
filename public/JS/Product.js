import { ProductService } from "../../src/Service/ProductService.js";

const products = ProductService.getAllProducts();

// Hàm tạo item cho menu sản phẩm
function createMenuItem(product) {
    return `<a href="/public/HTML/ProductDetail.html?product_id=${product.id}" class="box">
        <img src="${product.image_link}" alt="">
        <div class="title">${product.name}</div>
    </a>`;
}

// Hàm hiển thị sản phẩm trong gallery
function renderProducts(startIndex) {
    const galleryContainer = document.getElementById("gallery-container");
    galleryContainer.innerHTML = ''; // Xóa sản phẩm hiện có

    const limit = 6; // Số lượng sản phẩm hiển thị
    for (let i = startIndex; i < startIndex + limit && i < products.length; i++) {
        const item = createMenuItem(products[i]);
        galleryContainer.innerHTML += item; // Thêm sản phẩm vào bộ sưu tập
    }
}

// Hàm tạo item cho slide sản phẩm
function createSlideItem(product) {
    return `<div class="swiper-slide">
        <a href="/public/HTML/ProductDetail.html?product_id=${product.id}" class="box">
            <img src="${product.image_link}" alt="${product.name}">
        </a>
    </div>`;
}

// Hàm render sản phẩm vào slideshow
function renderSlideProducts() {
    const slideGalleryContainer = document.querySelector('.swiper-wrapper');
    slideGalleryContainer.innerHTML = ''; // Xóa sản phẩm hiện có

    // Hiển thị tất cả sản phẩm trong slide
    products.forEach(product => {
        slideGalleryContainer.innerHTML += createSlideItem(product); // Thêm sản phẩm vào slideshow
    });

    // Khởi tạo Swiper sau khi render sản phẩm
    new Swiper(".mySwiper", {
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
}

// Hiển thị lần đầu: hiển thị 6 sản phẩm đầu tiên
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(0); // Bắt đầu bằng cách hiển thị bộ sản phẩm đầu tiên
    renderSlideProducts(); // Hiển thị slide cho tất cả sản phẩm

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
