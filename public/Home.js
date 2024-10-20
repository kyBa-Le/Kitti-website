import { RecipeService } from "/src/Service/RecipeService.js";
import { getFromLocalStorage, readFileJson } from "../src/Utils/Storage.js";
import { saveToLocalStorage } from "../src/Utils/Storage.js";
import {ProductService} from "/src/Service/ProductService.js";


// Lưu tất cả dữ liệu của các đối tượng vào local storage
if(["users","orders","products","recipes"].every(item => !Object.keys(localStorage).includes(item))){
    const arrUsers = await readFileJson("/src/Data/User.json");
    const arrOrders = await readFileJson("/src/Data/Order.json");
    const arrProduct = await readFileJson("/src/Data/Product.json");
    const arrayRecipe = await readFileJson("/src/Data/Recipe.json");

    saveToLocalStorage("users", JSON.stringify(arrUsers));
    saveToLocalStorage("orders", JSON.stringify(arrOrders));
    saveToLocalStorage("products", JSON.stringify(arrProduct));
    saveToLocalStorage("recipes", JSON.stringify(arrayRecipe));
} 
// Kiểm tra nếu đăng nhập lần đầu thì đặt user_id = ''
if(!Object.keys(localStorage).includes("user_id")){
    let user_id = ""; 
    localStorage.setItem("user_id", user_id);
}

// Tạo hiệu ứng chuyển động: phần chữ của quảng cáo
const animateSection = document.querySelector('.animate-section');
const triggerPoint = window.innerHeight * 0.5;
let isShown = false; // Biến cờ để theo dõi trạng thái

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition >= triggerPoint && !isShown) {
        animateSection.classList.add('show');
        isShown = true;
    }else if(scrollPosition<window.innerHeight*0.2){
        animateSection.classList.remove("show");
        isShown = false;
    }
});
// Kết thúc phần hiệu ứng chuyển động.

// Bắt đầu code cho phẩn hiển thị sản phẩm

const products = ProductService.getAllProducts();
let page = 1;
console.log(Array.isArray(products));
// Hàm tạo các card
function createProductItem(product){
    return `<div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${product.image_link}" class="card-img-top" alt="${product.name}" data-id="${product.id}">
                    <div class="card-body text-center">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">
                            <a href="/public/HTML/ProductDetail?product_id=${product.id}" class="link">Xuất xứ từ Singapore, click xem công thức</a>
                        </p>
                    </div>
                </div>
            </div>`
}
// Hàm tạo ra slide mới để thêm 3 card vào - cần truyền vào một con số để đánh dấu thứ tự của item
function createCarouselItem(number){
    let carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");
    let rowItem = document.createElement("div");
    rowItem.classList.add("row");
    rowItem.id = `carousel-item-row${number}`;
    carouselItem.appendChild(rowItem);
    document.getElementById("carousel-inner").appendChild(carouselItem);
}
// Hàm hiển thị ra các card của sản phẩm
function renderProducts(products){
    let i = 0;
    let row = 0;
    while(i<3 && i<products.length){ //Tạo ra 3 sản phẩm và thêm vào slide đầu tiên ( active )
        let item = createProductItem(products[i]);
        document.getElementById("carousel-item-active-row").innerHTML += item;
        i++;
    }
    while(i<products.length){ // Tạo ra các carousel item theo số hàng tăng dần và thêm vào
        if(i%3===0){
            row++;
            createCarouselItem(row);
        }
        let item = createProductItem(products[i]);
        document.getElementById(`carousel-item-row${row}`).innerHTML += item;
        i++;
    }
}
// Render all products when page is loading
document.addEventListener("DOMContentLoaded", renderProducts(products));
// Khi ấn vào ảnh thì chuyển đến đúng trang
document.querySelectorAll(".card-img-top").forEach((item) =>{
    item.addEventListener("click",()=>{
        window.location.href = `/public/HTML/ProductDetail.html?product_id=${item.dataset.id}`;
    })
})

// Kết thúc phần code hiển thị sản phẩm

// Bắt đầu code cho phẩn hiển thị công thức
const recipes = RecipeService.getAllRecipes();
console.log(Array.isArray(recipes));

// Hàm hiển thị ra các card của sản phẩm
function renderRecipes(recipes) {
    // Lấy tối đa 6 công thức, nhưng đảm bảo không vượt quá chiều dài của mảng
    const recipesToRender = recipes.slice(0, Math.min(recipes.length, 6));

    for (let i = 0; i < recipesToRender.length; i++) {
        const recipe = recipesToRender[i];

        // Kiểm tra xem recipe có tồn tại không trước khi truy cập thuộc tính
        if (recipe) {
            const recipeCard = 
                `<div class="col-md-4 mb-4">
                    <div class="recipe-item">
                        <img src="${recipe.image_link}">
                        <div class="overlay">
                            <h5 class="card-title" id="recipe-description">${recipe.name}</h5>
                            <a class="btn btn-primary recipeDetail" data-id="${recipe.id}">Xem công thức</a>
                        </div>
                    </div>
                </div>`;
                
            document.querySelector("#row-recipe").innerHTML += recipeCard;
        }
    }
}




// Render all products when page is loading
document.addEventListener("DOMContentLoaded", renderRecipes(recipes));
// Khi ấn vào ảnh thì chuyển đến đúng trang
document.querySelectorAll(".recipeDetail").forEach((item) =>{
    item.addEventListener("click",()=>{
        window.location.href = `/public/HTML/RecipeDetail.html?recipe_id=${item.dataset.id}`;
    })
})
// Kết thúc phần code hiển thị công thức