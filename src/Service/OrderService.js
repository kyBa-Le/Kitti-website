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
    getOrderById(id) {
        return this.arrayOrder.find(element => {
            return element.id == id;
        });
    },
    
    // Hàm lấy order theo user_id và product_id
    getOrderByUserIdAndProductId(user_id, product_id){
        return this.arrayOrder.find(element => {
            return (element.user_id == user_id && element.product_id == product_id && element.status == "Chờ thanh toán");
        })
    },

    // Hàm lấy các Order theo id của user
    getOrderByUserId: function(user_id) {
        return this.arrayOrder.filter(value => {
            return value.user_id == user_id;
        });
    },
    
    // Hàm chỉnh sửa thông tin order - truyền vào 1 Order mới
    updateOrder: async function (Order) {
        const index = await this.arrayOrder.findIndex(o => o.id === Order.id);

        if (index !== -1) {
            this.arrayOrder[index] = {
                ...this.arrayOrder[index],
                ...Order
            };
            saveToLocalStorage("orders", JSON.stringify(this.arrayOrder));
            console.log("Order has been updated!");
        } else {
            console.error("Order not found");
        }
    },
    
    // Hàm xóa order theo id
    async deleteOrderById(id) {
        this.arrayOrder = await this.arrayOrder.filter(function(order) {
            return order.id != id;
        });
        saveToLocalStorage("orders", JSON.stringify(this.arrayOrder));
        console.log("Order đã được xóa!");
    }
}
