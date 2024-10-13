// Biến form typing để xác định trạng thái có phải là đang điền form hay không
var isFormOpened = false;

// Hàm đọc file JSON và lấy dữ liệu
function fetchData() {
    return fetch("http://127.0.0.1:5500/src/Data/recipe.json") // Đường dẫn đến file JSON
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Chuyển đổi dữ liệu JSON
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
                    <td>${ingredient.unit}</td>
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
                    <img src="${step.image_link}" alt="${step.title}" />
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
                    <td>${ingredient.unit}</td>
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
                    <img src="${step.image_link}" alt="${step.title}" />
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

// Hàm mới để xử lý gửi dữ liệu
function newRecipe() {
    // Kiểm tra xem form đã được hoàn thành chưa
    if (isFormOpened) {
        // Ẩn form
        $("#form_recipe_container").css("display", "none");
        $("#recipe-detail").css("filter", "none");
        isFormOpened = false;

        // Xóa nội dung hiện có của <tbody>
        $("#ingredients-container tbody").empty();

        // Gọi hàm fetchData để lấy dữ liệu từ JSON
        fetchData().then(data => {
            // Lấy ID từ URL
            const id = new URLSearchParams(window.location.search).get('id');
            
            // Kiểm tra ID thuộc về recipes hay slides
            let recipeData;
            if (id >= 5 && id <= 9) {
                // Lấy dữ liệu từ recipes
                recipeData = data.recipes.find(recipe => recipe.id == id);
            } else if (id >= 1 && id <= 4) {
                // Lấy dữ liệu từ slides
                recipeData = data.slides.find(slide => slide.id == id);
            }

            // Xử lý dữ liệu nếu tìm thấy công thức
            if (recipeData) {
                let ingredientsHTML = '';

                recipeData.ingredients.forEach(ingredient => {
                    let randomQuantity;

                    // Nếu nguyên liệu là "Nước chấm", giữ nguyên số lượng mặc định
                    if (ingredient.name === "Nước chấm" || ingredient.name === "Nước sốt") {
                        randomQuantity = ingredient.quantity;
                    } else {
                        // Tạo số lượng ngẫu nhiên dựa trên đơn vị
                        switch (ingredient.unit) {
                            case 'g': // gram
                                randomQuantity = (Math.floor(Math.random() * 400) + 100); // Ngẫu nhiên từ 100g đến 500g
                                break;
                            case 'ml': // milliliter
                                randomQuantity = (Math.floor(Math.random() * 400) + 100); // Ngẫu nhiên từ 100ml đến 500ml
                                break;
                            case 'kg': // kilogram
                                randomQuantity = (Math.floor(Math.random() * 4) + 1); // Ngẫu nhiên từ 1kg đến 5kg
                                break;
                            case 'l': // liter
                                randomQuantity = (Math.floor(Math.random() * 4) + 1); // Ngẫu nhiên từ 1l đến 5l
                                break;
                            case 'cái': // piece
                                randomQuantity = (Math.floor(Math.random() * 5) + 1); // Ngẫu nhiên từ 1 đến 5 cái
                                break;
                            case 'muỗng': // spoon
                                randomQuantity = (Math.floor(Math.random() * 5) + 1); // Ngẫu nhiên từ 1 đến 5 muỗng
                                break;
                            default:
                                randomQuantity = (Math.floor(Math.random() * 5) + 1); // Ngẫu nhiên từ 1 đến 5 cho các đơn vị không xác định
                        }
                    }

                    ingredientsHTML += `
                        <tr>
                            <td>${ingredient.name}</td>
                            <td>${randomQuantity}</td>
                            <td>${ingredient.unit}</td>
                        </tr>`;
                });

                // Cập nhật nội dung mới vào bảng
                $("#ingredients-container tbody").html(ingredientsHTML);
            }
        });
    } else {
        // Nếu form không được hoàn thành, lấy dữ liệu từ local storage
        const localData = JSON.parse(localStorage.getItem('recipeData'));
        if (localData) {
            let ingredientsHTML = '';
            localData.ingredients.forEach(ingredient => {
                ingredientsHTML += `
                    <tr>
                        <td>${ingredient.name}</td>
                        <td>${ingredient.quantity}</td>
                    </tr>`;
            });
            $("#ingredients-container tbody").html(ingredientsHTML);
        }
    }
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

// Gọi hàm fetch để lấy dữ liệu ban đầu
fetchData().then(data => listProduct(data));
