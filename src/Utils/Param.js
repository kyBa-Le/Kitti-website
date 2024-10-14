export function getQueryParam(param) {
    const urlParam = new URLSearchParams(window.location.search);
    return urlParam.get(param);
}

// Hàm hiển thị giá trị tiền
 export function priceFormat(num) {
    // Chuyển số thành chuỗi và đảo ngược chuỗi
    let str = num.toString().split('').reverse().join('');
    // Thêm dấu chấm sau mỗi 3 ký tự, bắt đầu từ ký tự thứ 3
    let result = '';
    for (let i = 0; i < str.length; i++) {
        if (i > 0 && i % 3 === 0) {
            result = '.' + result;
        }
        result = str[i] + result;
    }
    return result;
}