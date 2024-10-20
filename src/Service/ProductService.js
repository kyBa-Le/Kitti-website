import { getFromLocalStorage } from "../Utils/Storage.js";
import { saveToLocalStorage } from "../Utils/Storage.js";

export const ProductService = {
    arrayProduct: await getFromLocalStorage("products"),
    
    // Hàm lưu Product
    saveProduct: function (Product) {
        this.arrayProduct.push(Product);
        saveToLocalStorage("products", JSON.stringify(this.arrayProduct));
    },
    
    // Hàm lấy tất cả Product
    getAllProducts: function () {
        if (this.arrayProduct) {
            return this.arrayProduct;
        } else {
            return [];
        }
    },
    
    // Hàm lấy product theo id của product
    getProductById(id) {
        return this.arrayProduct.find(element => {
            return element.id == id;
        });
    },
    
    // Hàm lấy các Product theo id của user
    getProductByUserId: function(user_id) {
        return this.arrayProduct.filter(value => {
            return value.user_id == user_id;
        });
    },
    
    // Hàm chỉnh sửa thông tin product - truyền vào 1 Product mới
    updateProduct: async function (Product) {
        const index = await this.arrayProduct.findIndex(p => p.id === Product.id);

        if (index !== -1) {
            this.arrayProduct[index] = {
                ...this.arrayProduct[index],
                ...Product
            };
            saveToLocalStorage("products", JSON.stringify(this.arrayProduct));
            console.log("Product has been updated!");
        } else {
            console.error("Product not found");
        }
    },

    // Hàm lấy ra sản phẩm theo tên có chứa từ khóa - nhận vào 1 từ khóa - trả về 1 danh sách sản phẩm
    getProductByNameInclude: function(productName){
        const products = [];
        for(let i = 0; i<this.arrayProduct.length; i++){
            if (this.arrayProduct[i].name.toUpperCase().includes(productName.toUpperCase())){
                products.push(this.arrayProduct[i]);
            }
        }
        return products;
    },

    // Lọc các sản phẩm theo phân loại, nhận vào một array product và loại - trả về 1 array product
    filterProductByType: function(products,type){
        if(type == '' || type == null){
            return products;
        }
        const filteredProduct = [];
        for(let i = 0; i<products.length; i++){
            console.log("Product type:", products[i].type);
            if(products[i].type == type ){
                filteredProduct.push(products[i]);
            }
        }
        return filteredProduct;
    },
    
    // Hàm xóa product theo id
    async deleteProductById(id) {
        this.arrayProduct = await this.arrayProduct.filter(function(product) {
            return product.id != id;
        });
        saveToLocalStorage("products", JSON.stringify(this.arrayProduct));
        console.log("Sản phẩm đã được xóa!");
    }, 
    
    
}
