import { getFromLocalStorage } from "../Utils/Storage.js";
import { saveToLocalStorage } from "../Utils/Storage.js";

export const UserService = {
    arrayUser: await getFromLocalStorage("users"),
    
    // Hàm lưu User
    saveUser: function (User) {
        this.arrayUser.push(User);
        saveToLocalStorage("users", JSON.stringify(this.arrayUser));
    },
    
    // Hàm lấy tất cả User
    getAllUsers: function () {
        if (this.arrayUser) {
            return this.arrayUser;
        } else {
            return [];
        }
    },
    
    // Hàm lấy user theo id của user
    getUserById(id) {
        return this.arrayUser.find(element => {
            return element.id == id;
        });
    },
    
    // Hàm xóa user theo id
    async deleteUserById(id) {
        this.arrayUser = await this.arrayUser.filter(function(user) {
            return user.id != id;
        });
        saveToLocalStorage("users", JSON.stringify(this.arrayUser));
        console.log("User đã được xóa!");
    },
    
    // Hàm chỉnh sửa thông tin user - truyền vào 1 User mới
    updateUser: async function (User) {
        const index = await this.arrayUser.findIndex(u => u.id === User.id);

        if (index !== -1) {
            this.arrayUser[index] = {
                ...this.arrayUser[index],
                ...User
            };
            saveToLocalStorage("users", JSON.stringify(this.arrayUser));
            console.log("User has been updated!");
        } else {
            console.error("User not found");
        }
    },

    findUserByNameAndPassword: function(username, password){ // trả về user_id hoặc null
        for(let i = 0; i<this.arrayUser.length; i++){
            let user = this.arrayUser[i];
            if(user.name === username && user.password == password){
                return user.id;
            }
        }
        return null;
    }
}
