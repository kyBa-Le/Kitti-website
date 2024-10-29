import { ProductService } from "/src/Service/ProductService.js";
import { RecipeService } from "/src/Service/RecipeService.js";
import { UserService } from "/src/Service/UserService.js";
import { OrderService } from "/src/Service/OrderService.js";
import { priceFormat } from "/src/Utils/Param.js";

// Tạo hàng sản phẩm cho bảng
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
// Hiển thị các hàng sản phẩm trong bảng
function renderProductRows(products) {
    const productTableBody = document.getElementById("productTableBody");
    productTableBody.innerHTML = ''; // Xóa nội dung cũ để tránh trùng lặp

    products.forEach(product => {
        const row = createProductRow(product);
        productTableBody.insertAdjacentHTML('beforeend', row); // Thêm hàng mới vào bảng
    });
}
// Thêm hoặc chỉnh sửa sản phẩm
async function addOrEditProduct() {
    const productID = document.getElementById("productID").value;
    const productName = document.getElementById("productName").value;
    const productPrice = document.getElementById("productPrice").value;
    const productImageLink = document.getElementById("productImageLink").value;
    const productDescription = document.getElementById("productDescription").value;

    let newProduct = {};
    let updateProduct = {};

    if (productID) {
        const productIDNum = parseInt(productID);

        updateProduct = {
            id: productIDNum,
            name: productName,
            image_link: productImageLink,
            price: productPrice,
            description: productDescription
        };
        await ProductService.updateProduct(updateProduct); // Cập nhật sản phẩm
    } else {
        newProduct = {
            id: Math.floor(Math.random() * 9999),
            name: productName,
            image_link: productImageLink,
            price: productPrice,
            description: productDescription
        };
        await ProductService.saveProduct(newProduct); // Lưu sản phẩm mới
    }

    const updatedProducts = await ProductService.getAllProducts();
    renderProductRows(updatedProducts);

    resetProductForm();
    $('#addProductModal').modal('hide');
}
// Xóa sản phẩm
async function deleteProduct(productID) {
    const confirmDelete = confirm(`Bạn có chắc chắn muốn xóa sản phẩm này?`);
    if (confirmDelete) {
        await ProductService.deleteProductById(productID);
        const updatedProducts = await ProductService.getAllProducts();
        renderProductRows(updatedProducts);
    }
}
// Sửa sản phẩm
async function editProduct(productID) {
    const productToEdit = await ProductService.getProductById(productID);

    document.getElementById("productID").value = productToEdit.id;
    document.getElementById("productName").value = productToEdit.name;
    document.getElementById("productPrice").value = productToEdit.price;
    document.getElementById("productImageLink").value = productToEdit.image_link;
    document.getElementById("productDescription").value = productToEdit.description;

    $('#addProductModal').modal('show');
}
// Xử lý mô tả đầy đủ
function toggleProductDescription(event) {
    const fullDescription = event.target.closest('.description-cell').querySelector('.full-description');
    const shortDescription = event.target.closest('.description-cell').querySelector('.short-description');

    if (fullDescription.style.display === 'none' || fullDescription.style.display === '') {
        fullDescription.style.display = 'block';
        shortDescription.style.display = 'none';
    } else {
        fullDescription.style.display = 'none';
        shortDescription.style.display = 'block';
    }
}
// Reset form
function resetProductForm() {
    document.getElementById("productID").value = "";
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productImageLink").value = "";
    document.getElementById("productDescription").value = "";
}
document.getElementById('submitProduct').addEventListener('click', addOrEditProduct);
document.getElementById('productTableBody').addEventListener('click', async function(event) {
    const productID = event.target.getAttribute('data-id');

    if (event.target.classList.contains('product-remove')) {
        await deleteProduct(productID);
    }

    if (event.target.classList.contains('product-edit')) {
        await editProduct(productID);
    }
});
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('toggle-description')) {
        toggleProductDescription(event);
    }
});
// Tải dữ liệu sản phẩm và gán sự kiện khi DOMContentLoaded
document.addEventListener('DOMContentLoaded', async function() {
    const allProducts = await ProductService.getAllProducts();
    renderProductRows(allProducts);
});

// Recipes
function createRecipeRow(recipe) {
    let ingredientsText = '';
    for (let i = 0; i < recipe.ingredients.length; i++) {
        const ingredient = recipe.ingredients[i];
        ingredientsText += `- ${ingredient.quantity} ${ingredient.unit} ${ingredient.name}<br>`;
    }

    let stepsText = '';
    for (let i = 0; i < recipe.steps.length; i++) {
        const step = recipe.steps[i];
        stepsText += `
            ${step.title} - 
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
async function renderRecipeRows(recipes) {
    const tableBody = document.getElementById('recipeTableBody');
    tableBody.innerHTML = '';
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const row = createRecipeRow(recipe);
        tableBody.insertAdjacentHTML('beforeend', row);
    }
}
function addIngredient() {
    const ingredientHtml = `
        <div class="input-group mb-2">
            <input type="text" class="form-control" placeholder="Tên nguyên liệu" name="ingredientName" required>
            <input type="number" class="form-control" placeholder="Số lượng" name="ingredientQuantity" required>
            <input type="text" class="form-control" placeholder="Đơn vị" name="ingredientUnit" required>
            <button class="btn btn-danger remove-ingredient" type="button">Xóa</button>
        </div>
    `;
    document.getElementById('ingredientList').insertAdjacentHTML('beforeend', ingredientHtml);
}
function addStep() {
    const stepHtml = `
        <div class="input-group mb-2">
            <input type="text" class="form-control" placeholder="Tiêu đề bước" name="stepTitle" required>
            <textarea class="form-control" placeholder="Mô tả bước" name="stepDescription" required></textarea>
            <input type="text" class="form-control" placeholder="Link ảnh minh họa" name="stepImage" required>
            <button class="btn btn-danger remove-step" type="button">Xóa</button>
        </div>
    `;
    document.getElementById('stepList').insertAdjacentHTML('beforeend', stepHtml);
}
function removeIngredient(event) {
    if (event.target.classList.contains('remove-ingredient')) {
        event.target.parentElement.remove();
    }
}
function removeStep(event) {
    if (event.target.classList.contains('remove-step')) {
        event.target.parentElement.remove();
    }
}
async function submitRecipe() {
    const recipeID = document.getElementById("recipeID").value;
    const recipeName = document.getElementById("recipeName").value;
    const recipeImageLink = document.getElementById("recipeImageLink").value;
    const recipeDescription = document.getElementById("recipeDescription").value;
    const recipeTime = document.getElementById("recipeTime").value;
    const recipeDifficulty = document.getElementById("recipeDifficulty").value;
    const recipeType = document.getElementById("recipeType").value;

    const ingredients = [];
    const ingredientElements = document.querySelectorAll('#ingredientList .input-group');
    for (let i = 0; i < ingredientElements.length; i++) {
        const element = ingredientElements[i];
        ingredients.push({
            name: element.querySelector('input[name="ingredientName"]').value,
            quantity: element.querySelector('input[name="ingredientQuantity"]').value,
            unit: element.querySelector('input[name="ingredientUnit"]').value
        });
    }

    const steps = [];
    const stepElements = document.querySelectorAll('#stepList .input-group');
    for (let i = 0; i < stepElements.length; i++) {
        const element = stepElements[i];
        steps.push({
            title: element.querySelector('input[name="stepTitle"]').value,
            description: element.querySelector('textarea[name="stepDescription"]').value,
            image_link: element.querySelector('input[name="stepImage"]').value
        });
    }

    let newRecipe = {
        id: recipeID ? parseInt(recipeID) : Math.floor(Math.random() * 9999),
        name: recipeName,
        image_link: recipeImageLink,
        description: recipeDescription,
        time: recipeTime,
        difficulty: recipeDifficulty,
        type: recipeType,
        ingredients: ingredients,
        steps: steps
    };

    if (recipeID) {
        await RecipeService.updateRecipe(newRecipe); // Cập nhật công thức
    } else {
        await RecipeService.saveRecipe(newRecipe); // Lưu công thức mới
    }

    const updatedRecipes = await RecipeService.getAllRecipes(); // Cập nhật danh sách công thức
    renderRecipeRows(updatedRecipes);
    resetRecipeForm();
    $('#addRecipeModal').modal('hide');
}
async function deleteRecipe(event) {
    if (event.target.classList.contains('recipe-remove')) {
        const recipeID = event.target.getAttribute('data-id');
        const recipeToDelete = await RecipeService.getRecipeById(recipeID);

        if (!recipeToDelete) {
            alert("Không tìm thấy công thức với ID này!");
            return;
        }

        const confirmDelete = confirm(`Bạn có chắc chắn muốn xóa công thức "${recipeToDelete.name}"?`);
        if (confirmDelete) {
            await RecipeService.deleteRecipeById(recipeID); // Xóa công thức từ localStorage
            const updatedRecipes = await RecipeService.getAllRecipes(); // Cập nhật danh sách công thức
            renderRecipeRows(updatedRecipes);
        }
    }
}
async function editRecipe(event) {
    if (event.target.classList.contains('recipe-edit')) {
        const recipeID = event.target.getAttribute('data-id');
        const recipeToEdit = await RecipeService.getRecipeById(recipeID);

        // Điền dữ liệu vào form
        document.getElementById("recipeID").value = recipeToEdit.id;
        document.getElementById("recipeName").value = recipeToEdit.name;
        document.getElementById("recipeImageLink").value = recipeToEdit.image_link;
        document.getElementById("recipeDescription").value = recipeToEdit.description;
        document.getElementById("recipeTime").value = recipeToEdit.time;
        document.getElementById("recipeDifficulty").value = recipeToEdit.difficulty;
        document.getElementById("recipeType").value = recipeToEdit.type;

        // Xóa nguyên liệu và bước cũ trong form
        document.getElementById('ingredientList').innerHTML = '';
        for (let i = 0; i < recipeToEdit.ingredients.length; i++) {
            const ingredient = recipeToEdit.ingredients[i];
            const ingredientHtml = `
                <div class="input-group mb-2">
                    <input type="text" class="form-control" placeholder="Tên nguyên liệu" name="ingredientName" value="${ingredient.name}" required>
                    <input type="number" class="form-control" placeholder="Số lượng" name="ingredientQuantity" value="${ingredient.quantity}" required>
                    <input type="text" class="form-control" placeholder="Đơn vị" name="ingredientUnit" value="${ingredient.unit}" required>
                    <button class="btn btn-danger remove-ingredient" type="button">Xóa</button>
                </div>
            `;
            document.getElementById('ingredientList').insertAdjacentHTML('beforeend', ingredientHtml);
        }

        document.getElementById('stepList').innerHTML = '';
        for (let i = 0; i < recipeToEdit.steps.length; i++) {
            const step = recipeToEdit.steps[i];
            const stepHtml = `
                <div class="input-group mb-2">
                    <input type="text" class="form-control" placeholder="Tiêu đề bước" name="stepTitle" value="${step.title}" required>
                    <textarea class="form-control" placeholder="Mô tả bước" name="stepDescription" required>${step.description}</textarea>
                    <input type="text" class="form-control" placeholder="Link ảnh minh họa" name="stepImage" value="${step.image_link}" required>
                    <button class="btn btn-danger remove-step" type="button">Xóa</button>
                </div>
            `;
            document.getElementById('stepList').insertAdjacentHTML('beforeend', stepHtml);
        }

        // Hiển thị modal
        $('#addRecipeModal').modal('show');
    }
}
function resetRecipeForm() {
    document.getElementById("recipeID").value = '';
    document.getElementById("recipeName").value = '';
    document.getElementById("recipeImageLink").value = '';
    document.getElementById("recipeDescription").value = '';
    document.getElementById("recipeTime").value = '';
    document.getElementById("recipeDifficulty").value = '';
    document.getElementById("recipeType").value = '';
    document.getElementById('ingredientList').innerHTML = '';
    document.getElementById('stepList').innerHTML = '';
}
function toggleRecipeDescription(event) {
    // Kiểm tra xem đối tượng nhấp vào có lớp 'toggle-description' không
    if (event.target.classList.contains('toggle-description')) {
        const fullDescription = event.target.previousElementSibling;
        const shortDescription = fullDescription.previousElementSibling;

        // Chuyển đổi hiển thị giữa mô tả đầy đủ và ngắn gọn
        if (fullDescription.style.display === 'none') {
            fullDescription.style.display = 'inline';
            shortDescription.style.display = 'none';
            event.target.textContent = 'Thu lại';
        } else {
            fullDescription.style.display = 'none';
            shortDescription.style.display = 'inline';
            event.target.textContent = 'Xem thêm';
        }
    }
}
document.getElementById("addIngredient").addEventListener("click", addIngredient);
document.getElementById("addStep").addEventListener("click", addStep);
document.getElementById("ingredientList").addEventListener("click", removeIngredient);
document.getElementById("stepList").addEventListener("click", removeStep);
document.getElementById("submitRecipe").addEventListener("click", submitRecipe);
document.getElementById("recipeTableBody").addEventListener("click", deleteRecipe);
document.getElementById("recipeTableBody").addEventListener("click", editRecipe);
document.getElementById('recipeTableBody').addEventListener('click', toggleRecipeDescription);
// Tải dữ liệu công thức và gán sự kiện khi DOMContentLoaded
document.addEventListener("DOMContentLoaded", async () => {
    const recipes = await RecipeService.getAllRecipes();
    renderRecipeRows(recipes);
});

// Orders
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
        button.addEventListener('click', showEditOrderModal);
    });

    document.querySelectorAll('.order-remove').forEach(button => {
        button.addEventListener('click', deleteOrder);
    });
}
function showEditOrderModal(event) {
    const orderId = event.target.dataset.id;
    const order = OrderService.getOrderById(orderId);

    if (order) {
        // Hiển thị thông tin đơn hàng trong modal
        document.getElementById('orderId').value = order.id;
        document.getElementById('orderStatus').value = order.status;

        // Hiển thị modal
        $('#editOrderStatusModal').modal('show');
    }
}
// Hàm xử lý lưu thay đổi trạng thái đơn hàng
document.getElementById('submitOrderStatus').addEventListener('click', async () => {
    const orderId = document.getElementById('orderId').value;
    const newStatus = document.getElementById('orderStatus').value;

    if (orderId && newStatus) {
        const order = await OrderService.getOrderById(orderId);
        order.status = newStatus;

        // Cập nhật đơn hàng và đóng modal
        await OrderService.updateOrder(order);
        await renderOrderRows(); // Cập nhật lại danh sách sau khi sửa

        // Đóng modal
        $('#editOrderStatusModal').modal('hide');
    }
});
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

// Users
function createUserRow(user) {
    return `<tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.phone}</td>
                <td>${user.password}</td>
                <td>
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
