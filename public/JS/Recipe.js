// Đọc file JSON và lấy dữ liệu
function fetchData() {
  fetch("http://127.0.0.1:5500/src/Data/recipe.json")  // Đường dẫn đến file JSON
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();  // Chuyển đổi dữ liệu JSON
    })
    .then(data => {
      // Gọi hàm xử lý dữ liệu
      listProduct(data);
    })
    .catch(error => {
      console.error("Error loading data:", error);
    });
}

// Hàm xử lý dữ liệu và hiển thị lên giao diện
function listProduct(data) {
  const slides = data.slides;  // Giả sử JSON có trường slides
  const recipes = data.recipes;  // Giả sử JSON có trường recipes

  // Hiển thị các slide trong Swiper
  const swiperWrapper = document.querySelector(".swiper-wrapper");
  swiperWrapper.innerHTML = ""; // Xóa nội dung cũ nếu có

  // Sử dụng vòng lặp for để thêm các slide
  for (let i = 0; i < slides.length; i++) {
    // Giới hạn độ dài của mô tả (ví dụ: 100 ký tự)
    // Giới hạn độ dài của mô tả (ví dụ: 100 ký tự)
    let shortDescription = slides[i].description;
    if (shortDescription.length > 40) {
      // Tìm vị trí dấu cách cuối cùng trước khi đạt đến 40 ký tự
      let lastSpace = shortDescription.substring(0, 40).lastIndexOf(' ');
      if (lastSpace > 0) {
        shortDescription = shortDescription.substring(0, lastSpace) + "...";
      } else {
        // Nếu không tìm thấy dấu cách, vẫn cắt ở 40 ký tự
        shortDescription = shortDescription.substring(0, 40) + "...";
      }
    }
    const slideItem = `
      <div class="swiper-slide">
        <div class="image">
          <img src="${slides[i].image_link}" alt="${slides[i].name}"/>
          <span>${slides[i].name}</span>
        </div>
        <div class="content">
          <div class="icon">
            <a href="#"><i class="fa-solid fa-clock"></i> ${slides[i].time}</a>
            <a href="#"><i class="fas fa-bolt"></i> ${slides[i].difficulty}</a>
          </div>
          <h3>${slides[i].name}</h3>
          <p>${shortDescription}</p>
          <a href="RecipeDetail.html?id=${slides[i].id}" class="btn">Chi Tiết</a> <!-- Thay đổi ở đây -->
        </div>
      </div>
    `;
    swiperWrapper.innerHTML += slideItem;
  }

  // Hiển thị các công thức trong phần recipe grid
  const recipeGrid = document.querySelector(".recipe-grid");
  recipeGrid.innerHTML = ""; // Xóa nội dung cũ nếu có

  // Sử dụng vòng lặp for để thêm các công thức
  for (let i = 0; i < recipes.length; i++) {
    const recipeCard = `
      <a href="RecipeDetail.html?id=${recipes[i].id}" class="recipe-card"> <!-- Thay đổi ở đây -->
        <div class="recipe-image">
          <img src="${recipes[i].image_link}" alt="${recipes[i].name}"/>
        </div>
        <div class="recipe-details">
          <h3>${recipes[i].name}</h3>
          <div class="recipe-meta">
            <div><i class="fas fa-clock"></i> ${recipes[i].time}</div>
            <div><i class="fas fa-bolt"></i> ${recipes[i].difficulty}</div>
          </div>
        </div>
      </a>
    `;
    recipeGrid.innerHTML += recipeCard;
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

// Gọi hàm fetch để lấy dữ liệu
fetchData();
