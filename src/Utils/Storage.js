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
    return fetch(path).then(respone => respone.json().then(data => data));
    console.log("File read successfully!");
}
// export function saveToJsonFile(path, data){
//     const jsonData = JSON.stringify(data);
//     const fs = require("fs");
//     fs.writeFile(path,jsonData, (err) =>{
//         if (err) {
//             console.error(err);
//         } else {
//             console.log('Data written successfully to file.');
//         }
//     })
// }