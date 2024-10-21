import { getQueryParam } from "/src/Utils/Param.js";
import { RecipeService } from "/src/Service/RecipeService.js";

// Bắt đầu hiển thị sản phẩm theo tham số lấy được từ đường dẫn
const recipe_id = getQueryParam("recipe_id");
console.log(recipe_id);

// Hàm hiển thị chi tiết công thức
function renderRecipeDetail(recipe_id) {
    const recipe = RecipeService.getRecipeById(recipe_id);
    console.log(recipe);
    document.querySelector('#recipe-title').innerText = recipe.name; // Cập nhật tiêu đề
    document.querySelector('#recipe-description').innerText = recipe.description; // Cập nhật mô tả
    document.querySelector('#recipe-image').src = recipe.image_link; // Cập nhật hình ảnh
    // Cập nhật nguyên liệu
    recipe.ingredients.forEach(ingredient => {
        const ingredientElement = `
        <tr>
            <td>${ingredient.name}</td>
            <td>${ingredient.quantity}</td>
            <td>${ingredient.unit}</td>
        </tr>`;
        document.querySelector('#ingredients-container tbody').innerHTML += ingredientElement;
    });

    // Cập nhật hướng dẫn nấu ăn
    recipe.steps.forEach(step => {
        const stepElement = `
        <div class="step">
            <div class="step-title">
                ${step.title}
            </div>
            <div class="step-title-detail">
                <div class="img">
                    <img 
                    src="${step.image_link}" 
                    alt="${step.title}" 
                    class="recipedetail-image"/>
                </div>
                <div class="divider"></div>
                <div class="content">
                    <p>${step.description}</p>
                </div>
            </div>
        </div>`;
        document.getElementById('steps').innerHTML += stepElement; // Cộng dồn nội dung cho container
    });
}

//form
let isFormOpened = false; // Khai báo biến toàn cục để theo dõi trạng thái của form

// Hàm mở form khi ấn vào nút tạo công thức
function openFormRecipe() {
    console.log("form is opened");
    let form = $("#form_recipe_container");
    let recipe = $("#recipe-detail");
    form.css("display", "block");
    recipe.css("filter", "blur(5px)");
    isFormOpened = true;
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Hiệu ứng cuộn mượt mà
    });
}

// Hàm xử lý số lượng cho công thức mới
function newRecipe() {
    // Lấy dữ liệu từ localStorage
    const recipe = RecipeService.getRecipeById(recipe_id);

    // Xóa nội dung hiện có của <tbody>
    $("#ingredients-container tbody").empty();

    if (isFormOpened) {
        // Ẩn form
        $("#form_recipe_container").css("display", "none");
        $("#recipe-detail").css("filter", "none");
        isFormOpened = false;
    }
    // Cập nhật số lượng nguyên liệu mới
    recipe.ingredients.forEach(ingredient => {
        let randomQuantity;
        if (["Nước chấm", "Nước sốt", "Gia vị"].includes(ingredient.name)) {
            randomQuantity = ingredient.quantity;
        } else {
            // Tạo số lượng ngẫu nhiên dựa trên đơn vị
            switch (ingredient.unit) {
                case 'g':
                    randomQuantity = (Math.floor(Math.random() * 400) + 100);
                    break;
                case 'ml':
                    randomQuantity = (Math.floor(Math.random() * 400) + 100);
                    break;
                case 'kg':
                    randomQuantity = (Math.floor(Math.random() * 4) + 1);
                    break;
                case 'l':
                    randomQuantity = (Math.floor(Math.random() * 4) + 1);
                    break;
                case 'cái':
                    randomQuantity = (Math.floor(Math.random() * 5) + 1);
                    break;
                case 'muỗng':
                    randomQuantity = (Math.floor(Math.random() * 5) + 1);
                    break;
                default:
                    randomQuantity = (Math.floor(Math.random() * 5) + 1);
            }
        }
        const ingredientElement = `
        <tr>
            <td>${ingredient.name}</td>
            <td>${randomQuantity}</td>
            <td>${ingredient.unit}</td>
        </tr>`;
        document.querySelector('#ingredients-container tbody').innerHTML += ingredientElement;
    });

    // Cập nhật nội dung mới vào bảng
    $("#ingredients-container tbody").html(ingredientsHTML);
}

// Thêm sự kiện click để đóng form nếu click ra ngoài
document.addEventListener("click", (event) => {
    if (isFormOpened && !event.target.closest("#form_recipe_container") && !event.target.closest("#createRecipeButton")) {
        let form = $("#form_recipe_container");
        let recipe = $("#recipe-detail");
        form.css("display", "none");
        recipe.css("filter", "none");
        isFormOpened = false;
    }
});

// Gán sự kiện cho nút tạo công thức
document.getElementById('createRecipeButton').addEventListener('click', openFormRecipe);
document.getElementById("btn-form-recipe").addEventListener('click', newRecipe);

// Hiển thị sản phẩm khi load trang
document.addEventListener("DOMContentLoaded", renderRecipeDetail(recipe_id));
// Kết thúc phần hiển thị sản phẩm

//  Bắt đầu phần js cho nút home - back
document.getElementById("home-icon").addEventListener("click", function(home) {
    home.preventDefault();
    window.location.href = "/public/Home.html"; 
});

// Navigate to Previous page when Back button is clicked
document.getElementById("back-icon").addEventListener("click", function(back) {
    back.preventDefault();
    window.history.back(); 
});
// Kết thúc phần js cho nút home - back