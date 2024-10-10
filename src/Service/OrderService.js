import { getFromLocalStorage } from "../Utils/Storage.js";
import { saveToLocalStorage } from "../Utils/Storage.js";
export const OrderService = {
    arrayOrder: getFromLocalStorage("Orders"),
    // Hàm lưu Order
    saveOrder: function (Order) {
        this.arrayOrder.push(Order);
        saveToLocalStorage("Orders", Order);
    },
    // Hàm lấy tất cả Order
    getAllOrders: function () {
        if (this.arrayOrder) {
            return this.arrayOrder;
        } else {
            return [];
        }
    },
    // Hàm xóa 1 Order theo id
    getOrder: function (id) {
        this.arrayOrder.filter(function (item) {
            return item.id !== id;
        })
        console.log(`Order with ${id} is removed!`);
    },
    // Hàm chỉnh sửa thông tin người dùng - tryền vào 1 Order mới
    updateOrder: function (Order) {
        const index = this.arrayOrder.findIndex(u => u.id === Order.id);

        if (index !== -1) {
            // Sử dụng spread operator để cập nhật các thuộc tính của đối tượng
            this.arrayOrder[index] = {
                ...this.arrayOrder[index],
                ...Order
            };
            console.log("Order has been updated!");
        } else {
            console.error("Order not found");
        }
    }
}