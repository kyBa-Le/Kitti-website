// Bên dưới là phần js của swiper
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
});
// Kết thúc phần js của swiper

// Bên dưới là phần js của sản phẩm (công thức)
// Khởi tạo dữ liệu mẫu cho slides và recipes
const sampleSlides = [
  {
    id: CT01,
    img: "https://inoxhungcuong.com/wp-content/uploads/2021/10/cach-lam-banh-mi-sandwich-kep-trung-05.jpg",
    title: "Sandwich",
    description: "Sandwich phô mai tươi",
    time: "30 phút",
    difficulty: "Dễ"
  },
  {
    id: CT01,
    img: "https://cdn.tgdd.vn/2021/03/CookProduct/1-1200x676-63.jpg",
    title: "Chicken",
    description: "Gà sốt cà chua",
    time: "1 giờ",
    difficulty: "Khó"
  },
  {
    id: CT01,
    img: "https://aplantifulpath.com/wp-content/uploads/2019/08/Strawberry-Ice-Cream-1.jpg",
    title: "Ice Cream",
    description: "Kem dâu",
    time: "2 tiếng",
    difficulty: "Khó"
  },
  {
    id: CT01,
    img: "https://cdn.tgdd.vn/Files/2019/12/28/1228865/cach-lam-banh-flan-khong-can-lo-nuong-202203121414578251.jpg",
    title: "Flan",
    description: "Bánh flan",
    time: "20 phút",
    difficulty: "Trung bình"
  }
];

const sampleRecipes = [
  {
    id: CT01,
    img: "https://i.pinimg.com/564x/81/28/57/812857ee76d2e2397266a5e25b7ffb88.jpg",
    title: "MÌ CAY HẢI SẢN",
    time: "40 phút",
    difficulty: "Trung bình"
  },
  {
    id: CT01,
    img: "https://i.pinimg.com/564x/b5/9a/c2/b59ac265cc9d8af62bc37b611748de63.jpg",
    title: "BÁNH MÌ CHẢ THỊT",
    time: "20 phút",
    difficulty: "Dễ"
  },
  {
    id: CT01,
    img: "https://i.pinimg.com/564x/82/f6/43/82f643605a416d6cc7e26a84abac54c4.jpg",
    title: "BÁNH CUỐN",
    time: "45 phút",
    difficulty: "Khó"
  },
  {
    id: CT01,
    img: "https://i.pinimg.com/564x/05/08/22/0508226df92f4142601a8b640171ea3d.jpg",
    title: "BÁNH XÈO",
    time: "6 giờ",
    difficulty: "Dễ"
  }
];

// Lưu dữ liệu vào Local Storage
function saveToLocalStorage() {
  if (!localStorage.getItem("slides")) {
    localStorage.setItem("slides", JSON.stringify(sampleSlides));
  }
  if (!localStorage.getItem("recipes")) {
    localStorage.setItem("recipes", JSON.stringify(sampleRecipes));
  }
}

// Load và hiển thị dữ liệu từ Local Storage
function listProduct() {
  saveToLocalStorage();

  const slides = JSON.parse(localStorage.getItem("slides"));
  const recipes = JSON.parse(localStorage.getItem("recipes"));

  // Hiển thị các slide trong Swiper
  const swiperWrapper = document.querySelector(".swiper-wrapper");
  swiperWrapper.innerHTML = ""; // Xóa nội dung cũ nếu có

  // Sử dụng vòng lặp for để thêm các slide
  for (let i = 0; i < slides.length; i++) {
    const slideItem = `
      <div class="swiper-slide">
        <div class="image">
          <img src="${slides[i].img}" alt="${slides[i].title}"/>
          <span>${slides[i].title}</span>
        </div>
        <div class="content">
          <div class="icon">
            <a href="#"><i class="fa-solid fa-clock"></i> ${slides[i].time}</a>
            <a href="#"><i class="fas fa-bolt"></i> ${slides[i].difficulty}</a>
          </div>
          <h3>${slides[i].description}</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <a href="#" class="btn">Chi Tiết</a>
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
      <a href="#" class="recipe-card">
        <div class="recipe-image">
          <img src="${recipes[i].img}" alt="${recipes[i].title}"/>
        </div>
        <div class="recipe-details">
          <h3>${recipes[i].title}</h3>
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

// Xóa dữ liệu khỏi Local Storage (nếu cần reset)
function clearLocalStorage() {
  localStorage.removeItem("slides");
  localStorage.removeItem("recipes");
}

