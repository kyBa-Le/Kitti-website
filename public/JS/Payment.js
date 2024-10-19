import { priceFormat } from "/src/Utils/Param.js";
import { getQueryParam } from "../../src/Utils/Param.js";
import { OrderService } from "/src/Service/OrderService.js";
import { ProductService } from "/src/Service/ProductService.js";

// Đặt chiều cao của các sản phẩm được chọn và chiều cao của ghi chú bằng nhau
const ordered = document.getElementById('ordered-product');
const note = document.getElementById('exampleFormControlTextarea1');
ordered.style.height = note.offsetHeight + 'px';

// Hàm render 1 sản phẩm được chọn
function renderSelectedProduct(product, quantity){
    return `<div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                    <b> Tên món: </b>${product.name} - <b>Số lượng: </b> ${quantity} - <b>Tổng: </b> ${priceFormat(product.price * quantity)} đ
                    </label>
                </div>`
}

// Hàm hiển thị ra các sản phẩm đã được chọn vào trong ô các sản phẩm đã chọn
function renderAllSelectedProducts(ordersInfor){
    for(let i = 0; i<ordersInfor.length; i++){
        let selectedProduct = renderSelectedProduct(ordersInfor[i].product, ordersInfor[i].quantity);
        document.getElementById("ordered-product").innerHTML += selectedProduct;
    }
}

// Hàm lấy các sản phẩm được chọn và số lượng của nó - trả về một danh sách các đối tượng chứa sản phẩm và số lượng.
function getSelectedProducts(){
    let ordersInfo = []; 
    let user_id = localStorage.getItem("user_id");
    let product_id = getQueryParam("product_id");
    let quantity = getQueryParam("quantity");
    if(product_id == null && quantity == null){
        let orders = OrderService.getOrderByUserId(user_id);
        for(let i = 0; i<orders.length; i++){
            let product = ProductService.getProductById(orders[i].product_id);
            let orderInfor = {product:product, quantity:orders[i].quantity};
            ordersInfo.push(orderInfor);
        }
    }else{
        let product = ProductService.getProductById(product_id);
        let orderInfor = {product:product, quantity:quantity};
        ordersInfo.push(orderInfor);
    }
    return ordersInfo;
}

// Khi trang được hiển thị ra thì sẽ hiển thị các sản phẩm đã được chọn
document.addEventListener('DOMContentLoaded', renderAllSelectedProducts(getSelectedProducts()));