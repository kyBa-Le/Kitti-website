import { getFromLocalStorage } from "../Utils/Storage.js";
import { saveToLocalStorage } from "../Utils/Storage.js";

export const RecipeService = {
    arrayRecipe: await getFromLocalStorage("recipes"),

    // Hàm lưu recipe
    saveRecipe: function(recipe) {
        this.arrayRecipe.push(recipe);
        saveToLocalStorage("recipes", JSON.stringify(this.arrayRecipe));
    },

    // Hàm lấy tất cả recipe
    getAllRecipes: function() {
        if (this.arrayRecipe) {
            return this.arrayRecipe;
        } else {
            return [];
        }
    },

    // Hàm xóa 1 recipe theo id
    removeRecipe: function(id) {
        this.arrayRecipe = this.arrayRecipe.filter(function(item) {
            return item.id !== id;
        });
        saveToLocalStorage("recipes", JSON.stringify(this.arrayRecipe));
        console.log(`Recipe with ${id} is removed!`);
    },

    // Hàm chỉnh sửa thông tin recipe - truyền vào 1 recipe mới
    updateRecipe: function(recipe) {
        const index = this.arrayRecipe.findIndex(r => r.id === recipe.id);

        if (index !== -1) {
            // Sử dụng spread operator để cập nhật các thuộc tính của đối tượng
            this.arrayRecipe[index] = {
                ...this.arrayRecipe[index],
                ...recipe
            };
            saveToLocalStorage("recipes", JSON.stringify(this.arrayRecipe));
            console.log("Recipe has been updated!");
        } else {
            console.error("Recipe not found");
        }
    }
}
