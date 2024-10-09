import { getFromLocalStorage } from "../Utils/Storage"
export const CartService = {
    // Hàm lấy tất cả các giỏ hàng
    getAllCarts(){
        return (getFromLocalStorage("carts"));
    }
}