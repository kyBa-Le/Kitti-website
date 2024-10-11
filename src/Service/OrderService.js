import { getFromLocalStorage } from "../Utils/Storage.js";
import { saveToLocalStorage } from "../Utils/Storage.js";
export const OrderService = {
    arrayOrder: await getFromLocalStorage("orders"),
    // Hàm lưu Order
    saveOrder: function (Order) {
        this.arrayOrder.push(Order);
        saveToLocalStorage("orders", JSON.stringify(this.arrayOrder));
    },
    // Hàm lấy tất cả Order
    getAllOrders: function () {
        if (this.arrayOrder) {
            return this.arrayOrder;
        } else {
            return [];
        }
    },
    // Hàm lấy order theo id của order
    getOrderById(id){
        return this.arrayOrder.find(element => {
            return element.id == id;
        });
    },
    // Hàm lấy các Order theo id của user
    getOrderByUserId: function(user_id){
        console.log(Array.isArray(this.arrayOrder));
        return this.arrayOrder.filter(value =>{
            return value.user_id == user_id;
        });
    },
    // Hàm chỉnh sửa thông tin order - tryền vào 1 Order mới
    updateOrder: async function (Order) {
        const index = await this.arrayOrder.findIndex(u => u.id === Order.id);

        if (index !== -1) {
            // Sử dụng spread operator để cập nhật các thuộc tính của đối tượng
            this.arrayOrder[index] = {
                ...this.arrayOrder[index],
                ...Order
            };
            saveToLocalStorage("orders",JSON.stringify(this.arrayOrder));
            console.log("Order has been updated!");
        } else {
            console.error("Order not found");
        }
    },
    // Hàm xóa order theo id
    deleteOrderById(id){
        this.arrayOrder.filter(function(order){
            return order.id != id;
        })
    }
}