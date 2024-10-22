// storage.js lưu local: chỉ truyền vào giá trị đã stringify
export function saveToLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

// lấy giá trị từ local: truyền vào key, trả về một array
export async function getFromLocalStorage(key) {
    return await JSON.parse((localStorage.getItem(key)));
}

export function readFileJson(path){
    return fetch(path).then(respone => respone.json().then(data => data));
    console.log("File read successfully!");
}
