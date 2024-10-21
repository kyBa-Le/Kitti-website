import { getQueryParam } from "/src/Utils/Param.js";
import { ProductService } from "/src/Service/ProductService.js";
import { priceFormat } from "/src/Utils/Param.js";

// Bắt đầu hiển thị sản phẩm theo tham số lấy được từ đường dẫn
const product_id = getQueryParam("product_id");
console.log(product_id);

// Hiển thị ra chi tiết sản phẩm
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

// Khi ấn vào nút mua ngay
document.getElementById("buy-now-btn").addEventListener("click",  ()=>{
    let quantity = document.getElementById("quantity").value;
    window.location.href = `/public/HTML/Payment.html?product_id=${product_id}&quantity=${quantity}`;
})
// Kết thúc phần hiển thị sản phẩm.
// Hàm hiển thị ra chi tiết sản phẩm
function renderProductDetail(product_id) {
    const product = ProductService.getProductById(product_id);
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
                    <button id="decrease-quantity">-</button>
                    <input type="number" id="quantity" value="1" min="1">
                    <button id="increase-quantity">+</button>
                </div>
                <button class="add-to-cart" id="add-to-cart-button">Thêm vào giỏ hàng</button>
                <button class="buy-now" id="buy-now-btn" type="button">Mua ngay</button>
            </div>
        </div>`;

    // Thêm sự kiện cho nút tăng giảm số lượng
    document.getElementById("decrease-quantity").addEventListener('click', () => changeQuantity(-1));
    document.getElementById("increase-quantity").addEventListener('click', () => changeQuantity(1));

    // Thêm sự kiện khi ấn nút thêm vào giỏ hàng
    document.getElementById("add-to-cart-button").addEventListener('click', () => {
        addToCart(product_id);
    });
}

// Hàm thay đổi số lượng sản phẩm
function changeQuantity(changeAmount) {
    const quantityInput = document.getElementById("quantity");
    let currentQuantity = parseInt(quantityInput.value);
    // Cập nhật số lượng
    currentQuantity += changeAmount;
    // Đảm bảo số lượng không nhỏ hơn 1
    if (currentQuantity < 1) {
        currentQuantity = 1;
    }
    // Cập nhật giá trị trong ô input
    quantityInput.value = currentQuantity;
}

// Hàm thêm vào giỏ hàng
function addToCart(product_id) {
    const quantity = parseInt(document.getElementById("quantity").value);
    const user_id = localStorage.getItem('user_id');
    if (!user_id) {
        alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
        return;
    }
    const order = {
        id: Math.floor(Math.random() * 9999), // Tạo ID ngẫu nhiên cho đơn hàng
        product_id: product_id,
        user_id: user_id,
        quantity: quantity,
        status: "order"
    };
    // Lấy giỏ hàng từ localStorage, nếu chưa có thì tạo mảng rỗng
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingOrderIndex = cart.findIndex(order => order.product_id === product_id && order.user_id === user_id);
    if (existingOrderIndex !== -1) {
        // Nếu sản phẩm đã có, cập nhật số lượng
        cart[existingOrderIndex].quantity += quantity;
    } else {
        // Thêm đơn hàng mới vào giỏ hàng
        cart.push(order);
    }
    // Lưu lại vào localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Đã thêm sản phẩm vào giỏ hàng!");
}

// Hiển thị sản phẩm khi load trang
document.addEventListener("DOMContentLoaded", renderProductDetail(product_id))
// Kết thúc phần hiển thị sản phẩm
