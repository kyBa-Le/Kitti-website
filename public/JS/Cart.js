import { getQueryParam } from "../../src/Utils/Param.js";
import { OrderService } from "../../src/Service/OrderService.js";
import { ProductService } from "../../src/Service/ProductService.js";
import { getFromLocalStorage, saveToLocalStorage } from "../../src/Utils/Storage.js";
import { priceFormat } from "/src/Utils/Param.js";

// Lấy tất cả các đơn hàng trong local của một user
const user_id = await getFromLocalStorage("user_id");
let orders = OrderService.getOrderByUserId(user_id);

// Hàm thay đổi số lượng
function changeQuantity(id, num) {
  let order = OrderService.getOrderById(id);
  if (order) {
    order.quantity += parseInt(num);
    OrderService.updateOrder(order);
  }
}

// Hàm tạo ra các hàng cho đơn hàng đang chờ thanh toán
function createOrderRow(order) {
  var product = ProductService.getProductById(order.product_id);
  return `<tr>
              <td>
                <img src="${product.image_link}" alt="${product.name}" class="product_image" />
              </td>
              <td>${product.name}</td>
              <td id="price-${order.id}" data-price="${product.price}">${priceFormat(product.price)}₫</td>
              <td>
                <div class="d-flex justify-content-center">
                  <button class="btn btn-sm btn-outline-secondary changeQuantity" data-id="${order.id}" data-number="${-1}">-</button>
                  <input
                    type="text"
                    id="quantity-${order.id}"
                    value=${order.quantity}
                    class="form-control form-control-sm mx-2 text-center" style="width: 50px"
                    readonly
                  />
                  <button class="btn btn-sm btn-outline-secondary changeQuantity" data-id="${order.id}" data-number="${1}">+</button>
                </div>
              </td>
              <td id="total-${order.id}">${priceFormat(product.price * order.quantity)}₫</td>
              <td>
                <button type="button" class="btn btn-sm btn-warning card-btn-color deleteOrder" data-id="${order.id}">
                  Xóa
                </button>
              </td>
            </tr>`;
}

// Hàm render trang giỏ hàng
function renderCart(orders) {
  // Xóa nội dung cũ trước khi thêm mới
  document.getElementById("cart_table_body").innerHTML = '';

  // Lọc đơn hàng đang chờ thanh toán
  const filteredOrders = orders.filter(order => order.status === 'Chờ thanh toán');
  
  // Kiểm tra nếu có đơn hàng
  if (filteredOrders.length > 0) {
    filteredOrders.forEach(order => {
      let row = createOrderRow(order);
      document.getElementById("cart_table_body").innerHTML += row;
    });
  } else {
    // Nếu không có đơn hàng nào, hiển thị thông báo
    const emptyRow = `<tr><td colspan="6">Không có đơn hàng nào đang chờ thanh toán</td></tr>`;
    document.getElementById("cart_table_body").innerHTML = emptyRow;
  }

  // Cập nhật tổng tiền
  updateTotalPrice();
}

// Hàm cập nhật tổng tiền
function updateTotalPrice() {
  let orders = OrderService.getOrderByUserId(user_id);
  orders = orders.filter(order => order.status == "Chờ thanh toán");
  let totalPrice = orders.reduce((total, order) => {
    const product = ProductService.getProductById(order.product_id);
    return total + (product.price * order.quantity);
  }, 0);
  document.getElementById("total-price").textContent = priceFormat(totalPrice) + '₫';
}

document.addEventListener("click", updateTotalPrice);

// Hàm để hiển thị các đơn hàng của user
document.addEventListener('DOMContentLoaded', () => {
  renderCart(orders);

  // Gán sự kiện cho các nút thay đổi số lượng
  const changeButtons = document.querySelectorAll(".changeQuantity");
  changeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const orderId = button.dataset.id;
      const number = parseInt(button.dataset.number);
      let orderInput = document.getElementById(`quantity-${orderId}`);
      if (!(parseInt(orderInput.value) == 1 && number < 0)){
        orderInput.value = parseInt(number) + parseInt(orderInput.value);
        changeQuantity(orderId, number); // Gọi hàm với giá trị lấy được
      }
      let getPrice = document.getElementById(`price-${orderId}`).dataset.price;
      let getQuantity = document.getElementById(`quantity-${orderId}`).value;
      document.getElementById(`total-${orderId}`).innerHTML = priceFormat(parseInt(getPrice) * parseInt(getQuantity)) + " ₫";
    });
  });

// Gán sự kiện cho các nút xóa đơn hàng
const deleteButtons = document.querySelectorAll(".deleteOrder");
deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
      console.log("You have clicked delete button");
      let orderId = button.dataset.id;
      OrderService.deleteOrderById(orderId);
      orders = OrderService.getOrderByUserId(user_id); // Cập nhật danh sách đơn hàng sau khi xóa
      window.location.reload();
      renderCart(orders); // Hiển thị lại giỏ hàng
    });
  });
});


// Hàm tạo ra các hàng cho order status
function createOrderStatusRow(order) {
  var product = ProductService.getProductById(order.product_id);
  return `<tr>
            <td>
              <img src="${product.image_link}" alt="${product.name}" class="product_image" />
            </td>
            <td>${product.name}</td>
            <td>${priceFormat(product.price)}₫</td>
            <td>${order.quantity}</td>
            <td>${priceFormat(product.price * order.quantity)}₫</td>
          </tr>`;
}

// Hàm render các đơn hàng theo trạng thái
function renderOrderStatus(orders, status) {
  document.getElementById("order_status_table_body").innerHTML = ''; // Xóa nội dung cũ

  const filteredOrders = orders.filter(order => order.status === status);
  // Cập nhật tiêu đề h5 theo trạng thái
  const statusHeading = document.querySelector('.table-responsive h5');
  statusHeading.textContent = `Trạng thái: ${status.toLowerCase()}`; // Hiển thị trạng thái hiện tại
  if (filteredOrders.length > 0) {
    filteredOrders.forEach(order => {
      let row = createOrderStatusRow(order);
      document.getElementById("order_status_table_body").innerHTML += row;
    });
  } else {
    const emptyRow = `<tr><td colspan="6">Không có đơn hàng ở trạng thái này</td></tr>`;
    document.getElementById("order_status_table_body").innerHTML = emptyRow;
  }
}

// Thiết lập sự kiện cho các nút lọc trạng thái
function setupOrderStatusButtons(orders) {
  document.getElementById('processing_btn').addEventListener('click', () => renderOrderStatus(orders, 'Đang xử lý'));
  document.getElementById('shipping_btn').addEventListener('click', () => renderOrderStatus(orders, 'Đang giao'));
  document.getElementById('delivered_btn').addEventListener('click', () => renderOrderStatus(orders, 'Đã giao'));
}

// Hàm khởi tạo trang
document.addEventListener('DOMContentLoaded', function() {
  const orders = OrderService.getOrderByUserId(user_id);
  setupOrderStatusButtons(orders);
  renderOrderStatus(orders, 'Đang xử lý'); 
});

