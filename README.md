# WebDesign_Project

This is a repository to manage project of Basic Web Design lesson of Mr. Dinh.

    This is how our website work.

- Admin page - you need to login with account: username: admin, password: admin@123

  -- QUY ƯỚC ĐẶT TÊN -- - Lưu trong local storage: + user : "users" + oder : "orders" + recipe : "recipes" + product : "products" - Khi đăng nhập thành công thì sẽ lưu vào local: user_id (mục đích là để lấy ra giỏ hàng hoặc đặt hàng) - Các tham số truyền đi: + product_id + recipe_id

  -- CÁCH HOẠT ĐỘNG CỦA CÁC TRANG --

        - Trang home:
            + ấn vào sản phẩm : => chuyển link sang "ProductDetail.html?product_id={id}"
            + ấn vào công thức: => chuyển link sang "RecipeDetail.html?recipe_id={id}"
        - Header ( Trong folder component )
            + Thanh tìm kiếm: hoạt động bằng cách ấn enter
            + navigation (menu): => chuyển sang link được gắn trong thẻ a
            + đăng nhập/ đăng kí: => chạy hàm sendRequest(request) => chuyển link : "/Login/Background.html?request=" + request => dựa trên request để chuyển sang đăng nhập hoặc đăng kí.
        - Đăng nhập và đăng kí:
            + để vào trang đăng nhập cần truy cập theo link: "/Login/Background.html?request=login"
            + để vào trang đăng kí cần truy cập theo link: "/Login/Background.html?request=signup"
        - Chi tiết công thức:
            + Trang load lên sẽ lấy ra đúng công thức theo id được truyền trong đường dẫn đến trang với tham số: recipe_id
        - Trang chi tiết sản phẩm:
            + Load trang lên sẽ lấy ra đúng sản phẩm theo id được truyền trong đường dẫn đến trang với tham số: product_id
