// lấy tất cả các đơn hàng trong local của một user
const user_id =await getFromLocalStorage("user_id");
let orders = OrderService.getOrderByUserId(user_id);

import { getQueryParam } from "../../src/Utils/Param.js";
import { OrderService } from "../../src/Service/OrderService.js";
import { ProductService } from "../../src/Service/ProductService.js";
import { getFromLocalStorage, saveToLocalStorage } from "../../src/Utils/Storage.js";
import { priceFormat } from "/src/Utils/Param.js";

// Hàm tạo ra các hàng cho order
function createOrderRow(order){
    var product = ProductService.getProductById(order.product_id);
    return `<tr>
              <td>
                <img
                  src= ${product.image_link}
                  alt="${product.name}"
                  class = "product_image"
                />
              </td>
              <td>${product.name}</td>
              <td>${priceFormat(product.price)}₫</td>
              <td>
                <div class="d-flex justify-content-center">
                  <button class="btn btn-sm btn-outline-secondary changeQuantity" data-id="${order.id}" data-number="${-1}">-</button>
                  <input
                    type="text"
                    value=${order.quantity}
                    class="form-control form-control-sm mx-2 text-center" id="quantity-input-value"
                    style="width: 50px"
                  />
                  <button class="btn btn-sm btn-outline-secondary changeQuantity" data-id=${order.id} data-number="${1}">+</button>
                </div>
              </td>
              <td>${priceFormat(product.price * order.quantity)}₫</td>
              <td>
                <button
                  type="button"
                  class="btn btn-sm btn-warning card-btn-color deleteOrder" data-id=${order.id}
                >
                  Xóa
                </button>
              </td>
            </tr>`
}

// Hàm để hiển thị các đơn hàng của user
async function renderCart() { 
    const user_id = localStorage.getItem("user_id");
    // let cart = JSON.parse(localStorage.getItem('cart')) || []; // Lấy giỏ hàng từ localStorage

    // Lọc đơn hàng theo user_id
    let orders = OrderService.getOrderByUserId(user_id);
    const cartTableBody = document.getElementById("cart_table_body");
    cartTableBody.innerHTML = ''; // Xóa các hàng trước đó

    if (orders.length === 0) {
        cartTableBody.innerHTML = '<tr><td colspan="6">Giỏ hàng của bạn trống!</td></tr>';
        document.getElementById("total-price").innerText = "0₫"; // Reset tổng giá
        return;
    }

    // Duyệt qua các đơn hàng và tạo các hàng trong bảng
    orders.forEach(order => {
        const row = createOrderRow(order);
        cartTableBody.innerHTML += row;
    });

    // Tính toán tổng giá trị giỏ hàng
    let total = orders.reduce((acc, order) => {
        const product = ProductService.getProductById(order.product_id);
        return acc + (product.price * order.quantity);
    }, 0);

    document.getElementById("total-price").innerText = priceFormat(total) + "₫"; // Hiển thị tổng giá
}

// Hàm thay đổi số lượng trong giỏ hàng
function updateOrderQuantity(orderId, changeAmount) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderIndex = cart.findIndex(order => order.id === orderId);
    if (orderIndex > -1) {
        cart[orderIndex].quantity += changeAmount;

        // Xóa đơn hàng nếu số lượng nhỏ hơn 1
        if (cart[orderIndex].quantity < 1) {
            cart.splice(orderIndex, 1); // Xóa đơn hàng
        }
        localStorage.setItem('cart', JSON.stringify(cart)); // Cập nhật localStorage
        renderCart(); // Cập nhật giỏ hàng hiển thị
    } else {
        alert("Không tìm thấy đơn hàng!");
    }
}

// Hàm xóa đơn hàng
function deleteOrder(orderId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(order => order.id !== orderId);
    localStorage.setItem('cart', JSON.stringify(cart)); // Cập nhật localStorage
    renderCart(); // Cập nhật giỏ hàng hiển thị
}

// Xử lý sự kiện cho các nút thay đổi số lượng và xóa đơn hàng
document.addEventListener('click', (event) => {
    if (event.target.matches('.changeQuantity')) {
        const orderId = parseInt(event.target.dataset.id);
        const changeAmount = parseInt(event.target.dataset.number);
        updateOrderQuantity(orderId, changeAmount);
    }

    if (event.target.matches('.deleteOrder')) {
        const orderId = parseInt(event.target.dataset.id);
        deleteOrder(orderId);
    }
});

// Hiển thị giỏ hàng khi trang được tải
document.addEventListener("DOMContentLoaded", async () => {
    await renderCart(); // Gọi hàm để hiển thị giỏ hàng
});

// Hàm tạo ra các hàng cho order status
function createOrderStatusRow(order){
  var product = ProductService.getProductById(order.product_id);
  return `<tr>
            <td>
              <img
                src= ${product.image_link}
                alt="${product.name}"
                class = "product_image"
              />
            </td>
            <td>${product.name}</td>
            <td>${priceFormat(product.price)}₫</td>
            <td>${order.quantity}</td>
            <td>${priceFormat(product.price * order.quantity)}₫</td>
            <td>${order.status}</td>
          </tr>`
}

// Hàm render trang giỏ hàng
async function renderOrderStatus(orders){
  orders.forEach(order => {
      let row = createOrderStatusRow(order);
      document.getElementById("order_status_table_body").innerHTML += row;
  });
}

// Hàm để hiển thị các đơn hàng của user
document.addEventListener('DOMContentLoaded', renderOrderStatus(orders));