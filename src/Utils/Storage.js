class User{
    
}
// storage.js
export function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStorage(key) {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
}

export function readFileJson(path){
    fetch(path).then(respone => respone.json().then(data => data));
    console.log("File read successfully!");
}