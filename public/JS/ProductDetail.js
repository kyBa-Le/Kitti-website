import { getQueryParam } from "/src/Utils/Param.js";
import { ProductService } from "/src/Service/ProductService.js";
import { priceFormat } from "/src/Utils/Param.js";

// Bắt đầu hiển thị sản phẩm theo tham số lấy được từ đường dẫn
const product_id = getQueryParam("product_id");
console.log(product_id);

// Hàm hiển thị ra chi tiết sản phẩm
function renderProductDetail(product_id) {
    const product = ProductService.getProductById(product_id);
    console.log(product);
    document.getElementById("product-detail-container").innerHTML =
        `<div class="product-image">
            <img src="${product.image_link}" alt="${product.name}">
        </div>
        <div class="product-details">
            <h2 id="detail">Chi tiết sản phẩm</h2>
            <h1 id="product">${product.name}</h1>
            <p id="inforproduct">${product.description}</p>
            <div class="price">
                <span class="original-price">${priceFormat(product.price + 20 * product.price / 100)} đ</span>
                <span class="discounted-price">${priceFormat(product.price)} đ</span>
            </div>
            <div class="options" id="option">
                <div class="quantity">
                    <button onclick="changeQuantity(-1)">-</button>
                    <input type="number" id="quantity" value="1" min="1">
                    <button onclick="changeQuantity(1)">+</button>
                </div>
                <button class="add-to-cart" id="add-to-cart-button">Thêm vào giỏ hàng</button>
                <button class="buy-now" id="buy-now-btn" type="button">Mua ngay</button>
            </div>
        </div>`
}

// Hàm thay đổi số lượng sản phẩm
function changeQuantity(product, number) {

}
// Hiển thị sản phẩm khi load trang
document.addEventListener("DOMContentLoaded", renderProductDetail(product_id))
// Kết thúc phần hiển thị sản phẩm
