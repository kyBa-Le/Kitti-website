import { RecipeService } from "/src/Service/RecipeService.js";

const recipes = RecipeService.getAllRecipes();
console.log(recipes);

// Hàm hiển thị slide thịnh hành
function renderSlides(recipes) {
  for (let i = 0; i < Math.min(recipes.length, 6); i++) {
    const shortDescription = recipes[i].description.length > 40
      ? `${recipes[i].description.substring(0, 37)}...`
      : recipes[i].description;
    
    const slideItem = 
    `<div class="swiper-slide">
        <div class="image">
          <img src="${recipes[i].image_link}" alt="${recipes[i].name}" />
          <span>${recipes[i].name}</span>
        </div>
        <div class="content">
          <div class="icon">
            <a href="#"><i class="fa-solid fa-clock"></i> ${recipes[i].time}</a>
            <a href="#"><i class="fas fa-bolt"></i> ${recipes[i].difficulty}</a>
          </div>
          <h3>${recipes[i].name}</h3>
          <p>${shortDescription}</p>
          <a href="RecipeDetail.html?recipe_id=${recipes[i].id}" class="btn">Chi Tiết</a>
        </div>
      </div>`;
      
    document.getElementById("swiper-wrapper").innerHTML += slideItem;
}


  // Khởi động Swiper
  new Swiper(".mySwiper", {
    slidesPerView: 3, // Hiển thị 3 slide cùng lúc
    spaceBetween: 30, // Khoảng cách giữa các slide
    loop: true, // Vòng lặp các slide
    autoplay: {
      delay: 2500, // Tự động chuyển slide sau 2.5 giây
      disableOnInteraction: false, // Không tắt autoplay khi tương tác
    },
    navigation: {
      nextEl: ".swiper-button-next", // Nút next
      prevEl: ".swiper-button-prev", // Nút prev
    },
  });
}


// Hàm hiển thị các sản phẩm recipe
function renderRecipes(recipes) {
  
  for (let i = 5; i < 9; i++) {
    const recipeCard = 
      `<a href="RecipeDetail.html?recipe_id=${recipes[i].id}" class="recipe-card">
          <div class="recipe-image">
            <img src="${recipes[i].image_link}" alt="${recipes[i].name}" />
          </div>
          <div class="recipe-details">
            <h3>${recipes[i].name}</h3>
            <div class="recipe-meta">
              <div><i class="fas fa-clock"></i> ${recipes[i].time}</div>
              <div><i class="fas fa-bolt"></i> ${recipes[i].difficulty}</div>
            </div>
          </div>
       </a>`;
       
    document.querySelector("#recipe-grid").innerHTML += recipeCard;
  }
}


// Đợi DOM load hoàn tất rồi chạy listProduct
document.addEventListener("DOMContentLoaded", renderSlides(recipes));
document.addEventListener("DOMContentLoaded", renderRecipes(recipes));
