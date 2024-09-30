// storage.js
export function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStorage(key) {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
}