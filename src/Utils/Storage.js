export function readData(path){
    fetch(path)
        .then((res) => res.json())
        .then((data) => {
            return data // object
            // sử dụng data để thêm dữ liệu vào DOM
        })
}
// storage.js
export function saveToLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

export function getFromLocalStorage(key) {
    const value = localStorage.getItem(key);
    if(value ==- null){
        return [];
    }else{
        return JSON.parse(value);
    }
}

 