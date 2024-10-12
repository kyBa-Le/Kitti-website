// Hàm để hiển thị các đơn hàng của user
document.addEventListener('DOMContentLoaded',renderCart(orders));
import { getQueryParam } from "../../src/Utils/Param.js";
import { OrderService } from "../../src/Service/OrderService.js";

const id = getQueryParam("user_id");
const orders = OrderService.getOrderByUserId(id); // lấy tất cả các đơn hàng trong local

// Hàm tạo ra các hàng cho order
function createOrderRow(order){
    return `<tr>
              <td>
                <img
                  src="https://images.pexels.com/photos/27420469/pexels-photo-27420469/free-photo-of-dia-kh-e-m-nh-b-a-t-i-b-a-tr-a.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="${order.name}"
                />
              </td>
              <td>${order.name}</td>
              <td>50.000₫</td>
              <td>
                <div class="d-flex justify-content-center">
                  <button class="btn btn-sm btn-outline-secondary">-</button>
                  <input
                    type="text"
                    value="1"
                    class="form-control form-control-sm mx-2 text-center"
                    style="width: 50px"
                  />
                  <button class="btn btn-sm btn-outline-secondary">+</button>
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