console.log("this is searching result");
import { ProductService } from "/src/Service/ProductService.js";
import { RecipeService }  from "/src/Service/RecipeService.js";
import { getQueryParam } from "/src/Utils/Param.js";
import { priceFormat } from "../../src/Utils/Param.js";

// Lấy ra từ khóa tìm kiếm
let key = getQueryParam("key");
let filter = getQueryParam("type");
document.getElementById("searchbar").value = key;
document.getElementById("filter-content").innerHTML = filter;
console.log("key and filter: ", key, filter);
const products = ProductService.filterProductByType(ProductService.getProductByNameInclude(key), filter);
const recipes = RecipeService.filterRecipeByType(RecipeService.getRecipeByNameInclude(key), filter);

console.log(products);
// Hàm tạo ra item cho sản phẩm
function createProductItems(products){
    if(products.length == 0){
        document.getElementById('result-product').innerHTML = `<div class="container d-flex align-items-center justify-content-center">
                    <p class="text-center">Không tìm thấy món ăn nào phù hợp</p>
                </div>`;
    }else{
        for(let i = 0; i<products.length; i++){
        let product = products[i];
        let productItem = `<div class="col-md-4 mb-4">
                                <div class="recipe-item">
                                    <img src="${product.image_link}">
                                    <div class="overlay">
                                        <h5 class="card-title" id="recipe-description">${product.name}</h5>
                                        <a class="btn btn-primary recipeDetail" data-id="${product.id}">Xem chi tiết</a>
                                    </div>
                                </div>
                                <p class="text-center"><b>${product.name} - ${priceFormat(product.price)} đ</b></p>
                            </div>`;

            document.getElementById('result-product').innerHTML += productItem;
        }
    }
    
}

// Hàm tạo ra item cho công thức
function createRecipeItems(recipes){
    if(recipes.length == 0) {
        document.getElementById("result-recipe").innerHTML = `<div class="container d-flex align-items-center justify-content-center">
                    <p class="text-center">Không tìm thấy công thức nào phù hợp</p>
                </div>`;
    }else{
        for (let i = 0; i < recipes.length; i++) {
            let recipe = recipes[i];
            let recipeItem = `<div class="col-md-4 mb-4">
                            <div class="recipe-item">
                                <img src="${recipe.image_link}">
                                <div class="overlay">
                                    <h5 class="card-title" id="recipe-description">${recipe.name}</h5>
                                    <a class="btn btn-primary recipeDetail" data-id="${recipe.id}">Xem công thức</a>
                                </div>
                            </div>
                            <p class="text-center"><b>${recipe.name} - ${recipe.time}</b></p>
                        </div>`;
            ;
            document.getElementById("result-recipe").innerHTML += recipeItem;
        }
    }
}

document.getElementById("result-for-keyword").innerHTML += '"' + key + '"';

// Hiển thị ra các sản phẩm khi load trang
createProductItems(products);

// Hiển thị ra các công thức khi load trang
createRecipeItems(recipes);