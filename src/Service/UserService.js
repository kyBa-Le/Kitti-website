import { getFromLocalStorage } from "../Utils/Storage.js";
import { saveToLocalStorage } from "../Utils/Storage.js";
export const UserService = {
    arrayUser : getFromLocalStorage("users"),
    // Hàm lưu user
    saveUser: function(user){
        this.arrayUser.push(user);
        saveToLocalStorage("users",user);
    },
    // Hàm lấy tất cả user
    getAllUsers: function(){
        if(this.arrayUser){
            return this.arrayUser;
        }else{
            return [];
        }
    },
    // Hàm xóa 1 user theo id
    getUser: function(id){
        this.arrayUser.filter(function(item){
            return item.id !== id;
        })
        console.log(`User with ${id} is removed!`);
    },
    // Hàm chỉnh sửa thông tin người dùng - truyền vào 1 user mới
    updateUser: function(user){
        const index = this.arrayUser.findIndex(u => u.id === user.id);

        if (index !== -1) {
            // Sử dụng spread operator để cập nhật các thuộc tính của đối tượng
            this.arrayUser[index] = {
                ...this.arrayUser[index],
                ...user
            };
            console.log("User has been updated!");
        } else {
            console.error("User not found");
        } 
    }
}