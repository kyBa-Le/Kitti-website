const id = getQueryParam("user_id");
let orders = OrderService.getOrderByUserId(id);
console.log(orders);

// lấy tất cả các đơn hàng trong local của một user

import { getQueryParam } from "../../src/Utils/Param.js";
import { OrderService } from "../../src/Service/OrderService.js";
import { ProductService } from "../../src/Service/ProductService.js";
import { getFromLocalStorage, saveToLocalStorage } from "../../src/Utils/Storage.js";

// Hàm thay đổi số lượng
function changeQuantity(id, num) {
  let order = OrderService.getOrderById(id);
  if(order.quantity >= 1){
    console.log(order);
    order.quantity += parseInt(num);
    OrderService.updateOrder(order);
    location.reload();
  }else{
    window.alert("Click delete to delete the item!");
  }
  
}




// Hàm tạo ra các hàng cho order
function createOrderRow(order){
    var product = ProductService.getProductById(order.product_id);
    return `<tr>
              <td>
                <img
                  src= ${product.image_link}
                  alt="${product.name}"
                />
              </td>
              <td>${product.name}</td>
              <td>${product.price}₫</td>
              <td>
                <div class="d-flex justify-content-center">
                  <button class="btn btn-sm btn-outline-secondary changeQuantity" data-id="${order.id}" data-number="${-1}">-</button>
                  <input
                    type="text"
                    value=${order.quantity}
                    class="form-control form-control-sm mx-2 text-center"
                    style="width: 50px"
                  />
                  <button class="btn btn-sm btn-outline-secondary changeQuantity" data-id=${order.id} data-number="${1}">+</button>
                </div>
              </td>
              <td>${product.price * order.quantity}₫</td>
              <td>
                <button
                  type="button"
                  class="btn btn-sm btn-warning card-btn-color deleteOrder"
                >
                  Xóa
                </button>
              </td>
            </tr>`
}

// Hàm render trang giỏ hàng
async function renderCart(orders){
    orders.forEach(order => {
        let row = createOrderRow(order);
        document.getElementById("cart_table_body").innerHTML += row;
    });
}

// Hàm để hiển thị các đơn hàng của user
document.addEventListener('DOMContentLoaded', renderCart(orders));
const change = document.querySelectorAll(".changeQuantity");
change.forEach(button => {
  button.addEventListener('click', () => {
    const productId = button.dataset.id;
    const number = button.dataset.number;
    changeQuantity(productId, number); // Call the function with retrieved values
  });
});