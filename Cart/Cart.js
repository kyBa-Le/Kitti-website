document.querySelector('.btn-success').addEventListener('click', function() {
    // Ẩn phần giỏ hàng
    document.querySelector('.container.my-5').style.display = 'none';
    
    // Hiển thị form thông tin khách hàng và overlay
    document.getElementById('customer-info-form').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
});

document.querySelector('.submit-btn').addEventListener('click', function(event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form
    document.querySelector('.overlay').style.display = 'block'; // Hiển thị lớp mờ
    document.getElementById('order-success').style.display = 'block'; // Hiển thị thông báo
});