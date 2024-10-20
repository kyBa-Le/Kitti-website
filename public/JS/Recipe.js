import { RecipeService } from "/src/Service/RecipeService.js";

const recipes = RecipeService.getAllRecipes();
console.log(recipes);

// Hàm hiển thị slide thịnh hành
function renderSlides(recipes) {
  recipes.slice(6, 10).forEach((recipe) => {
    const shortDescription = recipe.description.length > 40
      ? `${recipe.description.substring(0, 37)}...`
      : recipe.description;
    
    const slideItem = 
    `<div class="swiper-slide">
        <div class="image">
          <img src="${recipe.image_link}" alt="${recipe.name}" />
          <span>${recipe.name}</span>
        </div>
        <div class="content">
          <div class="icon">
            <a href="#"><i class="fa-solid fa-clock"></i> ${recipe.time}</a>
            <a href="#"><i class="fas fa-bolt"></i> ${recipe.difficulty}</a>
          </div>
          <h3>${recipe.name}</h3>
          <p>${shortDescription}</p>
          <a href="RecipeDetail.html?recipe_id=${recipe.id}" class="btn">Chi Tiết</a>
        </div>
      </div>`;
      
    document.getElementById("swiper-wrapper").innerHTML += slideItem;
  });
  // Khởi động Swiper
  new Swiper(".mySwiper", {
   slidesPerView: 3, // Hiển thị 3 slide cùng lúc
   spaceBetween: 30, // Khoảng cách giữa các slide
   loop: true, // Vòng lặp các slide
   autoplay: {
     delay: 2500, // Tự động chuyển slide sau 2.5 giây
     disableOnInteraction: false, // Không tắt autoplay khi tương tác
   },
   grabCursor: true, // Hiển thị con trỏ dạng bàn tay khi kéo
   centeredSlides: true, // Trung tâm slide hiện tại
   pagination: {
     el: ".swiper-pagination ", // Kích hoạt phân trang
    clickable: true, // Cho phép nhấp vào phân trang
   },
   navigation: {
        nextEl: ".swiper-button-next", // Nút next
        prevEl: ".swiper-button-prev", // Nút prev

      },
   breakpoints: {
    0: {
      slidesPerView: 1, // Hiển thị 1 slide cho màn hình nhỏ
    },
    700: {
      slidesPerView: 2, // Hiển thị 2 slide cho màn hình trung bình
    },
    1000: {
      slidesPerView: 3, // Hiển thị 3 slide cho màn hình lớn
    },
  },
});
 }

// Hàm hiển thị các sản phẩm recipe
function renderRecipes(recipes) {
  recipes.slice(10, 14).forEach(recipe => {
    const recipeCard = 
      `<a href="RecipeDetail.html?recipe_id=${recipe.id}" class="recipe-card">
          <div class="recipe-image">
            <img src="${recipe.image_link}" alt="${recipe.name}" />
          </div>
          <div class="recipe-details">
            <h3>${recipe.name}</h3>
            <div class="recipe-meta">
              <div><i class="fas fa-clock"></i> ${recipe.time}</div>
              <div><i class="fas fa-bolt"></i> ${recipe.difficulty}</div>
            </div>
          </div>
       </a>`;
    document.querySelector("#recipe-grid").innerHTML += recipeCard;
});
}

// Đợi DOM load hoàn tất rồi chạy listProduct
document.addEventListener("DOMContentLoaded", renderSlides(recipes));
document.addEventListener("DOMContentLoaded", renderRecipes(recipes));
