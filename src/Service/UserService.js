import { getFromLocalStorage } from "../Utils/Storage";
import { saveToLocalStorage } from "../Utils/Storage";
const UserService = {
    arrayUser : getFromLocalStorage("users"),
    // Hàm lưu user
    saveUser: function(user){
        this.arrayUser.push(user);
        saveToLocalStorage("user",user);
    },
    // Hàm lấy tất cả user
    getAllUser: function(){
        if(arrayUser){
            return arrayUser;
        }else{
            return [];
        }
    },
    // Hàm xóa 1 user theo id
    getAllUser: function(id){
        this.arrayUser.filter(function(item){
            return item.id !== id;
        })
        console.log(`User with ${id} is removed!`);
    },
    // Hàm chỉnh sửa thông tin người dùng - tryền vào 1 user mới
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