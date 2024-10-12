// Đọc file JSON và lấy dữ liệu
function fetchData() {
  fetch("http://127.0.0.1:5500/src/Data/recipe.json") // Đường dẫn đến file JSON
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json(); // Chuyển đổi dữ liệu JSON
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
  // Lấy ID món ăn từ URL
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get('id'); // Lấy ID từ URL
  const slideId = urlParams.get('id'); // Lấy ID từ URL

  // Tìm công thức theo ID
  const recipeData = data.recipes.find(recipe => recipe.id == recipeId);
  const slideData = data.slides.find(slide => slide.id == slideId);

  if (recipeData) {
      // Thêm tiêu đề và mô tả công thức vào HTML
      $("#recipe-title").text(recipeData.name); // Gán tiêu đề từ JSON
      $("#recipe-description").text(recipeData.description); // Gán mô tả từ JSON
      $("#recipe-image").attr("src", recipeData.image_link); // Gán hình ảnh từ JSON

      // Thêm nguyên liệu vào bảng
      let ingredientsHTML = '';

      // Duyệt qua danh sách nguyên liệu và thêm vào HTML
      recipeData.ingredients.forEach(ingredient => {
          ingredientsHTML += `
              <tr>
                  <td>${ingredient.name}</td>
                  <td>${ingredient.quantity}</td>
              </tr>`;
      });

      $("#ingredients-container tbody").html(ingredientsHTML); // Gán HTML cho bảng nguyên liệu

      // Thêm các bước hướng dẫn vào HTML
      let stepsHTML = '';
      recipeData.steps.forEach(step => {
          stepsHTML += `
              <div class="step">
                  <div class="step-title">${step.title}</div>
                  <p>${step.description}</p>
                  <img src="${step.image}" alt="${step.title}" />
              </div>`;
      });

      $("#steps").html(stepsHTML); // Gán HTML cho phần hướng dẫn

      // Hiển thị các phần đã thêm
      $("#recipe-header").show(); // Hiển thị phần tiêu đề và hình ảnh
      $("#ingredients-container").show(); // Hiển thị phần nguyên liệu
      $("#steps-section").show(); // Hiển thị phần hướng dẫn
  } else if (slideData) {
    // Thêm tiêu đề và mô tả công thức vào HTML
    $("#recipe-title").text(slideData.name); // Gán tiêu đề từ JSON
    $("#recipe-description").text(slideData.description); // Gán mô tả từ JSON
    $("#recipe-image").attr("src", slideData.image_link); // Gán hình ảnh từ JSON

    // Thêm nguyên liệu vào bảng
    let ingredientsHTML = '';

    // Duyệt qua danh sách nguyên liệu và thêm vào HTML
    slideData.ingredients.forEach(ingredient => {
        ingredientsHTML += `
            <tr>
                <td>${ingredient.name}</td>
                <td>${ingredient.quantity}</td>
            </tr>`;
    });

    $("#ingredients-container tbody").html(ingredientsHTML); // Gán HTML cho bảng nguyên liệu

    // Thêm các bước hướng dẫn vào HTML
    let stepsHTML = '';
    slideData.steps.forEach(step => {
        stepsHTML += `
            <div class="step">
                <div class="step-title">${step.title}</div>
                <p>${step.description}</p>
                <img src="${step.image}" alt="${step.title}" />
            </div>`;
    });

    $("#steps").html(stepsHTML); // Gán HTML cho phần hướng dẫn

    // Hiển thị các phần đã thêm
    $("#recipe-header").show(); // Hiển thị phần tiêu đề và hình ảnh
    $("#ingredients-container").show(); // Hiển thị phần nguyên liệu
    $("#steps-section").show(); // Hiển thị phần hướng dẫn
  } else {
      console.error("Recipe not found");
  }
}

// Biến form typing để xác định trạng thái có phải là đang điền form hay không
var isFormOpened = false;

document.addEventListener("click", (event) => {
  if (isFormOpened && !event.target.closest("#form_recipe_container") && !event.target.closest("#createRecipeButton")) {
      let form = $("#form_recipe_container");
      let recipe = $("#recipe-detail");
      form.css("display", "none");
      recipe.css("filter", "none");
      isFormOpened = false;
  }
});

$("#home-header").load("/Component/Header.html");
$("#home-footer").load("/Component/Footer.html");

// Đây là function để mở form khi ấn vào nút tạo công thức
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

// Gọi hàm fetch để lấy dữ liệu
fetchData();
