// Hàm để hiển thị các đơn hàng của user
document.addEventListener('DOMContentLoaded',renderCart(orders));
import { getQueryParam } from "../../src/Utils/Param.js";
import { OrderService } from "../../src/Service/OrderService.js";
import { ProductService } from "../../src/Service/ProductService.js";

const id = getQueryParam("user_id");
const orders = OrderService.getOrderByUserId(id); // lấy tất cả các đơn hàng trong local

// Hàm tạo ra các hàng cho order
function createOrderRow(order){
    var product = ProductService.getProductById(order.user_id);
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
                  <button class="btn btn-sm btn-outline-secondary" onclick=subtractQuantity()>-</button>
                  <input
                    type="text"
                    value=${order.quantity}
                    class="form-control form-control-sm mx-2 text-center"
                    style="width: 50px"
                  />
                  <button class="btn btn-sm btn-outline-secondary" onclick=addQuantity()>+</button>
                </div>
              </td>
              <td>${e}₫</td>
              <td>
                <button
                  type="button"
                  class="btn btn-sm btn-warning card-btn-color" onclick=deleteOrderById(${order.id})
                >
                  Xóa
                </button>
              </td>
            </tr>`
}

// Hàm render trang giỏ hàng
function renderCart(orders){
    orders.array.forEach(order => {
        let row = createOrderRow(order);
        document.getElementById("cart_table_body").innerHTML += row;
    });
}