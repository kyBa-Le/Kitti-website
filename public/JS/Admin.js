import { ProductService } from "/src/Service/ProductService.js";
import { RecipeService } from "/src/Service/RecipeService.js";
import { UserService } from "/src/Service/UserService.js";
import { OrderService } from "/src/Service/OrderService.js";
import { priceFormat } from "/src/Utils/Param.js";
import { getFromLocalStorage, readFileJson, saveToLocalStorage } from "../../src/Utils/Storage.js";

// Lưu tất cả dữ liệu của các đối tượng vào local storage
if (["users", "orders", "products", "recipes"].every(item => !localStorage.getItem(item))) {
    const arrUsers = await readFileJson("/src/Data/User.json");
    const arrOrders = await readFileJson("/src/Data/Order.json");
    const arrProducts = await readFileJson("/src/Data/Product.json");
    const arrRecipes = await readFileJson("/src/Data/Recipe.json");

    saveToLocalStorage("users", JSON.stringify(arrUsers));
    saveToLocalStorage("orders", JSON.stringify(arrOrders));
    saveToLocalStorage("products", JSON.stringify(arrProducts));
    saveToLocalStorage("recipes", JSON.stringify(arrRecipes));
}

function createProductRow(product) {
    const shortDescription = product.description.length > 300
        ? `${product.description.substring(0, 300)}...`
        : product.description;

    const toggleButton = product.description.length > 300
        ? `<span class="toggle-description" style="color: #f89341; font-weight: bold; cursor: pointer;">Xem thêm</span>`
        : '';

    return `<tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${priceFormat(product.price)}đ</td>
                <td><img src="${product.image_link}" alt="${product.name}" class="table-img"></td>
                <td class="description-cell">
                    <div class="short-description">${shortDescription} ${toggleButton}</div>
                    <div class="full-description" style="display:none;">${product.description} <span class="toggle-description" style="color: #f89341; font-weight: bold; cursor: pointer;">Thu lại</span></div>
                </td>
                <td>
                    <button class="btn btn-sm admin-color-sua product-edit" data-id="${product.id}">Sửa</button>
                    <button class="btn btn-sm btn-danger product-remove" data-id="${product.id}">Xóa</button>
                </td>
            </tr>`;
}
function renderProductRows(products) {
    const productTableBody = document.getElementById("productTableBody");
    productTableBody.innerHTML = ''; // Xóa nội dung cũ để tránh trùng lặp

    products.forEach(product => {
        const row = createProductRow(product);
        productTableBody.insertAdjacentHTML('beforeend', row); // Thêm hàng mới vào bảng
    });
}
// Hàm mở modal để chỉnh sửa sản phẩm
document.addEventListener('DOMContentLoaded', function() {
    // Tải sản phẩm từ ProductService và hiển thị
    renderProductRows(ProductService.getAllProducts());

    // Hàm thêm sản phẩm vào ProductService và cập nhật bảng
    document.getElementById('submitProduct').addEventListener('click', function() {
        const productID = document.getElementById("productID").value;
        const productName = document.getElementById("productName").value;
        const productPrice = document.getElementById("productPrice").value;
        const productImageLink = document.getElementById("productImageLink").value;
        const productDescription = document.getElementById("productDescription").value;

        const newProduct = {
            id: productID,
            name: productName,
            image_link: productImageLink,
            price: productPrice,
            description: productDescription
        };

        const existingIndex = ProductService.arrayProduct.findIndex(p => p.id === productID);

        if (existingIndex !== -1) {
            // Nếu sản phẩm đã tồn tại, cập nhật
            ProductService.updateProduct(newProduct);
        } else {
            // Nếu sản phẩm mới, thêm vào
            ProductService.saveProduct(newProduct);
        }

        renderProductRows(ProductService.getAllProducts());

        // Đóng modal
        $('#addProductModal').modal('hide');
    });

    // Xóa sản phẩm
    document.getElementById('productTableBody').addEventListener('click', function(e) {
        if (e.target.classList.contains('product-remove')) {
            const productID = e.target.getAttribute('data-id');
            const confirmDelete = confirm(`Bạn có chắc chắn muốn xóa sản phẩm này?`);
    
            if (confirmDelete) {
                ProductService.deleteProductById(productID)
                    .then(() => {
                        // Cập nhật bảng sản phẩm
                        renderProductRows(ProductService.getAllProducts());
                    })
                    .catch(err => {
                        console.error("Có lỗi xảy ra khi xóa sản phẩm:", err);
                    });
            }
        }
    });
    
    // Sửa sản phẩm
    document.getElementById('productTableBody').addEventListener('click', function(e) {
        if (e.target.classList.contains('product-edit')) {
            const productID = e.target.getAttribute('data-id');
            const productToEdit = ProductService.getProductById(productID);

            // Điền dữ liệu vào form
            document.getElementById("productID").value = productToEdit.id;
            document.getElementById("productName").value = productToEdit.name;
            document.getElementById("productPrice").value = productToEdit.price;
            document.getElementById("productImageLink").value = productToEdit.image_link;
            document.getElementById("productDescription").value = productToEdit.description;

            // Mở modal
            $('#addProductModal').modal('show');
        }
    });

    // Bắt đầu xử lý mô tả đầy đủ
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('toggle-description')) {
            const fullDescription = event.target.closest('.description-cell').querySelector('.full-description');
            const shortDescription = event.target.closest('.description-cell').querySelector('.short-description');
    
            // Kiểm tra trạng thái hiển thị của mô tả đầy đủ
            if (fullDescription.style.display === 'none' || fullDescription.style.display === '') {
                // Hiển thị mô tả đầy đủ và ẩn mô tả ngắn
                fullDescription.style.display = 'block'; // Hiển thị mô tả đầy đủ
                shortDescription.style.display = 'none'; // Ẩn mô tả ngắn
            } else {
                // Ẩn mô tả đầy đủ và hiển thị mô tả ngắn
                fullDescription.style.display = 'none'; // Ẩn mô tả đầy đủ
                shortDescription.style.display = 'block'; // Hiển thị mô tả ngắn
            }
        }
    });
});

function createRecipeRow(recipe) {
    let ingredientsText = "";
    for (const ingredient of recipe.ingredients) {
        ingredientsText += `- ${ingredient.quantity} ${ingredient.unit} ${ingredient.name}<br>`;
    }

    let stepsText = "";
    for (const step of recipe.steps) {
        stepsText += `${step.title} - 
        <span class="short-description">${step.description.substring(0, 70)}...</span> 
        <span class="full-description" style="display:none;">${step.description}</span> 
        <span class="toggle-description" style="color: #f89341; font-weight: bold; cursor: pointer;">Xem thêm</span><br>`;
    }

    return `<tr>
                <td>${recipe.id}</td>
                <td>${recipe.name}</td>
                <td><img src="${recipe.image_link}" alt="${recipe.name}" class="table-img"></td>
                <td>${ingredientsText}</td>
                <td>${stepsText}</td>
                <td>
                    <button data-id="${recipe.id}" class="btn btn-sm admin-color-sua recipe-edit">Sửa</button>
                    <button data-id="${recipe.id}" class="btn btn-sm btn-danger recipe-remove">Xóa</button>
                </td>
            </tr>`;
}
function renderRecipeRows(recipes) {
    const tableBody = document.getElementById('recipeTableBody');
    tableBody.innerHTML = '';
    recipes.forEach(recipe => {
        const row = createRecipeRow(recipe);
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}
// Hàm mở modal để chỉnh sửa công thức
document.addEventListener('DOMContentLoaded', async function () {
    // Tải công thức từ localStorage và hiển thị
    renderRecipeRows(RecipeService.getAllRecipes());

    // Thêm nguyên liệu
    document.getElementById('addIngredient').addEventListener('click', function () {
        const ingredientHtml = `
            <div class="input-group mb-2">
                <input type="text" class="form-control" placeholder="Tên nguyên liệu" name="ingredientName" required>
                <input type="number" class="form-control" placeholder="Số lượng" name="ingredientQuantity" required>
                <input type="text" class="form-control" placeholder="Đơn vị" name="ingredientUnit" required>
                <button class="btn btn-danger remove-ingredient" type="button">Xóa</button>
            </div>
        `;
        document.getElementById('ingredientList').insertAdjacentHTML('beforeend', ingredientHtml);
    });

    // Thêm bước
    document.getElementById('addStep').addEventListener('click', function () {
        const stepHtml = `
            <div class="input-group mb-2">
                <input type="text" class="form-control" placeholder="Tiêu đề bước" name="stepTitle" required>
                <textarea class="form-control" placeholder="Mô tả bước" name="stepDescription" required></textarea>
                <input type="text" class="form-control" placeholder="Link ảnh minh họa" name="stepImage" required>
                <button class="btn btn-danger remove-step" type="button">Xóa</button>
            </div>
        `;
        document.getElementById('stepList').insertAdjacentHTML('beforeend', stepHtml);
    });

    // Xóa nguyên liệu hoặc bước
    document.getElementById('ingredientList').addEventListener('click', function (e) {
        if (e.target.classList.contains('remove-ingredient')) {
            e.target.parentElement.remove();
        }
    });

    document.getElementById('stepList').addEventListener('click', function (e) {
        if (e.target.classList.contains('remove-step')) {
            e.target.parentElement.remove();
        }
    });

    // Thêm hoặc cập nhật công thức vào localStorage
    document.getElementById('submitRecipe').addEventListener('click', async function () {
        const recipeID = document.getElementById("recipeID").value;
        const recipeName = document.getElementById("recipeName").value;
        const recipeImageLink = document.getElementById("recipeImageLink").value;
        const recipeDescription = document.getElementById("recipeDescription").value;
        const recipeTime = document.getElementById("recipeTime").value;
        const recipeDifficulty = document.getElementById("recipeDifficulty").value;

        const ingredients = Array.from(document.querySelectorAll('#ingredientList .input-group')).map(element => ({
            name: element.querySelector('input[name="ingredientName"]').value,
            quantity: element.querySelector('input[name="ingredientQuantity"]').value,
            unit: element.querySelector('input[name="ingredientUnit"]').value
        }));

        const steps = Array.from(document.querySelectorAll('#stepList .input-group')).map(element => ({
            title: element.querySelector('input[name="stepTitle"]').value,
            description: element.querySelector('textarea[name="stepDescription"]').value,
            image_link: element.querySelector('input[name="stepImage"]').value
        }));

        const newRecipe = {
            id: recipeID,
            name: recipeName,
            image_link: recipeImageLink,
            description: recipeDescription,
            time: recipeTime,
            difficulty: recipeDifficulty,
            ingredients: ingredients,
            steps: steps
        };

        // Kiểm tra và cập nhật công thức
        const existingRecipeIndex = RecipeService.getRecipeById(recipeID);
        if (existingRecipeIndex) {
            // Nếu công thức đã tồn tại, cập nhật công thức cũ
            await RecipeService.updateRecipe(newRecipe);
        } else {
            // Nếu không, lưu công thức mới
            RecipeService.saveRecipe(newRecipe);
        }

        // Cập nhật bảng hiển thị công thức
        renderRecipeRows(RecipeService.getAllRecipes());

        // Xóa dữ liệu trong form sau khi thêm thành công
        document.getElementById("recipeID").value = '';
        document.getElementById("recipeName").value = '';
        document.getElementById("recipeImageLink").value = '';
        document.getElementById("recipeDescription").value = '';
        document.getElementById("recipeTime").value = '';
        document.getElementById("recipeDifficulty").value = '';

        // Xóa tất cả nguyên liệu và bước trong form
        document.getElementById('ingredientList').innerHTML = '';
        document.getElementById('stepList').innerHTML = '';

        // Đóng modal
        $('#addRecipeModal').modal('hide');
    });

    // Xóa công thức
    document.getElementById('recipeTableBody').addEventListener('click', async function (e) {
        if (e.target.classList.contains('recipe-remove')) {
            const recipeID = e.target.getAttribute('data-id');
            const recipeToDelete = RecipeService.getRecipeById(recipeID);

            if (!recipeToDelete) {
                alert("Không tìm thấy công thức với ID này!");
                return;
            }

            const confirmDelete = confirm(`Bạn có chắc chắn muốn xóa công thức "${recipeToDelete.name}"?`);

            if (confirmDelete) {
                // Xóa công thức từ localStorage
                await RecipeService.deleteRecipeById(recipeID);
                
                // Cập nhật bảng hiển thị công thức mà không cần tải lại trang
                const updatedRecipes = RecipeService.getAllRecipes();
                renderRecipeRows(updatedRecipes);
            }
        }
    });


    // Sửa công thức
    document.getElementById('recipeTableBody').addEventListener('click', function (e) {
        if (e.target.classList.contains('recipe-edit')) {
            const recipeID = e.target.getAttribute('data-id');
            const recipeToEdit = RecipeService.getRecipeById(recipeID);

            // Điền dữ liệu vào form
            document.getElementById("recipeID").value = recipeToEdit.id;
            document.getElementById("recipeName").value = recipeToEdit.name;
            document.getElementById("recipeImageLink").value = recipeToEdit.image_link;
            document.getElementById("recipeDescription").value = recipeToEdit.description;
            document.getElementById("recipeTime").value = recipeToEdit.time;
            document.getElementById("recipeDifficulty").value = recipeToEdit.difficulty;

            // Xóa nguyên liệu và bước cũ trong form
            document.getElementById('ingredientList').innerHTML = '';
            recipeToEdit.ingredients.forEach(ingredient => {
                const ingredientHtml = `
                    <div class="input-group mb-2">
                        <input type="text" class="form-control" placeholder="Tên nguyên liệu" name="ingredientName" value="${ingredient.name}" required>
                        <input type="number" class="form-control" placeholder="Số lượng" name="ingredientQuantity" value="${ingredient.quantity}" required>
                        <input type="text" class="form-control" placeholder="Đơn vị" name="ingredientUnit" value="${ingredient.unit}" required>
                        <button class="btn btn-danger remove-ingredient" type="button">Xóa</button>
                    </div>
                `;
                document.getElementById('ingredientList').insertAdjacentHTML('beforeend', ingredientHtml);
            });

            // Xóa bước cũ trong form
            document.getElementById('stepList').innerHTML = '';
            recipeToEdit.steps.forEach(step => {
                const stepHtml = `
                    <div class="input-group mb-2">
                        <input type="text" class="form-control" placeholder="Tiêu đề bước" name="stepTitle" value="${step.title}" required>
                        <textarea class="form-control" placeholder="Mô tả bước" name="stepDescription" required>${step.description}</textarea>
                        <input type="text" class="form-control" placeholder="Link ảnh minh họa" name="stepImage" value="${step.image_link}" required>
                        <button class="btn btn-danger remove-step" type="button">Xóa</button>
                    </div>
                `;
                document.getElementById('stepList').insertAdjacentHTML('beforeend', stepHtml);
            });

            // Mở modal để sửa
            $('#addRecipeModal').modal('show');
        }
    });

    // Toggle mô tả ngắn/dài
    document.getElementById('recipeTableBody').addEventListener('click', function (e) {
        if (e.target.classList.contains('toggle-description')) {
            const fullDescription = e.target.previousElementSibling;
            const shortDescription = fullDescription.previousElementSibling;
            if (fullDescription.style.display === 'none') {
                fullDescription.style.display = 'inline';
                shortDescription.style.display = 'none';
                e.target.textContent = 'Thu lại';
            } else {
                fullDescription.style.display = 'none';
                shortDescription.style.display = 'inline';
                e.target.textContent = 'Xem thêm';
            }
        }
    });
});

function createOrderRow(order) {
    return `<tr>
                <td>${order.id}</td>
                <td>${order.product_id}</td>
                <td>${order.user_id}</td>
                <td>${order.address}</td>
                <td>${order.quantity}</td>
                <td>${order.status}</td>
                <td>
                    <button class="btn btn-sm admin-color-sua order-edit" data-id="${order.id}">Sửa</button>
                    <button class="btn btn-sm btn-danger order-remove" data-id="${order.id}">Xóa</button>
                </td>
            </tr>`;
}
async function renderOrderRows() {
    const orders = await OrderService.getAllOrders();
    const orderTableBody = document.getElementById("orderTableBody");
    orderTableBody.innerHTML = ''; // Xóa nội dung cũ để tránh trùng lặp

    orders.forEach(order => {
        const row = createOrderRow(order);
        orderTableBody.insertAdjacentHTML('beforeend', row); // Thêm hàng vào bảng
    });

    // Thêm sự kiện cho các nút "Sửa" và "Xóa"
    document.querySelectorAll('.order-edit').forEach(button => {
        button.addEventListener('click', editOrder);
    });

    document.querySelectorAll('.order-remove').forEach(button => {
        button.addEventListener('click', deleteOrder);
    });
}
async function editOrder(event) {
    const orderId = event.target.dataset.id;
    const order = await OrderService.getOrderById(orderId);

    if (order) {
        const newStatus = prompt('Nhập trạng thái mới cho đơn hàng:', order.status);

        if (newStatus !== null) {
            order.status = newStatus;
            await OrderService.updateOrder(order);
            await renderOrderRows(); // Cập nhật lại danh sách sau khi sửa
        }
    }
}
async function deleteOrder(event) {
    const orderId = event.target.dataset.id;

    if (confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
        await OrderService.deleteOrderById(orderId);
        await renderOrderRows(); // Cập nhật lại danh sách sau khi xóa
    }
}
document.addEventListener("DOMContentLoaded", async () => {
    await renderOrderRows();
});

function createUserRow(user) {
    return `<tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.phone}</td>
                <td>${user.password}</td>
                <td>
                    <button class="btn btn-sm admin-color-sua user-edit" data-id="${user.id}">Sửa</button>
                    <button class="btn btn-sm btn-danger user-remove" data-id="${user.id}">Xóa</button>
                </td>
            </tr>`;
}
function renderUserRows(users) {
    const userTableBody = document.getElementById("userTableBody");
    userTableBody.innerHTML = ''; // Xóa nội dung cũ để tránh trùng lặp

    users.forEach(user => {
        const row = createUserRow(user);
        userTableBody.insertAdjacentHTML('beforeend', row); // Thêm hàng vào bảng
    });

    // Thêm sự kiện cho các nút "Sửa" và "Xóa"
    document.querySelectorAll('.user-edit').forEach(button => {
        button.addEventListener('click', editUser);
    });

    document.querySelectorAll('.user-remove').forEach(button => {
        button.addEventListener('click', deleteUser);
    });
}
async function getUsersFromUserService() {
    return await UserService.getAllUsers(); // Lấy danh sách người dùng từ UserService
}
async function editUser(event) {
    const userId = event.target.dataset.id;
    const user = await UserService.getUserById(userId);

    if (user) {
        const newName = prompt('Nhập tên mới cho người dùng:', user.name);
        const newPhone = prompt('Nhập số điện thoại mới:', user.phone);

        if (newName !== null && newPhone !== null) {
            user.name = newName;
            user.phone = newPhone;
            await UserService.updateUser(user); // Cập nhật người dùng qua UserService
            const users = await getUsersFromUserService(); // Lấy danh sách người dùng mới
            renderUserRows(users); // Cập nhật lại danh sách sau khi chỉnh sửa
        }
    }
}
async function deleteUser(event) {
    const userId = event.target.dataset.id;

    if (confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
        await UserService.deleteUserById(userId); // Gọi hàm để xóa user
        const users = await getUsersFromUserService(); // Lấy danh sách người dùng mới
        renderUserRows(users); // Cập nhật lại danh sách sau khi xóa
    }
}
document.addEventListener("DOMContentLoaded", async () => {
    const users = await getUsersFromUserService(); // Lấy danh sách người dùng khi trang tải
    renderUserRows(users); // Hiển thị danh sách người dùng
});

// js account
$(document).ready(function () {
    $('#user-logged').click(function (event) {
        $('#account-menu').toggle(); // Hiển thị/ẩn menu khi nhấn vào biểu tượng tài khoản
        event.stopPropagation(); // Ngăn chặn sự kiện nhấp chuột lan rộng
    });

    // Ẩn menu nếu nhấp ra ngoài
    $(document).click(function () {
        $('#account-menu').hide();
    });
});
