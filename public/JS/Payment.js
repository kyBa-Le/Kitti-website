import { priceFormat } from "/src/Utils/Param.js";
import { getQueryParam } from "../../src/Utils/Param.js";
import { OrderService } from "/src/Service/OrderService.js";
import { ProductService } from "/src/Service/ProductService.js";
console.log("This is payment.js");
// Đặt chiều cao của các sản phẩm được chọn và chiều cao của ghi chú bằng nhau
const ordered = document.getElementById('ordered-product');
const note = document.getElementById('exampleFormControlTextarea1');
ordered.style.height = note.offsetHeight + 'px';
var totalPrice = 0;
// Hàm render 1 sản phẩm được chọn
function renderSelectedProduct(product, quantity) {
    return `<div class="form-check">
                    <input class="form-check-input" data-quantity="${quantity}" type="checkbox" value="${product.id}" id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                    <b> Tên món: </b>${product.name} - <b>Số lượng: </b> ${quantity} - <b>Tổng: </b> ${priceFormat(product.price * quantity)} đ
                    </label>
                </div>`
};

// Hàm hiển thị ra các sản phẩm đã được chọn vào trong ô các sản phẩm đã chọn
function renderAllSelectedProducts(ordersInfor) {
    for (let i = 0; i < ordersInfor.length; i++) {
        let selectedProduct = renderSelectedProduct(ordersInfor[i].product, ordersInfor[i].quantity);
        document.getElementById("ordered-product").innerHTML += selectedProduct;
    }
};

// Hàm lấy các sản phẩm được chọn và số lượng của nó - trả về một danh sách các đối tượng chứa sản phẩm và số lượng.
function getSelectedProducts() {
    let ordersInfo = [];
    let user_id = localStorage.getItem("user_id");
    let product_id = getQueryParam("product_id");
    let quantity = getQueryParam("quantity");
    if (product_id == null && quantity == null) {
        let orders = OrderService.getOrderByUserId(user_id);
        for (let i = 0; i < orders.length; i++) {
            let product = ProductService.getProductById(orders[i].product_id);
            let orderInfor = { product: product, quantity: orders[i].quantity };
            ordersInfo.push(orderInfor);
        }
    } else {
        let product = ProductService.getProductById(product_id);
        let orderInfor = { product: product, quantity: quantity };
        ordersInfo.push(orderInfor);
    }
    console.log(ordersInfo);
    return ordersInfo;
};

// Khi trang được hiển thị ra thì sẽ hiển thị các sản phẩm đã được chọn
document.addEventListener('DOMContentLoaded', renderAllSelectedProducts(getSelectedProducts()));
// Lấy ra những sản phẩm được chọn ở form thanh toán - trả về danh sách đối tượng chứa sản phẩm và số lượng 
function checkedProducts() { // Using a descriptive function name
    const productsInfo = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Iterate over the checkboxes collection directly
    for (const checkbox of checkboxes) {
        if (checkbox.checked) {
            let productInfo = {productId:checkbox.value, quantity:checkbox.dataset.quantity};
            console.log("Value of checked checkbox:", (checkbox.value));
            productsInfo.push(productInfo);
        }
    }

    return productsInfo;
};

// Hàm tạo ra chi tiết sản phẩm đã thanh toán sau khi thanh toán thành công
function renderSucessfulPayment(product, quantity) {
    return `<div class="item">
                <img src="${product.image_link}"
                    alt="${product.name}" class="item-img">
                <div class="item-info">
                    <p>${product.name} <span class="quantity">(Số lượng: ${quantity})</span></p>
                    <span>${priceFormat(product.price * quantity)} ₫</span>
                </div>
            </div>`
};

// Hàm hiển thị ra toàn bộ các sản phẩm đã được chọn để thanh toán thành công
function renderAllSucessfulPayment(productsInfo) {
    for (let i = 0; i < productsInfo.length; i++) {
        let product = ProductService.getProductById(productsInfo[i].productId);
        console.log("Checked:=>", ProductService.getProductById(productsInfo[i].productId));
        let quantity = productsInfo[i].quantity;
        let item = renderSucessfulPayment(product, quantity);
        document.getElementById("sucessful-payment-products").innerHTML += item;
        totalPrice += parseFloat(product.price) * parseFloat(quantity);
        console.log("total price is: ", parseFloat(product.price) * parseFloat(quantity));

    }
};

// Hủy đơn thanh toán không mua nữa
document.getElementById("cancelOrder").addEventListener('click', ()=>{
    console.log("You have clicked cancel");
    history.back();
});

// Hiển thị thanh toán thành công
document.getElementById("pay-button").addEventListener('click', () => {
    let orderPerson = document.getElementById("inputName4").value;
    let phoneNumber = document.getElementById('inputPhoneNumber4').value;
    let address = document.getElementById("inputAddress").value;
    console.log(orderPerson, phoneNumber, address);
    if (orderPerson == "" || phoneNumber == "" || address == "") {
        window.alert("Vui lòng nhập đầy đủ thông tin giao hàng!");
    } else {
        // Điều chỉnh lại hiển thị thanh toán thành công
        document.getElementById("customer-name").innerHTML += orderPerson;
        document.getElementById("delivery-address").innerHTML += address;
        renderAllSucessfulPayment(checkedProducts());
        document.getElementById("total-amount").innerHTML += priceFormat(totalPrice) + " đ";
        document.getElementById("orderModal").classList.remove("invisible");
        document.getElementById("orderModal").style.display = "block";
        document.getElementById("paymentForm").classList.add("invisible");
    }

});

// Sau khi ấn vào nút đóng hiển thị thanh toán thành công
document.getElementById("close-button-to-home").addEventListener('click', () => {
    window.location.href = '/public/Home.html';
});

