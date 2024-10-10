export async function readData(path) {
    // Code trong hàm này có thể sử dụng await
    const response = await fetch(path);
    const data = await response.json();
    return data;
}
// storage.js
export function saveToLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

export function getFromLocalStorage(key) {
    const value = localStorage.getItem(key);
    if(value === null){
        return [];
    }else{
        return JSON.parse(value);
    }
}

 