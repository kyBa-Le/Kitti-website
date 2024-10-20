import { getFromLocalStorage } from "../Utils/Storage.js";
import { saveToLocalStorage } from "../Utils/Storage.js";

export const RecipeService = {
    arrayRecipe: await getFromLocalStorage("recipes"),
    
    // Hàm lưu Recipe
    saveRecipe: function (Recipe) {
        this.arrayRecipe.push(Recipe);
        saveToLocalStorage("recipes", JSON.stringify(this.arrayRecipe));
    },
    
    // Hàm lấy tất cả Recipe
    getAllRecipes: function () {
        if (this.arrayRecipe) {
            return this.arrayRecipe;
        } else {
            return [];
        }
    },
    
    // Hàm lấy recipe theo id của recipe
    getRecipeById(id) {
        return this.arrayRecipe.find(element => {
            return element.id == id;
        });
    },
    
    // Hàm lấy các Recipe theo id của user
    getRecipeByUserId: function(user_id) {
        return this.arrayRecipe.filter(value => {
            return value.user_id == user_id;
        });
    },
    
    // Hàm chỉnh sửa thông tin recipe - truyền vào 1 Recipe mới
    updateRecipe: async function (Recipe) {
        const index = await this.arrayRecipe.findIndex(r => r.id === Recipe.id);

        if (index !== -1) {
            this.arrayRecipe[index] = {
                ...this.arrayRecipe[index],
                ...Recipe
            };
            saveToLocalStorage("recipes", JSON.stringify(this.arrayRecipe));
            console.log("Recipe has been updated!");
        } else {
            console.error("Recipe not found");
        }
    },
    
    // Hàm xóa recipe theo id
    async deleteRecipeById(id) {
        this.arrayRecipe = await this.arrayRecipe.filter(function(recipe) {
            return recipe.id != id;
        });
        saveToLocalStorage("recipes", JSON.stringify(this.arrayRecipe));
        console.log("Recipe đã được xóa!");
    },

    // Hàm lấy ra công thức theo tên có chứa từ khóa - nhận vào 1 từ khóa - trả về 1 danh sách công thứdc
    getRecipeByNameInclude: function (recipeName) {
        const recipes = [];
        for (let i = 0; i < this.arrayRecipe.length; i++) {
            if (this.arrayRecipe[i].name.toUpperCase().includes(recipeName.toUpperCase())) {
                recipes.push(this.arrayRecipe[i]);
            }
        }
        return recipes;
    },

    // Lọc các công thứdc theo phân loại, nhận vào một array recipe và loại - trả về 1 array recipe
    filterRecipeByType: function (recipes, type) {
        if (type == '' || type == null) {
            return recipes;
        }
        const filteredrecipe = [];
        for (let i = 0; i < recipes.length; i++) {
            if (recipes[i].type == type) {
                filteredrecipe.push(recipes[i]);
            }
        }
        return filteredrecipe;
    },
}
